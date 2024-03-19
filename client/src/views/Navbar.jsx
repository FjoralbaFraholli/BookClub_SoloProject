import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const user = useAuth()
  const { logout } = useAuth();

  const navigate = useNavigate();
  const [error, setError] = useState(null)
  
  const handleLogoutClick = async (e) => {
    e.preventDefault();

    try {
        //Call the register function from the AuthContext
        await logout();
        navigate('/login')
    } catch (error) {
        setError('Some errors')
    }
};


  return (
    <nav className="navbar navbar-dark bg-dark rounded">
      <div className="navbar-left">
        <Link to="/books" className="navbar-brand mx-2">BookClub</Link>
      </div>
      <div className="navbar-right">
        {token ? (
          <>
          <div className="d-flex align-items-center justify-content-center">
          <Link to="/book/create" className="navbar-brand">Add book</Link>
            <button className="navbar-btn" onClick={handleLogoutClick}>Logout</button>
          </div>
           
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn mx-2 text-white">Login</Link>
            <Link to="/register" className="navbar-btn mx-2 text-white">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;