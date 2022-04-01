import React from "react";

function TypeProduct({ img, title }) {
  return (
    <div
      className="bg-white text-center mt-5 mx-auto type-product"
      style={{ height: "250px", width: "90%", cursor: "pointer"}}
    >
      <img src={img} width="90%" alt="" />
      <h5 className="mt-3">{title}</h5>
      <span className="">Xem thêm</span>
      <p className="add-type"></p>
    </div>
  );
}

export default TypeProduct;
