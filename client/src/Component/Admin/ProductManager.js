import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Table,
  InputGroup,
  Dropdown,
  Modal,
  FloatingLabel,
} from "react-bootstrap";

import { useStore, actions } from "../../Store";

function Product() {
  const [state, dispatch] = useStore();
  const formatMoney = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  });

  const [sortBy, setSortBy] = useState("");
  const [sort, setSort] = useState("");
  const [fill, setFill] = useState("");
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState("");
  const [des, setDes] = useState("");
  const [idType, setIdType] = useState("");

  const [idUpdate, setIdUpdate] = useState();
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    if (add === true) {
      axios.post("http://localhost:4000/api/addProduct", {
        name: name,
        price: price,
        size: size,
        image: "/images/" + image,
        des: des,
        id_type: idType,
      });
      toast.success("Thêm sản phẩm thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      axios.post("http://localhost:4000/api/updateProduct", {
        id: idUpdate,
        name: name,
        price: price,
        size: size,
        image: "/images/" + image,
        des: des,
        id_type: idType,
      });
      toast.info("Cập nhật sản phẩm thành công", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("update");
    }

    setShow(false);
    dispatch(actions.update());
  };
  useEffect(() => {
    axios.get("http://localhost:4000/api/typeproduct").then((result) => {
      dispatch(actions.setALLTypeProduct(result.data.TypeProduct));
    });
  }, [dispatch]);
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
                <option value="name_product">Tên sản phẩm</option>
                <option value="price">Giá</option>
                <option value="size">Kích thước</option>
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
                className="btn-add"
                onClick={() => {
                  axios
                    .post("http://localhost:4000/api/sortProduct", {
                      sortBy: sortBy,
                      sort: sort,
                    })
                    .then((result) => {
                      dispatch(actions.setAllProducts(result.data));
                    });
                }}
              >
                Sắp xếp
              </Button>
            </InputGroup>
          </Col>
          <Col md={2} className="text-end ms-auto">
            <Form.Select
              className="rounded-0 border-0"
              onChange={(e) => setFill(parseInt(e.target.value))}
            >
              <option value="">Tất cả</option>
              {state.allTypeProduct.map((type) => (
                <option value={type.id}>{type.name_type}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button
              className="btn-add"
              onClick={() => {
                setAdd(true);
                setName("");
                setPrice("");
                setSize("");
                setImage("");
                setDes("");
                setIdType("");
                setShow(true);
              }}
            >
              Thêm sản phẩm
            </Button>
          </Col>
        </Row>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Mã</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Kích thước</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {state.allProduct.map((product, index) =>
              fill ? (
                product.id_type === fill && (
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img src={product.linkimg} width="100px" alt="" />
                    </td>
                    <td>{product.name_product}</td>
                    <td>{formatMoney.format(product.price)}</td>
                    <td>{product.size}</td>
                    <td align="center" style={{cursor:"pointer"}}>
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        color="blue"
                        
                        onClick={() => {
                          setAdd(false);
                          setIdUpdate(product.id);
                          setName(product.name_product);
                          setPrice(product.price);
                          setSize(product.size);
                          setImage(product.linkimg);
                          setDes(product.des);
                          setIdType(product.id_type);
                          setShow(true);
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        color="#960018"
                        className="ms-2"
                        onClick={() => {
                          axios.post(
                            "http://localhost:4000/api/deleteProduct",
                            {
                              id: product.id,
                            }
                          );
                          dispatch(actions.update());
                          toast.warning("Xóa sản phẩm thành công", {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                          });
                        }}
                      />
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <img src={product.linkimg} width="100px" alt="" />
                  </td>
                  <td>{product.name_product}</td>
                  <td>{formatMoney.format(product.price)}</td>
                  <td>{product.size}</td>
                  <td align="center" >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      color="blue"
                      style={{cursor:"pointer"}}
                      onClick={() => {
                        setAdd(false);
                        setIdUpdate(product.id);
                        setName(product.name_product);
                        setPrice(product.price);
                        setSize(product.size);
                        setImage(product.linkimg);
                        setDes(product.des);
                        setIdType(product.id_type);
                        setShow(true);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      color="#960018"
                      className="ms-2"
                      style={{cursor:"pointer"}}
                      onClick={() => {
                        axios.post("http://localhost:4000/api/deleteProduct", {
                          id: product.id,
                        });
                        dispatch(actions.update());
                        toast.warning("Xóa sản phẩm thành công", {
                          position: "top-right",
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                        });
                      }}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm sản phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Giá</Form.Label>
                  <Form.Control
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Kích thước</Form.Label>
                  <Form.Control
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3" controlId="formGridAddress2">
                <Form.Label>Hình ảnh</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.value.split("\\")[2])}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <FloatingLabel controlId="floatingSelect" label="Loại sản phẩm">
                  <Form.Select
                    value={idType}
                    onChange={(e) => setIdType(e.target.value)}
                  >
                    <option>Open this select menu</option>
                    {state.allTypeProduct.map((type) => (
                      <option value={type.id}>{type.name_type}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {add ? "Thêm sản phẩm" : "Lưu thay đổi"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
export default Product;
