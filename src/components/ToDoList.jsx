import React, { useState } from "react";
import {
  Form,
  Button,
  Col,
  Container,
  Row,
  InputGroup,
  Modal,
} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import data from "../data.json";
import { Link } from "react-router-dom";
import Edit from "../assets/img/edit.png";
import Delete from "../assets/img/remove.png";

function ToDoList() {
  const [search, setSearch] = useState("");
  const [todos, setTodos] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const removeToDo = (remove) => {
    const removeToDo = todos.filter((list) => {
      return list.id !== remove;
    });
    setTodos(removeToDo);
  };

  const checkTodo = (check) => {
    const checkedTodo = todos.map((todo) => {
      if (todo.id === check) {
        return { ...todo, complete: !todo.complete };
      } else {
        return todo;
      }
    });
    setTodos(checkedTodo);
  };

  const todoDone = () => {
    const newTodos = todos.filter((todo) => {
      return todo.complete === true;
    });
    setTodos(newTodos);
  };

  const deleteDoneTasks = () => {
    const newTodos = todos.filter((todo) => {
      return todo.complete === false;
    });
    setTodos(newTodos);
  };

  const deleteAllTasks = () => {
    setTodos([]);
  };

  const openModal = (id) => {
    setEditId(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditId(null);
    setShowModal(false);
    setEditTask("");
  };

  const editTodo = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editId ? { ...todo, task: editTask } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <h2 className="text-center my-4">ToDoSearch</h2>

      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="success">Search</Button>
      </Form>

      <div className="d-grid gap-2 my-4">
        <Button as={Link} variant="primary" to="/todo-add">
          Add New Task
        </Button>
      </div>

      <h2 className="text-center my-4">ToDoList</h2>
      <div className="d-flex justify-content-around mt-2 mb-4">
        <Button
          variant="primary px-5"
          onClick={() => {
            setTodos(data);
          }}
        >
          All
        </Button>
        <Button
          variant="primary px-5"
          onClick={() => {
            const newTodos = todos.filter((todo) => {
              return todo.complete === true;
            });
            setTodos(newTodos);
          }}
        >
          Done
        </Button>
        <Button
          variant="primary px-5"
          onClick={() => {
            const newTodos = todos.filter((todo) => {
              return todo.complete === false;
            });
            setTodos(newTodos);
          }}
        >
          ToDo
        </Button>
      </div>

      <Row>
        <Col>
          <ListGroup>
            {todos &&
              todos.length > 0 &&
              todos
                .filter((dataItem) =>
                  dataItem.task.toLocaleLowerCase().includes(search)
                )
                .map((data, index) => (
                  <ListGroup.Item key={data.id}>
                    <div className="d-flex justify-content-between">
                      <span
                        style={
                          data.complete
                            ? { textDecoration: "line-through" }
                            : { textDecoration: "none" }
                        }
                      >
                        {data.task}
                      </span>
                      <div className="mx-2">
                        <input
                          className="mx-2"
                          type="checkbox"
                          checked={data.complete}
                          onChange={() => checkTodo(data.id)}
                        ></input>
                        <img
                          className="mx-2"
                          src={Edit}
                          style={{ width: "20px" }}
                          alt=""
                          onClick={() => openModal(data.id)}
                        ></img>
                        <img
                          className="mx-2"
                          src={Delete}
                          style={{ width: "20px" }}
                          alt=""
                          onClick={() => {
                            removeToDo(data.id);
                          }}
                        ></img>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
          </ListGroup>
        </Col>
      </Row>

      <div className="row">
        <div className="col-6">
          <div className="d-grid gap-2 my-4">
            <Button variant="danger" size="lg" onClick={deleteDoneTasks}>
              Delete Done Task
            </Button>
          </div>
        </div>
        <div className="col-6">
          <div className="d-grid gap-2 my-4">
            <Button variant="danger" size="lg" onClick={deleteAllTasks}>
              Delete All Task
            </Button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {todos &&
            todos.length > 0 &&
            todos
              .filter((dataItem) => dataItem.id === editId)
              .map((data) => (
                <Form key={data.id}>
                  <Form.Group controlId="formTask">
                    <Form.Label>Task</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={data.task}
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={editTodo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ToDoList;
