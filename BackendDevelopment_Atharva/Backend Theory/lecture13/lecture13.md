# Lecture 13 – Introduction to Databases

## Overview

This lecture introduces database management using PostgreSQL. It covers SQL commands for creating databases and tables, inserting records, retrieving information, updating and deleting records, and establishing relationships between tables.

The practical uses a Student Management Database to demonstrate fundamental SQL operations.

## Technology Used

- PostgreSQL
- SQL
- pgAdmin / PostgreSQL Command Line (if used)

## Practical Implementation

### 1. Database Creation
- Created a database named `studentmanagement`.
- Connected to the newly created database.

### 2. Table Creation
Created three tables:

- **students:** Stores student ID, name, branch, email, and enrollment date.
- **courses:** Stores course ID and course name.
- **enrollments:** Stores enrollment ID, student ID, and course ID.

### 3. Data Insertion
- Inserted five student records into the students table.
- Inserted three course records into the courses table.
- Inserted enrollment records into the enrollments table.

### 4. Data Retrieval
Practised retrieving information using:
- `SELECT *` to display all records.
- `WHERE` to filter students by branch.
- Date conditions to find students enrolled after January 2024.

### 5. Data Modification
- Used `UPDATE` to modify a student's branch.
- Used `DELETE` to remove a student record.
- Verified changes using SELECT queries.

### 6. Relationships and Foreign Keys
Created relationships between the students, courses, and enrollments tables using foreign keys.

### 7. Aggregate and Sorting Operations
- Used `COUNT()` to count student records.
- Used `ORDER BY` to display CSE students alphabetically by name.

## SQL Concepts Covered

| SQL Concept | Purpose |
|---|---|
| CREATE DATABASE | Creates a database |
| CREATE TABLE | Creates database tables |
| INSERT INTO | Inserts records |
| SELECT | Retrieves records |
| WHERE | Filters records |
| UPDATE | Modifies existing records |
| DELETE | Removes records |
| PRIMARY KEY | Uniquely identifies records |
| FOREIGN KEY | Establishes relationships between tables |
| COUNT() | Counts records |
| ORDER BY | Sorts query results |

## Learning Outcomes

After completing this practical, students should be able to:

1. Create and manage databases using PostgreSQL.
2. Create tables with appropriate data types and constraints.
3. Insert, retrieve, update, and delete records.
4. Apply filtering and sorting operations in SQL.
5. Understand primary key and foreign key constraints.
6. Establish relationships between multiple tables.
7. Perform basic aggregate operations using SQL.

## Conclusion

Lecture 13 provides practical knowledge of relational database management using PostgreSQL. It demonstrates fundamental SQL operations through a Student Management Database and introduces relationships between tables using primary and foreign keys.