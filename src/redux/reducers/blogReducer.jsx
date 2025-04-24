
import {
    ADD_BLOG_SUCCESS,
    DELETE_BLOG_SUCCESS,
    EDIT_BLOG_SUCCESS,
    FETCH_BLOGS_REQUEST,
    FETCH_BLOGS_SUCCESS,
} from '../actions/blogActions';

const initialState = {
    blogs: [],
    loading: false,
    error: null,
};

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BLOGS_REQUEST:
            return { ...state, loading: true };  // Manage loading state
        case FETCH_BLOGS_SUCCESS:
            return { ...state, loading: false, blogs: action.payload }; // Handle successful fetch of blogs
        case ADD_BLOG_SUCCESS:
            return { ...state, blogs: [...state.blogs, action.payload] }; // Handle adding a new blog
        case EDIT_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.map(blog =>
                    blog.id === action.payload.id ? action.payload : blog
                ),
            };
        case DELETE_BLOG_SUCCESS:
            return {
                ...state,
                blogs: state.blogs.filter(blog => blog.id !== action.payload),
            };
        default:
            return state;
    }
};

export default blogReducer;