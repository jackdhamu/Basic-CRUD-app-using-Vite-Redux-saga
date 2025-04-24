// src/redux/sagas/index.js

import { all } from 'redux-saga/effects';
import { watchBlogSagas } from './blogSagas';
import { watchAuthSagas } from './authSagas'; // Import watchAuthSagas

export default function* rootSaga() {
    yield all([
        watchBlogSagas(),
        watchAuthSagas(),
    ]);
}