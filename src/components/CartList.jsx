import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { removeItem } from "../store/cartSlice";

const CartList = () => {
  let cartProducts = useSelector((state) => {
    return state.cart;
  });

  let dispatch = useDispatch();

  let handleRemove = (reduxItemId) => {
    dispatch(removeItem(reduxItemId));
    alert("Item removed from Cart");
  };

  return (
    <>
      <center>
        <h1>Cart - Added Products</h1>
      </center>
      {cartProducts.length !== 0 ? (
        <section className="productSection">
          {cartProducts.map((product) => (
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
                <Button
                  onClick={() => {
                    handleRemove(product.id);
                  }}
                >
                  {" "}
                  Remove from Cart
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </section>
      ) : (
        <h1>Please Add Some Item to the Cart</h1>
      )}
    </>
  );
};

export default CartList;
