import { Modal, useMantineTheme } from '@mantine/core';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addComment } from '../../Redux/actions/UploadAction';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Profile from '../../img/Profile.jpeg'


function CommentModal({ modalOpened, setModalOpened, postId, posts, persons}) {
    const [data,setData] = useState({})
    const {user} = useSelector((state) => state.authReducer.authData)
    const theme = useMantineTheme();
    const dispatch = useDispatch()
    const comments = posts.commnets
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    
//    console.log('posts on cmnt',posts.commnets);
   console.log('posts on cmnt',comments);


    //handleChange
    const handleChange = (e)=>{
        let d = new Date(Date.now());
        d.toString() 
        setData({...data,
            commentText: e.target.value,
            date: d,
            userId : user._id,
            userName:user.username,
            profilePicture: user.profilePicture,
            postId :postId     
        })
    }
    console.log(data,'data on modal');

    const addComments =()=>{
        dispatch(addComment(data))
        setData({...data,commentText:""})
    }
    //mui
  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
        <div>
  <CssBaseline />
  <Paper square sx={{ pb: '50px' }}>
    <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
      Comments
    </Typography>
    <List sx={{ mb: 2 }}>
      <div  style={{"height" : "90%"}} >
      <input  type="text" name='commentText' style={{"width" : "90%" ,"height" : "3rem"}}  placeholder='Add your Comment' onChange={handleChange}
      value={data.commentText}
      />
      <Button variant="contained" onClick={addComments}>
      Add
    </Button>
      </div>
      {comments.map((value) => (
        <div key={value.date}>
             
         
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
              {  value.userName}
            </ListSubheader>
            
          <ListItem button>
            <ListItemAvatar>
                    <Avatar alt="Profile Picture"  src={ serverPublic + value.profilePicture} /> 
            </ListItemAvatar>
            <ListItemText primary={value.commentText}  />
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
              {value.date}
            </ListSubheader>
          </ListItem>
        </div>
        ))}
    </List>
  </Paper>
  
    <Toolbar>
      <Box sx={{ flexGrow: 1 }} />
    </Toolbar>
  
</div>
        </Modal>
    );
}

export default CommentModal