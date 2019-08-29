import axios from 'axios';
import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS
} from './types';

export const setLoadUser = () => ({
  type: USER_LOADING
});

export const userLoaded = payload => ({
  type: USER_LOADED,
  payload
});

export const loadUser = () => async (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });
  // dispatch(setLoadUser());

  try {
    const res = await axios.get('/api/auth/user', tokenConfig(getState));
    if (!res) {
      throw new Error();
    }
    // dispatch(userLoaded(res.data));
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (e) {
    let msg = '',
      status = 0;
    if ((e.message = 'Request failed with status code 401')) {
      msg = 'Authorization failed';
      status = 401;
    } else {
      msg = 'Authorization failed';
      status = 400;
    }
    dispatch(returnErrors(msg, status));
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  const body = JSON.stringify({ name, email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    let msg = '';
    let status = 0;
    if (err.message === 'Request failed with status code 406') {
      msg = 'Please enter all fiields';
      status = 406;
    } else if (err.message === 'Request failed with status code 409') {
      msg = 'user already exist';
      status = 409;
    } else {
      msg = 'Unable to register';
      status = 400;
    }
    console.log(msg, status);
    dispatch(returnErrors(msg, status, 'REGISTER_FAIL'));
    dispatch({
      type: REGISTER_FAIL
    });
  }
};
// login users
export const login = ({ email, password }) => async dispatch => {
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    let msg = '';
    let status = 0;
    if (err.message === 'Request failed with status code 406') {
      msg = 'Please enter all fiields';
      status = 406;
    } else if (err.message === 'Request failed with status code 409') {
      msg = 'User does not exist';
      status = 409;
    } else {
      msg = 'Unable to login';
      status = 400;
    }
    dispatch(returnErrors(msg, status, 'LOGIN_FAIL'));
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
// logout user
export const logout = () => ({
  type: LOGOUT_SUCCESS
});
//  setup config/header and token
export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
};
