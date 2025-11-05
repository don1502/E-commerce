import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Product from "./components/product";
import NewProduct from "./components/NewProduct";
import NotFound from "./components/NotFound";
import UpdateProduct from "./components/UpdateProduct";
import { FaHome, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import { CgExtensionAdd } from "react-icons/cg";
import CartList from "./components/CartList";
import SignUp from "./components/SignUp";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ol className="naviLink">
          <Link
            to="cartlist"
            style={{
              textDecoration: "none",
              margin: "10px",
              padding: "10px",
              color: "brown",
              border: "1px solid brown",
              borderRadius: "10px",
            }}
          >
            <FaShoppingCart />
          </Link>
          <Link
            to="newproduct"
            style={{
              textDecoration: "none",
              margin: "10px",
              padding: "10px",
              color: "brown",
              border: "1px solid brown",
              borderRadius: "10px",
            }}
          >
            <CgExtensionAdd />
          </Link>
          <Link
            to="product"
            style={{
              textDecoration: "none",
              margin: "10px",
              padding: "10px",
              color: "brown",
              border: "1px solid brown",
              borderRadius: "10px",
            }}
          >
            <FaProductHunt />
          </Link>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              margin: "10px",
              padding: "10px",
              color: "brown",
              border: "1px solid brown",
              borderRadius: "10px",
            }}
          >
            <FaHome />
          </Link>
        </ol>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/cartlist" element={<CartList />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
