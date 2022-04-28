import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import auth from "../utils/auth";
import LoginCard from "../components/LoginCard";

const LoginScreen = () => {
  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;
  return (
    <div>
      {auth.isAuthenticated() ? (
        <Navigate to="/profile" replace />
      ) : (
        <LoginCard userInfo={userInfo} />
      )}{" "}
    </div>
  );
};

export default LoginScreen;
