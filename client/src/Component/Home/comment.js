import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function Comment({ name, img, cmt }) {
  return (
    <Card
      style={{
        width: "100%",
        height: "250px",
        backgroundColor: "rgb(238, 196, 196,0.1)",
      }}
    >
      <Card.Body>
        <Card.Title>
          <img
            src={img}
            alt=""
            width="50px"
            height="50px"
            style={{ borderRadius: "50%" }}
          ></img>{" "}
          {name}{" "}
          <FontAwesomeIcon icon={faCircleCheck} color="#007be0" size="xs" />
        </Card.Title>
        <Card.Subtitle className="mb-2">
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <FontAwesomeIcon icon={faStar} color="yellow" />
          <FontAwesomeIcon icon={faStar} color="yellow" />
        </Card.Subtitle>
        <Card.Text>{cmt}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Comment;
