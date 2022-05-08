import React, { useLayoutEffect } from "react";
import { Container, Row, Col, Pagination, Breadcrumb } from "react-bootstrap";
import Product from "../Home/BlockProduct";
import MenuProduct from "./menuProduct";
import { useStore, actions } from "../../Store";

function ProductPage() {
  const [state, dispatch] = useStore();
  let items = [];
  for (let number = 1; number <= state.allProduct.length / 9 + 1; number++) {
    items.push(
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
    if (state.typeProduct) {
      state.allProduct.forEach((product) => {
        if (product.malsp === state.typeProduct) {
          dispatch(actions.setOnePageProduct(product));
          items = items.slice(1, items.length - 1);
        }
      });
    } else {
      for (
        let i = (state.numberPageProduct - 1) * 9;
        i < state.numberPageProduct * 9;
        i++
      ) {
        if (state.allProduct[i]) dispatch(actions.setOnePageProduct(state.allProduct[i]));
      }
    }
  }, [state.typeProduct, state.numberPageProduct]);

  return (
    <>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Product</Breadcrumb.Item>
          {state.typeProduct && (
            <Breadcrumb.Item active>{state.typeProduct}</Breadcrumb.Item>
          )}
        </Breadcrumb>
        <Row className="pt-5">
          <Col lg={3}>
            <MenuProduct />
          </Col>
          <Col lg={9}>
            <Row>
              {state.onePageProduct.map((product) => (
                <Col lg="4" className="pb-4">
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
            {!state.typeProduct && (
              <Pagination className="justify-content-center">
                {items}
              </Pagination>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProductPage;
