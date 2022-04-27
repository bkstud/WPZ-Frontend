import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../store/actions/userActions";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(signOut());
    navigate("/");
  });
  return <div className="App">Logout screen screen</div>;
};

export default Logout;
