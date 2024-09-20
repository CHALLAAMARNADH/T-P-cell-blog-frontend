import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import MoreIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

const BottomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [defaultPosts, setDefaultPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postData, setPostData] = useState({
    title: '',
    desc: '',
    username: '', // Removed the username initialization here
    userId: '',
  });
  const [userInfo, setUserInfo] = useState(null);

  const fetchDefaultPosts = async () => {
    try {
      const userInfoData = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfoData && userInfoData.userInfo.username) {
        setUserInfo(userInfoData);
        setPostData(prevData => ({
          ...prevData,
          username: userInfoData.userInfo.username // Set username here
        }));
        const response = await axios.get(`/api/posts/all-posts`);
        const filteredPosts = response.data.filter(post => post.username !== userInfoData.userInfo.username);
        setDefaultPosts(filteredPosts);
        setPosts(filteredPosts);
      } else {
        console.error('User info not found in localStorage or username is missing.');
      }
    } catch (error) {
      console.error('Error fetching default posts:', error);
      setDefaultPosts([]);
    }
  };

  useEffect(() => {
    fetchDefaultPosts();
  }, []);

  const handleSearch = async () => {
    try {
      if (searchQuery.trim() !== '') {
        const response = await axios.get(`/api/posts/${searchQuery}`);
        setPosts(response.data);
      } else {
        setPosts(defaultPosts);
      }
    } catch (error) {
      console.error('Error searching for user posts:', error);
      setPosts([]);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPosts(defaultPosts);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    fetchDefaultPosts();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setPostData({
      title: '',
      desc: '',
      username: '', // Clear username when modal is closed
      userId: '',
    });
  };

  const handleTitleChange = (event) => {
    const { value } = event.target;
    setPostData(prevData => ({
      ...prevData,
      title: value,
    }));
  };

  const handleDescChange = (event) => {
    const { value } = event.target;
    setPostData(prevData => ({
      ...prevData,
      desc: value,
    }));
  };

  const handleUserIdChange = (event) => {
    const { value } = event.target;
    setPostData(prevData => ({
      ...prevData,
      userId: value,
    }));
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/posts/create', postData);

      if (response.status === 200) {
        setPostData({
          title: '',
          desc: '',
          username: '', // Clear username after submission
          userId: '',
        });
        handleCloseModal();
      } else {
        console.error('Error creating post: Unexpected response status', response.status);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      } else if (error.request) {
        console.error('Request details:', error.request);
      } else {
        console.error('Error details:', error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: '50px' }}>
        <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
          Inbox
        </Typography>
        <List sx={{ mb: 2 }}>
          {posts.map(({ _id, title, desc, username }) => (
            <React.Fragment key={_id}>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={''} />
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography variant="h6">{title}</Typography>}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body1">{desc}</Typography>
                      <Typography variant="subtitle2">{username}</Typography>
                    </React.Fragment>
                  } 
                />
              </ListItemButton>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" >
            <MenuIcon />
          </IconButton>
          <StyledFab color="secondary" aria-label="add" onClick={handleOpenModal}>
            <AddIcon />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
          <TextField
            label="Search Username"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <IconButton color="inherit" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          {searchQuery && (
            <IconButton color="inherit" onClick={handleClearSearch}>
              <ClearIcon />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            aria-controls="more-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            id="more-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem component={Link} to="/about">About</MenuItem>
            <MenuItem component={Link} to="/companies">companies</MenuItem> 
            <MenuItem component={Link} to="/drives">Drives</MenuItem> 
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem component={Link} to="/my-posts">My Posts</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      > 
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" id="modal-title" gutterBottom>
            Add New Post
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={postData.title}
            onChange={handleTitleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="desc"
            name="desc"
            label="Description"
            value={postData.desc}
            onChange={handleDescChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="userId"
            name="userId"
            label="User ID"
            value={postData.userId}
            onChange={handleUserIdChange}
          />
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default BottomAppBar;
