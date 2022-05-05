import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Col,
  Alert,
  Badge,
  ListGroup
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faUserPlus,
  faRightFromBracket,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useStore, actions } from "../../Store";
import NavHeader from "./nav"
function Header({ showHeader }) {
  const colorMain = "#0c2132";
  const colorSecond = "#336699";
  const [search,setSearch] = useState("")
  const [state, dispatch] = useStore();
  let navigate = useNavigate();

  const handleSearch = (event) => {
    if(state.search){navigate(`/search/${state.search}`)}
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Alert variant="success" className="m-0 p-0 start-page">
              <marquee>XIN CHÀO QUÝ KHÁCH ĐẾN VỚI T.FISH</marquee>
            </Alert>
          </Navbar.Brand>
          <Nav>
            <Link
              to="/user"
              className="text-decoration-none text-white fw-bold nav-link"
            >
              <FontAwesomeIcon icon={faUser} /> {state.userLogin.tenKH || "Hello"}
            </Link>
            {(state.statusLogin==="success" && (
              <Link
                to="/login"
                className="text-decoration-none text-white fw-bold nav-link"
                onClick={() => {
                  dispatch(actions.setStatusLogin(""))
                  dispatch(actions.setUserLogin({}))
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Log out
              </Link>
            )) || (
              <>
                <Link
                  to="/login"
                  className="text-decoration-none text-white fw-bold nav-link"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} /> Login
                </Link>
                <Link
                  to="/logon"
                  className="text-decoration-none text-white fw-bold nav-link"
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Register
                </Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Navbar
        variant="dark"
        style={{ backgroundColor: colorMain, height: "150px" }}
      >
        <Container style={{ justifyContent: "none" }}>
          <Col lg="3">
            <Link to="/" className="text-decoration-none text-white fw-bold">
              <img
                alt=""
                src="https://cdn.shopify.com/s/files/1/0147/1561/7366/files/coburg-logo-white-with-fish.png?v=1559017648"
                width="80"
                height="80"
                className="d-inline-block align-top"
              />{" "}
              <span className="h1">T.FISH</span>
            </Link>
          </Col>
          <Col lg="6">
            <Form className="d-flex">
              <Button
                style={{ backgroundColor: colorSecond, width: "100px" }}
                className="rounded-0 rounded-start"
                onClick = {handleSearch}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="xl"
                  color="white"
                />
              </Button>
              <FormControl
                type="search"
                placeholder="Search"
                size="lg"
                value = {state.search}
                className="rounded-0 rounded-end"
                aria-label="Search"
                onChange={(e) => {
                  dispatch(actions.setSearch(e.target.value));
                }}
              />
            </Form>
          </Col>
          <Col lg="3" className="text-center">
            <div className="position-relative">
              <Link
                to={(state.statusLogin && "/cart")||"/login"}
                className="text-decoration-none text-white fw-bold nav-link"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  color="white"
                  size="3x"
                  className="ms-5 position-relative"
                />
                <Badge
                  pill
                  bg="light"
                  text="dark"
                  style={{ position: "absolute", top: "0", right: "5em" }}
                >
                  {state.carts.length}
                </Badge>
              </Link>
            </div>
          </Col>
        </Container>
      </Navbar>
      <NavHeader showHeader = {showHeader}/>

      {showHeader && (
        <div
          onClick={() => {
            document.documentElement.scrollTop = 0;
          }}
          style={{
            position: "fixed",
            right: "20px",
            bottom: "40px",
            zIndex: "1000",
            cursor: "pointer",
          }}
        >
          <FontAwesomeIcon
            icon={faCircleChevronUp}
            color={colorSecond}
            size="2x"
          />
        </div>
      )}
    </>
  );
}

export default React.memo(Header);
