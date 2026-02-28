const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const filePath = path.join(__dirname, "attendance.json");

// Ensure file exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

// Save attendance
app.post("/save-attendance", (req, res) => {
    const newEntry = req.body;

    try {
        const data = JSON.parse(fs.readFileSync(filePath));
        data.push(newEntry);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        res.json({ status: "Saved" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save" });
    }
});

// Get all attendance
app.get("/get-attendance", (req, res) => {
    const data = JSON.parse(fs.readFileSync(filePath));
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});