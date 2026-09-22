const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

// MongoDB connection
const mongoURL = "mongodb://127.0.0.1:27017";

const client = new MongoClient(mongoURL);

let tasksCollection;

// Middleware
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Connect to MongoDB
async function connectDB() {
    await client.connect();

    const database = client.db("todo_lab");

    tasksCollection = database.collection("tasks");

    console.log("Connected to MongoDB");
}

// Home route
app.get("/", (req, res) => {
    res.redirect("/matrix");
});

// View tasks as JSON
app.get("/tasks", async (req, res) => {
    const tasks = await tasksCollection.find({}).toArray();

    res.json(tasks);
});

// Mark task as complete
app.post("/tasks/complete/:id", async (req, res) => {

    const id = req.params.id;

    await tasksCollection.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                completed: true
            }
        }
    );

    res.redirect("/matrix");

});

// Delete a task
app.post("/tasks/delete/:id", async (req, res) => {

    const id = req.params.id;

    await tasksCollection.deleteOne({
        _id: new ObjectId(id)
    });

    res.redirect("/matrix");

});

// Open edit page
app.get("/tasks/edit/:id", async (req, res) => {

    const id = req.params.id;

    const task = await tasksCollection.findOne({
        _id: new ObjectId(id)
    });

    res.render("edit", {
        task: task
    });

});

// Update task
app.post("/tasks/edit/:id", async (req, res) => {

    const id = req.params.id;

    const {
        title,
        priority,
        importance
    } = req.body;

    await tasksCollection.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                title: title,
                priority: priority,
                importance: importance
            }
        }
    );

    res.redirect("/matrix");

});

// Display all tasks using EJS
app.get("/view-tasks", async (req, res) => {

    const tasks = await tasksCollection.find({}).toArray();

    res.render("tasks", {
        tasks: tasks
    });

});

// Add a new task
app.post("/tasks", async (req, res) => {

    const {
        title,
        priority,
        importance
    } = req.body;

    const newTask = {
        title: title,
        priority: priority,
        importance: importance,
        completed: false
    };

    await tasksCollection.insertOne(newTask);

    // Redirect to Matrix
    res.redirect("/matrix");

});

// Eisenhower Matrix
app.get("/matrix", async (req, res) => {

    const tasks = await tasksCollection.find({}).toArray();

    res.render("matrix", {
        tasks: tasks
    });

});

// Start server
async function startServer() {

    await connectDB();

    app.listen(3000, () => {

        console.log("Server running at http://localhost:3000");

    });

}

startServer();