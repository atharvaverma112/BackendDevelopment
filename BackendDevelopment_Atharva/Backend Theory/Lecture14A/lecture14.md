# Lecture 14A – Database Schema Design

## Overview

This lecture focuses on relational database schema design using PostgreSQL. It demonstrates how to design a Library Management System using multiple related tables and how to normalize an orders database up to Third Normal Form (3NF).

## Technology Used

- PostgreSQL
- SQL
- Relational Database Management System (RDBMS)

## Part 1: Library Management System

### 1. Database Creation

Created a database named `library_management` to store library-related information.

### 2. Table Creation

Created the following five tables:

| Table | Purpose |
|---|---|
| `authors` | Stores author information |
| `books` | Stores book details, ISBN and publication year |
| `book_authors` | Establishes relationships between books and authors |
| `members` | Stores library member information |
| `loans` | Stores book borrowing and return records |

### 3. Database Relationships

- Implemented a **many-to-many relationship** between books and authors using the `book_authors` junction table.
- Established foreign key relationships between members, books and loans.
- Used a composite primary key in the `book_authors` table.

### 4. Constraints Used

- `PRIMARY KEY` – Uniquely identifies records.
- `FOREIGN KEY` – Establishes relationships between tables.
- `UNIQUE` – Prevents duplicate ISBN and email values.
- `NOT NULL` – Ensures required fields contain values.
- `CHECK` – Ensures the return date is not earlier than the loan date.

### 5. Data Insertion and Retrieval

- Inserted sample authors, books, members and loan records.
- Retrieved records from individual tables using `SELECT`.
- Used `JOIN` operations to display:
  - Books and their authors.
  - Members and the books they borrowed.

## Part 2: Database Normalization to 3NF

### 1. Original Orders Table

Created an `orders_raw` table containing customer details, product details, prices and quantities.

### 2. Normalized Database Design

Divided the original data into four related tables:

| Table | Purpose |
|---|---|
| `customers` | Stores customer details |
| `products` | Stores product names and prices |
| `orders` | Stores order information and customer references |
| `order_items` | Stores products and quantities associated with each order |

### 3. Relationships and Constraints

- Used primary keys to uniquely identify records.
- Used foreign keys to connect customers, orders and products.
- Used a composite primary key in `order_items`.
- Applied `UNIQUE`, `NOT NULL` and `CHECK` constraints.
- Ensured product prices are non-negative and order quantities are positive.

### 4. Retrieving Normalized Order Details

Used multiple `JOIN` operations to combine data from:

- `orders`
- `customers`
- `order_items`
- `products`

Used `ORDER BY` to sort the final order details by order ID and product name.

## SQL Concepts Covered

| Concept | Application |
|---|---|
| Database Schema Design | Designing relational tables |
| Primary Key | Identifying records uniquely |
| Foreign Key | Establishing table relationships |
| Composite Primary Key | Identifying records using multiple columns |
| Many-to-Many Relationship | Connecting books and authors |
| One-to-Many Relationship | Connecting members with loans |
| Constraints | Maintaining data integrity |
| JOIN | Combining related table records |
| Database Normalization | Organizing data into related tables |
| 3NF | Structuring the normalized orders database |

## Learning Outcomes

After completing this practical, students should be able to:

1. Design relational database schemas using PostgreSQL.
2. Create multiple related tables.
3. Implement primary keys, foreign keys and composite keys.
4. Understand and implement one-to-many and many-to-many relationships.
5. Apply database constraints to maintain data integrity.
6. Retrieve related information using SQL JOIN operations.
7. Understand database normalization and its application to 3NF.
8. Organize customer, product and order information into normalized tables.

## Conclusion

Lecture 14A provides practical experience in relational database schema design and normalization using PostgreSQL. It demonstrates how to build a Library Management System with appropriate table relationships and how to restructure an orders database into a normalized design using separate related tables.