import React, { useState } from "react";
import axios from "axios";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Breadcrumb,
  Alert
} from "react-bootstrap";

import { useStore, actions } from "../../Store";

function Login() {
  const [state, dispatch] = useStore();
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    axios
      .post("http://localhost:4000/api/login", {
        Email: state.email,
        Password: state.password,
      })
      .then((res) => {
        if (res.data.message) {
          dispatch(actions.setStatusLogin(false));
          setError(true)
        } else {
          toast.success("Đăng nhập thành công", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(actions.setStatusLogin(true));
          dispatch(actions.setUserLogin(res.data[0]));
          axios
            .post("http://localhost:4000/api/getCart", {
              id_user: res.data[0].id,
            })
            .then((res) => {
              dispatch(actions.setCarts(res.data.product));
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  if (state.statusLogin) {
    if (state.userLogin.permision === "0")
      navigate("/admin", { replace: true });
    else navigate("/", { replace: true });
  }
  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Login</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col lg="6" className=" border-end mt-5 mb-5">
          <h4 className="mb-5" style={{ marginLeft: "20%" }}>
            Đăng nhập
          </h4>
          <Form noValidate validated={validated}>
            <Form.Group
              as={Col}
              md="7"
              className="mb-3 mx-auto "
              controlId="formBasicEmail"
            >
              <Form.Label>
                <FontAwesomeIcon icon={faEnvelope} color="#29689b" /> Email
                address
              </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                className=" rounded-0"
                onChange={(e) => {
                  dispatch(actions.setEmail(e.target.value));
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              md="7"
              className="mb-3 mx-auto"
              controlId="formBasicPassword"
            >
              <Form.Label>
                <FontAwesomeIcon icon={faLock} color="#29689b" /> Password
              </Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                className=" rounded-0"
                onChange={(e) => {
                  dispatch(actions.setPassword(e.target.value));
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="7"
              className="mb-3 mx-auto"
              controlId="formBasicCheckbox"
            >
              <Form.Check type="checkbox" label="Nhớ mật khẩu" />
              <Link to="/" className="text-decoration-none">
                Quên mật khẩu
              </Link>
            </Form.Group>

            <Button
              variant="primary"
              className="mb-3 rounded-0"
              style={{ marginLeft: "20%", width: "59%" }}
              onClick={handleSubmit}
            >
              Đăng nhập
            </Button>
            {error && (
              <Alert variant="danger">Sai tài khoản hoặc mật khẩu. Vui lòng đăng nhập lại</Alert>
            )}
          </Form>
          <h4 className="mb-4 text-center">Hoặc</h4>
          <Button
            as={Col}
            md="7"
            variant="outline-primary"
            className="mb-3 rounded-0"
            style={{ marginLeft: "20%" }}
          >
            <FontAwesomeIcon icon={faFacebookF} color="blue" /> Facebook
          </Button>
          <Button
            as={Col}
            md="7"
            variant="outline-danger"
            className="mb-3 rounded-0"
            style={{ marginLeft: "20%" }}
          >
            <FontAwesomeIcon icon={faGoogle} color="red" /> Google
          </Button>
        </Col>
        <Col lg="6" className="mt-5">
          <h4 className="mb-5" style={{ marginLeft: "20%" }}>
            Khách hàng mới
          </h4>
          <div className="justify-content-between">
            <p className="mb-5" style={{ marginLeft: "20%" }}>
              Bằng cách tạo tài khoản với cửa hàng của chúng tôi, bạn sẽ có thể
              thực hiện quy trình thanh toán nhanh hơn, lưu trữ nhiều địa chỉ
              giao hàng, xem và theo dõi đơn đặt hàng trong tài khoản của bạn và
              hơn thế nữa.
            </p>
          </div>

          <Button
            variant="primary"
            type="submit"
            className="mb-3 rounded-0"
            style={{ marginLeft: "20%" }}
          >
            <Link to="/logon" className="text-decoration-none text-white">
              Đăng ký ngay
            </Link>
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
