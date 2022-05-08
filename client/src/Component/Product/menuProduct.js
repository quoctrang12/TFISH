import axios from "axios";
import React, { useEffect } from "react";
import { Container, ListGroup } from "react-bootstrap";
import { useStore, actions } from "../../Store";

function MenuProduct() {
  const [state, dispatch] = useStore();
  useEffect(() => {
    axios
      .get("/api/typeproduct")
      .then((result) => {
        dispatch(actions.setALLTypeProduct(result.data.TypeProduct));
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
          <ListGroup.Item
            onClick={() => {
              dispatch(actions.setTypeProduct(''))
            }}
          >
            TẤT CẢ SẢN PHẨM
          </ListGroup.Item>
          {state.allTypeProduct.map((type) => (
            <ListGroup.Item
              className="text-uppercase"
              key={type.malsp}
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(actions.setTypeProduct(type.malsp))
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
