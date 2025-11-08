import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000";

const UpdateProduct = () => {
  let [updateProduct, setUpdateProduct] = useState(null);

  let { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => {
        // Parse rating if it's a string (from JSONB)
        const productData = res.data;
        if (typeof productData.rating === 'string') {
          productData.rating = JSON.parse(productData.rating);
        }
        setUpdateProduct(productData);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        alert("Failed to load product");
      });
  }, [id]); // We give [id] because this make the useEffect to render when id changes

  let handleChange = (e) => {
    let { value, name } = e.target;
    let fieldName = name.split("rating.")[1];
    if (name.includes("rating.")) {
      setUpdateProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setUpdateProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  let handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", updateProduct.title);
      formData.append("price", updateProduct.price);
      formData.append("description", updateProduct.description || "");
      formData.append("category", updateProduct.category);
      formData.append("rate", updateProduct.rating.rate);
      formData.append("count", updateProduct.rating.count);
      formData.append("image", updateProduct.image || "");

      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Updated successfully");
        navigate("/product");
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Failed to update product"}`);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  if (updateProduct !== null) {
    return (
      <center>
        <Paper
          elevation={20}
          style={{ width: "400px", padding: "20px", margin: "20px, auto" }}
        >
          <Typography
            style={{ color: "blueviolet", paddingBottom: "20px" }}
            textAlign="center"
          >
            Update Product
          </Typography>
          <Grid
            component="form"
            style={{ display: "grid", gap: "20px" }}
            onSubmit={handleUpdate}
          >
            <TextField
              value={updateProduct.title || ""}
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
            />
            <TextField
              value={updateProduct.price || ""}
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
              value={updateProduct.description || ""}
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              onChange={handleChange}
            />
            <TextField
              value={updateProduct.category || ""}
              name="category"
              label="Category"
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
            />
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  value={updateProduct.rating?.rate || 0}
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
                  value={updateProduct.rating?.count || 0}
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
            <Button type="submit" variant="contained" fullWidth>
              Update
            </Button>
          </Grid>
        </Paper>
      </center>
    );
  } else {
    return <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>;
  }
};

export default UpdateProduct;
