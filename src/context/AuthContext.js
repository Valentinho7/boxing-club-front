import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
  role: '', 
  setRole: () => {}, 
});

const AuthProviderComponent = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole('');
    navigate('/');
  };

  useEffect(() => {
    let timeout;

    function startTimer() {
      timeout = setTimeout(() => {
        logout();
      }, 10 * 60 * 1000);
    }

    function resetTimer() {
      clearTimeout(timeout);
      startTimer();
    }

    startTimer();

    window.addEventListener('load', resetTimer);
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('keypress', resetTimer);

    return () => {
      window.removeEventListener('load', resetTimer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('mousedown', resetTimer);
      window.removeEventListener('click', resetTimer);
      window.removeEventListener('scroll', resetTimer);
      window.removeEventListener('keypress', resetTimer);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = (props) => {
  return (
    <AuthProviderComponent {...props} />
  );
};