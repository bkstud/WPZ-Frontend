import React from "react";
import { Navigate } from "react-router-dom";
import auth from "../utils/auth";
import RegisterCard from "../components/RegisterCard";

const RegisterScreen = () => {
  return (
    <div>{auth.isAuthenticated() ? <Navigate to="/profile" replace /> : <RegisterCard />}</div>
  );
};

export default RegisterScreen;
