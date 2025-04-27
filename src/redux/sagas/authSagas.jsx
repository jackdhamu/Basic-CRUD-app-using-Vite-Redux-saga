
import { call, put, takeEvery } from 'redux-saga/effects';
import {
    SIGN_IN_REQUEST,
    SIGN_UP_REQUEST,
    signInSuccess,
    signInFailure,
    signUpSuccess,
    signUpFailure
} from '../actions/authActions';

// Function to get user data from local storage
const getUserDataFromLocalStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

// Function to save user data to local storage
const saveUserDataToLocalStorage = (userData) => {
    const users = getUserDataFromLocalStorage();
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users)); // Save back to local storage
};

// Simulated API call for sign-in validation
const validateUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const users = getUserDataFromLocalStorage();
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
        localStorage.setItem('loggedInUser', JSON.stringify(user)); 
        yield put(signInSuccess(user));
    } catch (error) {
        yield put(signInFailure(error.message)); 
    }
}

function* signUpSaga(action) {
    try {
        // Save the user data to local storage
        saveUserDataToLocalStorage(action.payload); // Call the function here
        yield put(signUpSuccess(action.payload));
    } catch (error) {
        yield put(signUpFailure(error.message)); 
    }
}

export function* watchAuthSagas() {
    yield takeEvery(SIGN_IN_REQUEST, signInSaga);
    yield takeEvery(SIGN_UP_REQUEST, signUpSaga);
}