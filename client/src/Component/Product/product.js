import React, { useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Pagination,
  Breadcrumb,
  Form,
} from "react-bootstrap";

import Product from "../Home/BlockProduct";
import MenuProduct from "./menuProduct";
import { useStore, actions } from "../../Store";

function ProductPage() {
  const [state, dispatch] = useStore();
  const [numberOnPage, setNumberOnPage] = useState(9);
  let items = useRef([]);
  items.current = [];
  for (
    let number = 1;
    number <= state.allProduct.length / numberOnPage + 1;
    number++
  ) {
    items.current.push(
      <Pagination.Item
        key={number}
        active={number === state.numberPageProduct}
        onClick={() => {
          dispatch(actions.setNumberPageProduct(number));
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  useLayoutEffect(() => {
    dispatch(actions.setOnePageProduct());
    if (state.typeProduct.id) {
      state.allProduct.forEach((product) => {
        if (product.id_type === state.typeProduct.id) {
          dispatch(actions.setOnePageProduct(product));
          items.current = items.current.slice(1, items.current.length - 1);
        }
      });
    } else {
      for (
        let i = (state.numberPageProduct - 1) * numberOnPage;
        i < state.numberPageProduct * numberOnPage;
        i++
      ) {
        if (state.allProduct[i])
          dispatch(actions.setOnePageProduct(state.allProduct[i]));
      }
    }
  }, [
    state.typeProduct.id,
    state.numberPageProduct,
    state.allProduct,
    dispatch,
    numberOnPage,
  ]);

  return (
    <>
      <Container>
        <Breadcrumb className="pt-3">
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Product</Breadcrumb.Item>
          {state.typeProduct.name_type && (
            <Breadcrumb.Item active>
              {state.typeProduct.name_type}
            </Breadcrumb.Item>
          )}
        </Breadcrumb>
      </Container>
      <Container fluid style={{ backgroundColor: "#f9f9f9" }}>
        <Container>
          <Row className="pt-5">
            <Col lg={3}>
              <MenuProduct />
            </Col>
            <Col lg={9}>
              <Row className="mb-3">
                <Form.Label column lg={2}>
                  Sắp xếp theo:
                </Form.Label>
                <Col lg={2}>
                  <Form.Select
                    className="rounded-0"
                    onChange={(e) => {
                      axios
                        .post("http://localhost:4000/api/sortProduct", {
                          sortBy: e.target.value,
                          sort: "ASC",
                        })
                        .then((result) => {
                          dispatch(actions.setAllProducts(result.data));
                        });
                    }}
                  >
                    <option value="id">Mặc định</option>
                    <option value="name_product">Tên</option>
                    <option value="price">Giá</option>
                    <option value="size">Kích thước</option>
                  </Form.Select>
                </Col>
                <Col className="ms-auto" lg={3}>
                  <Row>
                    <Form.Label column lg={5}>
                      Hiển thị:
                    </Form.Label>
                    <Col lg={7}>
                      <Form.Select
                        className="rounded-0"
                        onChange={(e) => {
                          setNumberOnPage(parseInt(e.target.value));
                        }}
                      >
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="15">15</option>
                      </Form.Select>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                {state.onePageProduct.map((product) => (
                  <Col lg="4" className="pb-4">
                    <Product
                      key={product.id}
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
              {!state.typeProduct.id && (
                <Pagination className="justify-content-center">
                  {items.current}
                </Pagination>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default ProductPage;
