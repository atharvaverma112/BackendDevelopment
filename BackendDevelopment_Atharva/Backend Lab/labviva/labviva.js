const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

// MongoDB connection
const mongoURL = "mongodb://127.0.0.1:27017";

const client = new MongoClient(mongoURL);

let tasksCollection;

// Middleware
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
async function connectDB() {
    await client.connect();

    const database = client.db("todo_lab");

    tasksCollection = database.collection("tasks");

    console.log("Connected to MongoDB");
}

// Home route
app.get("/", (req, res) => {
    res.send("Eisenhower Todo App is Running!");
});

// Test MongoDB route
app.get("/tasks", async (req, res) => {
    const tasks = await tasksCollection.find({}).toArray();

    res.json(tasks);
});

// Start server
async function startServer() {
    await connectDB();

    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}

startServer();