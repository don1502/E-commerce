import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useFetch from "./hooks/useFetch";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../store/cartSlice";

const Product = () => {
  const { product, error, isLoading, setProduct } = useFetch(
    " http://localhost:3000/products"
  ); // Instead of below hook we have used a custom hook which can be called by other component and used in those component...

  //   let [product, setProduct] = useState([]);
  //   let [error, setError] = useState("");
  //   let [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     fetch("http://localhost:3000/products", { method: "GET" })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           return new Error("Search proper data");
  //         }
  //       })
  //       .then((data) => {
  //         setProduct(data);
  //       })
  //       .catch((error) => {
  //         setError(error.message);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }, []);   ========= For this we have used useFetch() a custom hook

  let navi = useNavigate();

  let handleDelete = (id) => {
    axios.delete(`http://localhost:3000/products/${id}`).then(() => {
      alert("Deleted Successfully");
      let updatedProducts = product.filter((product) => product.id !== id);
      setProduct(updatedProducts);
    });
  };

  let dispatch = useDispatch();

  let addItemToCart = (product) => {
    dispatch(addItem(product));
    alert("Item added to Cart successfully😊");
  };

  if (isLoading) {
    return (
      <>
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            color: "blueviolet",
          }}
        >
          loading...
        </h1>
      </>
    );
  }

  return (
    <>
      <h1>Product</h1>
      {product.length !== 0 && (
        <section className="productSection">
          {product.map((product) => (
            <Card
              key={product.id}
              style={{
                width: "18rem",
                height: "20rem",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "20px",
              }}
              className="productCard"
            >
              <center>
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="productImage"
                />
              </center>
              <Card.Body>
                <Card.Title style={{ paddingLeft: "20px" }}>
                  {product.title}
                </Card.Title>
                <Card.Text style={{ paddingLeft: "150px" }}>
                  ₹ : {product.price}
                </Card.Text>
              </Card.Body>
              <Card.Footer
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Button onClick={() => addItemToCart(product)}>
                  Add to Cart
                </Button>
                <Button
                  onClick={() => {
                    navi(`/updateproduct/${product.id}`);
                  }}
                >
                  {" "}
                  Edit{" "}
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  {" "}
                  Delete
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </section>
      )}
      {error && (
        <p
          style={{
            fontSize: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
            color: "blueviolet",
            backgroundColor: "ghostwhite",
          }}
        >
          {error} data 🥲
        </p>
      )}
    </>
  );
};

export default Product;
