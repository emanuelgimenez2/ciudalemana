import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import LoginForm from "./components/LoginForm/LoginForm";
import AdminComponent from "./components/AdminComponent/AdminComponent";
import { AuthContext } from "./components/FirebaseAuthProvider";
import './index.css';
import "./App.css";
import Home from "./components/Home/Home";

// Componente de ruta protegida
const ProtectedRoute = ({ children }) => {
  const { user, isAdmin } = useContext(AuthContext);
  
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Ruta para la página de inicio */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminComponent />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;