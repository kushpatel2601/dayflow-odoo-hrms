# Dayflow – Human Resource Management System (HRMS)

## 1. Introduction

Dayflow is a web-based **Human Resource Management System (HRMS)** designed to digitize and streamline core HR operations such as employee management, attendance tracking, leave handling, and HR profile management. The system focuses on providing a clean user experience, secure authentication, and scalable architecture suitable for real-world organizations.

This project was developed as a **full-stack application** using modern web technologies, following industry best practices for authentication, state management, and UI/UX design.

---

## 2. Objectives of the Project

The main objectives of the Dayflow HRMS are:

* To provide a centralized platform for HR operations
* To securely manage HR and employee data
* To simplify attendance and employee monitoring
* To allow HR users to manage their profiles dynamically
* To design a scalable and extensible HR solution

---

## 3. Scope of the System

### 3.1 Users

* **HR / Admin**: Manages employees, attendance, and personal profile
* **Employees (Future Scope)**: View attendance, apply for leave, view profile

### 3.2 Functional Scope

* Secure login using JWT authentication
* HR dashboard with employee overview
* Attendance status visualization using symbols
* Dynamic HR profile management
* Database-backed updates for profile changes

---

## 4. Technology Stack

### 4.1 Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Fetch API
* JWT-based authentication

### 4.2 Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* bcrypt (for password hashing)

---

## 5. System Architecture

The application follows a **client-server architecture**:

* Frontend communicates with backend via REST APIs
* Backend handles authentication, authorization, and database operations
* JWT token is used for secure access to protected routes
* MongoDB stores HR and employee data

---

## 6. Authentication & Authorization

### 6.1 Login Flow

1. HR enters email and password
2. Backend validates credentials
3. JWT token is generated on success
4. Token is stored on the client side
5. Protected routes require token verification

### 6.2 Security Measures

* Passwords are hashed using bcrypt
* JWT tokens expire after a defined time
* Sensitive routes require authorization headers

---

## 7. Module Description

### 7.1 HR Dashboard

* Displays list of employees
* Shows attendance status using symbols
* Provides navigation to profile and attendance sections

### 7.2 Attendance Management

* Visual indicators:

  * Green dot: Present
  * Airplane icon: On Leave
  * Yellow dot: Absent
* Improves readability and quick decision-making

### 7.3 My Profile Module

* Displays logged-in HR details
* Editable name and profile image
* Changes are saved dynamically to the database
* Profile data is fetched from backend using JWT

---

## 8. Database Design

### HR Schema (MongoDB)

* id
* name
* email
* password (hashed)
* companyName
* role
* avatar (optional)

---

## 9. API Endpoints

### Authentication

* `POST /api/hr/login`

### HR Profile

* `GET /api/hr/me`
* `PUT /api/hr/update-profile`

All protected endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 10. User Interface Design

The UI is designed with a **modern SaaS approach**:

* Clean layouts with consistent spacing
* Gradient backgrounds and glassmorphism headers
* Responsive design for different screen sizes
* Clear navigation and action buttons

---

## 11. Testing

The system was tested for:

* Login validation
* Token-based access control
* Profile update persistence
* UI responsiveness
* Error handling for unauthorized access

---

## 12. Limitations

* Employee self-service features are limited in current version
* Leave and payroll modules are basic
* Image upload currently uses base64 (can be optimized)

---

## 13. Future Enhancements

* Employee login portal
* Leave approval workflow
* Payroll and salary slips
* Attendance analytics and reports
* Cloud-based image storage
* Middleware-based route protection

---

## 14. Conclusion

Dayflow HRMS successfully demonstrates a scalable and secure HR management solution using modern web technologies. The system provides a strong foundation for enterprise-level HR applications and can be extended with additional modules as organizational needs grow.

---

## 15. References

* Next.js Documentation
* MongoDB Documentation
* JWT Authentication Guide
* Tailwind CSS Documentation
