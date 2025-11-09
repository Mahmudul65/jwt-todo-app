const express = require('express');


const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todos');


app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on Port ${PORT}`);
});

