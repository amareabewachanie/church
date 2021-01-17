import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING } from './types';

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
// Profile Loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
};
