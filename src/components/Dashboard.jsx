import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Rating
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBlogsRequest,
  addBlogRequest,
  editBlogRequest,
  deleteBlogRequest,
} from '../redux/actions/blogActions';
import Header from './Header';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { blogs } = useSelector(state => state.blogs);
    const { user } = useSelector(state => state.auth); // Get user data for author
    const [open, setOpen] = useState(false);
    const [currentBlog, setCurrentBlog] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchBlogsRequest());
    }, [dispatch]);

    const handleOpen = (blog) => {
        if (blog) {
            setTitle(blog.title);
            setContent(blog.content);
            setCurrentBlog(blog);
        } else {
            setTitle('');
            setContent('');
            setCurrentBlog(null);
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentBlog(null);
    };

    const handleSubmit = () => {
        const blogData = { title, content, author: user.firstName }; // Only set the author's first name
        if (currentBlog) {
            dispatch(editBlogRequest({ ...currentBlog, ...blogData }));
        } else {
            dispatch(addBlogRequest(blogData));
        }
        handleClose();
        setSnackbarOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteBlogRequest(id));
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
    };

    return (
        <Container>
            <Header onLogout={handleLogout} />
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpen(null)}
                startIcon={<AddIcon />}
                sx={{ float: 'right', mb: 2, mt: 5 }} // Added top margin of 40px
            >
                Create
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Title</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Content</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Author</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Rating</TableCell>
                            <TableCell style={{ fontWeight: 'bold', fontSize: '1.1rem' }} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {blogs.map((blog) => (
                            <TableRow key={blog.id}>
                                <TableCell>{blog.title}</TableCell>
                                <TableCell>{blog.content}</TableCell>
                                <TableCell>{blog.author}</TableCell>
                                <TableCell>
                                    <Rating value={blog.rating || 0} readOnly />
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleOpen(blog)}>Edit</Button>
                                    <Button onClick={() => handleDelete(blog.id)} color="error">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>{currentBlog ? 'Edit Blog' : 'Create Blog'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        fullWidth
                        variant="outlined"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        multiline
                        rows={4} // Ensure it's a text area
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{currentBlog ? 'Update' : 'Create'}</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success">
                    {currentBlog ? 'Blog updated successfully!' : 'Blog created successfully!'}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Dashboard;
