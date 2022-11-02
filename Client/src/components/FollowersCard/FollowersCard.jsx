import React from 'react'
import { Followers } from '../../Data/FollowersData'
import './FollowersCard.scss'

const FollowersCard = () => {
  return (
     <div className="FollowersCard">
        <h3>Who is following You</h3>
   {Followers.map((follower,id)=>{
    return(
        <div className="Follower">
            <div>
                <img src={follower.img} alt="" className='followerImage'/>
                <div className="name">
                    <span>{follower.name}</span>
                    <span>@{follower.userName}</span>

                </div>
            </div>
            <button className='button fc-button'>Follow</button>
        </div>
    )
   })}
     </div>
  )
}

export default FollowersCard
