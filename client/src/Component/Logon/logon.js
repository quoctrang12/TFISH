import axios from "axios";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb } from "react-bootstrap";


function Logon() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const handleSubmit = (event) => {
    
    axios.post("http://localhost:4000/api/register", {
      Name: name,
      Phone: phone,
      Email: emailReg,
      Password: passwordReg
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err);
    });
  };
  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item active>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Register</Breadcrumb.Item>
      </Breadcrumb>
      <Row>
        <Col lg="6" className="mt-5 mb-5 mx-auto">
          <h4 className="mb-5">CREATE MY ACCOUNT</h4>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Firstname"
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Your Phone"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                className=" rounded-0"
                onChange={(e) => setEmailReg(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                className=" rounded-0"
                onChange={(e) => setPasswordReg(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Button
              variant="primary"
              className="mb-3 rounded-0 mx-auto"
              onClick={handleSubmit}
            >
              Create my account
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Logon;
