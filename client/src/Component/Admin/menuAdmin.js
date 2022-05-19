import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Collapse } from "react-bootstrap";
import { useStore, actions } from "../../Store";

function Menu() {
  const [state, dispatch] = useStore();
  const [open, setOpen] = useState(false);
  const handleShow = () => setOpen(!open);
  return (
    <ListGroup variant="flush">
      <Link to="/" className="nav logo mx-auto">
        <span className="logo">T.FISH</span>
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
              <Link to="/login" className="text-decoration-none text-white"
              onClick={() => {
                dispatch(actions.setStatusLogin(false));
                dispatch(actions.setUserLogin({}));
                dispatch(actions.setCarts([]));
              }}>
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
