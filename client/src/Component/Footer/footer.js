import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  FormControl,
  Form,
  Button,
} from "react-bootstrap";

function Footer() {
  const colorMain = "#0c2132";
  const colorSecond = "#29689b";
  return (
    <>
      <Container
        fluid
        style={{ backgroundColor: colorMain, minHeight: "150px" }}
        className="footer"
      >
        <Row
          style={{ backgroundColor: colorSecond, minHeight: "100px" }}
          className="justify-content-md-center align-items-center"
        >
          <Col md={7}>
            <Form className="d-flex">
              <label className="text-white">ĐĂNG KÝ ĐỂ NHẬN TIN TỨC: </label>
              <FormControl
                type="email"
                placeholder="Email@email.com"
                size="lg"
                className="rounded-0"
                aria-label="Email@email.com"
              />
              <Button
                style={{ backgroundColor: colorMain, minWidth: "150px" }}
                className="rounded-0"
                type="submit"
              >
                Đăng ký
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="pt-5 lh-lg fs">
          <Col md={3}>
            <img
              alt=""
              src="https://cdn.shopify.com/s/files/1/0147/1561/7366/files/coburg-logo-white-with-fish.png?v=1559017648"
              width="80%"
              className="d-inline-block align-top"
            />
          </Col>
          <Col md={2}>
            <p className="fw-bold h6 text-white">DANH MỤC</p>
            <ul className="text-white list-unstyled help">
              <li>MUA SẮM NGAY</li>
              <li>QUÀ TẶNG</li>
              <li>PHẢN HỒI</li>
              <li>DỊCH VỤ</li>
            </ul>
          </Col>
          <Col md={3}>
            <p className="text-white h6">TRỢ GIÚP</p>
            <ul className="text-white list-unstyled help">
              <li>VẬN CHUYỂN</li>
              <li>VỀ CHÚNG TÔI</li>
              <li>CHÍNH SÁCH ĐỔI TRẢ</li>
              <li>CHÍNH SÁCH BẢO MẬT</li>
              <li>CHÍNH SÁCH BẢO HÀNH</li>
              <li>CÁC CÂU HỎI THƯỜNG GẶP</li>
              <li>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN</li>
              <li>ĐIỀU KHOẢN DỊCH VỤ</li>
              <li>CHÍNH SÁCH HOÀN TIỀN</li>
            </ul>
          </Col>
          <Col md={4} className="text-white ">
            <h6>CONNECT WITH US</h6>
            <table>
              <tbody>
                <tr>
                  <td className="pe-3">FACEBOOK: </td>
                  <td className="text-secondary">
                    <Link to="/" className="text-decoration-none">
                      https://www.facebook.com/T.Fish
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>CALL US: </td>
                  <td className="text-secondary">+84901910467</td>
                </tr>
                <tr>
                  <td>ADDRESS: </td>
                  <td className="text-secondary">
                    Khu 2, DHCT, Đường 3/2, P.Xuân Khánh, Q.Ninh Kiểu, TPCT
                  </td>
                </tr>
                <tr>
                  <td>HOURS: </td>
                  <td className="text-secondary">
                    Mở cửa tất cả ngày trong tuần - từ 7h đến 17h
                  </td>
                </tr>
              </tbody>
            </table>
          </Col>
        </Row>
        <Row className="text-muted pb-5">
          <Col md={7}>
            <p>&copy; 2021 T.FISH PTY LTD. ALL RIGHTS RESERVED. </p>
          </Col>
          <Col md={5}>
            <img
              src="/images/icon-pay-1.png"
              alt=""
              width="50px"
              className="me-1 rounded-3"
            />
            <img
              src="/images/icon-pay-2.png"
              alt=""
              width="50px"
              className="me-1 rounded-3"
            />
            <img
              src="/images/icon-pay-3.png"
              alt=""
              width="50px"
              className="me-1 rounded-3"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default React.memo(Footer);
