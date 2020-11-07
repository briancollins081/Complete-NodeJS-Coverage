"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
let todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({
        todos,
    });
});
router.post("/todo", (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todos.push(newTodo);
    res
        .status(201)
        .json({ message: "Added a todo successfuly", todo: newTodo, todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    const body = req.params;
    const tid = params.todoId;
    const todoIndex = todos.findIndex((t) => t.id == tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(201).json({
            message: "Updated a todo successfuly",
            todo: todos[todoIndex],
            todos,
        });
    }
    res.status(404).json({ message: "A todo with the id given does not exist!" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const params = req.params;
    todos = todos.filter((todo) => todo.id != params.todoId);
    res.status(200).json({
        message: "Delete a todo",
        todos,
    });
});
exports.default = router;
