
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
const DB_URL = 'mongodb://localhost:27017/userdb';

mongoose.connect(DB_URL)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Home Route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>User Management System</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 50px auto;
          padding: 20px;
        }
        .container {
          background: #f5f5f5;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
        }
        h2 { color: #333; }
        input {
          width: 100%;
          padding: 10px;
          margin: 5px 0;
          box-sizing: border-box;
        }
        button {
          background: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          margin: 5px;
        }
        button:hover { background: #0056b3; }
        .success { color: green; }
        .error { color: red; }
      </style>
    </head>
    <body>
      <h1>User Management System</h1>

      <div class="container">
        <h2>Register New User</h2>
        <form action="/signup" method="POST">
          <input type="text" name="username" placeholder="Username" required>
          <input type="email" name="email" placeholder="Email" required>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div class="container">
        <h2>Login</h2>
        <form action="/login" method="POST">
          <input type="text" name="username" placeholder="Username" required>
          <input type="password" name="password" placeholder="Password" required>
          <button type="submit">Login</button>
        </form>
      </div>

      <div class="container">
        <h2>View All Users</h2>
        <form action="/users" method="GET">
          <button type="submit">Show All Registered Users</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// Signup Route
app.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({
      username,
      email,
      password
    });

    await newUser.save();

    res.send(`
      <h2 class="success">User registered successfully!</h2>
      <p>Username: ${username}</p>
      <p>Email: ${email}</p>
      <a href="/">Go back to home</a>
    `);

  } catch (error) {
    if (error.code === 11000) {
      res.send(`
        <h2 class="error">Error: Username or email already exists</h2>
        <a href="/">Go back and try again</a>
      `);
    } else {
      res.send(`
        <h2 class="error">Error: ${error.message}</h2>
        <a href="/">Go back and try again</a>
      `);
    }
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.send(`
        <h2 class="error">User not found</h2>
        <a href="/">Go back and try again</a>
      `);
    }

    if (user.password !== password) {
      return res.send(`
        <h2 class="error">Incorrect password</h2>
        <a href="/">Go back and try again</a>
      `);
    }

    res.send(`
      <h2 class="success">Login successful!</h2>
      <p>Welcome back, ${user.username}!</p>
      <p>Email: ${user.email}</p>
      <p>Account created: ${user.createdAt.toDateString()}</p>
      <a href="/">Go back to home</a>
    `);

  } catch (error) {
    res.send(`
      <h2 class="error">Error: ${error.message}</h2>
      <a href="/">Go back and try again</a>
    `);
  }
});

// Get All Users Route
app.get('/users', async (req, res) => {
  try {
    const allUsers = await User.find();

    if (allUsers.length === 0) {
      return res.send(`
        <h2>No users registered yet</h2>
        <a href="/">Go back to home</a>
      `);
    }

    let userList = '<h2>Registered Users</h2><ul>';

    allUsers.forEach(user => {
      userList += `
        <li>
          <strong>Username:</strong> ${user.username} |
          <strong>Email:</strong> ${user.email} |
          <strong>Joined:</strong> ${user.createdAt.toDateString()}
        </li>
      `;
    });

    userList += '</ul><a href="/">Go back to home</a>';
    res.send(userList);

  } catch (error) {
    res.send(`
      <h2 class="error">Error: ${error.message}</h2>
      <a href="/">Go back and try again</a>
    `);
  }
});

// Start Server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
