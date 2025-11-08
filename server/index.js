import express from 'express';
import cors from 'cors';
import pg from 'pg';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// PostgreSQL connection configuration
const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Don@1502',
    port: 5432,
    database: 'e-commerce'
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir, {
    setHeaders: (res, path) => {
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    }
}));

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Test database connection
pool.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });

// Multer error handler middleware
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 5MB' });
        }
        return res.status(400).json({ error: err.message });
    }
    if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
};

// Routes

// GET all products
app.get('/products', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id');
        // Ensure rating is properly formatted (pg should handle this automatically, but just in case)
        const products = result.rows.map(product => {
            // Parse rating if it's a string
            let rating = product.rating;
            if (typeof rating === 'string') {
                try {
                    rating = JSON.parse(rating);
                } catch (e) {
                    rating = { rate: 0, count: 0 };
                }
            }
            
            // Ensure image URL is valid, use default if empty or null
            let image = product.image;
            if (!image || image.trim() === '') {
                image = 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png';
            }
            
            return {
                ...product,
                rating: rating || { rate: 0, count: 0 },
                image: image
            };
        });
        console.log(`Fetched ${products.length} products`);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Ensure rating is properly formatted
        const product = result.rows[0];
        let rating = product.rating;
        if (typeof rating === 'string') {
            try {
                rating = JSON.parse(rating);
            } catch (e) {
                rating = { rate: 0, count: 0 };
            }
        }
        product.rating = rating || { rate: 0, count: 0 };
        
        // Ensure image URL is valid
        if (!product.image || product.image.trim() === '') {
            product.image = 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png';
        }

        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST create new product
app.post('/products', upload.single('image'), handleMulterError, async (req, res) => {
    try {
        const { title, price, description, category, rate, count } = req.body;

        // Validate required fields
        if (!title || !title.trim()) {
            return res.status(400).json({ error: 'Title is required' });
        }
        if (!price || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
            return res.status(400).json({ error: 'Valid price is required' });
        }
        if (!category || !category.trim()) {
            return res.status(400).json({ error: 'Category is required' });
        }

        // Handle image upload
        let imageUrl = '';
        if (req.file) {
            // Store the path relative to the server
            imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
            console.log('Image uploaded:', req.file.filename);
        } else if (req.body.image && req.body.image.trim()) {
            // If image URL is provided as text (for existing URLs)
            imageUrl = req.body.image.trim();
        } else {
            // Default image
            imageUrl = 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png';
        }

        const rating = {
            rate: parseFloat(rate) || 0,
            count: parseInt(count) || 0
        };

        console.log('Creating product with data:', {
            title,
            price: parseFloat(price),
            category,
            imageUrl,
            rating
        });

        const result = await pool.query(
            `INSERT INTO products (title, price, description, category, image, rating)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
            [title.trim(), parseFloat(price), description ? description.trim() : null, category.trim(), imageUrl, JSON.stringify(rating)]
        );

        // Ensure rating is properly formatted in response
        const newProduct = result.rows[0];
        newProduct.rating = typeof newProduct.rating === 'string' ? JSON.parse(newProduct.rating) : newProduct.rating;

        console.log('Product created successfully:', newProduct.id);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        console.error('Error details:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        res.status(500).json({ 
            error: 'Failed to create product',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// PUT update product
app.put('/products/:id', upload.single('image'), handleMulterError, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, category, rate, count, image } = req.body;

        // Check if product exists
        const existingProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (existingProduct.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        let imageUrl = existingProduct.rows[0].image;

        // Handle image upload
        if (req.file) {
            // Delete old image if it's a local file
            if (existingProduct.rows[0].image && existingProduct.rows[0].image.includes('/uploads/')) {
                const oldImagePath = path.join(uploadsDir, path.basename(existingProduct.rows[0].image));
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
            imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
        } else if (image) {
            imageUrl = image;
        }

        // Parse existing rating if it's a string (shouldn't happen with JSONB, but just in case)
        let existingRating = existingProduct.rows[0].rating;
        if (typeof existingRating === 'string') {
            existingRating = JSON.parse(existingRating);
        }

        const rating = {
            rate: parseFloat(rate) || existingRating.rate || 0,
            count: parseInt(count) || existingRating.count || 0
        };

        const result = await pool.query(
            `UPDATE products 
       SET title = $1, price = $2, description = $3, category = $4, image = $5, rating = $6, updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
            [title, parseFloat(price), description, category, imageUrl, JSON.stringify(rating), id]
        );

        // Ensure rating is properly formatted in response
        const updatedProduct = result.rows[0];
        updatedProduct.rating = typeof updatedProduct.rating === 'string' ? JSON.parse(updatedProduct.rating) : updatedProduct.rating;

        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE product
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Get product to delete image file
        const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        if (product.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete image file if it's a local file
        if (product.rows[0].image && product.rows[0].image.includes('/uploads/')) {
            const imagePath = path.join(uploadsDir, path.basename(product.rows[0].image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await pool.query('DELETE FROM products WHERE id = $1', [id]);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});

