import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/ProfileSide'
import RightSide from '../../components/RightSide/RightSide'
import './Home.scss'
const Home = () => {
  return (
    <div className="Home">
      <div className='profile-side'>
        <ProfileSide />
      </div>
<div className='post-side'>
<PostSide />
  </div>   
  <div className='right-side'>
  <RightSide /> 
    </div>    
      
    </div>
  )
}

export default Home