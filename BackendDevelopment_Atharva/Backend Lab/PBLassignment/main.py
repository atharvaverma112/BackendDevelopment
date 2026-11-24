
import logging
import time

from fastapi import FastAPI, Request

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)

logger = logging.getLogger("student-api")

app = FastAPI(title="Student API - FastAPI")

# Sample student data
students = [
    {"id": 1, "name": "Aarav", "course": "Backend Development"},
    {"id": 2, "name": "Diya", "course": "Backend Development"}
]


# Middleware for request logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()

    try:
        response = await call_next(request)

        duration_ms = (time.perf_counter() - start) * 1000

        logger.info(
            "method=%s path=%s status=%s duration_ms=%.2f",
            request.method,
            request.url.path,
            response.status_code,
            duration_ms
        )

        return response

    except Exception:
        duration_ms = (time.perf_counter() - start) * 1000

        logger.exception(
            "method=%s path=%s status=500 duration_ms=%.2f",
            request.method,
            request.url.path,
            duration_ms
        )

        raise


# Home route
@app.get("/")
def root():
    return {
        "application": "Student API",
        "framework": "FastAPI",
        "status": "running"
    }


# Health check route
@app.get("/health")
def health():
    return {"status": "healthy"}


# Get all students
@app.get("/students")
def list_students():
    return students
