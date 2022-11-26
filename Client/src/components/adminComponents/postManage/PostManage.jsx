import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './PostManage.scss'
import {  getAllPosts } from '../../../Api/PostRequest';
import {deletePost} from '../../../Redux/actions/postAction'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  

const PostManage = () => {

  const dispatch = useDispatch()
    const [posts, setPosts] = useState([])
    const [load,setLoad] = useState(false)
   console.log('post manage');
   
    useEffect(()=>{
        console.log('hello');
        const fetchPosts = async()=>{
            console.log("helllllooo");
           const {data} = await getAllPosts()
           setPosts(data)
           console.log(data,'on post manage');
        }
        fetchPosts()
    },[load])

    const handleDelete = (postId) => {
      setLoad((prev) => !prev);
      setLoad((prev) => !prev);
      console.log('delete');
      const userId = "admin"
      dispatch(deletePost(postId,userId))
  
    }

  return (
    <div className='card'>
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {posts.map((post) => (
        <Grid item xs={2} sm={4} md={3} key={post._id}>
          <Item></Item>
          <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={ process.env.REACT_APP_PUBLIC_FOLDER + post.image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.desc}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          <FontAwesomeIcon icon={faTrash} onClick={()=>handleDelete(post._id)} />
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
  </div>
  )
}

export default PostManage
