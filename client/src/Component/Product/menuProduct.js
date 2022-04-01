import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, ListGroup } from "react-bootstrap";

function MenuProduct(prop) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/typeproduct")
      .then((result) => {
        setTypes(result.data.TypeProduct);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Container
        className="position-sticky"
        style={{ top: "120px", zIndex: "100" }}
      >
        <ListGroup variant="flush">
          <h5 className="text-center">DANH MỤC</h5>
          <ListGroup.Item onClick={() => {
                prop.TypeShow("");
              }} >TẤT CẢ SẢN PHẨM</ListGroup.Item>
          {types.map((type) => (
            <ListGroup.Item
              className="text-uppercase"
              key={type.malsp}
              style={{cursor:"pointer"}}
              onClick={() => {
                prop.TypeShow(type.malsp);
              }}
            >
              {type.tenlsp}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </>
  );
}
export default MenuProduct;
