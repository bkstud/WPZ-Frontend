import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { examReducer } from "./reducers/examReducers";
import { userSignInReducer, userRegisterReducer } from "./reducers/userReducers";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  exam: {
    approachData: null,
  },
};
const reducer = combineReducers({
  userSignIn: userSignInReducer,
  userRegister: userRegisterReducer,
  exam: examReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
