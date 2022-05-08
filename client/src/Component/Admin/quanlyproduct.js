import { Table } from "react-bootstrap";

import { useStore, actions } from "../../Store";

function ListProductAdmin(){
    const [state, dispatch] = useStore();

    return(
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {state.allProduct.map((product) => (
            <tr>
              <td>{product.masp}</td>
              <td>
                <img src={product.linkimg} alt="" width="100px" />
              </td>
              <td>{product.tensp}</td>
              <td>{product.price}</td>
              <td>{product.size}</td>
            </tr>
          ))}
        </tbody>
      </Table>)
}

export default ListProductAdmin