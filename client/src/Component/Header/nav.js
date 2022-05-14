import { Link } from "react-router-dom";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Navbar, Nav, Badge } from "react-bootstrap";

import { useStore } from "../../Store";

function NavHeader({ showHeader }) {
  const [state] = useStore();

  return (
    <Navbar
      style={{ backgroundColor: "#29689b", top: "0", zIndex: "1000" }}
      className="text-center justify-content-center position-sticky"
    >
      <Container fluid className="text-center justify-content-center">
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-center">
          <Nav
            fill
            className=" my-2 my-lg-0 align-items-center "
            style={{ minHeight: "50px", fontSize: "18px" }}
            navbarScroll
          >
            {showHeader && (
              <Link to="/" className="nav">
                <span className="logo">T.FISH</span>
              </Link>
            )}
            <Link to="/" className="nav-link nav">
              Trang chủ
              <p className="line-nav"></p>
            </Link>

            <Link to="/product" className=" nav-link nav">
              Sản phẩm
              <p className="line-nav"></p>
            </Link>

            <Link to="/bill" className="nav-link nav">
              Đơn hàng
              <p className="line-nav"></p>
            </Link>
            <Link to="/contact" className="nav-link nav">
              Liên hệ
              <p className="line-nav"></p>
            </Link>

            {showHeader && (
              <div className="position-relative">
                <Link to="/cart" className="nav nav-link ">
                  <FontAwesomeIcon
                    icon={faOpencart}
                    color="white"
                    size="3x"
                    className=" position-relative"
                  />

                  <Badge
                    pill
                    bg="light"
                    text="dark"
                    style={{ position: "absolute", top: "0", right: "0px" }}
                  >
                    {state.carts.length}
                  </Badge>
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
