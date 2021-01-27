import axios from 'axios';

import {
    GET_PROFILE,
    PROFILE_LOADING,
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    SET_CURRENT_USER,
    GET_PROFILES,
} from './types';

// Get All profiles
export const getProfiles = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios
        .get('http://localhost:5000/api/profile/all')
        .then((res) => {
            dispatch({
                type: GET_PROFILES,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_PROFILES,
                payload: null,
            });
        });
};
// Get Current profile
export const getCurrentProfile = () => (dispatch) => {
    dispatch(setProfileLoading());
    axios
        .get('http://localhost:5000/api/profile')
        .then((res) => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_PROFILE,
                payload: {},
            });
        });
};
// Create Profile
export const createProfile = (profileData, history) => (dispatch) => {
    axios
        .post('http://localhost:5000/api/profile', profileData)
        .then((res) => history.push('/index'))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// Add Experience
export const addExperience = (experienceData, history) => (dispatch) => {
    axios
        .post('http://localhost:5000/api/profile/experience', experienceData)
        .then((res) => history.push('/index'))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// Delete Experience
export const deleteExperience = (expId) => (dispatch) => {
    axios
        .delete(`http://localhost:5000/api/profile/experience/${expId}`)
        .then((res) =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// Add Education
export const addEducation = (ediucationData, history) => (dispatch) => {
    axios
        .post('http://localhost:5000/api/profile/education', ediucationData)
        .then((res) => history.push('/index'))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// Delete Education
export const deleteEducation = (eduId) => (dispatch) => {
    axios
        .delete(`http://localhost:5000/api/profile/education/${eduId}`)
        .then((res) =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// Delete Account
export const deleteAccount = (profileData, history) => (dispatch) => {
    if (window.confirm('Are you sure? This cannot be undone!!')) {
        axios
            .delete('http://localhost:5000/api/profile')
            .then((res) =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {},
                })
            )
            .catch((err) =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                })
            );
    }
};
// Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
};
//Clear Profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    };
};
