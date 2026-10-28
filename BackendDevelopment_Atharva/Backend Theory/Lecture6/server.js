
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session configuration
app.use(session({
    secret: "lecture6-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000,
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    }
}));

// Home page
app.get("/", (req, res) => {
    res.send(`
        <h1>Lecture 06: Session and Cookie Management</h1>
        <p><a href="/login">Login</a></p>
        <p><a href="/profile">View Profile</a></p>
        <p><a href="/logout">Logout</a></p>
        <p><a href="/setcookie">Set Cookie</a></p>
        <p><a href="/getcookie">Read Cookie</a></p>
        <p><a href="/deletecookie">Delete Cookie</a></p>
        <p><a href="/welcome?user=Atharva&role=student">Query String Example</a></p>
    `);
});

// Login: create session
app.get("/login", (req, res) => {
    req.session.username = "Atharva";
    res.send("Session started for " + req.session.username);
});

// Profile: read session
app.get("/profile", (req, res) => {
    if (req.session.username) {
        res.send("Welcome " + req.session.username);
    } else {
        res.send("Please log in first.");
    }
});

// Logout: destroy session
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Error destroying session");
        }

        res.clearCookie("connect.sid");
        res.send("Logged out successfully. Session destroyed.");
    });
});

// Set cookie
app.get("/setcookie", (req, res) => {
    res.cookie("username", "Atharva", {
        maxAge: 3600000,
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.send("Cookie has been set!");
});

// Read cookie
app.get("/getcookie", (req, res) => {
    const username = req.cookies.username;

    if (username) {
        res.send("Welcome back, " + username);
    } else {
        res.send("No cookie found.");
    }
});

// Delete cookie
app.get("/deletecookie", (req, res) => {
    res.clearCookie("username");
    res.send("Cookie deleted.");
});

// Query string example
app.get("/welcome", (req, res) => {
    const user = req.query.user || "Guest";
    const role = req.query.role || "visitor";

    res.send(`Welcome ${user}, your role is ${role}`);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
