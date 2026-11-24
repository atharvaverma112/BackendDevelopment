
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to Local Environment!");
});

// Environment information
app.get("/info", (req, res) => {
    res.json({
        environment: process.env.NODE_ENV || "development",
        status: "Running",
        message: "Application is running locally",
        port: PORT
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Local Environment running at http://localhost:${PORT}`);
});
