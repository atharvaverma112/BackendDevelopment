
from flask import Flask, jsonify, render_template

app = Flask(__name__)

students = [
    {"id": 1, "name": "Aarav", "branch": "CSE"},
    {"id": 2, "name": "Diya", "branch": "ECE"},
    {"id": 3, "name": "Rohan", "branch": "IT"}
]

# Route 1: Home page
@app.route("/")
def home():
    return "Welcome to the Student Management API"

# Route 2: Get all students as JSON
@app.route("/students")
def get_students():
    return jsonify(students)

# Route 3: Get student by ID
@app.route("/students/<int:student_id>")
def get_student(student_id):
    for student in students:
        if student["id"] == student_id:
            return jsonify(student)

    return jsonify({"error": "Student not found"}), 404

# Route 4: HTML response
@app.route("/html")
def html_page():
    return """
    <!DOCTYPE html>
    <html>
    <head><title>Student Page</title></head>
    <body>
        <h1>Welcome to Student Management</h1>
        <p>This is an HTML response from Flask.</p>
    </body>
    </html>
    """

# Route 5: Display students using Jinja2
@app.route("/students-page")
def students_page():
    return render_template("students.html", students=students)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
