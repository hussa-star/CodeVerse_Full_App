<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/27efa569-f731-41ce-9588-4f32ee536854" /># CodeVerse Hub 🚀

A full-stack Q&A platform where software engineers share ideas, solve programming bugs, and help each other grow. Built with React + Vite on the frontend and Node.js + Express + MySQL on the backend.

---

## 📸 Preview

> _Add screenshots here after deploying_<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/054dd6f2-f5b2-4308-9051-aad66cdc5782" />


---

## ✨ Features

- 🔐 **User Authentication** — Register, login, and JWT-protected sessions
- 💬 **Ask Questions** — Post programming questions with a title, description, and tags
- ✅ **Answer Questions** — Reply to community questions with duplicate-answer protection
- 🌙 **Dark / Light Mode** — Toggle with preference saved to localStorage
- 📱 **Fully Responsive** — Mobile-friendly layout across all pages
- 🔒 **Protected Routes** — Unauthenticated users are redirected to login automatically

---

## 🛠️ Tech Stack

### Frontend

| Tool            | Purpose                         |
| --------------- | ------------------------------- |
| React 18        | UI library                      |
| Vite            | Build tool & dev server         |
| React Router v6 | Client-side routing             |
| Axios           | HTTP requests to the backend    |
| CSS Modules     | Scoped component styles         |
| react-spinners  | Loading indicators              |
| react-icons     | UI icons (hamburger menu, etc.) |

### Backend

| Tool               | Purpose                                 |
| ------------------ | --------------------------------------- |
| Node.js + Express  | Server framework                        |
| MySQL2             | Database driver with connection pooling |
| JWT (jsonwebtoken) | Stateless authentication tokens         |
| bcrypt             | Password hashing                        |
| uuid               | Unique question IDs                     |
| http-status-codes  | Semantic HTTP status constants          |
| dotenv             | Environment variable management         |
| cors               | Cross-origin request handling           |

---

## 📁 Project Structure

```
CodeVersHAb/
│
├── Client/                         # React Vite frontend
│   └── src/
│       ├── Components/
│       │   ├── Auth/               # Register.jsx + Login.jsx + Auth.module.css
│       │   ├── AuthProvider/       # Global user context (AuthContext)
│       │   ├── DarkModeToggle/     # Light/dark mode toggle button
│       │   ├── Header/             # Sticky nav with mobile hamburger menu
│       │   ├── Footer/             # Global footer
│       │   ├── Layout/             # Wraps Header + Outlet + Footer
│       │   └── ProtectedRoute/     # Redirects unauthenticated users to /login
│       ├── Pages/
│       │   ├── Landing/            # Public hero page
│       │   ├── HomePage/           # Question feed (protected)
│       │   ├── AskQuestionPage/    # Post a new question (protected)
│       │   └── Answerpage/         # View question + post answers (protected)
│       ├── App.jsx                 # Route definitions
│       ├── axiosConfig.js          # Axios instance with base URL from .env
│       └── main.jsx                # App entry point with BrowserRouter + AuthProvider
│
└── Server/                         # Node.js + Express backend
    └── src/
        ├── app.js                  # Express entry point
        ├── Config/
        │   └── DbConfig.js         # MySQL2 connection pool
        ├── Routes/                 # URL → controller mapping
        ├── Controllers/            # Thin: validate → call service → respond
        ├── Services/               # Business logic layer
        ├── Models/                 # Raw SQL queries only
        ├── Validators/             # Input validation (throws AppError)
        ├── Middleware/
        │   ├── authMiddleware.js   # JWT verification + req.user injection
        │   ├── errorMiddleware.js  # Global error handler (last in app.js)
        │   └── notFoundMiddleware.js # 404 handler for unmatched routes
        ├── Utils/
        │   ├── asyncHandler.js     # Wraps controllers — eliminates try/catch
        │   └── generateToken.js    # JWT token creation
        └── Errors/
            └── AppError.js         # Custom error class with statusCode
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/) v18+
- [MySQL](https://www.mysql.com/) v8+
- npm v9+

---

### 1. Clone the repository

```bash
git clone https://github.com/hussa-star/CodeVerse_Full_App
cd CodeVerse_Full_AppAb
```

---

### 2. Set up the database

Open your MySQL client and run:

```sql

