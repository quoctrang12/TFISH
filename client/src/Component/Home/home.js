import React from "react";
import axios from "axios";
import Slider from "react-slick";
import { Row, Container, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styleHome.css";
import Comment from "./comment";
import Product from "./BlockProduct";
import TypeProduct from "./typeProduct";


function Home() {
  // comment attributes
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
              <div class="image-box">
                <img src="images/Live_Fish.jpg" alt="" className="images" />
                <div className="layout-box">
                  <div>
                    <h2>LIVE FISH</h2>
                    <a href="/" className="text-decoration-none text-white">
                      Xem thêm
                    </a>
                    <p className="line"></p>
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div class="image-box">
                <img src="images/Live_Plants.jpg" alt="" className="images" />
                <div className="layout-box">
                  <div>
                    <h2>LIVE PLANTS</h2>
                    <a href="/" className="text-decoration-none text-white">
                      Xem thêm
                    </a>
                    <p className="line"></p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Slider {...settings}>
              <TypeProduct
                img="images/loaisanpham/Aquariums.jpg"
                title="HỒ NUÔI"
              />
              <TypeProduct
                img="images/loaisanpham/Conditioners.jpg"
                title="ĐỒ TRANG TRÍ"
              />
              <TypeProduct img="images/loaisanpham/Food.jpg" title="THỨC ĂN" />
              <TypeProduct
                img="images/loaisanpham/Cleaning.jpg"
                title="VỆ SINH"
              />
              <TypeProduct
                img="images/loaisanpham/Filtration.jpg"
                title="MÁY ÔXI"
              />
              <TypeProduct
                img="images/loaisanpham/Aeration_CO2.jpg"
                title="MÁY LỌC CO2"
              />
              <TypeProduct
                img="images/loaisanpham/Holey_Rock.jpg"
                title="VI SINH VẬT"
              />
              <TypeProduct img="images/loaisanpham/Lights.jpg" title="ĐÈN" />
              <TypeProduct
                img="images/loaisanpham/Other_Accessories.jpg"
                title="KHÁC"
              />
            </Slider>
          </Row>
        </Container>
      </div>
      <Container className="pb-5 pt-3">
        <h2 className="text-center mb-4">SALE ON NOW</h2>
        <Row>
          {deco.map((deco) => (
            <Col lg="3">
              <Product
                name={deco.tensp}
                img={deco.linkimg}
                price={deco.price}
                size={deco.size}
              />
            </Col>
          ))}
          <a href="/" className="text-decoration-none text-center mt-3">
              Xem tất cả
            </a>
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
            <Col lg="4">
              <Comment name={cmtName} img={cmtImg} cmt={cmtTitle} />
            </Col>
            <Col lg="4">
              <Comment name={cmtName} img={cmtImg} cmt={cmtTitle} />
            </Col>
            <Col lg="4">
              <Comment name={cmtName} img={cmtImg} cmt={cmtTitle} />
            </Col>
            <a href="/" className="text-decoration-none text-center mt-3">
              Xem tất cả
            </a>
          </Row>
        </Container>
      </Container>
      <Container className="pb-5 pt-3">
        <h2 className="text-center mb-4">SHOP CAT FISH</h2>
        <Row>
          {prod.map((prod) => (
            <Col lg="3">
              <Product
                name={prod.tensp}
                img={prod.linkimg}
                title={prod.des}
                price={prod.price}
                size={prod.size}
              />
            </Col>
          ))}
          <Link to="/product" className="text-decoration-none text-center mt-3">Xem tất cả</Link>
        </Row>
      </Container>
      <Container className="pt-3 pb-5">
        <h2 className="text-center mb-4"> BRANDS THAT YOU CAN TRUST</h2>
        <Slider {...settings}>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/aqua-one.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/Eheim.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/Fluval.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/Kirby_Pet.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/nutrafin.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/Reptile_One.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/seachem.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/Sera.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/Sicce.png" />
            </a>
          </div>
          <div>
            <a href="/" className="">
              <img width="60%" src="/images/brand/Tropical.png" />
            </a>
          </div>
        </Slider>
      </Container>
    </div>
  );
}

export default Home;
