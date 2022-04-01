import React from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus } from "@fortawesome/free-solid-svg-icons";

function Product({ name, img, title, price, size }) {
  return (
    <Card
      className="rounded-0 text-center product"
      style={{ minHeight: "400px" }}
    >
      <div style={{ height: "180px" }} className="">
        <Card.Img
          src={img}
          style={{ width: "80%", height: "80%", marginTop: "10%" }}
          className="rounded-0 "
        />
      </div>
      <Card.Body>
        <Card.Title style={{ height: "2em"}}>{name}</Card.Title>
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

        <Button variant="primary">
          <FontAwesomeIcon icon={faCartPlus} /> Thêm vào giỏ hàng
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
