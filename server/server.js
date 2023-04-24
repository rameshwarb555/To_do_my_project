const express = require("express");
const cors = require("cors");
// const  mongoose = require ('mongoose')
const db = require("./db"); // Require the mongoose object from db.js
const todoRoutes = require("./routes/todoRoutes");

const app = express();//Create express app
const port = 4000; // Change to your desired port

// Middleware
app.use(express.json());
app.use(cors());
db.connect()

// Routes
app.use("/api/todos", todoRoutes );

// Start the server
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server is running on port: ${port}`);
});
