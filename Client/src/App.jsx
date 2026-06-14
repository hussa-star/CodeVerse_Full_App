import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

// 1. Import your Layout wrapper
import Layout from "./Components/Layout/Layout.jsx";

// 2. Import your page components
import Register from "./Components/Auth/Register.jsx";
import Login from "./Components/Auth/Login.jsx";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import Landing from "./Pages/Landing/Landing.jsx";
import HowItWorks from "./Components/HowItWorks/HowItWorks.jsx";
import AskQuestion from "./Pages/AskQuestionPage/AskQuestion.jsx";
import AnswerPage from "./Pages/Answerpage/AnswerPage.jsx";
import ProtectedRoute from "./Components/ProtectedRout/ProtectedRoute.jsx";

function App() {
  return (
    // Wrap everything in our Layout component so that Header and Footer are always visible
    <Layout>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<Landing />} />
        {/* How It Works Route */}
        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Interface Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        {/* Ask Question Route */}
        <Route
          path="/ask"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />

        {/* Answer Question Route */}
        <Route
          path="/answer/:questionId"
          element={
            <ProtectedRoute>
              <AnswerPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
