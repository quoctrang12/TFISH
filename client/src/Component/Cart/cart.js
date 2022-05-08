import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { useStore, actions } from "../../Store";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Cart() {
  const [state, dispatch] = useStore();
  const [sum, setSum] = useState();
  let navigate = useNavigate();
  useLayoutEffect(() => {
    axios
      .post("/api/getgiohang", { makh: state.userLogin.maKH })
      .then((result) => {
        dispatch(actions.setCarts(result.data.product));
        setSum(() => {
          let Price = 0;
          result.data.product.map((product) => {
            let newPrice =
              Number(product.price.split(".").join("")) * product.soluong;
            Price = Price + newPrice;
          });
          return String(Price).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [state.updateCart]);

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
                <td>
                  <img src={product.linkimg} width="100px" />
                </td>
                <td>{product.tensp}</td>
                <td>{product.size}</td>
                <td>{product.price} VNĐ</td>
                <td>{product.soluong}</td>
                <td>
                  {String(
                    Number(product.price.split(".").join("")) * product.soluong
                  ).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                  VNĐ
                </td>
                <td>
                  <Button
                    className="rounded-0"
                    onClick={() => {
                      axios.post("http://localhost:3001/api/delete", {
                        masp: product.masp,
                        makh: state.userLogin.maKH,
                      });  
                      dispatch(actions.updateCart());
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
          <Button className="text-uppercase rounded-0">Xóa tất cả</Button>
        </Col>
        <Col lg={6} className="text-end">
          <Button
            className="text-uppercase rounded-0"
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
          <Row className="p-2"><h2 className="text-uppercase text-center">Đơn hàng</h2></Row>
          <Row className="p-2"><Col>Số lượng sản phẩm: </Col><Col className="text-end">{state.carts.length}</Col></Row>
          <Row className="p-2"><Col className="fw-bold">Tổng tiền: </Col><Col className="text-end">{sum} VNĐ</Col></Row>
          <Row className="p-2"><Button className="text-uppercase rounded-0">Đặt hàng</Button></Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
