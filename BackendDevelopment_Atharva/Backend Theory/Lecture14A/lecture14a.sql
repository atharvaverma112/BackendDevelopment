
-- =====================================================
-- LECTURE 14 A: DATABASE SCHEMA DESIGN
-- Library Management System
-- PostgreSQL
-- =====================================================

-- STEP 1: Create the database
-- Run this command only once, outside the database.
CREATE DATABASE library_management;

-- Connect to the database in the psql terminal:
-- \c library_management


-- STEP 2: Create the Authors table
CREATE TABLE authors (
    author_id INT PRIMARY KEY,
    author_name VARCHAR(100) NOT NULL
);


-- STEP 3: Create the Books table
CREATE TABLE books (
    book_id INT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    isbn VARCHAR(20) UNIQUE,
    publication_year INT
);


-- STEP 4: Create the many-to-many relationship
-- One book can have multiple authors.
-- One author can write multiple books.
CREATE TABLE book_authors (
    book_id INT,
    author_id INT,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (author_id) REFERENCES authors(author_id)
);


-- STEP 5: Create the Members table
CREATE TABLE members (
    member_id INT PRIMARY KEY,
    member_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone VARCHAR(20)
);


-- STEP 6: Create the Loans table
-- A member can borrow multiple books over time.
CREATE TABLE loans (
    loan_id INT PRIMARY KEY,
    member_id INT NOT NULL,
    book_id INT NOT NULL,
    loan_date DATE NOT NULL,
    return_date DATE,
    FOREIGN KEY (member_id) REFERENCES members(member_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    CHECK (return_date IS NULL OR return_date >= loan_date)
);


-- STEP 7: Insert sample authors
INSERT INTO authors (author_id, author_name)
VALUES
    (1, 'J. K. Rowling'),
    (2, 'George Orwell'),
    (3, 'Robert Martin');


-- STEP 8: Insert sample books
INSERT INTO books (book_id, title, isbn, publication_year)
VALUES
    (101, 'Harry Potter', 'ISBN101', 1997),
    (102, '1984', 'ISBN102', 1949),
    (103, 'Clean Code', 'ISBN103', 2008);


-- STEP 9: Link books with authors
INSERT INTO book_authors (book_id, author_id)
VALUES
    (101, 1),
    (102, 2),
    (103, 3);


-- STEP 10: Insert sample members
INSERT INTO members (member_id, member_name, email, phone)
VALUES
    (1, 'Atharva', 'atharva@example.com', '9876543210'),
    (2, 'Rahul', 'rahul@example.com', '9876501234');


-- STEP 11: Insert sample loan records
INSERT INTO loans (loan_id, member_id, book_id, loan_date, return_date)
VALUES
    (1, 1, 101, '2026-10-01', '2026-10-10'),
    (2, 2, 102, '2026-10-05', NULL),
    (3, 1, 103, '2026-10-12', NULL);


-- STEP 12: Display all books
SELECT * FROM books;


-- STEP 13: Display all authors
SELECT * FROM authors;


-- STEP 14: Display all members
SELECT * FROM members;


-- STEP 15: Display all loan records
SELECT * FROM loans;


-- STEP 16: Display books and their authors
SELECT
    books.title,
    authors.author_name
FROM books
JOIN book_authors
    ON books.book_id = book_authors.book_id
JOIN authors
    ON book_authors.author_id = authors.author_id;


-- STEP 17: Display members and the books they borrowed
SELECT
    members.member_name,
    books.title,
    loans.loan_date,
    loans.return_date
FROM loans
JOIN members
    ON loans.member_id = members.member_id
JOIN books
    ON loans.book_id = books.book_id;


-- =====================================================
-- PART 2: NORMALIZATION TO THIRD NORMAL FORM (3NF)
-- Based on the orders table in the Lecture 14 A PDF
-- =====================================================

-- STEP 18: Create the original orders table
CREATE TABLE orders_raw (
    order_id INT,
    customer_name VARCHAR(100),
    customer_email VARCHAR(150),
    product_name VARCHAR(100),
    product_price NUMERIC(10, 2),
    quantity INT,
    PRIMARY KEY (order_id, product_name)
);


-- STEP 19: Insert the PDF's sample order data
INSERT INTO orders_raw
    (order_id, customer_name, customer_email,
     product_name, product_price, quantity)
VALUES
    (1, 'Aarav', 'aarav@email', 'Laptop', 65000, 1),
    (1, 'Aarav', 'aarav@email', 'Mouse', 500, 2),
    (2, 'Diya', 'diya@email', 'Keyboard', 1500, 1);


-- STEP 20: Create the Customers table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_email VARCHAR(150) NOT NULL
);


-- STEP 21: Create the Products table
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL UNIQUE,
    product_price NUMERIC(10, 2) NOT NULL,
    CHECK (product_price >= 0)
);


-- STEP 22: Create the normalized Orders table
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);


-- STEP 23: Create the Order_Items table
CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    CHECK (quantity > 0)
);


-- STEP 24: Insert customers
INSERT INTO customers
    (customer_id, customer_name, customer_email)
VALUES
    (1, 'Aarav', 'aarav@email'),
    (2, 'Diya', 'diya@email');


-- STEP 25: Insert products
INSERT INTO products
    (product_id, product_name, product_price)
VALUES
    (101, 'Laptop', 65000),
    (102, 'Mouse', 500),
    (103, 'Keyboard', 1500);


-- STEP 26: Insert orders
INSERT INTO orders (order_id, customer_id)
VALUES
    (1, 1),
    (2, 2);


-- STEP 27: Insert order items
INSERT INTO order_items (order_id, product_id, quantity)
VALUES
    (1, 101, 1),
    (1, 102, 2),
    (2, 103, 1);


-- STEP 28: Display the normalized order details
SELECT
    orders.order_id,
    customers.customer_name,
    customers.customer_email,
    products.product_name,
    products.product_price,
    order_items.quantity
FROM orders
JOIN customers
    ON orders.customer_id = customers.customer_id
JOIN order_items
    ON orders.order_id = order_items.order_id
JOIN products
    ON order_items.product_id = products.product_id
ORDER BY orders.order_id, products.product_name;
