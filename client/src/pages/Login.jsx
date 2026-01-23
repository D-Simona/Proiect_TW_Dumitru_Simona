import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const { login, register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await register(email, password, name);
        alert('Registration successful! Please login.');
        setIsRegister(false);
      } else {
        await login(email, password);
        navigate('/documents');
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : (isRegister ? 'Register' : 'Login')}
          </button>
        </form>
        
        <p className="toggle-auth">
          {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          <button 
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setEmail('');
              setPassword('');
              setName('');
            }}
            className="toggle-btn"
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
}
