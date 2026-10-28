
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="Student and Course Management API",
    version="1.0.0"
)

# ==========================================
# STUDENT MANAGEMENT API
# ==========================================

students = [
    {"id": 1, "name": "Aarav", "branch": "CSE"},
    {"id": 2, "name": "Diya", "branch": "ECE"},
    {"id": 3, "name": "Rohan", "branch": "IT"}
]


# Model for creating and updating students
class Student(BaseModel):
    name: str
    branch: str


# Home route
@app.get("/")
def home():
    return {"message": "Welcome to the Student Management API"}


# GET: Retrieve all students, optionally filter by branch
@app.get("/students")
def get_students(branch: Optional[str] = None):
    if branch:
        return [
            student for student in students
            if student["branch"].lower() == branch.lower()
        ]
    return students


# GET: Retrieve one student by ID
@app.get("/students/{student_id}")
def get_student(student_id: int):
    for student in students:
        if student["id"] == student_id:
            return student

    raise HTTPException(
        status_code=404,
        detail="Student not found"
    )


# POST: Add a new student
@app.post("/students", status_code=201)
def create_student(student: Student):
    new_id = max((s["id"] for s in students), default=0) + 1

    new_student = {
        "id": new_id,
        "name": student.name,
        "branch": student.branch
    }

    students.append(new_student)
    return new_student


# PUT: Update an existing student
@app.put("/students/{student_id}")
def update_student(student_id: int, updated_student: Student):
    for student in students:
        if student["id"] == student_id:
            student["name"] = updated_student.name
            student["branch"] = updated_student.branch
            return student

    raise HTTPException(
        status_code=404,
        detail="Student not found"
    )


# DELETE: Remove a student
@app.delete("/students/{student_id}")
def delete_student(student_id: int):
    for index, student in enumerate(students):
        if student["id"] == student_id:
            deleted_student = students.pop(index)

            return {
                "message": "Student deleted successfully",
                "student": deleted_student
            }

    raise HTTPException(
        status_code=404,
        detail="Student not found"
    )


# ==========================================
# COURSE MANAGEMENT API
# ==========================================

courses = [
    {
        "id": 1,
        "title": "Python Programming",
        "credits": 4,
        "department": "CSE"
    },
    {
        "id": 2,
        "title": "Database Management",
        "credits": 3,
        "department": "CSE"
    },
    {
        "id": 3,
        "title": "Digital Electronics",
        "credits": 4,
        "department": "ECE"
    }
]


# Model for creating and updating courses
class CourseCreate(BaseModel):
    title: str
    credits: int
    department: str


# GET: Retrieve all courses, optionally filter by department
@app.get("/courses")
def get_courses(department: Optional[str] = None):
    if department:
        return [
            course for course in courses
            if course["department"].lower() == department.lower()
        ]
    return courses


# GET: Retrieve one course by ID
@app.get("/courses/{course_id}")
def get_course(course_id: int):
    for course in courses:
        if course["id"] == course_id:
            return course

    raise HTTPException(
        status_code=404,
        detail="Course not found"
    )


# POST: Create a new course
@app.post("/courses", status_code=201)
def create_course(course: CourseCreate):
    new_id = max((c["id"] for c in courses), default=0) + 1

    new_course = {
        "id": new_id,
        "title": course.title,
        "credits": course.credits,
        "department": course.department
    }

    courses.append(new_course)
    return new_course


# PUT: Update an existing course
@app.put("/courses/{course_id}")
def update_course(course_id: int, updated_course: CourseCreate):
    for course in courses:
        if course["id"] == course_id:
            course["title"] = updated_course.title
            course["credits"] = updated_course.credits
            course["department"] = updated_course.department
            return course

    raise HTTPException(
        status_code=404,
        detail="Course not found"
    )


# DELETE: Delete a course
@app.delete("/courses/{course_id}", status_code=204)
def delete_course(course_id: int):
    for index, course in enumerate(courses):
        if course["id"] == course_id:
            courses.pop(index)
            return

    raise HTTPException(
        status_code=404,
        detail="Course not found"
    )
