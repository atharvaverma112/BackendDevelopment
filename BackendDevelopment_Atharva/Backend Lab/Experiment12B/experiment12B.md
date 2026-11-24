# Experiment 12B – Cookies and Session Management in Express.js

## Overview

This experiment demonstrates cookie handling and session management in Node.js using Express.js. It includes practical implementations of creating, retrieving and deleting cookies, maintaining user sessions, and implementing a basic login/logout system.

## Technologies Used

- Node.js
- Express.js
- cookie-parser
- express-session

## Project Structure

- `session-cookie-demo/server.js` – Login and logout using sessions and cookies.
- `source/cookie-example.js` – Creating, retrieving and deleting cookies.
- `source/session-example.js` – Session management and visit counting.
- `package.json` – Project dependencies and configuration.

## Key Concepts Covered

1. **Cookies:** Creating and managing browser cookies using `res.cookie()`.
2. **Cookie Parser:** Reading cookies using `req.cookies`.
3. **Session Management:** Storing user information using `express-session`.
4. **Session Tracking:** Counting user visits using session variables.
5. **Login and Logout:** Creating a basic login system and destroying sessions.
6. **Cookie Expiration:** Setting cookie expiry using `maxAge`.
7. **Middleware:** Configuring cookie and session middleware in Express.js.

## Practical Features

- Set, retrieve and delete cookies.
- Track the number of visits using sessions.
- Store a username after login.
- Display a personalized welcome message.
- Destroy sessions and clear cookies during logout.

## Learning Outcomes

- Understand cookies and sessions.
- Implement cookie handling in Express.js.
- Maintain user state across requests.
- Create basic login and logout functionality.
- Work with Express middleware.

## Conclusion

This experiment provides practical knowledge of cookie handling and session management using Express.js, demonstrating how web applications maintain user information across multiple requests.