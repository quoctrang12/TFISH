import React from "react";
import Slider from "react-slick";
import { Row } from "react-bootstrap";

function TypeProduct({ settings }) {
  const data = [
    { image: "Aquariums.jpg", title: "HỒ NUÔI" },
    { image: "Conditioners.jpg", title: "ĐỒ TRANG TRÍ" },
    { image: "Food.jpg", title: "THỨC ĂN" },
    { image: "Cleaning.jpg", title: "VỆ SINH" },
    { image: "Filtration.jpg", title: "MÁY ÔXI" },
    { image: "Aeration_CO2.jpg", title: "MÁY LỌC CO2" },
    { image: "Holey_Rock.jpg", title: "VI SINH VẬT" },
    { image: "Lights.jpg", title: "CHIẾU SÁNG" },
    { image: "Other_Accessories.jpg", title: "KHÁC" },
  ];

  return (
    <Row>
      <Slider {...settings}>
        {data.map((item) => (
          <div>
            <div
              className="bg-white text-center mt-5 mx-auto type-product pb-5 pt-5"
              style={{ cursor: "pointer", width: "90%" }}
            >
              <img
                src={"images/Loaisanpham/" + item.image}
                width="90%"
                alt=""
              />
              <h5 className="mt-3">{item.title}</h5>
              <span className="">Xem thêm</span>
              <p className="add-type"></p>
            </div>
          </div>
        ))}
      </Slider>
    </Row>
  );
}

export default TypeProduct;
