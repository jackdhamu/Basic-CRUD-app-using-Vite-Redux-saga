// src/redux/actions/authActions.js

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const signInRequest = ({ email, password }) => ({
    type: SIGN_IN_REQUEST,
    payload: { email, password },
});

export const signInSuccess = (user) => ({
    type: SIGN_IN_SUCCESS,
    payload: user,
});

export const signInFailure = (error) => ({
    type: SIGN_IN_FAILURE,
    payload: error,
});

export const signUpRequest = (userData) => ({
    type: SIGN_UP_REQUEST,
    payload: userData,
});

export const signUpSuccess = (user) => ({
    type: SIGN_UP_SUCCESS,
    payload: user,
});

export const signUpFailure = (error) => ({
    type: SIGN_UP_FAILURE,
    payload: error,
});