# Lecture 29 – Django API Endpoints and URL Parameters

## Overview

This lecture focuses on creating API endpoints using Django. The practical demonstrates health-check functionality and dynamic URL routing using URL parameters.

## Technologies Used

- Python
- Django
- SQLite
- JSON

## Project Structure

- `manage.py` – Django project management.
- `student_system/` – Main Django project configuration.
- `students/` – Django application.
- `screenshots/` – Stores practical screenshots.

## Practical Implementation

1. Created a Django project named `student_system`.
2. Created a Django application named `students`.
3. Implemented a health-check view using `JsonResponse`.
4. Created a student detail view that accepts a dynamic `student_id`.
5. Configured API routes in `student_system/urls.py`.
6. Added Django's built-in admin route.

## API Endpoints

| Method | URL | Function |
|---|---|---|
| GET | `/api/health/` | Returns API health status |
| GET | `/api/students/{student_id}/` | Returns the supplied student ID |

## Learning Outcomes

- Create API views using Django.
- Return JSON responses with HTTP status codes.
- Implement health-check endpoints.
- Use dynamic URL parameters with Django routing.
- Understand how URLs connect to views.

## Conclusion

Lecture 29 introduces Django API routing, health checks and dynamic URL parameters through a simple Student Management API.