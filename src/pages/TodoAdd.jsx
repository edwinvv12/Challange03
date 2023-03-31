import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import data from "../data.json";

function TodoAdd() {
  const navigate = useNavigate();

  const [task, setTask] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (!task) {
      alert("task is required!");
      return;
    }

    const dataLength = data.length;
    data.push({
      id: dataLength + 1,
      task,
    });

    return navigate("/");
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="text-center">
            <h1>Add Task</h1>
          </div>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="task">
              <Form.Label>Add Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Task"
                required={true}
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              {task.length < 1 && (
                <Form.Text className="text-muted">
                  Enter the new task.
                </Form.Text>
              )}
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="success" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TodoAdd;
