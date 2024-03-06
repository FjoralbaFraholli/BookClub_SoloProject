import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateBook from './components/CreateBook';
import Dashboard from './components/Dashboard';
import EditBook from './components/EditBook';
import SingleBook from './components/SingleBook';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './views/LoginPage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Routes>
        {
          token ? (
            <>
              {/* {
              verified? <Route path='/' element={<Dashboard />} /> : <Route path='/login' element={<Login />} />
              } */}
              <Route path='/' element={<Dashboard user={user} />} />
              <Route path='/books' element={<Dashboard user={user} />} />
              <Route path='/book/:id' element={<SingleBook user={user} />} />
              <Route path='/book/edit/:id' element={<EditBook user={user} />} />
              <Route path='/book/create' element={<CreateBook user={user} />} />
            </>
          ) : (
            <>
            
            <Route path='*' element={<LoginPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            </>
          )}
      </Routes>
    </BrowserRouter>
  )
}

export default App

