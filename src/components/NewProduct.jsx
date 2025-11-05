import React, { useState } from "react";
import { Paper, Typography, Grid, TextField, Button } from "@mui/material";

const NewProduct = () => {
  let [newProduct, setNewProduct] = useState({
    title: "",
    price: 500,
    description: "This the new product that is added",
    category: "",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
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

  let handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      alert("Data added successfully");
      setNewProduct({
        // This will change the create field back to empty form. So we update this setNewProduct.
        title: "",
        price: 500,
        description: "This the new product that is added",
        category: "",
        image:
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    });
  };

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
          Create/Add new Product
        </Typography>
        <Grid
          component="form"
          style={{ display: "grid", gap: "20px" }}
          onSubmit={handleSubmit}
        >
          <TextField
            value={newProduct.title}
            name="title"
            label="Title"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={newProduct.category}
            name="category"
            label="Category"
            variant="outlined"
            fullWidth
            onChange={handleChange}
            style={{ paddingBottom: "20px" }}
          />
          <Grid container spacing={2}>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.rate}
                name="rating.rate"
                type="number"
                label="Rate"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={newProduct.rating.count}
                name="rating.count"
                type="number"
                label="Count"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="outlined" fullWidth>
            Create/Add
          </Button>
        </Grid>
      </Paper>
    </center>
  );
};

export default NewProduct;
