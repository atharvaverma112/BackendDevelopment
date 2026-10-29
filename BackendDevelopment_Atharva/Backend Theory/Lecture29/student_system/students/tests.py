
from unittest.mock import patch

import requests
from django.test import TestCase
from django.urls import reverse

from .utils import get_external_data


class StudentAPITest(TestCase):

    def test_health_endpoint(self):
        response = self.client.get(reverse("health-check"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")


class StudentRouteTest(TestCase):

    def test_student_detail_returns_id(self):
        response = self.client.get(
            reverse("student-detail", kwargs={"student_id": 42})
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["student_id"], 42)


class ExternalServiceTest(TestCase):

    @patch("students.utils.requests.get")
    def test_timeout_returns_safe_error(self, mock_get):
        mock_get.side_effect = requests.Timeout

        result = get_external_data(1)

        self.assertIsNone(result["data"])
        self.assertEqual(
            result["error"],
            "External service timed out"
        )
