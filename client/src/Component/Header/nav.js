import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Navbar,Nav, NavDropdown, Badge,ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore, actions } from "../../Store";

function NavHeader({ showHeader}){
    const [state, dispatch] = useStore();

    return(
        <Navbar
        style={{ backgroundColor: "#336699", top: "0", zIndex: "1000" }}
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
                to="/contact"
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
                        {state.carts.length}
                      </Badge>
                    </Link>
                  </div>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )

}

export default NavHeader;