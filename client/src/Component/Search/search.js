import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";

import { useStore } from "../../Store";
import Product from "../Home/BlockProduct";

function Search() {
  const [state] = useStore();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/api/search", {
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
      {state.search && <h3>Kết quả tìm kiếm cho: {state.search}</h3>}
      <Row>
        {product.map((product) => (
          <Col lg="3" className="pb-4">
            <Product
              id_product={product.id}
              name={product.name_product}
              img={product.linkimg}
              title={product.des}
              price={product.price}
              size={product.size}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Search;
