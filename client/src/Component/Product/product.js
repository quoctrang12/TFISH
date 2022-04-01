import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Container, Row, Col, Pagination,Breadcrumb } from "react-bootstrap";
import Product from "../Home/BlockProduct";
import MenuProduct from "./menuProduct"

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [active, setActive] = useState(1);
  const [type, setType] = useState('');
  let items = [];
  for (let number = 1; number <= products.length / 9 + 1; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => {
          setActive(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }
  useEffect(() => {
    axios
      .get("/api/product")
      .then((result) => {
        setProducts(result.data.product);
        for (let i = (active - 1) * 9; i < active * 9; i++) {
            setProduct((prev) => [...prev, result.data.product[i]]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useLayoutEffect(()=> {
    setProduct([]);
    for (let i = (active - 1) * 9; i < active * 9; i++) {
      if (products[i])
        setProduct((prev) => [...prev, products[i]]);
    }
  },[active])

  useLayoutEffect(()=> {
    setProduct([]);
    products.forEach(product => {
        if(product.malsp === type){
            setProduct((prev) => [...prev, product]);
            items=items.slice(1,items.length-1)
        }
    })
  },[type])


  const callBack = (childData) => {
    setType(childData)
  }
//   console.log(type);
  return (
    <>
      <Container>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Product</Breadcrumb.Item>
        {type && (<Breadcrumb.Item active>{type}</Breadcrumb.Item>)}
      </Breadcrumb>
        <Row className="pt-5">
          <Col  lg={3}><MenuProduct TypeShow = {callBack}  /></Col>
          <Col lg={9}>
            <Row >
              {product.map((product) => (
                <Col lg="4" className="pb-4">
                  <Product
                    name={product.tensp}
                    img={product.linkimg}
                    title={product.des}
                    price={product.price}
                    size={product.size}
                  />
                </Col>
              ))}
            </Row>
        { !type && <Pagination className="justify-content-center">{items}</Pagination>}

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductPage;
