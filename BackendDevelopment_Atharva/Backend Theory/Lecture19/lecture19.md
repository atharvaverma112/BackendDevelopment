# Lecture 19 – Student Management REST API Using FastAPI

## Overview

This lecture focuses on developing a RESTful Student Management API using FastAPI, SQLAlchemy, Pydantic and SQLite.

The application manages departments, students, courses and enrollments. It demonstrates how to create API endpoints, connect a database, validate incoming data, perform CRUD operations and retrieve records using filtering, searching and pagination.

## Technologies Used

- Python
- FastAPI
- SQLAlchemy
- SQLite
- Pydantic
- EmailStr
- Uvicorn
- Python-dotenv

## Project Structure

| File | Purpose |
|---|---|
| `main.py` | Defines the FastAPI application and API endpoints |
| `database.py` | Handles database connection and session management |
| `models.py` | Defines SQLAlchemy database models |
| `schemas.py` | Defines Pydantic schemas for request validation and responses |
| `.env` | Stores environment configuration such as the database URL |
| `requirements.txt` | Contains required Python dependencies |
| `students.db` | SQLite database file |
| `screenshots/` | Stores practical screenshots |

## 1. Database Configuration

Implemented database connectivity using SQLAlchemy.

- Used SQLite as the default database.
- Configured the database URL using environment variables.
- Used `create_engine()` to establish the database connection.
- Used `sessionmaker()` to create database sessions.
- Created a `get_db()` dependency to provide database sessions to API endpoints.
- Closed database sessions after each request.

## 2. Database Models

Created four SQLAlchemy models:

| Model | Description |
|---|---|
| `Department` | Stores department information |
| `Student` | Stores student details |
| `Course` | Stores course information |
| `Enrollment` | Stores student course enrollment information |

### Database Relationships

- One department can have multiple students.
- One department can have multiple courses.
- One student can have multiple enrollments.
- One course can have multiple enrollments.

Implemented relationships using:
- `ForeignKey`
- `relationship()`
- `back_populates`
- Composite primary keys

Additional features include timestamps, unique email constraints and cascading deletion of student enrollments.

## 3. Pydantic Schemas and Validation

Used Pydantic to validate incoming API data and define response structures.

Implemented schemas for:

- Department creation and response.
- Student creation, updating and response.
- Course creation and response.
- Enrollment creation and response.
- Paginated student list responses.
- Error responses.

### Validation Features

- Required fields.
- Minimum and maximum string lengths.
- Email validation using `EmailStr`.
- Branch validation using `BranchEnum`.
- Course credit validation between 1 and 6.
- Optional fields using `Optional`.
- ORM object serialization using `from_attributes = True`.

## 4. FastAPI Application and API Endpoints

Created a FastAPI application named `Student Management API`.

### Department APIs

| Method | Endpoint | Function |
|---|---|---|
| GET | `/departments` | Retrieve all departments |
| POST | `/departments` | Create a new department |

Implemented duplicate department checking.

### Student APIs

| Method | Endpoint | Function |
|---|---|---|
| GET | `/students` | Retrieve students with filtering and pagination |
| GET | `/students/{student_id}` | Retrieve a student by ID |
| POST | `/students` | Create a new student |
| PUT | `/students/{student_id}` | Update student information |
| DELETE | `/students/{student_id}` | Delete a student |

### Student API Features

The student listing endpoint supports:

- Filtering by branch.
- Filtering by department ID.
- Searching by student name or email.
- Pagination using `page` and `limit`.
- Sorting by student ID.

The response includes:
- Student data.
- Total number of records.
- Current page.
- Page limit.
- Total number of pages.

### Course APIs

| Method | Endpoint | Function |
|---|---|---|
| GET | `/courses` | Retrieve courses |
| POST | `/courses` | Create a new course |

Course retrieval supports filtering by department ID and credit count.

### Enrollment APIs

| Method | Endpoint | Function |
|---|---|---|
| GET | `/students/{student_id}/enrollments` | Retrieve a student's enrollments |
| POST | `/students/{student_id}/enrollments` | Enroll a student in a course |
| DELETE | `/students/{student_id}/enrollments/{course_id}` | Delete an enrollment |

Implemented checks to verify that students and courses exist and to prevent duplicate enrollments.

## 5. CRUD Operations

The application implements the four fundamental database operations:

| Operation | Purpose | HTTP Method |
|---|---|---|
| CREATE | Add departments, students, courses and enrollments | POST |
| READ | Retrieve records from the database | GET |
| UPDATE | Modify student information | PUT |
| DELETE | Remove students and enrollments | DELETE |

## 6. Error Handling and HTTP Status Codes

Implemented error handling using FastAPI's `HTTPException`.

Important status codes used:

| Status Code | Meaning |
|---|---|
| 201 | Resource created successfully |
| 204 | Resource deleted successfully |
| 404 | Requested resource not found |
| 409 | Conflict, such as duplicate records |

Examples include duplicate email detection, missing students, missing departments, missing courses and duplicate enrollments.

## 7. API Dependency Injection

Used FastAPI's `Depends()` to inject database sessions into API endpoints.

This allows endpoints to access the database without manually creating and closing a session in every route.

## 8. Running the Application

The application can be run directly using:

```bash
py main.py
```

The application uses Uvicorn as the ASGI server and runs on:

```text
http://127.0.0.1:8000
```

## Key Concepts Covered

| Concept | Purpose |
|---|---|
| REST API | Communication through HTTP endpoints |
| FastAPI | Building backend APIs |
| SQLAlchemy | Database interaction using ORM |
| SQLite | Relational database storage |
| Pydantic | Request validation and response schemas |
| CRUD | Create, Read, Update and Delete operations |
| Dependency Injection | Providing database sessions to routes |
| Foreign Keys | Establishing database relationships |
| Pagination | Retrieving records in smaller pages |
| Filtering | Retrieving records based on conditions |
| Searching | Finding students by name or email |
| HTTPException | Handling API errors |
| Environment Variables | Managing configuration using `.env` |

## Learning Outcomes

After completing this lecture, students should be able to:

1. Build RESTful APIs using FastAPI.
2. Connect a Python application to SQLite using SQLAlchemy.
3. Create database models and establish relationships.
4. Define request and response schemas using Pydantic.
5. Implement CRUD operations through API endpoints.
6. Use dependency injection for database session management.
7. Implement filtering, searching and pagination.
8. Handle API errors using appropriate HTTP status codes.
9. Validate incoming data using Pydantic.
10. Organize a backend application using separate modules.

## Conclusion

Lecture 19 provides practical experience in developing a complete Student Management REST API using FastAPI. It combines database integration, ORM models, Pydantic validation, CRUD operations, API routing, filtering, searching, pagination and error handling into a structured backend application.