import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container, Row, Table, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProductHunt } from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faClose,
  faUsers,
  faFileInvoiceDollar,
  faHandHoldingDollar,
} from "@fortawesome/free-solid-svg-icons";

import { useStore, actions } from "../../Store";

function DashBoard() {
  const [state, dispatch] = useStore();
  const [profit, setProfit] = useState(0);
  const colorMain = "#0c2132";
  const colorSecond = "#29689b";

  useEffect(() => {
    axios.get("http://localhost:4000/api/getAllBill").then((res) => {
      dispatch(actions.setAllBills(res.data));
      setProfit(0);
      res.data.forEach((item) => {
        setProfit((profit) => profit + item.total);
      });
    });

    axios
      .get("http://localhost:4000/api/getAllUser")
      .then((res) => dispatch(actions.setAllUsers(res.data)));
  }, [state.update, dispatch]);
  return (
    <>
      <Container fluid>
        <Row className="mb-4">
          <Col lg={3}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title className="fs-3">Product</Card.Title>
                    <Card.Text>{state.allProduct.length}</Card.Text>
                  </Col>
                  <Col className="m-auto">
                    <FontAwesomeIcon
                      icon={faProductHunt}
                      color={colorSecond}
                      size="3x"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title className="fs-3">User</Card.Title>
                    <Card.Text>{state.allUser.length}</Card.Text>
                  </Col>
                  <Col className="m-auto">
                    <FontAwesomeIcon
                      icon={faUsers}
                      color={colorMain}
                      size="3x"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title className="fs-3">Bill</Card.Title>
                    <Card.Text>{state.allBill.length}</Card.Text>
                  </Col>
                  <Col className="m-auto">
                    <FontAwesomeIcon
                      icon={faFileInvoiceDollar}
                      color="#bdbdc7"
                      size="3x"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={3}>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Row>
                  <Col>
                    <Card.Title className="fs-3">Profit</Card.Title>
                    <Card.Text>{profit} </Card.Text>
                  </Col>
                  <Col className="m-auto">
                    <FontAwesomeIcon
                      icon={faHandHoldingDollar}
                      color="blue"
                      size="3x"
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Table>
          <thead>
            <tr>
              <th>Ngày đặt</th>
              <th>Tên khách hàng</th>
              <th>Địa chỉ</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {state.allBill.map(
              (item) =>
                item.status === "Đang xác nhận" && (
                  <tr>
                    <td className="py-3">
                      {item.create_at.split("T").join(" ").split(".000Z")}
                    </td>
                    <td className="py-3">{item.name}</td>
                    <td className="py-3">{item.address}</td>
                    <td className="py-3">{item.total} VNĐ</td>
                    <td className="py-3">
                      <span className="rounded-pill p-1 text-secondary">
                        {item.status}
                      </span>
                    </td>
                    <td align="center" className="py-3">
                      <FontAwesomeIcon
                        icon={faCheck}
                        color="green"
                        onClick={() => {
                          let status = "";
                          if (item.status === "Đang xác nhận") {
                            status = "Đang giao hàng";
                          }
                          if (item.status === "Đang giao hàng") {
                            status = "Đã giao";
                          }
                          axios.post(
                            "http://localhost:4000/api/setStatusBill",
                            {
                              maHD: item.id,
                              status: status,
                            }
                          );
                          dispatch(actions.update());
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faClose}
                        color="#960018"
                        className="ms-2"
                        onClick={() => {
                          dispatch(actions.update());
                          axios.post(
                            "http://localhost:4000/api/setStatusBill",
                            {
                              maHD: item.id,
                              status: "Đã hủy",
                            }
                          );
                        }}
                      />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default DashBoard;
