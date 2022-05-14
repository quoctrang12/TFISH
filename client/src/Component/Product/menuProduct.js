import React, { useEffect } from "react";
import axios from "axios";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, ListGroup } from "react-bootstrap";

import { useStore, actions } from "../../Store";

function MenuProduct() {
  const [state, dispatch] = useStore();
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/typeproduct")
      .then((result) => {
        dispatch(actions.setALLTypeProduct(result.data.TypeProduct));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <>
      <Container
        className="position-sticky"
        style={{ top: "120px", zIndex: "100" }}
      >
        {state.typeProduct.name_type && (
          <div>
            <h5>LỰA CHỌN HIỆN TẠI</h5>
            <p
              className="current-select p-2 px-3"
              onClick={() => {
                dispatch(actions.update());
                dispatch(actions.setTypeProduct({}));
              }}
            >
              {state.typeProduct.name_type} <FontAwesomeIcon icon={faClose} />
            </p>
            <p className="current-select p-2 px-3">
              kết quả: {state.onePageProduct.length} sp
            </p>
          </div>
        )}
        <ListGroup variant="flush">
          <h5 className="">DANH MỤC</h5>
          <p
            className="text-uppercase select-type"
            onClick={() => {
              dispatch(actions.setTypeProduct({}));
              dispatch(actions.update());
            }}
          >
            TẤT CẢ SẢN PHẨM
          </p>
          {state.allTypeProduct.map((type) => (
            <p
              className="text-uppercase select-type"
              key={type.id}
              onClick={() => {
                dispatch(actions.setTypeProduct(type));
              }}
            >
              {type.name_type}
            </p>
          ))}
        </ListGroup>
      </Container>
    </>
  );
}
export default MenuProduct;
