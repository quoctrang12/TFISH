import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import { faPhone,faEnvelope,faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container, Row, Col, Form, Button, Breadcrumb, Alert } from "react-bootstrap";


function Logon() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    
    axios.post("http://localhost:3001/api/register", {
      Name: name,
      Phone: phone,
      Email: emailReg,
      Password: passwordReg
    }).then((res)=>{
      setMessage(res.data.message);
    }).catch((err)=>{
      console.log(err);
    });
  };
  if(message==="success"){
    navigate('/login');
  }
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
                <Form.Label><FontAwesomeIcon icon={faUser} color="#336699" /> Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value = {name}
                  placeholder="Enter Firstname"
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label><FontAwesomeIcon icon={faPhone} color="#336699" /> Phone</Form.Label>
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
              <Form.Label><FontAwesomeIcon icon={faEnvelope} color="#336699" /> Email address</Form.Label>
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
              <Form.Label><FontAwesomeIcon icon={faLock} color="#336699" /> Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                className=" rounded-0"
                onChange={(e) => setPasswordReg(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            {message && (<Alert variant="danger">{message}</Alert>)}
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
