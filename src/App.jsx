import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Product from './components/product';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element ={<Home/>}/>
          <Route path='/product' element = { <Product/>}/>
        </Routes>
        <ol>
          <li>
            <Link to = "product" style={{ textDecoration : "none" }}>Products</Link>
          </li>
        </ol>
      </BrowserRouter>
    </>
  )
}

export default App;