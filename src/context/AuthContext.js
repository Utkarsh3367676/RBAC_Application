import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPermissions, setUserPermissions] = useState({});

  useEffect(() => {
    // Simulate checking for stored auth token
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const roles = await api.getRoles();
        const userRole = roles.find((role) => role.id === user.roleId);
        setCurrentUser(user);
        setUserPermissions(userRole?.permissions || {});
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // For demo purposes, we'll only check the email
      const users = await api.getUsers();
      const user = users.find((u) => u.email === email);

      if (!user) {
        throw new Error("User not found");
      }

      // In a real app, you would verify the password here
      // For demo, we'll accept any password

      const roles = await api.getRoles();
      const userRole = roles.find((role) => role.id === user.roleId);

      setCurrentUser(user);
      setUserPermissions(userRole?.permissions || {});
      localStorage.setItem("currentUser", JSON.stringify(user));

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setUserPermissions({});
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userPermissions");
  };

  const hasPermission = (resource, action) => {
    return userPermissions[resource]?.includes(action) || false;
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    hasPermission,
    userPermissions,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
