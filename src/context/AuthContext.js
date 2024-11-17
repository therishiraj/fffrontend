import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // New state for role

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    const storedRole = localStorage.getItem("role"); // Fetch role from localStorage
    setIsLoggedIn(loggedInStatus);
    setRole(storedRole); // Set role from localStorage
  }, []);

  const login = (userRole) => {
    console.log("Logging in with role:", userRole); // Debugging log
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", userRole); // Store role in localStorage
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setRole(null); // Reset role
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
