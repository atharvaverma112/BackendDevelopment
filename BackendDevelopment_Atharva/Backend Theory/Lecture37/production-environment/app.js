
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3002;

// Production environment home route
app.get("/", (req, res) => {
    res.send("Welcome to Production Environment!");
});

// Production environment information
app.get("/info", (req, res) => {
    res.json({
        environment: process.env.NODE_ENV || "production",
        status: "Running",
        message: "Application is running in production mode",
        port: PORT
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Production Environment running at http://localhost:${PORT}`);
});
