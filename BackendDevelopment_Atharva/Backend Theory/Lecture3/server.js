
const express = require("express");
const app = express();

app.use(express.json());

// Configure EJS
app.set("view engine", "ejs");

// Student data
const students = [
    { id: 1, name: "Aarav", branch: "CSE" },
    { id: 2, name: "Diya", branch: "ECE" },
    { id: 3, name: "Rohan", branch: "IT" }
];

// Route 1: Home
app.get("/", (req, res) => {
    res.send("Student Management API");
});

// Route 2: Get all students as JSON
app.get("/students", (req, res) => {
    res.json(students);
});

// Route 3: Get student by ID
app.get("/students/:id", (req, res) => {
    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (student) {
        res.json(student);
    } else {
        res.status(404).json({
            error: "Student not found"
        });
    }
});

// Route 4: Add a student
app.post("/students", (req, res) => {
    const { name, branch } = req.body;

    if (!name || !branch) {
        return res.status(400).json({
            error: "Name and branch are required"
        });
    }

    const newStudent = {
        id: students.length
            ? Math.max(...students.map(s => s.id)) + 1
            : 1,
        name,
        branch
    };

    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Route 5: HTML response
app.get("/html", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>Student Page</title></head>
        <body>
            <h1>Welcome to Student Management</h1>
            <p>This is an HTML response from Express.</p>
            <a href="/students">View Students JSON</a>
        </body>
        </html>
    `);
});

// Route 6: Display students using EJS
app.get("/students-page", (req, res) => {
    res.render("students", { students: students });
});

// Start server
app.listen(3000, () => {
    console.log("Server started at http://localhost:3000");
});
