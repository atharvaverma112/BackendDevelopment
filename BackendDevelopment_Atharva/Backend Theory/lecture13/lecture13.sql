-- ==========================================
-- LECTURE 13: INTRODUCTION TO DATABASES
-- PostgreSQL - Complete SQL Practical
-- ==========================================

-- STEP 1: Create the database
CREATE DATABASE studentmanagement;

-- STEP 2: Connect to the database
\c studentmanagement

-- STEP 3: Create the students table
CREATE TABLE students (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    enrollment_date DATE
);

-- STEP 4: Insert five student records
INSERT INTO students
    (id, name, branch, email, enrollment_date)
VALUES
    (1, 'Aarav', 'CSE', 'aarav@upes.ac.in', '2024-01-15'),
    (2, 'Diya', 'ECE', 'diya@upes.ac.in', '2024-02-10'),
    (3, 'Rohan', 'IT', 'rohan@upes.ac.in', '2023-12-20'),
    (4, 'Priya', 'CSE', 'priya@upes.ac.in', '2024-06-05'),
    (5, 'Karan', 'CSE', 'karan@upes.ac.in', '2025-01-12');

-- STEP 5: Display all students
SELECT * FROM students;

-- STEP 6: Retrieve students in the CSE branch
SELECT * FROM students
WHERE branch = 'CSE';

-- STEP 7: Find students enrolled after January 2024
SELECT * FROM students
WHERE enrollment_date > '2024-01-31';

-- STEP 8: Update a student's branch
UPDATE students
SET branch = 'ECE'
WHERE id = 1;

-- Verify the update
SELECT * FROM students
WHERE id = 1;

-- STEP 9: Delete a student record
DELETE FROM students
WHERE id = 4;

-- Verify the deletion
SELECT * FROM students;

-- STEP 10: Create a courses table
CREATE TABLE courses (
    id INT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL
);

-- STEP 11: Insert courses
INSERT INTO courses (id, course_name)
VALUES
    (101, 'Computer Science'),
    (102, 'Electronics'),
    (103, 'Artificial Intelligence');

-- STEP 12: Create an enrollments table
-- Demonstrates foreign key relationships
CREATE TABLE enrollments (
    id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- STEP 13: Insert enrollment records
INSERT INTO enrollments (id, student_id, course_id)
VALUES
    (1, 1, 101),
    (2, 2, 102),
    (3, 3, 103);

-- STEP 14: View enrollment records
SELECT * FROM enrollments;

-- STEP 15: Count students
SELECT COUNT(*) FROM students;

-- STEP 16: Display CSE students in alphabetical order
SELECT * FROM students
WHERE branch = 'CSE'
ORDER BY name;