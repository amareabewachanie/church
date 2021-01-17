import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';
// Register User
export const registerUser = (userData, history) => (dispatch) => {
    axios
        .post('http://localhost:5000/api/users/register', userData)
        .then((res) => history.push('/login'))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// Login user
export const loginUser = (loginData) => (dispatch) => {
    axios
        .post('http://localhost:5000/api/users/login', loginData)
        .then((res) => {
            // Save to localstorage
            const { token } = res.data;
            // Save to ls
            localStorage.setItem('token', token);
            // Set authentication header
            setAuthToken(token);
            // Decode token to get the user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// Set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};
// Log user out

export const logoutUser = () => (dispatch) => {
    // Remove the token from ls
    localStorage.removeItem('token');
    // Remove the Auth header
    setAuthToken(false);
    // Set current user {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};
