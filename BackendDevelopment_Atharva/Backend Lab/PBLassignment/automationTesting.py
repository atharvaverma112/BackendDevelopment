import unittest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class StudentAPITests(unittest.TestCase):

    def test_home_route(self):
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            "application": "Student API",
            "framework": "FastAPI",
            "status": "running"
        })

    def test_health_route(self):
        response = client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "healthy"})

    def test_students_route(self):
        response = client.get("/students")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [
            {"id": 1, "name": "Aarav", "course": "Backend Development"},
            {"id": 2, "name": "Diya", "course": "Backend Development"}
        ])


if __name__ == "__main__":
    unittest.main(verbosity=2)