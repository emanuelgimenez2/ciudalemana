import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import { AuthContext } from '../FirebaseAuthProvider';

import './Navbar.css';

const Navbar = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="navbar-brand">
          {/* <img src={logo} alt="Ciudalemana Logo" className="logo" width="30" height="30" /> */}
          Ciudalemana
        </Link>
      </div>
      <button 
        className="navbar-toggle" 
        onClick={toggleNavbar}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
      >
       
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <div className={`navbar-items ${isOpen ? 'active' : ''}`}>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
              Inicio
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/turno" className="nav-link" onClick={() => setIsOpen(false)}>
              Agregar Tema
            </Link>
          </li> */}
          {user && isAdmin && (
            <li className="nav-item">
              <Link to="/admin" className="nav-link" onClick={() => setIsOpen(false)}>
                Admin
              </Link>
            </li>
          )}
        </ul>
        <LoginForm />
      </div>
    </nav>
  );
};

export default Navbar;