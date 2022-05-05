import React from "react";
import { ListGroup, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

function MenuAdmin({ value }) {
  console.log(value);
  return (
    <Accordion.Item eventKey={value}>
      <Accordion.Header>Accordion Item {value}</Accordion.Header>
      <Accordion.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Link to="/admin" className="text-decoration-none text-dark">
              Quản lý sản phẩm
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/admin" className="text-decoration-none text-dark">
              Quản lý sản phẩm
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/admin" className="text-decoration-none text-dark">
              Quản lý sản phẩm
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/admin" className="text-decoration-none text-dark">
              Quản lý sản phẩm
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default React.memo(MenuAdmin);
