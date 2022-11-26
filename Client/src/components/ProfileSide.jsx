import React from 'react'
import LogoSearch from './LogoSearch/LogoSearch'
import ProfileCard from './Profilecard/ProfileCard'
import FollowersCard from './FollowersCard/FollowersCard'
import "./ProfileSide.scss"

const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
     {/* <LogoSearch/> */}
     <ProfileCard location="homepage"/>
     <FollowersCard/>
    </div>
  )
}

export default ProfileSide
