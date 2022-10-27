import React from 'react'
import './Post.css'
import NotLike from '../../img/notlike.png'
import Comment from '../../img/comment.png'
import Heart from '../../img/like.png'
import Share from '../../img/share.png'

const Post = ({data}) => {
  return (
  <div className="Post">
      <img src={data.img} alt="" />
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