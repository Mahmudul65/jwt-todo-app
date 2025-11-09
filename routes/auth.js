const express = require('express');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const fs = require('fs');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const secretKey = "Your secret key";

// JSON files paths
const usersFile = "users.json";
const todosFile = "todos.json";

// Util functions to read/write JSON files
const readData = (path) => {
  if (!fs.existsSync(path)) return [];
  const data = fs.readFileSync(path, 'utf-8');
  return data ? JSON.parse(data) : [];
};

const writeData = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, 2));

//Signup Route
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).send("Username and password are required");

  
  if (password.length < 6 || !/[0-9]/.test(password))
    return res
      .status(400)
      .send("Password must be at least 6 characters and include a number");

  const users = readData(usersFile);

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), username, password: hashedPassword };

  users.push(newUser);
  writeData(usersFile, users);

  res.send("Signed up successfully");
});

//Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const users = readData(usersFile);
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send("Invalid username or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid username or password");

  const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "Login successful", token });
});

//Profile Route 
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

//Logout Route
router.post("/logout", authMiddleware, (req, res) => {
  const todos = readData(todosFile);
  const remainingTodos = todos.filter(todo => todo.userId !== req.user.id);
  writeData(todosFile, remainingTodos);

  res.clearCookie("token");
  res.send(" Logged out successfully.");
});

module.exports = router;
