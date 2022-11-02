import React from 'react'
import './Post.scss'
import NotLike from '../../img/notlike.png'
import Comment from '../../img/comment.png'
import Heart from '../../img/like.png'
import Share from '../../img/share.png'
import { useSelector } from 'react-redux'

const Post = ({data}) => {
  const  {user} = useSelector((state)=>state.authReducer.authData)
  return (
  <div className="Post">
      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image :"" } alt="" />
      <div className="postReact">
        <img src={data.Liked?Heart: NotLike} alt="" />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span>{data.Likes} Likes</span>
      <div className="detail">
        <span> <b>{data.name} </b></span>
        <span>{data.desc}</span>
      </div>
  </div>
  )
}

export default Post
