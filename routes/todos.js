const express = require('express');
const fs = require("fs");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const readData = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const writeData = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

// Add Todo
router.post("/add", authMiddleware, (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).send("Todo text is required");

    const todos = readData("todos.json");

    const newTodo = {
        id: Date.now().toString(),
        userId: req.user.id,
        text,
        createdAt: new Date().toISOString(),
        updatedAt: null
    };

    todos.push(newTodo);
    writeData("todos.json", todos);

    res.send("Todo added!!");
});

// List Todos
router.get("/list", authMiddleware, (req, res) => {
    const todos = readData("todos.json");
    const userTodos = todos.filter((todo) => todo.userId === req.user.id);
    res.json(userTodos);
});

// Edit Todo
router.put("/edit/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const todos = readData("todos.json");

    const todo = todos.find((t) => t.id === id && t.userId === req.user.id);
    if (!todo) return res.status(404).send("Todo not found");

    todo.text = text || todo.text;
    todo.updatedAt = new Date().toISOString();

    writeData("todos.json", todos);
    res.send("Todo Updated!!");
});

// Delete Todo
router.delete("/delete/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  let todos = readData("todos.json");

  const todo = todos.find((t) => t.id === id);
  if (!todo) return res.status(404).send("Todo not found.");
  if (todo.userId !== req.user.id) return res.status(403).send("Not authorized.");

  todos = todos.filter((t) => t.id !== id);
  writeData("todos.json", todos);
  res.send("Todo deleted successfully!");
});

module.exports = router;
