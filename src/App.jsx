import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Product from "./components/product";
import NewProduct from "./components/NewProduct";
import NotFound from "./components/NotFound";
import UpdateProduct from "./components/UpdateProduct";

function App() {
  return (
    <>
      <BrowserRouter>
        <ol className="naviLink">
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
            Add
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
            Products
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
            Home
          </Link>
        </ol>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
