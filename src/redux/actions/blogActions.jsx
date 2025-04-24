
export const ADD_BLOG_REQUEST = 'ADD_BLOG_REQUEST';
export const ADD_BLOG_SUCCESS = 'ADD_BLOG_SUCCESS';
export const ADD_BLOG_FAILURE = 'ADD_BLOG_FAILURE';

export const EDIT_BLOG_REQUEST = 'EDIT_BLOG_REQUEST';
export const EDIT_BLOG_SUCCESS = 'EDIT_BLOG_SUCCESS';
export const EDIT_BLOG_FAILURE = 'EDIT_BLOG_FAILURE';

export const DELETE_BLOG_REQUEST = 'DELETE_BLOG_REQUEST';
export const DELETE_BLOG_SUCCESS = 'DELETE_BLOG_SUCCESS'; // Ensure this is defined
export const DELETE_BLOG_FAILURE = 'DELETE_BLOG_FAILURE'; // You can handle failure actions

export const FETCH_BLOGS_REQUEST = 'FETCH_BLOGS_REQUEST';
export const FETCH_BLOGS_SUCCESS = 'FETCH_BLOGS_SUCCESS';
export const FETCH_BLOGS_FAILURE = 'FETCH_BLOGS_FAILURE';

// Action Creators
export const addBlogRequest = (blog) => ({
    type: ADD_BLOG_REQUEST,
    payload: blog,
});

export const addBlogSuccess = (blog) => ({
    type: ADD_BLOG_SUCCESS,
    payload: blog,
});

export const addBlogFailure = (error) => ({
    type: ADD_BLOG_FAILURE,
    payload: error,
});

export const editBlogRequest = (blog) => ({
    type: EDIT_BLOG_REQUEST,
    payload: blog,
});

export const editBlogSuccess = (blog) => ({
    type: EDIT_BLOG_SUCCESS,
    payload: blog,
});

export const editBlogFailure = (error) => ({
    type: EDIT_BLOG_FAILURE,
    payload: error,
});

export const deleteBlogRequest = (id) => ({
    type: DELETE_BLOG_REQUEST,
    payload: id,
});

export const deleteBlogSuccess = (id) => ({ // Ensure this is defined
    type: DELETE_BLOG_SUCCESS,
    payload: id,
});

export const deleteBlogFailure = (error) => ({
    type: DELETE_BLOG_FAILURE,
    payload: error,
});

export const fetchBlogsRequest = () => ({
    type: FETCH_BLOGS_REQUEST,
});

export const fetchBlogsSuccess = (blogs) => ({
    type: FETCH_BLOGS_SUCCESS,
    payload: blogs,
});
