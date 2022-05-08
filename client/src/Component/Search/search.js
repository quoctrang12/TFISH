import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Home/BlockProduct";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { useStore, actions } from "../../Store";

function Search() {
  const [state, dispatch] = useStore();
  let { searchTitle } = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .post("/api/search", {
        content: state.search,
      })
      .then((res) => {
          setProduct(res.data.product);
      });
  }, [state.search]);
  return (
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Search</Breadcrumb.Item>
          {state.search && (
            <Breadcrumb.Item active>{state.search}</Breadcrumb.Item>
          )}
        </Breadcrumb>
        {state.search && (<h3>Kết quả tìm kiếm cho: {state.search}</h3>)}
        <Row>
        {product.map((product) => (
                <Col lg="3" className="pb-4">
                  <Product
                    masp={product.masp}
                    name={product.tensp}
                    img={product.linkimg}
                    title={product.des}
                    price={product.price}
                    size={product.size}
                  />
                </Col>
              ))}
        </Row>
      </Container> 
  )
}

export default Search;
