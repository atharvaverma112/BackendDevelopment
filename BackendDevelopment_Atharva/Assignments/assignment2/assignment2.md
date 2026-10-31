Q1. What is JSONB in PostgreSQL, and how does it differ from JSON?
JSONB is a PostgreSQL data type that stores JSON data in a decomposed binary format. PostgreSQL provides two types: JSON and JSONB.
- JSON: Stores data as plain text and preserves the original formatting and key order.
- JSONB: Stores data in binary format, does not preserve key order or whitespace, and removes duplicate keys.
JSON is generally faster for insertion because it requires less processing. JSONB may take slightly longer to insert, but provides faster querying and supports indexing using GIN indexes.
SQL example
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_data JSONB
);

INSERT INTO users (user_data)
VALUES ('{"name": "Atharva", "age": 20}');

SELECT user_data ->> 'name'
FROM users;




Q2. How can PostgreSQL work as both a SQL and a NoSQL database in the same table?

PostgreSQL can work as both SQL and NoSQL by combining normal relational columns with a JSONB column.

Fixed columns such as id, name and price store structured data with defined data types. The JSONB column stores flexible attributes that may differ between records.

This allows PostgreSQL to manage structured relational data and flexible document-style data in the same table without creating separate tables for every attribute.

SQL Example:
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price NUMERIC(10,2),
    attributes JSONB
);

INSERT INTO products (name, price, attributes)
VALUES (
    'Laptop',
    55000,
    '{"ram": "16GB", "color": "Silver"}'
);





Q3. Give an example of a JSONB query using each of these operators, with the value it returns: ->, ->>, @> and ?. Explain the difference between the first two.

PostgreSQL provides different operators to access and search JSONB data.

Consider this example:
SELECT
'{"name":"Atharva","age":20,"city":"Delhi"}'::jsonb;

1. -> Operator: Returns a JSON value.
SELECT '{"name":"Atharva"}'::jsonb -> 'name';
2. ->> Operator: Returns the value as plain text.
SELECT '{"name":"Atharva"}'::jsonb ->> 'name';
3. @> Operator: Checks whether JSONB contains a specified value.
SELECT '{"name":"Atharva","age":20}'::jsonb
@> '{"age":20}'::jsonb;
4. ? Operator: Checks whether a particular key exists.
SELECT '{"name":"Atharva","age":20}'::jsonb ? 'name';






Q4. How can a GIN index on a JSONB column change query performance?

A GIN (Generalized Inverted Index) index improves the performance of searches on JSONB columns. It helps PostgreSQL quickly find records containing specific keys or key-value pairs without scanning every row.

It is useful for queries using operators such as @> and ?. However, it does not directly improve queries that filter using ordinary relational columns or perform unrelated calculations.

SQL Example:
-- Create GIN index
CREATE INDEX idx_attributes
ON products USING GIN (attributes);

-- Search using JSONB containment
SELECT name
FROM products
WHERE attributes @> '{"wireless": true}';






Q5. Where could PostgreSQL + JSONB replace a MongoDB deployment, and where would MongoDB still be the better fit?

PostgreSQL with JSONB can replace MongoDB when an application needs both structured relational data and flexible JSON documents. PostgreSQL provides strong transactions, SQL queries, joins and schema enforcement, making it suitable for applications that require data consistency.

MongoDB may be a better choice for applications with highly flexible document structures, large-scale distributed data and a strong need for horizontal scaling.

PostgreSQL is useful when relational operations and JSON storage are needed together, while MongoDB is suitable for document-focused applications with rapidly changing data structures.

SQL Example:
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    attributes JSONB
);

INSERT INTO products (name, attributes)
VALUES (
    'Laptop',
    '{"ram": "16GB", "color": "Silver"}'
);