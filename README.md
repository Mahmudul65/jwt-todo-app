# ToDo App (Node.js + Express + JSON)

A simple **backend ToDo application** with **user authentication**, **JWT-based protected routes**, and **JSON file storage**. No database required.

Users can **signup, login, manage their own todos**, and **logout**. All operations are **user-specific** and **securely handled**.

---

## 🛠️ Features

### Authentication

* **Signup** with password hashing (bcrypt)
* **Login** with JWT token
* **Profile** route (protected)
* **Logout** (clears JWT token + optional auto-delete todos)

### ToDo System

* Add, list, edit, and delete todos (user-specific)
* Timestamps (`createdAt` and `updatedAt`)
* Auto-clear todos on logout (optional bonus feature)

### Technical

* Node.js + Express.js
* JSON files (`users.json` & `todos.json`) as mock database
* bcrypt for password hashing
* JWT for authentication
* Middleware for route protection
* Modular and well-commented code

---

## 📂 File Structure

```
/users.json          # Stores user info
/todos.json          # Stores todos
/routes/auth.js      # Authentication routes
/routes/todos.js     # ToDo CRUD routes
/middleware/authMiddleware.js  # JWT auth middleware
/app.js              # Main server file
/package.json
```

---

## ⚡ Installation

1. Clone the repo:

```bash
git clone https://github.com/Mahmudul65/jwt-todo-app.git
cd todo-app
```

2. Install dependencies:

```bash
npm install express bcrypt jsonwebtoken cookie-parser
```

3. Create empty JSON files:

**users.json**

```json
[]
```

**todos.json**

```json
[]
```

4. Start server:

```bash
node app.js
```

Server will run on **Port 5000**.

---

## 🔗 API Routes & Testing

All requests can be tested using **Postman / Insomnia / curl**.

---

### 1️⃣ Signup

**POST** `http://localhost:5000/auth/signup`

**Body (JSON)**

```json
{
  "username": "Mahmudul",
  "password": "abc123"
}
```

**Response:**

```
Signed up successfully
```

---

### 2️⃣ Login

**POST** `http://localhost:5000/auth/login`

**Body (JSON)**

```json
{
  "username": "Mahmudul",
  "password": "abc123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

> Copy the `JWT_TOKEN` for protected routes

---

### 3️⃣ Profile

**GET** `http://localhost:5000/auth/profile`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**

```json
{
  "id": "1762729314921",
  "username": "Mahmudul"
}
```

---

### 4️⃣ Add Todo

**POST** `http://localhost:5000/todos/add`

**Headers:**

```
Authorization: Bearer <JWT_TOKEN>
```

**Body:**

```json
{
  "text": "Learn Node.js"
}
```

**Response:**

```
Todo added!!
```

---

### 5️⃣ List Todos

**GET** `http://localhost:5000/todos/list`

**Headers:** Authorization Bearer token

**Response Example:**

```json
[
  {
    "id": "1762729455774",
    "userId": "1762729314921",
    "text": "Hello!!!",
    "createdAt": "2025-11-09T23:04:15.774Z",
    "updatedAt": null
  }
]
```

---

### 6️⃣ Edit Todo

**PUT** `http://localhost:5000/todos/edit/<todoId>`

**Headers:** Authorization Bearer token

**Body:**

```json
{
  "text": "Hello!!! Edited"
}
```

**Response:**

```
Todo Updated!!
```

---

### 7️⃣ Delete Todo

**DELETE** `http://localhost:5000/todos/delete/<todoId>`

**Headers:** Authorization Bearer token

**Response:**

```
Todo deleted successfully!
```

---

### 8️⃣ Logout

**POST** `http://localhost:5000/auth/logout`

**Headers:** Authorization Bearer token

**Response:**

```
Logged out successfully & your todos were cleared
```

> All user-specific todos are deleted on logout (bonus feature).

---

## ⚡ Testing Workflow (Postman / Manual)

1. **Signup** → create test user
2. **Login** → copy JWT token
3. **Profile** → check logged-in user info
4. **Add Todo** → create todo
5. **List Todos** → verify todo creation
6. **Edit Todo** → update text
7. **Delete Todo** → delete a todo
8. **Logout** → verify auto-clear todos

---

## 📌 Notes

* Passwords are **hashed** with bcrypt
* JWT token **expires in 1 hour**
* `users.json` persists user info; `todos.json` contains user-specific todos
* Backend can be tested **without frontend**


Author:Mahmudul Hasan.