import React from "react";
import axios from "axios";
import { Row, Container, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styleHome.css";
import Comment from "./comment";
import Product from "./BlockProduct";
import TypeProduct from "./typeProduct";
import Brand from "./Brand";
import { useStore, actions } from "../../Store";

function Home() {
  // comment attributes
  const [state, dispatch] = useStore();
  const [cmtName, setCmtName] = useState("Nguyễn Quốc Trạng");
  const [cmtImg, setCmtImg] = useState("./images/betta-2.jpg");
  const [cmtTitle, setCmtTitle] = useState(
    "Cá đẹp lắmCá đẹp lắmCá đẹp lắmCá đẹp lắmCá đẹp lắmCá đẹp lắmCá đẹp lắm, nhưng dễ chết lắm đừng có mua"
  );
  //product attributes
  const [prod, setProd] = useState([]);
  const [deco, setDeco] = useState([]);
  useEffect(() => {
    axios
      .get("/api/sanphamhome")
      .then((res) => {
        setProd(res.data.sanpham);
      })
      .catch((error) => console.log(error));

    axios
      .get("/api/trangtrihome")
      .then((res) => {
        setDeco(res.data.trangtri);
      })
      .catch((error) => console.log(error));
  }, []);

  var settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div>
      <div className="home-container">
        <h1 className="home-title text-white text-center">
          WELCOME TO <br /> T.FISH SHOP
        </h1>
      </div>
      <div
        className="home-product pb-5 pt-3"
        style={{ backgroundColor: "#6bc5d110" }}
      >
        <h2 className="text-center mb-4">FISH SHOP AND AQUARIUM</h2>
        <Container>
          <Row>
            <Col>
              <div className="image-box">
                <img src="images/Live_Fish.jpg" alt="" className="images" />
                <div className="layout-box">
                  <div>
                    <h2>LIVE FISH</h2>
                    <Link to="/" className="text-decoration-none text-white">
                      Xem thêm
                    </Link>
                    <p className="line"></p>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="image-box">
                <img src="images/Live_Plants.jpg" alt="" className="images" />
                <div className="layout-box">
                  <div>
                    <h2>LIVE PLANTS</h2>
                    <Link to="/" className="text-decoration-none text-white">
                      Xem thêm
                    </Link>
                    <p className="line"></p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <TypeProduct settings={settings} />
        </Container>
      </div>
      <Container className="pb-5 pt-3">
        <h2 className="text-center mb-4">SALE ON NOW</h2>
        <Row>
          {deco.map((deco) => (
            <Col lg="3" md={6} sm={6}>
              <Product
                masp={deco.masp}
                name={deco.tensp}
                img={deco.linkimg}
                price={deco.price}
                size={deco.size}
              />
            </Col>
          ))}
          <Link to="/" className="text-decoration-none text-center mt-3">
            Xem tất cả
          </Link>
        </Row>
      </Container>
      <Container
        fluid
        style={{ backgroundColor: "#6bc5d110" }}
        className="pt-3 pb-5"
      >
        <Container>
          <h2 className="text-center mb-4">WHAT OUR CUSTOMERS ARE SAYING</h2>
          <Row className="mb-5">
            {[1, 2, 3].map((item) => (
              <Col lg="4">
                <Comment name={cmtName} img={cmtImg} cmt={cmtTitle} />
              </Col>
            ))}
            <Link to="/" className="text-decoration-none text-center mt-3">
              Xem tất cả
            </Link>
          </Row>
        </Container>
      </Container>
      <Container className="pb-5 pt-3">
        <h2 className="text-center mb-4">SHOP CAT FISH</h2>
        <Row>
          {prod.map((prod) => (
            <Col lg="3" md={6} sm={6}>
              <Product
                masp={prod.masp}
                name={prod.tensp}
                img={prod.linkimg}
                title={prod.des}
                price={prod.price}
                size={prod.size}
              />
            </Col>
          ))}
          <Link to="/product" className="text-decoration-none text-center mt-3">
            Xem tất cả
          </Link>
        </Row>
      </Container>
      <Container className="pt-3 pb-5">
        <h2 className="text-center mb-4"> BRANDS THAT YOU CAN TRUST</h2>
        <Brand settings={settings} />
      </Container>
    </div>
  );
}

export default Home;
