const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database
const db = new sqlite3.Database("./database.sqlite", (err) => {
    if (err) console.error("Error opening database", err);
    else console.log("Connected to SQLite database.");
});

// Create a table if not exists
db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL
)`);

// CRUD Routes
app.post("/add", (req, res) => {
    const { name, description, price } = req.body;
    db.run("INSERT INTO items (name, description, price) VALUES (?, ?, ?)",
        [name, description, price], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        });
});

app.get("/items", (req, res) => {
    db.all("SELECT * FROM items", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.delete("/delete/:id", (req, res) => {
    db.run("DELETE FROM items WHERE id = ?", req.params.id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item deleted" });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
