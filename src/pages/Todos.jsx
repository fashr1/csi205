import { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import "./Todos.css";
import { fetchTodos } from "./data/todos"; // ดึงข้อมูล todo เริ่มต้น

function Todo() {
    // 🔹 เก็บสถานะต่าง ๆ ของหน้า Todo
    const [todos, setTodos] = useState([]);
    const [showOnlyWaiting, setShowOnlyWaiting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [newId, setNewId] = useState(0);

    // 🔹 โหลดข้อมูลครั้งแรก
    useEffect(() => {
        const data = fetchTodos().map((t) => ({
            id: t.id,
            title: t.title,
            status: t.completed ? "done" : "waiting",
        }));
        setTodos(data);
    }, []);

    // 🔹 กรองข้อมูล (ถ้าเลือกแสดงเฉพาะ waiting)
    const filteredTodos = showOnlyWaiting
        ? todos.filter((t) => t.status === "waiting")
        : todos;

    // 🔹 การแบ่งหน้า
    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const currentTodos = filteredTodos.slice(startIndex, startIndex + itemsPerPage);

    // 🔹 เปลี่ยนสถานะ waiting ↔ done
    const toggleStatus = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id
                    ? { ...todo, status: todo.status === "waiting" ? "done" : "waiting" }
                    : todo
            )
        );
    };

    // 🔹 ลบ todo
    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // 🔹 เพิ่ม todo ใหม่ (ตรวจว่า ID ไม่ซ้ำ)
    const addTodo = () => {
        if (newTitle.trim() === "") {
            alert("Please enter a todo title.");
            return;
        }
        if (todos.some((t) => t.id === newId)) {
            alert(`ID ${newId} already exists!`);
            return;
        }

        const newTodo = { id: newId, title: newTitle, status: "waiting" };
        const updatedTodos = [...todos, newTodo].sort((a, b) => a.id - b.id);

        setTodos(updatedTodos);
        setShowModal(false);
        setNewTitle("");
        setNewId(0);
    };

    // 🔹 ส่วนแสดงผล UI
    return (
        <div className="todo-container">
            {/* ส่วนหัว: ตัวกรอง + ตัวเลือกจำนวนต่อหน้า */}
            <div className="todo-header">
                <Form.Check
                    type="switch"
                    id="waiting-switch"
                    label={
                        <>
                            Show only{" "}
                            <span className="badge waiting-badge">
                                waiting <i class="bi bi-clock"></i>
                            </span>
                        </>
                    }
                    checked={showOnlyWaiting}
                    onChange={() => setShowOnlyWaiting(!showOnlyWaiting)}
                />

                <Form.Select
                    className="items-select"
                    style={{ width: "200px" }}
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setPage(1);
                    }}
                >
                    <option value={5}>5 items per page</option>
                    <option value={10}>10 items per page</option>
                    <option value={50}>50 items per page</option>
                    <option value={100}>100 items per page</option>
                </Form.Select>
            </div>

            {/* ตารางแสดงรายการ todo */}
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th className="d-flex align-items-center justify-content-between">
                            <span>Completed</span>
                            {/* ปุ่มเพิ่ม todo */}
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => {
                                    setNewId(
                                        todos.length > 0
                                            ? Math.max(...todos.map((t) => t.id)) + 1
                                            : 1
                                    );
                                    setShowModal(true);
                                }}
                            >
                                +
                            </Button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {currentTodos.map((todo) => (
                        <tr key={todo.id}>
                            <td className="text-center align-middle">
                                <span className="badge bg-secondary">{todo.id}</span>
                            </td>
                            <td className="text-start">{todo.title}</td>
                            <td style={{ textAlign: "right" }}>
                                {todo.status === "waiting" ? (
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => toggleStatus(todo.id)}
                                    >
                                        waiting <i class="bi bi-clock"></i>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => toggleStatus(todo.id)}
                                    >
                                        done ✔
                                    </Button>
                                )}{" "}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => deleteTodo(todo.id)}
                                >
                                    🗑
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* ปุ่มเปลี่ยนหน้า */}
            <div className="pagination-container">
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                >
                    First
                </Button>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>

                <span className="page-info">
                    {page} / {totalPages}
                </span>

                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
                <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                >
                    Last
                </Button>
            </div>

            {/* Modal สำหรับเพิ่ม todo */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Todo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>ID:</Form.Label>
                        <Form.Control
                            type="number"
                            value={newId}
                            onChange={(e) => setNewId(Number(e.target.value))}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Type your todo title here..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addTodo}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Todo;
