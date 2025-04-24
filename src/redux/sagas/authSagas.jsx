// src/redux/sagas/authSagas.js

import { call, put, takeEvery } from 'redux-saga/effects';
import {
    SIGN_IN_REQUEST,
    signInSuccess,
    signInFailure,
    SIGN_UP_REQUEST,
    signUpSuccess,
    signUpFailure
} from '../actions/authActions';

// Function to get user data from local storage
const getUserDataFromLocalStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

// Example API call for sign-in validation
const validateUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const users = getUserDataFromLocalStorage();
        // Find user based on email and password
        console.log('jack users', users, email, password)
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            resolve(user);
        } else {
            reject(new Error('Invalid credentials'));
        }
    });
};

function* signInSaga(action) {
    try {
        const user = yield call(validateUser, action.payload.email, action.payload.password);
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store logged-in user
        yield put(signInSuccess(user)); // Dispatch success action
    } catch (error) {
        yield put(signInFailure(error.message)); // Dispatch failure action
    }
}

function* signUpSaga(action) {
    try {
        // Save the user data to local storage
        saveUserDataToLocalStorage(action.payload);
        yield put(signUpSuccess(action.payload)); // Dispatch sign-up success
    } catch (error) {
        yield put(signUpFailure(error.message)); // Dispatch sign-up failure
    }
}

// Watcher saga for authentication actions
export function* watchAuthSagas() {
    yield takeEvery(SIGN_IN_REQUEST, signInSaga);
    yield takeEvery(SIGN_UP_REQUEST, signUpSaga);
}