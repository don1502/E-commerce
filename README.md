# E-commerce Full-Stack Application

A full-featured e-commerce application built with React (Vite) frontend and Express.js backend, using PostgreSQL for data persistence. This application supports product management, shopping cart functionality, and image uploads.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Migration from JSON-Server](#migration-from-json-server)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Production Considerations](#production-considerations)

## ✨ Features

### Frontend
- **Product Management**: View, add, update, and delete products
- **Image Upload**: Upload product images with preview functionality
- **Shopping Cart**: Add products to cart with Redux state management
- **Responsive UI**: Built with Material-UI and React Bootstrap
- **Routing**: React Router for navigation
- **Form Validation**: React Hook Form with Yup validation

### Backend
- **RESTful API**: Full CRUD operations for products
- **Image Storage**: Local file storage with Multer
- **PostgreSQL Database**: Relational database with JSONB for flexible data
- **CORS Enabled**: Cross-origin resource sharing for development
- **Error Handling**: Comprehensive error handling and validation

## 🛠 Tech Stack

### Frontend
- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool and dev server
- **React Router DOM 7.8.2** - Client-side routing
- **Redux Toolkit 2.9.2** - State management
- **Material-UI 7.3.4** - UI components
- **React Bootstrap 2.10.10** - Additional UI components
- **Axios 1.12.2** - HTTP client
- **React Hook Form 7.66.0** - Form management
- **Yup 1.7.1** - Schema validation

### Backend
- **Node.js** - Runtime environment
- **Express.js 4.18.2** - Web framework
- **PostgreSQL** - Relational database
- **pg 8.11.3** - PostgreSQL client
- **Multer 1.4.5** - File upload middleware
- **CORS 2.8.5** - Cross-origin resource sharing

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Package manager (comes with Node.js)
- **Git** - Version control (optional)

## 📁 Project Structure

```
E-commerce/
├── server/                      # Backend server
│   ├── index.js                # Express server and API routes
│   ├── database.sql            # Database schema and sample data
│   ├── package.json            # Backend dependencies
│   ├── uploads/                # Image storage (created automatically)
│   ├── check_table_structure.sql    # Utility to check table structure
│   └── update_table_if_needed.sql   # Utility to update table structure
├── src/                         # Frontend source code
│   ├── components/              # React components
│   │   ├── Home.jsx            # Home page
│   │   ├── product.jsx         # Product listing page
│   │   ├── NewProduct.jsx      # Add new product form
│   │   ├── UpdateProduct.jsx   # Update product form
│   │   ├── CartList.jsx        # Shopping cart
│   │   ├── SignUp.jsx          # Sign up page
│   │   ├── NotFound.jsx        # 404 page
│   │   └── hooks/
│   │       └── useFetch.js     # Custom hook for data fetching
│   ├── store/                   # Redux store
│   │   ├── store.js            # Store configuration
│   │   └── cartSlice.js        # Cart slice for Redux
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   ├── App.css                  # App styles
│   └── index.css                # Global styles
├── public/                      # Static files
├── data/                        # Old JSON-Server data (can be removed)
├── package.json                 # Frontend dependencies
├── vite.config.js               # Vite configuration
└── README.md                    # This file
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd E-commerce
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

## 🗄 Database Setup

### Step 1: Create PostgreSQL Database

1. Open PostgreSQL command line or pgAdmin
2. Create the database:

```bash
psql -U postgres
```

Then run:

```sql
CREATE DATABASE "e-commerce";
\q
```

**Note:** The database name uses a hyphen, so it must be quoted in SQL commands.

### Step 2: Create Products Table

#### Option A: If you DON'T have an existing products table

Run the database schema:

```bash
psql -U postgres -d "e-commerce" -f server/database.sql
```

#### Option B: If you already have a products table

1. Check your existing table structure:

```bash
psql -U postgres -d "e-commerce" -f server/check_table_structure.sql
```

2. Update your table if needed (adds missing columns):

```bash
psql -U postgres -d "e-commerce" -f server/update_table_if_needed.sql
```

### Step 3: Configure Database Connection

Update the database configuration in `server/index.js` if your credentials are different:

```javascript
const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: '#####',  // Update with your password
    port: 5432,
    database: 'e-commerce'  // Update if using different database name
});
```

### Database Schema

The `products` table has the following structure:

| Column       | Type              | Description                    |
|-------------|-------------------|--------------------------------|
| id          | SERIAL PRIMARY KEY| Auto-incrementing unique ID    |
| title       | VARCHAR(255)      | Product title (required)       |
| price       | DECIMAL(10, 2)    | Product price (required)       |
| description | TEXT              | Product description            |
| category    | VARCHAR(100)      | Product category               |
| image       | TEXT              | Image URL or file path         |
| rating      | JSONB             | Rating object: {rate, count}   |


## 🏃 Running the Application

### Start Backend Server

```bash
cd server
npm start
```

The backend server will run on `http://localhost:5000`

