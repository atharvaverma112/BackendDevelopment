# PBL Assignment – Containerizing a FastAPI Student API

## Overview

This project focuses on containerizing a FastAPI Student Management API using Docker. It follows the workflow of building a Docker image, running the application using Docker Compose, and preparing automated testing and CI/CD integration using GitHub Actions and Docker Hub.

## Technologies Used

- Python
- FastAPI
- Uvicorn
- Docker
- Docker Compose
- GitHub Actions
- Docker Hub
- HTTPX

## Project Structure

- `main.py` – FastAPI application and API routes.
- `requirements.txt` – Python dependencies.
- `automationTesting.py` – Automated tests for API endpoints.
- `Dockerfile` – Instructions for building the Docker image.
- `docker-compose.yml` – Configuration for running the application container.
- `.dockerignore` – Excludes unnecessary files from the Docker build.
- `.gitignore` – Excludes unnecessary files from Git.

## API Endpoints

| Endpoint | Function |
|---|---|
| `/` | Returns application information |
| `/health` | Checks application health |
| `/students` | Returns student records |

## Key Concepts Covered

1. **FastAPI Development:** Creating REST API endpoints.
2. **Request Logging:** Recording HTTP methods, paths, status codes and response times.
3. **Health Checks:** Monitoring application health.
4. **Docker:** Containerizing the FastAPI application.
5. **Docker Compose:** Managing application containers.
6. **Automated Testing:** Testing API endpoints using Python and FastAPI TestClient.
7. **CI/CD:** Automating testing and Docker image building through GitHub Actions.
8. **Docker Hub:** Publishing Docker images.

## Learning Outcomes

- Develop APIs using FastAPI.
- Create Docker images using a Dockerfile.
- Run applications using Docker Compose.
- Write automated API tests.
- Understand GitHub Actions workflows.
- Build and publish Docker images to Docker Hub.

## Conclusion

This project demonstrates the process of preparing a FastAPI application for containerized deployment, including automated testing, Docker image creation and CI/CD integration.