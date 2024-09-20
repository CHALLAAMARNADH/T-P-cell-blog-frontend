import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItemButton, ListItemAvatar, ListItemText, Avatar, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MyPosts = () => {
  const [userPosts, setUserPosts] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const userInfoData = JSON.parse(localStorage.getItem('userInfo'));
       const response = await axios.get(`/api/posts/all-posts`);
        const filteredPosts = response.data.filter(post => post.username == userInfoData.userInfo.username);
      setUserPosts(filteredPosts);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);


  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
     
      setUserPosts(userPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        My Posts
      </Typography>
      <List>
        {userPosts.map(({ _id, title, desc }) => (
          <ListItemButton key={_id}>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={''} />
            </ListItemAvatar>
            <ListItemText 
              primary={<Typography variant="h6">{title}</Typography>}
              secondary={<Typography variant="body1">{desc}</Typography>}
            />
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePost(_id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default MyPosts;
