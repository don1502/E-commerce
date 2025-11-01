import React, { useEffect, useState } from "react";
import { Paper, Typography, Grid, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  let [updateProduct, setUpdateProduct] = useState(null);

  let { id } = useParams();

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => setUpdateProduct(res.data));
  }, []); // We give [] because this make the useEffect to render single time

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

  let handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then(() => {
      alert("Updated successfully");
      //   setNewProduct({
      //     title: "",
      //     price: 500,
      //     description: "This the new product that is added",
      //     category: "",
      //     image:
      //       "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png",
      //     rating: {
      //       rate: 0,
      //       count: 0,
      //     },
      //   });
      // --------dont want to change the area into normal blank space--------
      navigate("/product");
    });
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
              value={updateProduct.title}
              name="title"
              label="Title"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              value={updateProduct.category}
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
                  value={updateProduct.rating.rate}
                  name="rating.rate"
                  type="number"
                  label="Rate"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  value={updateProduct.rating.count}
                  name="rating.count"
                  type="number"
                  label="Count"
                  variant="outlined"
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
    <div> Loading...</div>;
  }
};

export default UpdateProduct;
