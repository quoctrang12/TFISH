import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStore, actions } from "../../Store";

function Product({ masp, name, img, title, price, size }) {
  let navigate = useNavigate();
  const [state, dispatch] = useStore();
  const handleAddProduct = () => {
    if (state.statusLogin === "success") {
      axios.post("http://localhost:3001/api/addgiohang", {
        masp: masp,
        makh: state.userLogin.maKH,
        soluong: 1,
      });
      

      axios
        .post("http://localhost:3001/api/getgiohang", {
          makh: state.userLogin.maKH,
        })
        .then((res) => {
          dispatch(actions.setCarts(res.data.product));
        });
        dispatch(actions.updateCart());
    } else {
      navigate("/login");
    }
  };

  return (
    <Card
      className="rounded-0 text-center product"
      style={{ minHeight: "400px" }}
      key={masp}
    >
      <div
        style={{ height: "180px" }}
        className=""
        onClick={() => {
          navigate(`/details/${masp}`);
        }}
      >
        <Card.Img
          src={img}
          style={{ width: "80%", height: "80%", marginTop: "10%" }}
          className="rounded-0 mx-auto"
        />
      </div>
      <Card.Body>
        <Card.Title style={{ height: "2em" }}>{name}</Card.Title>
        <Card.Text
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Card.Text>
        <Card.Subtitle className="mb-2 text-text-muted">
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <p className="price">{price}</p>
          <p className="size">
            Size: <span>{size}</span>
          </p>
        </Card.Subtitle>

        <Button variant="primary" onClick={handleAddProduct}>
          <FontAwesomeIcon icon={faCartPlus} /> Thêm vào giỏ hàng
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
