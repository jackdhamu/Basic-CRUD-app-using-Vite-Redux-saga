
import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';
import { editBlogRequest } from '../redux/actions/blogActions'; // Ensure this is correct

const BlogEdit = ({ blog, onClose }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);

    const handleSubmit = () => {
        const updatedBlog = { ...blog, title, content }; // Updated blog data
        dispatch(editBlogRequest(updatedBlog)); // Dispatch the edit action
        onClose(); // Close the dialog
    };

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogContent>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BlogEdit;