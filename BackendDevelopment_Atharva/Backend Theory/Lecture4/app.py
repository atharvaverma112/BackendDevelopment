
from flask import Flask, jsonify

app = Flask(__name__)

students = [
    {"id": 1, "name": "Aarav", "branch": "CSE"},
    {"id": 2, "name": "Diya", "branch": "ECE"},
    {"id": 3, "name": "Rohan", "branch": "IT"}
]

@app.route("/")
def home():
    return "Lecture 4 - Python Student API"

@app.route("/students")
def get_students():
    return jsonify(students)

@app.route("/students/<int:student_id>")
def get_student(student_id):
    for student in students:
        if student["id"] == student_id:
            return jsonify(student)

    return jsonify({"error": "Student not found"}), 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)
