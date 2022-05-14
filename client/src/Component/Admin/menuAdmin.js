import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Collapse } from "react-bootstrap";

function Menu() {
  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(!open);
  return (
    <ListGroup variant="flush">
      <Link to="/" className="nav">
        <img
          alt=""
          src="https://cdn.shopify.com/s/files/1/0147/1561/7366/files/coburg-logo-white-with-fish.png?v=1559017648"
          width="80"
          height="80"
          className="d-inline-block align-top"
        />{" "}
        <span>T.FISH</span>
      </Link>
      <hr style={{ color: "white " }} />
      <ListGroup.Item style={{ backgroundColor: "#0c2132" }}>
        <Link to="/admin" className="text-decoration-none text-white">
          Dashboard
        </Link>
      </ListGroup.Item>
      <ListGroup.Item style={{ backgroundColor: "#0c2132" }}>
        <Link to="/admin/product" className="text-decoration-none text-white">
          Product
        </Link>
      </ListGroup.Item>
      <ListGroup.Item style={{ backgroundColor: "#0c2132" }}>
        <Link to="/admin/bill" className="text-decoration-none text-white">
          Bill
        </Link>
      </ListGroup.Item>
      <ListGroup.Item style={{ backgroundColor: "#0c2132" }}>
        <Link to="/admin/user" className="text-decoration-none text-white">
          User
        </Link>
      </ListGroup.Item>
      <ListGroup.Item
        style={{ backgroundColor: "#0c2132" }}
        className=" text-white"
        onClick={handleShow}
      >
        Account
        <Collapse in={open}>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ backgroundColor: "#0c2132" }}>
              <Link to="/admi" className="text-decoration-none text-white">
                Profile
              </Link>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "#0c2132" }}>
              <Link to="/" className="text-decoration-none text-white">
                Settings
              </Link>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "#0c2132" }}>
              <Link to="/login" className="text-decoration-none text-white">
                Sign out
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Collapse>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default Menu;
