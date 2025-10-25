import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Product from './components/product';

function App() {
  return (
    <>
      <BrowserRouter>
      <ol>
            <Link to = "/" style={{ textDecoration : "none", padding:"10px" }}>Home</Link>
            <Link to = "product" style={{ textDecoration : "none", padding:"10px" }}>Products</Link>
      </ol>
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/product' element = { <Product/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;