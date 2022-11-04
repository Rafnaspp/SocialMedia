import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileCard from '../../components/Profilecard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/RightSide/RightSide'




import './Profile.scss'
const Profile = () => {
  return (
    <div className="Profile">
       <ProfileLeft />

        <div className="Profile-center">
           <ProfileCard location="profilePage"/>
            <PostSide />
        </div>

        <RightSide />
    </div>
  )
}

export default Profile