For development with auto-reload:

```bash
cd server
npm run dev
```

### Start Frontend Development Server

In the root directory:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

### Access the Application

Open your browser and navigate to:
- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

## 📡 API Documentation

All API endpoints are available at `http://localhost:5000`

### GET /products

Get all products.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "category": "electronics",
    "image": "http://localhost:5000/uploads/product-1234567890.jpg",
    "rating": {
      "rate": 4.5,
      "count": 120
    },
  }
]
```

### GET /products/:id

Get a single product by ID.

**Parameters:**
- `id` (path parameter) - Product ID

**Response:**
```json
{
  "id": 1,
  "title": "Product Name",
  "price": 99.99,
  "description": "Product description",
  "category": "electronics",
  "image": "http://localhost:5000/uploads/product-1234567890.jpg",
  "rating": {
    "rate": 4.5,
    "count": 120
  }
}
```

### POST /products

Create a new product.

**Content-Type:** `multipart/form-data`

**Form Data:**
- `title` (string, required) - Product title
- `price` (number, required) - Product price
- `description` (string, optional) - Product description
- `category` (string, required) - Product category
- `rate` (number, optional) - Rating rate (0-5)
- `count` (number, optional) - Rating count
- `image` (file, optional) - Product image file

**Supported Image Formats:** JPEG, JPG, PNG, GIF, WebP
**Maximum File Size:** 5MB

**Response:**
```json
{
  "id": 1,
  "title": "New Product",
  "price": 99.99,
  "description": "Product description",
  "category": "electronics",
  "image": "http://localhost:5000/uploads/product-1234567890.jpg",
  "rating": {
    "rate": 4.5,
    "count": 120
  }
}
```

### PUT /products/:id

Update an existing product.

**Content-Type:** `multipart/form-data`

**Parameters:**
- `id` (path parameter) - Product ID

**Form Data:** (same as POST /products)
- `title`, `price`, `description`, `category`, `rate`, `count`, `image`

**Response:**
```json
{
  "id": 1,
  "title": "Updated Product",
  "price": 129.99,
  ...
}
```

### DELETE /products/:id

Delete a product.

**Parameters:**
- `id` (path parameter) - Product ID

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

## 🔄 Migration from JSON-Server to Postgres

This application was migrated from JSON-Server to PostgreSQL. Here's what changed:

### What Changed

1. **Backend**: Created Express.js server with PostgreSQL connection
2. **API Endpoints**: Changed from `http://localhost:3000` to `http://localhost:5000`
3. **Image Upload**: Added file upload functionality with Multer
4. **Database**: Migrated from JSON file to PostgreSQL database
5. **Frontend**: Updated all API calls to use new backend

### Migration Steps (Already Completed)

1. ✅ Created Express.js backend server
2. ✅ Set up PostgreSQL database connection
3. ✅ Created database schema and products table
4. ✅ Updated frontend API endpoints
5. ✅ Added image upload functionality
6. ✅ Enhanced product management features

### Using Existing Database

If you already have a `products` table in your database:

1. Check your table structure:
   ```bash
   psql -U postgres -d "e-commerce" -f server/check_table_structure.sql
   ```

2. Update table if needed:
   ```bash
   psql -U postgres -d "e-commerce" -f server/update_table_if_needed.sql
   ```

3. The application will automatically use your existing table and data.

## 📖 Usage Guide

### Adding a New Product

1. Navigate to the "Add New Product" page
2. Fill in the product details:
   - Title (required)
   - Price (required)
   - Description (optional)
   - Category (required)
   - Rating Rate (optional, 0-5)
   - Rating Count (optional)
