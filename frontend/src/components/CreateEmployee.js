import React, { useState } from 'react';
import axios from 'axios';

const CreateEmployee = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/employees/create',
        { 
          username, 
          password, 
          role, 
          name, 
          position, 
          department 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      alert('Employee created successfully');
      // Clear form after successful submission
      setUsername('');
      setPassword('');
      setRole('employee');
      setName('');
      setPosition('');
      setDepartment('');
    } catch (err) {
      
      console.error('Full error object:', err); // Log the full error object
      console.error('Error response data:', err.response?.data); // Log the response data
      setError(err.response?.data?.error || 'Failed to create employee');
    }
  };

  return (
    <div className="create-employee">
      <h2>Create Employee</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Position:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Department:</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default CreateEmployee;