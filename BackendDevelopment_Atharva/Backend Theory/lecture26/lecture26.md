# Lecture 26 – Introduction to Django REST API

## Overview

This lecture introduces backend development using Django. The practical involves creating a basic Student Management API that returns JSON responses through Django views.

## Technologies Used

- Python
- Django
- SQLite
- JSON
- Visual Studio Code

## Project Structure

- `manage.py` – Django project management utility.
- `student_system/` – Main Django project configuration.
- `students/` – Django application.
- `db.sqlite3` – SQLite database file.
- `screenshots/` – Stores practical screenshots.

## Practical Implementation

1. Created a Django project named `student_system`.
2. Created a Django application named `students`.
3. Used `views.py` to define an index view.
4. Returned JSON data using Django's `JsonResponse`.
5. Configured URL routing in `student_system/urls.py`.
6. Added the Django admin route.

## API Endpoint

| Method | URL | Function |
|---|---|---|
| GET | `/` | Returns a welcome message, version and application status |

## Learning Outcomes

- Understand Django project and application structure.
- Create views using Django.
- Return JSON responses.
- Configure URL routing.
- Understand Django's built-in admin route.

## Conclusion

Lecture 26 provides a basic introduction to Django backend development and demonstrates how to create a simple API endpoint that returns JSON data.