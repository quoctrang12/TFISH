import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faUserPlus,
  faRightFromBracket,
  faCircleChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  Col,
  Alert,
  Badge,
} from "react-bootstrap";

import "./Header.css";
import { useStore, actions } from "../../Store";
import NavHeader from "./nav";

function Header({ showHeader }) {
  const colorMain = "#0c2132";
  const colorSecond = "#29689b";
  const [state, dispatch] = useStore();
  let navigate = useNavigate();

  const handleSearch = (event) => {
    if (state.search) {
      navigate(`/search`);
    }
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Alert variant="success" className="m-0 p-0 pt-2 start-page">
              <marquee>chào mừng QUÝ KHÁCH ĐẾN VỚI T.FISH</marquee>
            </Alert>
          </Navbar.Brand>
          <Nav>
            <Link to="/user" className="nav nav-link">
              <FontAwesomeIcon icon={faUser} />{" "}
              {state.userLogin.name || "Xin chào"}
            </Link>
            {(state.statusLogin && (
              <Link
                to="/login"
                className="nav nav-link"
                onClick={() => {
                  dispatch(actions.setStatusLogin(false));
                  dispatch(actions.setUserLogin({}));
                  dispatch(actions.setCarts([]));
                }}
              >
                <FontAwesomeIcon icon={faRightFromBracket} /> Đăng xuất
              </Link>
            )) || (
              <>
                <Link to="/login" className="nav nav-link">
                  <FontAwesomeIcon icon={faRightFromBracket} /> Đăng nhập
                </Link>
                <Link to="/logon" className="nav nav-link">
                  <FontAwesomeIcon icon={faUserPlus} /> Đăng ký
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
        <Container>
          <Link to="/" className="nav logo mx-auto">
            <span className="logo">T.FISH</span>
          </Link>
          <Col lg="5">
            <Form className="d-flex">
              <Button
                style={{ backgroundColor: colorSecond, width: "100px" }}
                className="rounded-0 rounded-start border-0"
                onClick={handleSearch}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="xl"
                  color="white"
                />
              </Button>
              <FormControl
                placeholder="Tìm kiếm"
                size="lg"
                value={state.search}
                className="rounded-0 rounded-end"
                aria-label="Search"
                onChange={(e) => {
                  dispatch(actions.setSearch(e.target.value));
                }}
              />
            </Form>
          </Col>
          <div className="position-relative mx-auto">
            <Link
              to={(state.statusLogin && "/cart") || "/login"}
              className="nav nav-link"
            >
              <FontAwesomeIcon
                icon={faOpencart}
                color="white"
                size="3x"
                className="position-relative"
              />
              <Badge
                pill
                bg="light"
                text="dark"
                style={{ position: "absolute", top: "0", right: "0" }}
              >
                {state.carts.length || 0}
              </Badge>
            </Link>
          </div>
        </Container>
      </Navbar>
      <NavHeader showHeader={showHeader} />

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
