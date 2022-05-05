import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  Col,
  Container,
  Row,
  Breadcrumb,
  Alert,
  Button,
  ButtonGroup,
  FormControl,
  Badge,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useStore, actions } from "../../Store";
import Product from "../Home/BlockProduct";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Comment from "./comment"
function DetailsProduct() {
  let navigate = useNavigate();

  const [state, dispatch] = useStore();
  const [productDetails, setProductDetails] = useState({});
  const [count, setCount] = useState(1);
  let { productID } = useParams();
  useEffect(() => {
    state.allProduct.map((product) => {
      if (product.masp === productID) setProductDetails(product);
    });
  }, [productID]);
 
  var settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const handleAddProduct = () => {
    if (state.statusLogin) {
        axios.post('http://localhost:3001/api/addgiohang',{
        masp : productDetails.masp,
        makh : state.userLogin.maKH,
        soluong : 1
      })
      dispatch(actions.updateCart());
    } else {
      navigate("/login");
    }
  };

  return (
    <Container fluid className="p-0">
      <Breadcrumb className="pt-3 ps-3">
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Product</Breadcrumb.Item>
        <Breadcrumb.Item active>{productDetails.tensp}</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ backgroundColor: "#6bc5d110" }} className="p-5">
        <Container>
          <Row>
            <Col lg={6}>
              <img
                id="imageZoom"
                src={productDetails.linkimg}
                alt=""
                width="90%"
                
              />
            </Col>
            <Col lg={6}>
              <h2 className="text-uppercase">{productDetails.tensp}</h2>
              <Row className="pt-2 pb-3">
                <Col lg={6}>
                  <FontAwesomeIcon icon={faStar} color="#336699" />
                  <FontAwesomeIcon icon={faStar} color="#336699" />
                  <FontAwesomeIcon icon={faStar} color="#336699" />
                  <FontAwesomeIcon icon={faStar} color="#336699" />
                  <FontAwesomeIcon icon={faStar} color="#336699" />
                </Col>
                <Col lg={6} className="text-end">
                  Trạng thái: <Badge className="rounded-0 ">Còn hàng</Badge>
                </Col>
              </Row>
              <h4 className="pb-3">{productDetails.price}</h4>

              <Alert
                style={{ backgroundColor: "#6bc5d120" }}
                className="border-0"
              >
                <img src={productDetails.linkimg} alt="" width="100px" />
                <ButtonGroup
                  className="position-absolute "
                  style={{
                    right: "0px",
                    top: "50%",
                    transform: "translate(-16px,-50%)",
                  }}
                >
                  <Button
                    variant="secondary"
                    onClick={() => setCount(count - 1)}
                  >
                    <i>-</i>
                  </Button>
                  <FormControl
                    type="text"
                    value={count}
                    style={{ width: "50px" }}
                    className="text-center rounded-0 border-0"
                  />
                  <Button
                    variant="secondary"
                    onClick={() => setCount(count + 1)}
                  >
                    <i>+</i>
                  </Button>
                </ButtonGroup>
              </Alert>
              <p>
                Size:{" "}
                <Button variant="outline-secondary">
                  {productDetails.size}
                </Button>
              </p>
              <Row>
                <Button
                  className="rounded-0 border-0"
                  style={{ backgroundColor: "#51b346" }}
                  onClick = {handleAddProduct}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="pt-5 pb-5">
        <Row>
          <Col lg={6}>
            <h2 className="pb-3 text-uppercase">Mô tả</h2>
            <p>{productDetails.des}</p>
          </Col>
        </Row>
      </Container>
      <div style={{ backgroundColor: "#6bc5d110" }} className="p-5 m-0">
        <Container>
          <Row>
            <Slider {...settings}>
              {state.allProduct.map(
                (product) =>
                  product.malsp === productDetails.malsp &&
                  product.masp !== productDetails.masp && (
                    <Col style={{ width: "90%" }}>
                      <Product
                        masp={product.masp}
                        name={product.tensp}
                        img={product.linkimg}
                        title={product.des}
                        price={product.price}
                        size={product.size}
                      />
                    </Col>
                  )
              )}
            </Slider>
          </Row>
        </Container>
      </div>
                    <Comment/>
    </Container>
  );
}
export default DetailsProduct;
