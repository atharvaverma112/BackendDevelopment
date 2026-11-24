# Lecture 15 – Database Integration and ORM

## Overview

This lecture focuses on database integration and Object Relational Mapping (ORM) using MongoDB with Mongoose and SQLite with SQLAlchemy.

The practical consists of two applications: a Blog Application demonstrating schema validation using Mongoose and a Student Management System demonstrating database relationships and CRUD operations using SQLAlchemy.

## Technologies Used

- Node.js
- JavaScript
- MongoDB
- Mongoose
- Python
- SQLAlchemy
- SQLite

# Part 1: Blog Application Using MongoDB and Mongoose

## 1. Database Connection

- Connected the Node.js application to MongoDB.
- Used Mongoose to establish a connection.
- Created a database named `blog_app`.

## 2. Post Schema

Created a Post schema with the following fields:

| Field | Description |
|---|---|
| `title` | Post title with required and minimum-length validation |
| `content` | Post content |
| `author` | Author name |
| `category` | Category restricted to Technology, Education or Lifestyle |

Implemented validation rules such as:
- Required fields.
- Minimum string length.
- Trimming unnecessary whitespace.
- Enum validation.
- Default category value.
- Automatic timestamps.

## 3. Comment Schema

Created a Comment schema containing:

- `text` – Comment content.
- `author` – Comment author's name.
- `post` – Reference to the associated Post document.

Used MongoDB ObjectId references to associate comments with posts.

## 4. Mongoose Models

Created two models:

- `Post`
- `Comment`

These models are used to work with the corresponding MongoDB collections.

## 5. Schema Validation

Implemented a validation test using an intentionally invalid post.

The test checks:
- Title minimum-length validation.
- Category enum validation.
- Validation error handling.
- Displaying individual validation messages.

Used `validate()` to check the document without saving it to MongoDB.

# Part 2: Student Management System Using SQLAlchemy

## 1. Database Connection

- Used SQLite as the database.
- Created a database named `students.db`.
- Used SQLAlchemy to connect Python with the database.

## 2. Database Models

Created four database models:

| Model | Purpose |
|---|---|
| `Department` | Stores department information |
| `Student` | Stores student details |
| `Course` | Stores course information |
| `Enrollment` | Stores student course enrollment details |

## 3. Database Relationships

Implemented relationships between the models:

- One department can have multiple students.
- One department can offer multiple courses.
- One student can have multiple enrollments.
- One course can have multiple enrollments.

Used:
- `ForeignKey` to establish database relationships.
- `relationship()` to define ORM relationships.
- Composite primary keys in the Enrollment model.

## 4. Database Table Creation

Used `Base.metadata.create_all(engine)` to create database tables based on the defined SQLAlchemy models.

## 5. CRUD Operations

Implemented the four basic database operations:

| Operation | Implementation |
|---|---|
| CREATE | Added a department and a new student |
| READ | Retrieved all students belonging to the CSE branch |
| UPDATE | Changed a student's branch from CSE to ECE |
| DELETE | Removed the student record |

Also implemented a check to prevent duplicate departments and students from being inserted.

## SQLAlchemy Concepts Covered

- Database engine creation.
- Declarative base models.
- Column definitions and data types.
- Primary keys and foreign keys.
- ORM relationships.
- Database sessions.
- Query filtering using `filter_by()`.
- Inserting, retrieving, updating and deleting records.
- Database table creation using metadata.

## Learning Outcomes

After completing this lecture, students should be able to:

1. Connect a Node.js application to MongoDB using Mongoose.
2. Create schemas and models using Mongoose.
3. Apply schema validation rules and handle validation errors.
4. Understand ObjectId references between MongoDB documents.
5. Connect Python applications to SQLite using SQLAlchemy.
6. Create database models using ORM.
7. Establish relationships between multiple database tables.
8. Perform CRUD operations using SQLAlchemy.
9. Understand the role of database sessions and queries.

## Conclusion

Lecture 15 provides practical experience in database integration using two different technologies. The first practical demonstrates MongoDB schema design and validation using Mongoose, while the second demonstrates relational database modelling, relationships and CRUD operations using SQLAlchemy and SQLite.