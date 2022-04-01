import React from "react";
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
  faLeftFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ showHeader, showName, props }) {
  const colorMain = "#0c2132";
  const colorSecond = "#336699";

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
              <FontAwesomeIcon icon={faUser} /> {showName || "Hello"}
            </Link>
            {(showName && (
              <Link
                to="/login"
                className="text-decoration-none text-white fw-bold nav-link"
                onClick={() => {
                  props.parent("");
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
                className="rounded-0 rounded-end"
                aria-label="Search"
              />
            </Form>
          </Col>
          <Col lg="3" className="text-center">
            <div className="position-relative">
              <Link
                to="/cart"
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
                  style={{ position: "absolute", top: "0", right: "80px" }}
                >
                  0
                </Badge>
              </Link>
            </div>
          </Col>
        </Container>
      </Navbar>
      <Navbar
        style={{ backgroundColor: colorSecond, top: "0", zIndex: "1000" }}
        className="text-center justify-content-center position-sticky"
      >
        <Container fluid className="text-center justify-content-center">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-center">
            <Nav
              fill
              className=" my-2 my-lg-0 align-items-center "
              style={{ minHeight: "50px", width: "50%", fontSize: "18px" }}
              navbarScroll
            >
              <Link
                to="/"
                className="text-decoration-none text-white fw-bold nav-link"
              >
                Trang chủ
              </Link>
              <NavDropdown
                title="Sản phẩm"
                id="navbarScrollingDropdown"
                className="dropdown"
              >
                <ListGroup variant="flush">
                  <ListGroup.Item><Link to="/product" className="text-decoration-none p-0 nav-link">Tất cả sản phẩm</Link></ListGroup.Item>
                  <ListGroup.Item><Link to="/product" className="text-decoration-none p-0 nav-link">Cá</Link></ListGroup.Item>
                  <ListGroup.Item><Link to="/product" className="text-decoration-none p-0 nav-link">Tôm</Link></ListGroup.Item>
                  
                </ListGroup>
              </NavDropdown>
              <Link
                to="/news"
                className="text-decoration-none text-white fw-bold nav-link"
              >
                Tin tức
              </Link>

              <NavDropdown
                title="Dịch vụ"
                id="navbarScrollingDropdown"
                className="dropdown"
              >
                <NavDropdown.Item href="#action6">Bảo hành</NavDropdown.Item>
                <NavDropdown.Item href="#action6">
                  Chăm sóc khách hàng
                </NavDropdown.Item>
              </NavDropdown>
              <Link
                to="/fact"
                className="text-decoration-none text-white fw-bold nav-link"
              >
                Liên hệ
              </Link>

              {showHeader && (
                <Nav.Link href="#action7" className="">
                  <div className="position-relative">
                    <Link
                      to="/cart"
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
                        style={{ position: "absolute", top: "0", right: "0px" }}
                      >
                        0
                      </Badge>
                    </Link>
                  </div>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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

export default Header;