// -- USERS TABLE
    CREATE TABLE users(
   userid INT(20) NOT NULL AUTO_INCREMENT,
     username VARCHAR(20) NOT NULL,
     firstname VARCHAR(20) NOT NULL,
     lastname VARCHAR(20) NOT NULL,
     email VARCHAR(40) NOT NULL,
     password VARCHAR(100) NOT NULL,
     PRIMARY KEY(userid)
 );

 -- QUESTIONS TABLE
 CREATE TABLE questions(
     id INT(20) NOT NULL AUTO_INCREMENT,
     questionid VARCHAR(100) NOT NULL UNIQUE,
     userid INT(20) NOT NULL,
     title VARCHAR(50) NOT NULL,
     description VARCHAR(200) NOT NULL,
     tag VARCHAR(20),

     PRIMARY KEY(id, questionid),

     FOREIGN KEY(userid)
         REFERENCES users(userid)
         ON DELETE CASCADE
         ON UPDATE CASCADE
 );

 -- ANSWERS TABLE
 CREATE TABLE answers(
     answerid INT(20) NOT NULL AUTO_INCREMENT,
     userid INT(20) NOT NULL,
     questionid VARCHAR(100) NOT NULL,
     answer VARCHAR(200) NOT NULL,

     PRIMARY KEY(answerid),

     FOREIGN KEY(userid)
         REFERENCES users(userid)
         ON DELETE CASCADE
         ON UPDATE CASCADE,

     FOREIGN KEY(questionid)
         REFERENCES questions(questionid)
         ON DELETE CASCADE
         ON UPDATE CASCADE

```

---

### 3. Configure the backend environment

Create a `.env` file inside `Server/`:

```
Server/.env
```

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=codeverse_db
DB_PORT=3306

JWT_SECRET=your_super_secret_key_here

PORT=5000
```

---

### 4. Install backend dependencies

```bash
cd Server
npm install
```

---

### 5. Start the backend server

```bash
npm run dev
```

Server runs at: `http://localhost:5000`

You should see:

```
Database connected
Server running on port 5000
```

---

### 6. Configure the frontend environment

Create a `.env` file inside `Client/`:

```
Client/.env
```

```env
VITE_API_URL=http://localhost:5000/api
```

---

### 7. Install frontend dependencies

```bash
cd Client
npm install
```

---

### 8. Start the frontend

```bash
npm run dev
```

App runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

### Users — `/api/users`

| Method | Endpoint    | Auth | Description                  |
| ------ | ----------- | ---- | ---------------------------- |
| POST   | `/register` | ❌   | Register a new user          |
| POST   | `/login`    | ❌   | Login and receive JWT token  |
| GET    | `/check`    | ✅   | Verify token + get user info |

### Questions — `/api/questions`

| Method | Endpoint       | Auth | Description                   |
| ------ | -------------- | ---- | ----------------------------- |
| GET    | `/`            | ✅   | Get all questions (paginated) |
| GET    | `/:questionId` | ✅   | Get single question           |
| POST   | `/`            | ✅   | Post a new question           |

### Answers — `/api/answers`

| Method | Endpoint       | Auth | Description                    |
| ------ | -------------- | ---- | ------------------------------ |
| POST   | `/`            | ✅   | Post an answer                 |
| GET    | `/:questionid` | ✅   | Get all answers for a question |

> ✅ = requires `Authorization: Bearer <token>` header

---

## 🏗️ Backend Architecture

The backend follows a **layered architecture** where each layer has one job:

```
Request → Route → Middleware → Controller → Service → Model → Database
                                    ↑              ↑
                                Validator       AppError
```

| Layer            | Job                                                        |
| ---------------- | ---------------------------------------------------------- |
| **Route**        | Maps URL + HTTP method to a controller                     |
| **Middleware**   | Auth check, error handling, 404 handling                   |
| **Controller**   | Validate → call service → send response                    |
| **Service**      | Business logic (duplicate checks, hashing, UUIDs)          |
| **Model**        | Raw SQL queries only — no logic                            |
| **Validator**    | Throws `AppError` if input is invalid                      |
| **asyncHandler** | Wraps controllers so errors auto-reach error middleware    |
| **AppError**     | Custom error class carrying `statusCode` + `isOperational` |

---

## 🌐 Frontend Architecture

```
BrowserRouter
  └── AuthProvider (global user context)
        └── Layout (Header + Outlet + Footer)
              ├── / → Landing (public)
              ├── /register → Register (public)
              ├── /login → Login (public)
              ├── /home → ProtectedRoute → HomePage
              ├── /ask → ProtectedRoute → AskQuestionPage
              └── /answer/:questionId → ProtectedRoute → AnswerPage
```

**Auth flow:**

1. User logs in → backend returns JWT token
2. Token saved to `localStorage`
3. `AuthProvider` calls `/api/users/check` on mount to restore user state
4. `ProtectedRoute` checks auth before rendering protected pages
5. All API calls include `Authorization: Bearer <token>` header

---

## 📦 Backend Dependencies

```bash
npm install express mysql2 dotenv cors bcrypt jsonwebtoken uuid http-status-codes
npm install --save-dev nodemon
```

## 📦 Frontend Dependencies

```bash
npm install axios react-router-dom react-spinners react-icons
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Hussien**

- GitHub: [@hussa-star](https://github.com/hussa-star)

---

> Built to practice full-stack architecture patterns — from database to UI.
