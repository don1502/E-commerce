import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const Product = () => {
    let [product, setProduct] = useState([]);

    useEffect( ()=> {
        fetch("http://localhost:3000/products", {method : "GET"})
        .then((response ) => {return response.json()})
        .then((data) => { setProduct(data);}) 
},[])
    
    return (
        <>
            <h1>Product</h1>
            <section className="productSection">
                {
                    product.map(product => (
                        <Card style={{ width: '18rem',height:"25rem", border:"1px solid black", borderRadius:"5px"}} className="productCard">
                            <center>
                            <Card.Img variant="top" src={product.image} className="productImage" />
                            </center>
                            <Card.Body>
                                <Card.Title>{product.title}</Card.Title>
                                <Card.Text style={{overflow:"scroll", height:"100px"}}>{product.description}</Card.Text>
                            </Card.Body>
                            <Card.Footer style={{display:"flex", justifyContent:"center", alignItems:"center", gap:"5px"}}>
                                <Card.Text >{product.price}</Card.Text>
                                    <Button variant="primary">Add to Cart</Button>
                            </Card.Footer>
                        </Card>
                    ))
                }
            </section>

        </>
    )
}

export default Product;