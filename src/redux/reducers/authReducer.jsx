// src/redux/reducers/authReducer.js

import {
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
} from '../actions/authActions';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_IN_REQUEST:
        case SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case SIGN_IN_SUCCESS:
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                error: null,
            };
        case SIGN_IN_FAILURE:
        case SIGN_UP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;