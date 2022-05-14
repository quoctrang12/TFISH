import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose, faFilter } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Table,
  InputGroup,
  Dropdown
} from "react-bootstrap";

import { useStore, actions } from "../../Store";

function DashBoard() {
  const [state, dispatch] = useStore();
  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState("");
  const [fill, setFill] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/getAllBill")
      .then((res) => dispatch(actions.setAllBills(res.data)));
  }, [state.update, dispatch]);
  return (
    <>
      <Container fluid>
        <Row className="mb-4">
          <Col md={5}>
            <InputGroup className="mb-3">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option>Sắp xếp theo</option>
                <option value="create_at">Ngày đặt</option>
                <option value="total">Tổng tiền</option>
                <option value="address">Địa chỉ</option>
              </Form.Select>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setSort(e.target.value)}
              >
                <option>Thứ tự</option>
                <option value="ASC">Tăng dần</option>
                <option value="DESC">Giảm dần</option>
              </Form.Select>
              <Button
                onClick={() => {
                  axios
                    .post("http://localhost:4000/api/sortBill", {
                      sortBy: sortBy,
                      sort: sort,
                    })
                    .then((result) => {
                      dispatch(actions.setAllBills(result.data));
                    });
                }}
              >
                Sắp xếp
              </Button>
            </InputGroup>
          </Col>
          <Col md={3} className="text-end ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                <FontAwesomeIcon icon={faFilter} />
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ marginLeft: "70px", marginTop: "10px" }}>
                <Dropdown.Item onClick={(e) => setFill("")}>
                  Tất cả
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => setFill("Đang xác nhận")}>
                  Đang xác nhận
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => setFill("Đang giao hàng")}>
                  Đang giao hàng
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => setFill("Đã giao")}>
                  Đã giao
                </Dropdown.Item>
                <Dropdown.Item onClick={(e) => setFill("Đã hủy")}>
                  Đã hủy
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
            {state.allBill.map((item) =>
              fill ? (
                item.status === fill && (
                  <tr>
                    <td className="py-3">
                      {item.create_at.split("T").join(" ").split(".000Z")}
                    </td>
                    <td className="py-3">{item.name}</td>
                    <td className="py-3">{item.address}</td>
                    <td className="py-3">{item.total} VNĐ</td>
                    <td className="py-3">
                      {item.status === "Đang xác nhận" && (
                        <span className="rounded-pill p-1 text-secondary">
                          {item.status}
                        </span>
                      )}
                      {item.status === "Đang giao hàng" && (
                        <span className="rounded-pill p-1 text-warning">
                          {item.status}
                        </span>
                      )}
                      {item.status === "Đã hủy" && (
                        <span className="rounded-pill p-1 text-danger">
                          {item.status}
                        </span>
                      )}
                      {item.status === "Đã giao" && (
                        <span className="rounded-pill p-1 text-success">
                          {item.status}
                        </span>
                      )}
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
                          dispatch(actions.update());
                          axios.post(
                            "http://localhost:4000/api/setStatusBill",
                            {
                              maHD: item.id,
                              status: status,
                            }
                          );
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
              ) : (
                <tr>
                  <td className="py-3">
                    {item.create_at.split("T").join(" ").split(".000Z")}
                  </td>
                  <td className="py-3">{item.name}</td>
                  <td className="py-3">{item.address}</td>
                  <td className="py-3">{item.total} VNĐ</td>
                  <td className="py-3">
                    {item.status === "Đang xác nhận" && (
                      <span className="rounded-pill p-1 text-secondary">
                        {item.status}
                      </span>
                    )}
                    {item.status === "Đang giao hàng" && (
                      <span className="rounded-pill p-1 text-warning">
                        {item.status}
                      </span>
                    )}
                    {item.status === "Đã hủy" && (
                      <span className="rounded-pill p-1 text-danger">
                        {item.status}
                      </span>
                    )}
                    {item.status === "Đã giao" && (
                      <span className="rounded-pill p-1 text-success">
                        {item.status}
                      </span>
                    )}
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
                        dispatch(actions.update());
                        axios.post("http://localhost:4000/api/setStatusBill", {
                          maHD: item.id,
                          status: status,
                        });
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faClose}
                      color="#960018"
                      className="ms-2"
                      onClick={() => {
                        dispatch(actions.update());
                        axios.post("http://localhost:4000/api/setStatusBill", {
                          maHD: item.id,
                          status: "Đã hủy",
                        });
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
