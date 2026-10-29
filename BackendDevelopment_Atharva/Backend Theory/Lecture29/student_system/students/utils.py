
import requests


def get_external_data(item_id):
    try:
        response = requests.get(
            f"https://jsonplaceholder.typicode.com/posts/{item_id}",
            timeout=5
        )
        response.raise_for_status()

        return {
            "data": response.json(),
            "error": None
        }

    except requests.Timeout:
        return {
            "data": None,
            "error": "External service timed out"
        }

    except requests.RequestException:
        return {
            "data": None,
            "error": "External service unavailable"
        }
