import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useFetch from "./hooks/useFetch";

const Product = () => {
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
  //   }, []);

  const { product, error, isLoading } = useFetch(
    " http://localhost:3000/products"
  );

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
                height: "25rem",
                border: "1px solid black",
                borderRadius: "5px",
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
                <Card.Title>{product.title}</Card.Title>
                <Card.Text style={{ overflow: "scroll", height: "100px" }}>
                  {product.description}
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
                <Card.Text>{product.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
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
