import React from "react";
import { Col, Container, Row, Breadcrumb, Form, Button } from "react-bootstrap";

function Contact() {
  return (
    <Container className=" mb-5">
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Login</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <h2 className="text-center text-uppercase fw-bold pb-4">Contact us</h2>
        <Col lg={7}>
          <h3 className=" text-uppercase fw-bold">Contact us</h3>
          <Row className="p-2">
            <Col lg={4}>
              <span className="fw-bold text-uppercase">Phone</span>
            </Col>
            <Col lg={8}>+84901910467</Col>
          </Row>
          <Row className="p-2">
            <Col lg={4}>
              <span className="fw-bold text-uppercase">Email</span>
            </Col>
            <Col lg={8}>TFish@gmail.com</Col>
          </Row>
          <Row className="p-2">
            <Col lg={4}>
              <span className="fw-bold text-uppercase">Facebook</span>
            </Col>
            <Col lg={8}>https://www.facebook.com/T.Fish</Col>
          </Row>
          <Row className="p-2">
            <Col lg={4}>
              <span className="fw-bold text-uppercase">Address</span>
            </Col>
            <Col lg={8}>
              Khu 2, DHCT, Đường 3/2, P.Xuân Khánh, Q.Ninh Kiểu, TPCT
            </Col>
          </Row>
          <Row className="p-2">
            <Col lg={4}>
              <span className="fw-bold text-uppercase">Hour</span>
            </Col>
            <Col lg={8}>Mở cửa tất cả ngày trong tuần - từ 7h đến 17h</Col>
          </Row>
        </Col>
        <Col lg={5}>
          <h3 className="text-uppercase fw-bold">Say Hello</h3>

          <Form>
            <Form.Group as={Col} md="7" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" className=" rounded-0" />
            </Form.Group>
            <Form.Group as={Col} md="7" className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control required type="text" className=" rounded-0" />
            </Form.Group>
            <Form.Group
              as={Col}
              md="7"
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" className=" rounded-0" />
            </Form.Group>
            <Form.Group as={Col} md="7" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" className=" rounded-0" />
            </Form.Group>
            <Button type="submit" className=" rounded-0">
              Gửi
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
