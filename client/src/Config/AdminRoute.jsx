import React from "react";
import { Navigate } from "react-router-dom";

const isAdminAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === "admin";
};

const AdminRoute = ({ children }) => {
  return isAdminAuthenticated() ? children : <Navigate to="/" replace />;
};

export default AdminRoute;
