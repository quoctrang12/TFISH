import React, { useState, useLayoutEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useStore, actions } from "../../Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

function BillDetail() {
  const navigate = useNavigate();
  const [state, dispatch] = useStore();
  let { billID } = useParams();

  const formatMoney = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });
  const [billDetail, setBillDetail] = useState([]);
  useLayoutEffect(() => {
    axios
      .post("http://localhost:4000/api/getDetailBill", { mahd: billID })
      .then((res) => {
        setBillDetail(res.data);
      });
  }, [state.update]);

  return (
    <>
      <Container
        className="mb-5 w-75 mt-5 px-2"
        style={{ border: "4px solid #336699" }}
      >
        <Row
          className=" text-white border-color mb-3"
          style={{ backgroundColor: "#336699" }}
        >
          <Col md="1" className=" my-auto">
            <FontAwesomeIcon
              icon={faCircleLeft}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={() => {state.userLogin.permision === "0"?navigate("/admin"):navigate("/bill")}}
            />
          </Col>
          <Col>
            <h3 className="text-center mt-3 mb-3">Thông tin đơn hàng</h3>
          </Col>
        </Row>
        {billDetail[0] && (
          <Row className="p-4">
            <Col>
              <Row>
                <p className="fw-bold">
                  Tên khách hàng: <span>{billDetail[0].name}</span>
                </p>
              </Row>
              <Row>
                <p className="fw-bold">
                  Địa chỉ: <span>{billDetail[0].address}</span>
                </p>
              </Row>
            </Col>
            <Col>
              <Row>
                <p className="fw-bold">
                  Trạng thái đơn hàng:{" "}
                  {billDetail[0].status === "Đang xác nhận" && (
                    <span className="text-secondary">
                      {billDetail[0].status}
                    </span>
                  )}
                  {billDetail[0].status === "Đang giao hàng" && (
                    <span className="text-warning">{billDetail[0].status}</span>
                  )}
                  {billDetail[0].status === "Đã hủy" && (
                    <span className="text-danger">{billDetail[0].status}</span>
                  )}
                  {billDetail[0].status === "Đã giao" && (
                    <span className="text-success">{billDetail[0].status}</span>
                  )}
                </p>
              </Row>
              <Row>
                <p className="fw-bold">
                  Tổng tiền:{" "}
                  <span>{formatMoney.format(billDetail[0].total)}</span>
                </p>
              </Row>
            </Col>
          </Row>
        )}
        <Row className="mb-3 border-color p-3">
          <Col></Col>
          <Col md={2} className="text-center fw-bold">
            Hình ảnh
          </Col>
          <Col md={3} className="text-center fw-bold">
            Tên
          </Col>
          <Col md={2} className="text-center fw-bold">
            Số lượng
          </Col>
          <Col md={2} className="text-center fw-bold">
            Kích thước
          </Col>
          <Col md={2} className="text-center fw-bold">
            Tổng tiền
          </Col>
        </Row>
        {billDetail.map((bill) => (
          <Row className="mb-3">
            <Col></Col>
            <Col md={2}>
              <img src={bill.linkimg} alt="" width="100%" />
            </Col>
            <Col md={3} className="my-auto text-center">
              {bill.name_product}
            </Col>
            <Col md={2} className="my-auto text-center">
              {bill.count}
            </Col>
            <Col md={2} className="my-auto text-center">
              {bill.size}
            </Col>
            <Col md={2} className="my-auto text-center">
              {formatMoney.format(bill.price * bill.count)}
            </Col>
          </Row>
        ))}
        {state.userLogin.permision === "0" && (
          <Row>
            <Col md={2} className="ms-auto">
              <Button
                className="btn-secondary rounded-0 w-100"
                onClick={() => {
                  dispatch(actions.update());
                  axios.post("http://localhost:4000/api/setStatusBill", {
                    maHD: billDetail[0].id_bill,
                    status: "Đã hủy",
                  });
                  dispatch(actions.update());
                }}
              >
                Hủy
              </Button>
            </Col>
            <Col md={2} className="me-auto">
              <Button
                className="btn-add w-100"
                onClick={() => {
                  let status = "";
                  if (billDetail[0].status === "Đang xác nhận") {
                    status = "Đang giao hàng";
                  }
                  if (billDetail[0].status === "Đang giao hàng") {
                    status = "Đã giao";
                  }
                  axios.post("http://localhost:4000/api/setStatusBill", {
                    maHD: billDetail[0].id_bill,
                    status: status,
                  });
                  dispatch(actions.update());
                }}
              >
                Xác nhận
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default BillDetail;
