import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateEmployee from './components/CreateEmployee'; // Correct import
import Dashboard from './components/Dashboard';

// Middleware to check if the user is an admin
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
  return user && user.role === 'admin';
};

// Protected route for admin-only access
const AdminRoute = ({ element }) => {
  return isAdmin() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/create-employee"
          element={<AdminRoute element={<CreateEmployee />} />} // Protect this route
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;