import React, { useEffect } from "react";
import axios from "axios";
import { Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

import { useStore, actions } from "../../Store";
function User() {
  const [state, dispatch] = useStore();
  useEffect(() => {
    axios
      .get("/api/getAllUser")
      .then((res) => dispatch(actions.setAllUsers(res.data)));
  }, [state.update, dispatch]);
  return (
    <>
      <Container fluid>
        <Table striped bordered>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên khách hàng</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Phân quyền</th>
            </tr>
          </thead>
          <tbody>
            {state.allUser.map((user, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phone_number}</td>
                <td>{user.email}</td>
                <td>
                  {user.permision === "1" ? "Người dùng" : "Quản trị viên"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
export default User;
