import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
} from "../../constants/userConstants";
import http from "../../lib/axios";
import auth from "../../auth";

export const signIn = (username, password) => async (dispatc) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } });
  try {
    const user = await http.post("/login", {
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

export const signOut = () => (dispatch: any) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_SIGNOUT });
  auth.logout();
};