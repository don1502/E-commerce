import React, { useState } from "react";
import { Paper, Typography, Grid, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const NewProduct = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  let [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  let handleChange = (e) => {
    let { value, name } = e.target;
    let fieldName = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setNewProduct({
        ...newProduct,
        rating: {
          ...newProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", newProduct.title);
      formData.append("price", newProduct.price);
      formData.append("description", newProduct.description);
      formData.append("category", newProduct.category);
      formData.append("rate", newProduct.rating.rate);
      formData.append("count", newProduct.rating.count);
      
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Product added successfully!");
        
        // Reset form
        setNewProduct({
          title: "",
          price: "",
          description: "",
          category: "",
          rating: {
            rate: 0,
            count: 0,
          },
        });
        setSelectedImage(null);
        setImagePreview(null);
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) {
          fileInput.value = "";
        }

        // Refresh product list by navigating to products page
        navigate("/product");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Failed to add product"}`);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <center>
      <Paper
        elevation={20}
        style={{ width: "500px", padding: "30px", margin: "20px auto", maxWidth: "90%" }}
      >
        <Typography
          style={{ color: "blueviolet", paddingBottom: "20px", fontSize: "24px", fontWeight: "bold" }}
          textAlign="center"
        >
          Create/Add new Product
        </Typography>
        <Grid
          component="form"
          style={{ display: "grid", gap: "20px" }}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <TextField
            value={newProduct.title}
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
          />
          <TextField
            value={newProduct.price}
            name="price"
            label="Price"
            type="number"
            variant="outlined"
            fullWidth
            required
            inputProps={{ step: "0.01", min: "0" }}
            onChange={handleChange}
          />
          <TextField
            value={newProduct.description}
            name="description"
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            onChange={handleChange}
          />
          <TextField
            value={newProduct.category}
            name="category"
            label="Category"
            variant="outlined"
            fullWidth
            required
            onChange={handleChange}
          />
          
          {/* Image Upload */}
          <Box>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="image-upload">
              <Button variant="outlined" component="span" fullWidth>
                {selectedImage ? "Change Image" : "Upload Product Image"}
              </Button>
            </label>
            {imagePreview && (
              <Box mt={2} textAlign="center">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    marginTop: "10px",
                  }}
                />
              </Box>
            )}
          </Box>

          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.rate}
                name="rating.rate"
                type="number"
                label="Rating Rate"
                variant="outlined"
                fullWidth
                inputProps={{ step: "0.1", min: "0", max: "5" }}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.count}
                name="rating.count"
                type="number"
                label="Rating Count"
                variant="outlined"
                fullWidth
                inputProps={{ min: "0" }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={isSubmitting}
            style={{ padding: "12px", backgroundColor: "blueviolet" }}
          >
            {isSubmitting ? "Adding..." : "Create/Add Product"}
          </Button>
        </Grid>
      </Paper>
    </center>
  );
};

export default NewProduct;
