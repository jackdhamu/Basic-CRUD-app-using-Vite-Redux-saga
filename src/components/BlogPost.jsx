// src/components/BlogPost.js

import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const BlogPost = () => {
    const { id } = useParams(); // Get the blog ID from the URL parameters
    const blog = useSelector(state => state.blogs.find(blog => blog.id === parseInt(id)));

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{blog.title}</Typography>
                <Typography variant="body2">{blog.content}</Typography>
                <Button variant="contained" color="primary">
                    Edit
                </Button>
            </CardContent>
        </Card>
    );
};

export default BlogPost;