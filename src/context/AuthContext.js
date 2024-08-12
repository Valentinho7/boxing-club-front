import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  role: '',
  setRole: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setRole('');
    navigate('/'); // Rediriger vers la page d'accueil
  };

  useEffect(() => {
    let timeout;

    function resetTimer() {
      clearTimeout(timeout);
      startTimer();
    }

    function startTimer() {
      // Déconnecter l'utilisateur après 10 minutes d'inactivité
      timeout = setTimeout(() => {
        logout();
      }, 10 * 60 * 1000);
    }

    startTimer();

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('mousedown', resetTimer);
    window.addEventListener('click', resetTimer);
    window.addEventListener('scroll', resetTimer);
    window.addEventListener('keypress', resetTimer);

    // Nettoyer les écouteurs d'événements lorsque le composant est démonté
    return () => {
      clearTimeout(timeout);
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