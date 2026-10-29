
from fastapi import FastAPI, Depends, HTTPException, Query, Response
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
import math

import models
import schemas
from database import engine, get_db


# Create database tables
models.Base.metadata.create_all(bind=engine)

# Create FastAPI application
app = FastAPI(
    title="Student Management API",
    description="RESTful API for managing students, courses and enrollments",
    version="1.0.0"
)


# ---------------- DEPARTMENT APIs ----------------

@app.get("/departments", response_model=list[schemas.DepartmentResponse])
def get_departments(db: Session = Depends(get_db)):
    return db.query(models.Department).all()


@app.post(
    "/departments",
    response_model=schemas.DepartmentResponse,
    status_code=201
)
def create_department(
    department: schemas.DepartmentCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(models.Department).filter(
        models.Department.name == department.name
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Department already exists"
        )

    new_department = models.Department(name=department.name)
    db.add(new_department)
    db.commit()
    db.refresh(new_department)
    return new_department


# ---------------- STUDENT APIs ----------------

@app.get("/students", response_model=schemas.StudentListResponse)
def get_students(
    branch: Optional[schemas.BranchEnum] = None,
    department_id: Optional[int] = None,
    search: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    query = db.query(models.Student)

    if branch:
        query = query.filter(models.Student.branch == branch.value)

    if department_id is not None:
        query = query.filter(
            models.Student.department_id == department_id
        )

    if search:
        query = query.filter(
            or_(
                models.Student.name.ilike(f"%{search}%"),
                models.Student.email.ilike(f"%{search}%")
            )
        )

    total = query.count()
    total_pages = math.ceil(total / limit) if total else 0

    students = (
        query.order_by(models.Student.id)
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "data": students,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": total_pages
    }


@app.get("/students/{student_id}", response_model=schemas.StudentResponse)
def get_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return student


@app.post("/students", response_model=schemas.StudentResponse, status_code=201)
def create_student(
    student: schemas.StudentCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(models.Student).filter(
        models.Student.email == student.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="A student with this email already exists"
        )

    if student.department_id is not None:
        department = db.query(models.Department).filter(
            models.Department.id == student.department_id
        ).first()

        if not department:
            raise HTTPException(
                status_code=404,
                detail="Department not found"
            )

    new_student = models.Student(**student.model_dump())
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student


@app.put("/students/{student_id}", response_model=schemas.StudentResponse)
def update_student(
    student_id: int,
    student_data: schemas.StudentUpdate,
    db: Session = Depends(get_db)
):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    updates = student_data.model_dump(exclude_unset=True)

    if "email" in updates:
        existing = db.query(models.Student).filter(
            models.Student.email == updates["email"],
            models.Student.id != student_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=409,
                detail="Email is already used by another student"
            )

    if updates.get("department_id") is not None:
        department = db.query(models.Department).filter(
            models.Department.id == updates["department_id"]
        ).first()

        if not department:
            raise HTTPException(
                status_code=404,
                detail="Department not found"
            )

    for key, value in updates.items():
        if hasattr(value, "value"):
            value = value.value
        setattr(student, key, value)

    db.commit()
    db.refresh(student)
    return student


@app.delete("/students/{student_id}", status_code=204)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()
    return Response(status_code=204)


# ---------------- COURSE APIs ----------------

@app.get("/courses", response_model=list[schemas.CourseResponse])
def get_courses(
    department_id: Optional[int] = None,
    credits: Optional[int] = Query(None, ge=1, le=6),
    db: Session = Depends(get_db)
):
    query = db.query(models.Course)

    if department_id is not None:
        query = query.filter(
            models.Course.department_id == department_id
        )

    if credits is not None:
        query = query.filter(models.Course.credits == credits)

    return query.order_by(models.Course.id).all()


@app.post("/courses", response_model=schemas.CourseResponse, status_code=201)
def create_course(
    course: schemas.CourseCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(models.Course).filter(
        models.Course.id == course.id
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Course ID already exists"
        )

    if course.department_id is not None:
        department = db.query(models.Department).filter(
            models.Department.id == course.department_id
        ).first()

        if not department:
            raise HTTPException(
                status_code=404,
                detail="Department not found"
            )

    new_course = models.Course(**course.model_dump())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course


# ---------------- ENROLLMENT APIs ----------------

@app.get(
    "/students/{student_id}/enrollments",
    response_model=list[schemas.EnrollmentResponse]
)
def get_enrollments(student_id: int, db: Session = Depends(get_db)):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    return db.query(models.Enrollment).filter(
        models.Enrollment.student_id == student_id
    ).all()


@app.post(
    "/students/{student_id}/enrollments",
    response_model=schemas.EnrollmentResponse,
    status_code=201
)
def create_enrollment(
    student_id: int,
    enrollment: schemas.EnrollmentCreate,
    db: Session = Depends(get_db)
):
    student = db.query(models.Student).filter(
        models.Student.id == student_id
    ).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    course = db.query(models.Course).filter(
        models.Course.id == enrollment.course_id
    ).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing = db.query(models.Enrollment).filter(
        models.Enrollment.student_id == student_id,
        models.Enrollment.course_id == enrollment.course_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=409,
            detail="Student is already enrolled in this course"
        )

    new_enrollment = models.Enrollment(
        student_id=student_id,
        **enrollment.model_dump()
    )

    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment


@app.delete(
    "/students/{student_id}/enrollments/{course_id}",
    status_code=204
)
def delete_enrollment(
    student_id: int,
    course_id: str,
    db: Session = Depends(get_db)
):
    enrollment = db.query(models.Enrollment).filter(
        models.Enrollment.student_id == student_id,
        models.Enrollment.course_id == course_id
    ).first()

    if not enrollment:
        raise HTTPException(
            status_code=404,
            detail="Enrollment not found"
        )

    db.delete(enrollment)
    db.commit()
    return Response(status_code=204)


# Run the application directly with: py main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
