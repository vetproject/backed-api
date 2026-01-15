require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "MySQL connected ✅" });
  });
});

// Create a new user
app.post("/users", (req, res) => {
  const {id, name, email, password, role, paid } = req.body;
  const query = "INSERT INTO users (id,name, email, password, role, paid) VALUES (?,?, ?, ?, ?, ?)";
  db.query(query, [id,name, email, password, role, paid], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId });
  });
});

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));