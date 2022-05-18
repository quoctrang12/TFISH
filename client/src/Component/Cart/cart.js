import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  Row,
  Table,
} from "react-bootstrap";

import { useStore, actions } from "../../Store";

function Cart() {
  const [state, dispatch] = useStore();
  const formatMoney=new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' });
  const [sum, setSum] = useState();
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");

  const [show, setShow] = useState(false);

  let navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/api/pay", {
        id_user: state.userLogin.id,
        address: address,
        total: total,
      })
      .then((res) => {
        setShow(false);
        dispatch(actions.update());
        toast.success("Đặt hàng thành công", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (sum) {
      setShipping(30000);
      setTotal(sum + shipping - discount);
    }
  }, [sum, discount, shipping]);

  useLayoutEffect(() => {
    axios
      .post("http://localhost:4000/api/getCart", {
        id_user: state.userLogin.id,
      })
      .then((result) => {
        dispatch(actions.setCarts(result.data.product));
        setSum(() => {
          let Price = 0;
          result.data.product.forEach((product) => {
            let newPrice = product.price * product.count;
            Price = Price + newPrice;
          });
          return Price;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.update, state.userLogin.id, dispatch]);

  return (
    <Container>
      <Row>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Kích thước</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.carts.map((product) => (
              <tr className="align-middle">
                <td></td>
                <td
                  onClick={() => {
                    navigate(`/details/${product.id}`);
                  }}
                >
                  <img src={product.linkimg} width="100px" alt="" />
                </td>
                <td>{product.name_product}</td>
                <td>{product.size}</td>
                <td>{formatMoney.format(product.price)}</td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="light"
                      onClick={() => {
                        axios.post("http://localhost:4000/api/addCart", {
                          id_product: product.id,
                          id_user: state.userLogin.id,
                          count: -1,
                        });
                      dispatch(actions.update());
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faMinus}
                        style={{ cursor: "pointer" }}
                      />
                    </Button>
                    <FormControl
                      type="text"
                      id={product.id}
                      value={product.count}
                      style={{ width: "50px" }}
                      className="text-center rounded-0 border-0"
                    />
                    <Button
                      variant="light"
                      onClick={() => {
                        axios.post("http://localhost:4000/api/addCart", {
                          id_product: product.id,
                          id_user: state.userLogin.id,
                          count: 1,
                        });
                      dispatch(actions.update());
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        style={{ cursor: "pointer" }}
                      />
                    </Button>
                  </ButtonGroup>
                </td>
                <td>{formatMoney.format(product.price * product.count)}</td>
                <td>
                  <Button
                    className="rounded-0 btn-add"
                    onClick={() => {
                      axios.post("http://localhost:4000/api/delete", {
                        id_product: product.id,
                        id_user: state.userLogin.id,
                      });
                      dispatch(actions.update());
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      color="red"
                      style={{ cursor: "pointer" }}
                    />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row className="pt-2 pb-5">
        <Col lg={6}>
          <Button
            className="text-uppercase rounded-0 btn-add"
            onClick={() => {
              axios.post("http://localhost:4000/api/deleteAllCart", {
                id_user: state.userLogin.id,
              });
              toast.warning("Xóa tất cả sản phẩm", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              dispatch(actions.update());
            }}
          >
            Xóa tất cả
          </Button>
        </Col>
        <Col lg={6} className="text-end">
          <Button
            className="text-uppercase rounded-0 btn-add"
            onClick={() => {
              navigate("/product");
            }}
          >
            Tiếp tục mua
          </Button>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col lg={4} className="mx-auto">
          <Row className="p-2">
            <h2 className="text-uppercase text-center">Đơn hàng</h2>
          </Row>
          <Row className="p-2">
            <Col>Số lượng sản phẩm: </Col>
            <Col className="text-end">{state.carts.length}</Col>
          </Row>
          <Row className="p-2">
            <Col className="fw-bold">Tổng tiền: </Col>
            <Col className="text-end">{formatMoney.format(sum)}</Col>
          </Row>
          <Row className="p-2">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Hình thức thanh toán</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option value="1">Thanh toán khi nhận hàng</option>
                  <option value="2">Thanh toán qua ví điện tử</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mã giảm giá</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Discount"
                  onChange={(e) => {
                    if (e.target.value === "HELLOTFISH") setDiscount(30000);
                  }}
                />
                <Form.Text className="text-muted">
                  Nhập mã HELLOTFISH để được miễn phí vận chuyển
                </Form.Text>
              </Form.Group>
            </Form>
            <Button
              className="text-uppercase rounded-0 btn-add"
              onClick={handleShow}
            >
              Đặt hàng
            </Button>
          </Row>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ nhận hàng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <Form.Text className="text-muted">
                Chúng tôi sẽ giao hàng đến địa chỉ bạn nhập trong vòng 3-5 ngày
              </Form.Text>
            </Form.Group>
            <h6>Thông tin đơn hàng: </h6>
            <Row className="p-2">
              <Col className="fw-bold">Tổng tiền: </Col>
              <Col className="text-end">{formatMoney.format(sum)} </Col>
            </Row>
            <Row className="p-2">
              <Col className="fw-bold">Phí vận chuyển: </Col>
              <Col className="text-end">{formatMoney.format(shipping)} </Col>
            </Row>
            <Row className="p-2">
              <Col className="fw-bold">Mã giảm giá: </Col>
              <Col className="text-end">{formatMoney.format(discount)} </Col>
            </Row>
            <hr />
            <Row className="p-2">
              <Col className="fw-bold">Thành tiền: </Col>
              <Col className="text-end">{formatMoney.format(total)} </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="rounded-0"
            variant="secondary"
            onClick={() => {
              setShow(false);
              dispatch(actions.update());
            }}
          >
            Đóng
          </Button>
          <Button className="btn-add" onClick={handleSubmit}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Cart;
