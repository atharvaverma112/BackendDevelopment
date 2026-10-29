
from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

# Database connection
engine = create_engine("sqlite:///students.db")

Base = declarative_base()

Session = sessionmaker(bind=engine)
session = Session()


# Department Model
class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)

    students = relationship("Student", back_populates="department")
    courses = relationship("Course", back_populates="department")


# Student Model
class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    branch = Column(String(50))
    enrollment_date = Column(Date)
    department_id = Column(Integer, ForeignKey("departments.id"))

    department = relationship("Department", back_populates="students")
    enrollments = relationship("Enrollment", back_populates="student")


# Course Model
class Course(Base):
    __tablename__ = "courses"

    id = Column(String(10), primary_key=True)
    title = Column(String(100), nullable=False)
    credits = Column(Integer, nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"))

    department = relationship("Department", back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="course")


# Enrollment Model
class Enrollment(Base):
    __tablename__ = "enrollments"

    student_id = Column(Integer, ForeignKey("students.id"), primary_key=True)
    course_id = Column(String(10), ForeignKey("courses.id"), primary_key=True)
    semester = Column(String(20))
    grade = Column(String(2))

    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


# Create database tables
Base.metadata.create_all(engine)

print("Database models and tables created successfully!")

session.close()


from datetime import date

# Open a new session for CRUD operations
session = Session()

# Add a department if it doesn't already exist
department = session.query(Department).filter_by(name="Computer Science").first()

if not department:
    department = Department(name="Computer Science")
    session.add(department)
    session.commit()

# CREATE: Add a new student
student = Student(
    name="Aarav",
    email="aarav@upes.ac.in",
    branch="CSE",
    enrollment_date=date(2024, 8, 1),
    department_id=department.id
)

existing_student = session.query(Student).filter_by(
    email="aarav@upes.ac.in"
).first()

if not existing_student:
    session.add(student)
    session.commit()
    print("Student added successfully!")

# READ: Retrieve all CSE students
students = session.query(Student).filter_by(branch="CSE").all()

print("\nCSE Students:")
for student in students:
    print(student.id, student.name, student.email)

# UPDATE: Change a student's branch
student = session.query(Student).filter_by(
    email="aarav@upes.ac.in"
).first()

if student:
    student.branch = "ECE"
    session.commit()
    print("\nStudent branch updated successfully!")

# DELETE: Remove the student
student = session.query(Student).filter_by(
    email="aarav@upes.ac.in"
).first()

if student:
    session.delete(student)
    session.commit()
    print("Student deleted successfully!")

session.close()

