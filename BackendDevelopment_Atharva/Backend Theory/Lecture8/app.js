
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Home route: Display all students
app.get('/', (req, res) => {
    const students = [
        { id: 1, name: 'Aarav', course: 'B.Tech CSE' },
        { id: 2, name: 'Diya', course: 'B.Tech ECE' },
        { id: 3, name: 'Rahul', course: 'B.Tech AIML' }
    ];

    res.render('home', {
        name: 'Rahul',
        course: 'B.Tech AIML',
        students: students
    });
});

// Display individual student details
app.get('/students/:id', (req, res) => {
    const students = [
        { id: 1, name: 'Aarav', course: 'B.Tech CSE' },
        { id: 2, name: 'Diya', course: 'B.Tech ECE' },
        { id: 3, name: 'Rahul', course: 'B.Tech AIML' }
    ];

    const student = students.find(
        s => s.id === Number(req.params.id)
    );

    if (!student) {
        return res.status(404).send('Student not found');
    }

    res.render('student', {
        student: student
    });
});

// About route: Display course and lecturer details
app.get('/about', (req, res) => {
    res.render('about', {
        courseName: 'Backend Development',
        lecturerName: 'Your Lecturer Name'
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send('404 - Page Not Found');
});

// Start server
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
