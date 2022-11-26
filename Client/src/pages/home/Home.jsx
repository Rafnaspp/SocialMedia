import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.scss'
const Home = () => {
  return (
    <div className="Home">
        <ProfileSide />
        <PostSide />
        <RightSide /> 
    </div>
  )
}

export default Home