
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3001;

// Staging environment home route
app.get("/", (req, res) => {
    res.send("Welcome to Staging Environment!");
});

// Staging environment information
app.get("/info", (req, res) => {
    res.json({
        environment: process.env.NODE_ENV || "staging",
        status: "Running",
        message: "Application is running in staging mode",
        port: PORT
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Staging Environment running at http://localhost:${PORT}`);
});
