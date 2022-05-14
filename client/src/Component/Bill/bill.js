import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Tab,
  Tabs,
  Row,
  Col,
  ListGroup,
  Collapse,
  Table,
  Breadcrumb,
} from "react-bootstrap";

import { useStore } from "../../Store";

function Bill() {
  const [state] = useStore();
  const [key, setKey] = useState("Đang xác nhận");

  const [bill, setBill] = useState([]);
  const [billDetail, setBillDetail] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(key);
    axios
      .post("http://localhost:4000/api/getBill", {
        id_user: state.userLogin.id,
        status: key,
      })
      .then((res) => {
        setBill(res.data);
      })
      .catch((err) => console.log(err));
  }, [state.userLogin.id, key]);
  return (
    <>
      <Container className="text-center">
        <Breadcrumb className="m-0 pt-3">
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 fs-5 border-0"
        >
          {["Đang xác nhận", "Đang giao hàng", "Đã giao"].map((status) => (
            <Tab eventKey={status} title={status}>
              <ListGroup className="mb-4">
                <Row className="fw-bold border-4 border-dark border-bottom p-3">
                  <Col lg={1}>STT</Col>
                  <Col lg={2}>Ngày đặt</Col>
                  <Col lg={3}>Địa chỉ</Col>
                  <Col lg={2}>Tổng tiền</Col>
                  <Col lg={3}>Hình thức thanh toán</Col>
                </Row>
                {bill.map((bill, index) => (
                  <Row
                    id={bill.id}
                    className="p-3 border-bottom"
                    onClick={() => {
                      setOpen(!open);
                      var click = document.getElementById(`detail${bill.id}`);
                      open
                        ? click.classList.add("show")
                        : click.classList.remove("show");
                      axios
                        .post("http://localhost:4000/api/getDetailBill", { mahd: bill.id })
                        .then((res) => {
                          setBillDetail(res.data);
                          console.log(res.data);
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    <Col lg={1}>{index + 1}</Col>
                    <Col lg={2}>{bill.create_at.split("T")[0]}</Col>
                    <Col lg={3}>{bill.address}</Col>
                    <Col lg={2}>{bill.total} VNĐ</Col>
                    <Col lg={3}>{bill.payment}</Col>

                    <Collapse in={false} id={`detail${bill.id}`}>
                      <Container>
                        <Table>
                          <tbody>
                            {billDetail.map((detail) => (
                              <tr className="align-middle">
                                <td></td>
                                <td>
                                  <img
                                    src={detail.linkimg}
                                    width="100px"
                                    alt=""
                                  />
                                </td>
                                <td>{detail.name_product}</td>
                                <td>{detail.price} VNĐ</td>
                                <td>{detail.count}</td>
                                <td>
                                  {detail.price * detail.count}
                                  VNĐ
                                </td>
                                <td></td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Container>
                    </Collapse>
                  </Row>
                ))}
              </ListGroup>
            </Tab>
          ))}
        </Tabs>
      </Container>
    </>
  );
}

export default Bill;
