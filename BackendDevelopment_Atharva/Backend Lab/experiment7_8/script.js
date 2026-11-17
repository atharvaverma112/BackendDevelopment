// Experiment 07 & 08
// ES6, DOM Manipulation and Event Handling

// 1. ES6: Using let and const
const studentName = "Atharva";
let message = `Welcome, ${studentName}!`;

// 2. ES6: Arrow function
const displayMessage = () => {
    document.getElementById("message").textContent = message;
};

// 3. DOM Manipulation
const heading = document.getElementById("message");

// 4. Event Handling: Change Message button
document.getElementById("changeBtn").addEventListener("click", () => {
    heading.textContent = "Message changed using DOM!";
    heading.style.color = "green";
});

// 5. Event Handling: Change Background button
document.getElementById("colorBtn").addEventListener("click", () => {
    document.body.style.backgroundColor = "#d1e7dd";
});

// Display initial message
displayMessage();