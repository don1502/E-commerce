# Troubleshooting Guide

## Product Creation Issues

### Issue: Cannot create new products

#### Check 1: Backend Server is Running
1. Verify the backend server is running on port 5000:
   ```bash
   cd server
   npm start
   ```
2. Check if server is accessible:
   - Open browser: `http://localhost:5000/health`
   - Should return: `{"status":"OK","message":"Server is running"}`

#### Check 2: Database Connection
1. Verify PostgreSQL is running
2. Check database connection in server logs:
   - Should see: "Connected to PostgreSQL database"
3. Verify database and table exist:
   ```sql
   \c "e-commerce"
   SELECT * FROM products LIMIT 1;
   ```

#### Check 3: Required Fields
Make sure you fill in:
- **Title** (required)
- **Price** (required, must be a number)
- **Category** (required)

#### Check 4: Browser Console
1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Check Network tab to see API requests
4. Look for:
   - CORS errors
   - Connection refused errors
   - 400/500 status codes

#### Check 5: Server Logs
Check the server console for:
- Database connection errors
- Validation errors
- File upload errors
- Detailed error messages

### Common Errors and Solutions

#### Error: "Title is required"
- **Solution**: Fill in the Title field

#### Error: "Valid price is required"
- **Solution**: Enter a valid number in the Price field (e.g., 99.99)

#### Error: "Category is required"
- **Solution**: Fill in the Category field

#### Error: "File too large"
- **Solution**: Use an image file smaller than 5MB

#### Error: "Only image files are allowed"
- **Solution**: Use JPEG, PNG, GIF, or WebP format

#### Error: "Failed to create product"
- **Check**: 
  1. Database connection
  2. Table structure
  3. Server logs for detailed error

## Image Display Issues

### Issue: Images not showing

#### Check 1: Image URLs
1. Check the image URL in the database:
   ```sql
   SELECT id, title, image FROM products;
   ```
2. Verify image URLs are correct:
   - Local uploads: `http://localhost:5000/uploads/filename.jpg`
   - External URLs: Should be valid URLs

#### Check 2: Static File Serving
1. Verify uploads directory exists:
   ```bash
   cd server
   dir uploads
   ```
2. Check if images are accessible:
   - Open: `http://localhost:5000/uploads/filename.jpg`
   - Should display the image

#### Check 3: Image Fallback
- The app should automatically use a default image if:
  - Image URL is empty
  - Image fails to load
  - Image file doesn't exist

#### Check 4: CORS Issues
- Images from `localhost:5000` should work
- If using external URLs, check CORS settings
- Check browser console for CORS errors

### Fixing Missing Images

#### For Existing Products
1. Check image URL in database:
   ```sql
   SELECT id, title, image FROM products WHERE image IS NULL OR image = '';
   ```

2. Update with default image:
   ```sql
   UPDATE products 
   SET image = 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png'
   WHERE image IS NULL OR image = '';
   ```

#### For New Products
- Images should be uploaded automatically
- Check `server/uploads/` directory
- Verify file permissions

## Database Issues

### Issue: Database Connection Failed

#### Solution 1: Check PostgreSQL Service
```bash
# Windows
services.msc
# Find PostgreSQL service and start it

# Linux/Mac
sudo systemctl status postgresql
sudo systemctl start postgresql
```

#### Solution 2: Verify Credentials
Check `server/index.js`:
```javascript
const pool = new pg.Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Don@1502',  // Your password
    port: 5432,
    database: 'e-commerce'  // Your database name
});
```

#### Solution 3: Test Connection
```bash
psql -U postgres -d "e-commerce"
```

### Issue: Table Doesn't Exist

#### Solution: Create Table
```bash
psql -U postgres -d "e-commerce" -f server/database.sql
```

Or manually:
```sql
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image TEXT,
    rating JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Network Issues

### Issue: CORS Errors

#### Solution: Check CORS Configuration
The backend has CORS enabled. If you see CORS errors:
1. Verify backend is running
2. Check browser console for specific CORS error
3. Ensure frontend is calling the correct API URL

### Issue: Connection Refused

#### Solution:
1. Verify backend server is running
2. Check if port 5000 is available
3. Check firewall settings
4. Verify API URL in frontend: `http://localhost:5000`

## Testing Steps

### Step 1: Test Backend
```bash
# Start server
cd server
npm start

# Test health endpoint
curl http://localhost:5000/health

# Test products endpoint
curl http://localhost:5000/products
```

### Step 2: Test Frontend
1. Start frontend:
   ```bash
   npm run dev
   ```
2. Open browser: `http://localhost:5173`
3. Navigate to "Add New Product"
4. Fill in required fields
5. Try uploading an image
6. Check browser console for errors

### Step 3: Test Database
```sql
-- Check if products exist
SELECT COUNT(*) FROM products;

-- Check product data
SELECT id, title, price, category, image FROM products;

-- Check image URLs
SELECT id, title, image FROM products WHERE image LIKE '%uploads%';
```

## Still Having Issues?

1. **Check Server Logs**: Look at the server console for detailed error messages
2. **Check Browser Console**: Look at the browser console for client-side errors
3. **Check Network Tab**: Look at the Network tab to see API request/response
4. **Verify Database**: Check if data is being saved to the database
5. **Test API Directly**: Use Postman or curl to test API endpoints

## Common Fixes

### Fix 1: Restart Everything
```bash
# Stop server (Ctrl+C)
# Restart server
cd server
npm start

# Restart frontend
npm run dev
```

### Fix 2: Clear Browser Cache
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Try incognito/private mode

### Fix 3: Check File Permissions
```bash
# Windows
# Check if uploads directory is writable

# Linux/Mac
chmod -R 755 server/uploads
```

### Fix 4: Verify Environment
- Node.js version: `node --version` (should be v14+)
- PostgreSQL version: `psql --version` (should be v12+)
- npm version: `npm --version`

