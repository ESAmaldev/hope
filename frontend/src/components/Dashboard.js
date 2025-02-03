import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [employees, setEmployees] = useState([]);

  if (!token) {
    navigate('/login'); // Redirect to login if no token is found
    return null;
  }

  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/employees/fetch', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setEmployees(data);
        } else {
          console.error('Failed to fetch employees:', data.message);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, [token]);

  return (
    <div className="dashboard">
      <h2>Welcome to the Dashboard!</h2>
      <p>You are logged in.</p>

      {/* Create Employee Button */}
      <button onClick={() => navigate('/create-employee')}>Create Employee</button>

      {/* Employee List Table */}
      <h3>Employee List</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem('token'); // Logout
          navigate('/login');
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
