import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Col, Container, Row, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

import Menu from "./menuAdmin";

function Admin() {
  let navigate = useNavigate();
  return (
    <>
      <Container fluid style={{ background: "#f7f8fd" }}>
        <Row>
          <Col
            className="position-sticky"
            md={2}
            style={{
              background: "#0c2132",
              height: "100vh",
              zIndex: "1000",
              top: "0",
            }}
          >
            <Menu />
          </Col>
          <Col md={10}>
            <Card className="mb-4">
              <Card.Body>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  color="blue"
                  size="2x"
                  onClick={() => navigate("/")}
                />
              </Card.Body>
            </Card>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Admin;
