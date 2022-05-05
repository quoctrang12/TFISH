import React from "react";
import {
  Col,
  Container,
  Row,
  Accordion,
  Form,
  Button,
  FormControl,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore, actions } from "../../Store";

import MenuAdmin from "./menuAdmin";
import {
  faBorderAll,
  faDollarSign,
  faDolly,
  faMagnifyingGlass,
  faUserLarge,
} from "@fortawesome/free-solid-svg-icons";

function Admin() {
  const [state, dispatch] = useStore();

  return (
    <>
      <Container fluid style={{ backgroundColor: "#f4f4f4" }}>
        <Row>
          <Col lg={3}>
            <Link to="/">
              <img
                alt=""
                src="https://cdn.shopify.com/s/files/1/0147/1561/7366/files/coburg-logo-white-with-fish.png?v=1559017648"
                width="60"
                height="60"
                className="d-inline-block align-top"
              />{" "}
              <span className="h2">T.FISH</span>
            </Link>
            <Accordion defaultActiveKey={[""]} alwaysOpen>
              {[1, 2, 3, 4, 5, 6, 7, 10].map((value) => (
                <MenuAdmin value={value} />
              ))}
            </Accordion>
          </Col>
          <Col lg={9}>
            <Row>
              <Form className="d-flex">
                <Button
                  style={{ width: "100px" }}
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
            </Row>
            <Row className="mt-4 justify-content-center">
              <Col
                lg={3}
                style={{ backgroundColor: "#fff", color:"#7ED321" }}
                className="m-3 p-4"
              >
                <span>
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    size="xl"
                    className="p-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid  #7ED321",
                      borderRadius: "50%",
                    }}
                    
                  />
                </span>{" "}
                <span className="h2">Doanh thu</span>
              </Col>
              <Col
                lg={3}
                style={{ backgroundColor: "#fff", color:"#BDBDC7" }}
                className="m-3 p-4"
              >
                <span
                >
                  <FontAwesomeIcon icon={faBorderAll} size="xl" className="p-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid  #BDBDC7",
                      borderRadius: "50%",
                    }} />
                </span>{" "}
                <span className="h2">{state.allProduct.length}</span>
              </Col>
              <Col
                lg={3}
                style={{ backgroundColor: "#fff", color:"#593bdb" }}
                className="m-3 p-4"
              >
                <span
                >
                  <FontAwesomeIcon icon={faDolly} size="xl" className="p-2"
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid  #593bdb",
                      borderRadius: "50%",
                    }}  />
                </span>{" "}
                <span className="h2">Đơn hàng</span>
              </Col>
            </Row>
            <Row>
              <h2>Tất cả đơn hàng</h2>
              
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Admin;
