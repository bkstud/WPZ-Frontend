import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
} from "../../constants/userConstants";
import http from "../../lib/axios";
import auth from "../../utils/auth";

export const signIn = (username, password) => async dispatch => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
  try {
    const user = await http.post("/auth/login", {
      username,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: user });
    localStorage.setItem("userInfo", JSON.stringify(user));
    if (user?.data.token) {
      auth.login(user?.data.token);
      document.location.href = "/";
    }
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const signOut = () => dispatch => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
  auth.logout();
};

export const signUp = (username, password, name, surname, email) => async dispatch => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { username, password, name, surname, email },
  });
  try {
    const { data } = await http.post("/auth/register", {
      username,
      password,
      name,
      surname,
      email,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data ? error.response : error.message,
    });
  }
};
