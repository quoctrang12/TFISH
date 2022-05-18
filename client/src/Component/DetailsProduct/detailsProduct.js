import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
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

import { useStore, actions } from "../../Store";
import Product from "../Home/BlockProduct";
import Comment from "./comment";

function DetailsProduct() {
  let navigate = useNavigate();
  let { productID } = useParams();

  const [state, dispatch] = useStore();
  const [productDetails, setProductDetails] = useState({});
  const [count, setCount] = useState(1);
  useEffect(() => {
    state.allProduct.forEach((product) => {
      if (product.id === parseInt(productID)) setProductDetails(product);
    });
  }, [productID, state.allProduct]);

  var settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const handleAddProduct = () => {
    if (state.statusLogin) {
      axios
        .post("http://localhost:4000/api/addCart", {
          id_product: productDetails.id,
          id_user: state.userLogin.id,
          count: count,
        })
        .then((res) => {
          toast.success("Thêm vào giỏ hàng thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          axios
            .post("http://localhost:4000/api/getCart", {
              id_user: state.userLogin.id,
            })
            .then((res) => {
              dispatch(actions.setCarts(res.data.product));
            });
          dispatch(actions.update());
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <Container fluid className="p-0">
      <Container>
        <Breadcrumb className="pt-3 ps-3">
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Product</Breadcrumb.Item>
          <Breadcrumb.Item active>
            {productDetails.name_product}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Container>
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
              <h2 className="text-uppercase">{productDetails.name_product}</h2>
              <Row className="pt-2 pb-3">
                <Col lg={6}>
                  <FontAwesomeIcon icon={faStar} color="#29689b" />
                  <FontAwesomeIcon icon={faStar} color="#29689b" />
                  <FontAwesomeIcon icon={faStar} color="#29689b" />
                  <FontAwesomeIcon icon={faStar} color="#29689b" />
                  <FontAwesomeIcon icon={faStar} color="#29689b" />
                </Col>
                <Col lg={6} className="text-end">
                  Trạng thái: <Badge className="rounded-0 ">Còn hàng</Badge>
                </Col>
              </Row>
              <h4 className="pb-3">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(productDetails.price)}</h4>

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
                    className="btn-add"
                    onClick={() => setCount(count - 1)}
                  >
                    <FontAwesomeIcon
                        icon={faMinus}
                        style={{ cursor: "pointer" }}
                      />
                  </Button>
                  <FormControl
                    type="text"
                    value={count}
                    style={{ width: "50px" }}
                    className="text-center rounded-0 border-0"
                  />
                  <Button
                    className="btn-add"
                    onClick={() => setCount(count + 1)}
                  >
                    <FontAwesomeIcon
                        icon={faPlus}
                        style={{ cursor: "pointer" }}
                      />
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
                  onClick={handleAddProduct}
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
          <h2 className="pb-3 text-uppercase">Sản phẩm tương tự</h2>
            <Slider {...settings}>
              {state.allProduct.map(
                (product) =>
                  product.id_type === productDetails.id_type &&
                  product.id !== productDetails.id && (
                    <Col style={{ width: "90%" }}>
                      <Product
                        id_product={product.id}
                        name={product.name_product}
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
      <Comment />
    </Container>
  );
}
export default DetailsProduct;
