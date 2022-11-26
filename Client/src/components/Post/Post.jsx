import React from 'react'
import './Post.scss'
import NotLike from '../../img/notlike.png'
import Comment from '../../img/comment.png'
import Heart from '../../img/like.png'
import Share from '../../img/share.png'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { likePost } from '../../Api/PostRequest'
import { getAllUser } from '../../Api/UserRequest'
import { useEffect } from 'react'
import PostUser from '../Posts/PostUser'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faTrash } from '@fortawesome/free-solid-svg-icons'
import Popup from 'reactjs-popup';
import { deletePost } from '../../Redux/actions/postAction'
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
import { Modal, useMantineTheme } from '@mantine/core';
import CommentModal from '../commentModal/CommentModal'



const Post = ({ data }) => {
  console.log(data);
  const { user } = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)
  const [persons, setPersons] = useState([])
  const [open,setOpen] =useState(false)
  const [modalOpened, setModalOpened] = useState(false)
 

  const dispatch = useDispatch()


  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  const handleDelete = () => {
    console.log('delete');
    dispatch(deletePost(data._id, user._id))

  }

  const handleOpenComment =()=>{
    setOpen((prev) => !prev)
  }

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser()
      setPersons(data)
      console.log(data, 'usersssss');
    }
    fetchPersons()
  }, [])

  
  return (
    <div className="Post">
      {persons.map((person, id) => {
        if (person._id === data.userId) {
          return (
            <PostUser person={person} key={id} />
          )
        }
      })}
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />
      <div className="postReact">
        <img src={liked ? Heart : NotLike} alt="" style={{ cursor: "pointer" }} onClick={handleLike} />
        <img src={Comment} onClick={() => setModalOpened(true)} alt="" />
        <CommentModal postId ={data._id} posts ={data} persons={persons} modalOpened={modalOpened}
                setModalOpened={setModalOpened}
            />
        {/* {open && (
         
       
  <div>
  <CssBaseline />
  <Paper square sx={{ pb: '50px' }}>
    <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
      Inbox
    </Typography>
    <List sx={{ mb: 2 }}>
      <div >
      <input style={{"width" : "90%", "height" : "30%"}} type="text" placeholder='Add your Comment' />
      <button>Add</button>
      </div>
      {messages.map(({ id, primary, secondary, person }) => (
        <div key={id}>
          {id === 1 && (
            <ListSubheader sx={{ bgcolor: 'background.paper' }}>
              Today
            </ListSubheader>
          )}

          <ListItem button>
            <ListItemAvatar>
              <Avatar alt="Profile Picture" src={person} />
            </ListItemAvatar>
            <ListItemText primary={primary} secondary={secondary} />
          </ListItem>
        </div>
      ))}
    </List>
  </Paper>
  
    <Toolbar>
      <Box sx={{ flexGrow: 1 }} />
    </Toolbar>
  
</div>

        )} */}
      
        {/* <img src={Share} alt="" />  */}
        {user._id === data.userId ? (<FontAwesomeIcon icon={faTrash} onClick={handleDelete} />) : ""}

      </div>
      <span>{likes} Likes</span>
      <div className="detail">
        <span> <b>{data.name} </b></span>
        <span>{data.desc}</span>
      </div>
    </div>
  )
}

export default Post
