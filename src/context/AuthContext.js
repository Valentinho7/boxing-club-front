import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logout: () => {},
  role: '', 
  setRole: () => {}, 
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState(''); // Ajoutez un état pour le rôle


  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout,role, setRole, }}>
      {children}
    </AuthContext.Provider>
  );
};