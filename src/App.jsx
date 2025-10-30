import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Product from "./components/product";
import NewProduct from "./components/NewProduct";
import NotFound from "./components/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <ol>
          <Link to="/" style={{ textDecoration: "none", padding: "10px" }}>
            Home
          </Link>
          <Link to="product" style={{ textDecoration: "none", padding: "10px" }}>
            Products
          </Link>
          <Link to="newproduct" style={{ textDecoration: "none", padding: "10px" }}>Create new product</Link>
        </ol>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/newproduct" element={<NewProduct />} />
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
