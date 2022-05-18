import { Container, Form, Button } from "react-bootstrap";

function Comment() {
  return (
    <div>
      <Container className="w-50 mx-auto">
        <h2 className="text-uppercase text-center">Bình luận và đánh giá</h2>

        <Form>
          <Form.Group className="mb-3 mx-auto " controlId="formBasicEmail">
            <Form.Label className="text-uppercase"> Bình Luận</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className=" rounded-0"
              placeholder="Viết bình luận vào đây!!!"
            />
          </Form.Group>

          <Button variant="primary" className="mb-3 rounded-0">
            Gửi
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Comment;