3. Click "Upload Product Image" to select an image file
4. Preview the image before submission
5. Click "Create/Add Product"
6. The product will be added to the database and appear on the products page

### Updating a Product

1. Navigate to the Products page
2. Click "Edit" on the product you want to update
3. Modify the product details
4. Optionally upload a new image
5. Click "Update"
6. Changes will be saved to the database

### Deleting a Product

1. Navigate to the Products page
2. Click "Delete" on the product you want to remove
3. Confirm the deletion
4. The product and its image (if stored locally) will be deleted

### Shopping Cart

1. Browse products on the Products page
2. Click "Add to Cart" on any product
3. View your cart by clicking the cart icon
4. Products are stored in Redux state and localStorage

## 🔧 Troubleshooting

### Database Connection Error

**Problem:** Cannot connect to PostgreSQL database

**Solutions:**
1. Verify PostgreSQL is running:
   ```bash
   # Windows
   services.msc (check PostgreSQL service)
   
   # Linux/Mac
   sudo systemctl status postgresql
   ```

2. Check database credentials in `server/index.js`
3. Verify database exists:
   ```sql
   \l  -- List all databases in psql
   ```

4. Test connection:
   ```bash
   psql -U postgres -d "e-commerce"
   ```

### Products Not Showing

**Problem:** Products not appearing on the frontend

**Solutions:**
1. Verify backend server is running on port 5000
2. Check browser console for API errors
3. Verify database has products:
   ```sql
   SELECT * FROM products;
   ```

4. Check CORS configuration in `server/index.js`

### Image Upload Issues

**Problem:** Images not uploading or displaying

**Solutions:**
1. Check that `server/uploads/` directory exists (created automatically)
2. Verify file size is under 5MB
3. Ensure file format is supported (JPEG, PNG, GIF, WebP)
4. Check server logs for error messages
5. Verify file permissions on uploads directory

### Port Already in Use

**Problem:** Port 5000 or 5173 is already in use

**Solutions:**
1. Change backend port in `server/index.js`:
   ```javascript
   const PORT = 5001; // Change to available port
   ```

2. Update frontend API URL in components:
   ```javascript
   const API_URL = "http://localhost:5001";
   ```

3. Change frontend port in `vite.config.js`:
   ```javascript
   export default defineConfig({
     server: {
       port: 5174
     }
   });
   ```

### Rating Data Issues

**Problem:** Rating data not displaying correctly

**Solutions:**
1. Verify rating column is JSONB type:
   ```sql
   SELECT data_type FROM information_schema.columns 
   WHERE table_name = 'products' AND column_name = 'rating';
   ```

2. Check rating data format:
   ```sql
   SELECT id, rating FROM products LIMIT 1;
   ```

3. Rating should be in format: `{"rate": 4.5, "count": 120}`

## 🚀 Production Considerations

### Environment Variables

Move sensitive configuration to environment variables:

1. Create `.env` file in `server/` directory:
   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_PORT=5432
   DB_NAME=e-commerce
   PORT=5000
   ```

2. Update `server/index.js` to use environment variables:
   ```javascript
   import 'dotenv/config';
   
   const pool = new pg.Pool({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       port: process.env.DB_PORT,
       database: process.env.DB_NAME
   });
   ```

3. Install dotenv:
   ```bash
   cd server
   npm install dotenv
   ```

### Security

1. **Authentication**: Add user authentication and authorization
2. **Input Validation**: Implement server-side validation
3. **SQL Injection**: Use parameterized queries (already implemented)
4. **CORS**: Configure CORS properly for production domains
5. **Rate Limiting**: Add rate limiting to API endpoints
6. **HTTPS**: Use HTTPS in production

### Performance

1. **Database Indexing**: Add indexes for frequently queried columns
2. **Image Optimization**: Compress and optimize images
3. **Caching**: Implement caching for frequently accessed data
4. **CDN**: Use CDN for static assets and images

### Deployment

**Frontend:**
- Build for production: `npm run build`
- Deploy to Vercel, Netlify, or similar

**Backend:**
- Deploy to Heroku, AWS, DigitalOcean, or similar
- Set up environment variables
- Configure database connection
- Set up image storage (cloud storage recommended)

## 👥 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Happy Coding! 🚀**
