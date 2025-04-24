import { call, put, takeEvery } from 'redux-saga/effects';
import {
    ADD_BLOG_REQUEST,
    EDIT_BLOG_REQUEST, // Ensure this is correctly imported
    DELETE_BLOG_REQUEST,
    FETCH_BLOGS_REQUEST,
    addBlogSuccess,
    editBlogSuccess,
    deleteBlogSuccess,
    fetchBlogsSuccess,
} from '../actions/blogActions';
// Mock API functions
const fetchBlogsApi = () => {
    return new Promise((resolve) => {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        resolve(blogs);
    });
};

const saveBlogToLocalStorage = (blogs) => {
    localStorage.setItem('blogs', JSON.stringify(blogs));
};

function* fetchBlogsSaga() {
    try {
        const blogs = yield call(fetchBlogsApi);
        yield put(fetchBlogsSuccess(blogs));
    } catch (error) {
        // Handle errors here if needed
    }
}

function* addBlogSaga(action) {
    try {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const newBlog = { ...action.payload, id: new Date().getTime() }; // Assigning an id
        blogs.push(newBlog);
        saveBlogToLocalStorage(blogs);
        yield put(addBlogSuccess(newBlog));
    } catch (error) {
        // Handle errors
    }
}

function* editBlogSaga(action) {
    try {
        const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const updatedBlogs = blogs.map(blog =>
            blog.id === action.payload.id ? action.payload : blog
        );
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs)); // Save updated blogs to local storage
        yield put(editBlogSuccess(action.payload)); // Dispatch success action
    } catch (error) {
        // Optionally handle error (dispatch failure action if you set up that action)
    }
}

// Example API or localStorage logic
const deleteBlogFromLocalStorage = (id) => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const updatedBlogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
    return id; // Return the deleted blog id
};

function* deleteBlogSaga(action) {
    try {
        const id = yield call(deleteBlogFromLocalStorage, action.payload); // Call the delete function
        yield put(deleteBlogSuccess(id)); // Dispatch successful deletion
    } catch (error) {
        // Optionally handle errors
    }
}
export function* watchBlogSagas() {
    yield takeEvery(FETCH_BLOGS_REQUEST, fetchBlogsSaga);
    yield takeEvery(ADD_BLOG_REQUEST, addBlogSaga);
    yield takeEvery(EDIT_BLOG_REQUEST, editBlogSaga);
    yield takeEvery(DELETE_BLOG_REQUEST, deleteBlogSaga);
}