import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';
import Home from './components/Home';
import AdminSignup from './components/AdminSignup';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup/>}/>
        <Route path="/allusers" element={<UserList />} />
        <Route path="/user-submission-form" element={<UserLogin />} />
      </Routes>
    </Router>
  );
}