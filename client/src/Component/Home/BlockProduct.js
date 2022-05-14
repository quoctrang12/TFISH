import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus } from "@fortawesome/free-solid-svg-icons";

import { useStore, actions } from "../../Store";

function Product({ id_product, name, img, title, price, size }) {
  let navigate = useNavigate();
  const [state, dispatch] = useStore();

  const handleAddProduct = () => {
    if (state.statusLogin) {
      axios.post("http://localhost:4000/api/addCart", {
        id_product: id_product,
        id_user: state.userLogin.id,
        count: 1,
      });
      toast.success("Thêm vào giỏ hàng thành công", {
        position: "top-right",
        autoClose: 5000,
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
    } else {
      navigate("/login");
    }
  };

  return (
    <Card className="rounded-0 text-center product" key={id_product}>
      <div
        style={{ height: "180px" }}
        className=""
        onClick={() => {
          navigate(`/details/${id_product}`);
        }}
      >
        <Card.Img
          src={img}
          style={{ width: "80%", height: "80%", marginTop: "10%" }}
          className="rounded-0 mx-auto"
        />
      </div>
      <Card.Body>
        <Card.Title className="name-product">{name}</Card.Title>
        {title && <Card.Text className="title-product mb-1">{title}</Card.Text>}
        <div className="mb-1">
          <span className="size fw-bold">Size:</span> <span>{size}</span>
        </div>
        <Card.Subtitle className="mb-2 text-text-muted">
          <FontAwesomeIcon icon={faStar} color="#29689b " />
          <FontAwesomeIcon icon={faStar} color="#29689b " />
          <FontAwesomeIcon icon={faStar} color="#29689b " />
          <FontAwesomeIcon icon={faStar} color="#29689b " />
          <FontAwesomeIcon icon={faStar} color="#29689b " />
          <p className="price mt-2 mb-1">{price}</p>
        </Card.Subtitle>

        <Button className="btn btn-add" onClick={handleAddProduct}>
          <FontAwesomeIcon icon={faCartPlus} /> Thêm vào giỏ hàng
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
