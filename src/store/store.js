import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {userSignInReducer} from './reducers/userReducers';

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
     ? JSON.parse(localStorage.getItem('userInfo'))
     : null,
  },
};
const reducer = combineReducers({
  userSignin: userSignInReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;