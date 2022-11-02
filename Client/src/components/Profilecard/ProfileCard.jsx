import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import Cover from '../../img/Profile.jpg'
import Profile from '../../img/prfileIMG.jpg'
import './ProfileCard.scss'

const ProfileCard = () => {

const ProfilePage = true

  return (
   <div className="ProfileCard">
    <div className="ProfileImages">
      <img src={Cover}alt="" />
      <img src={Profile}alt="" />
    </div>
    <div className="ProfileName">
      <span>ALEN</span>
       <span>Senoir UX UI DESGNER</span>
    </div>
  <div className="followStatus">
    <hr />
    <div>
      <div className="follow">
        <span>6,508</span>
        <span>following</span>
      </div>
      <div className="vl"></div>
      <div className="follow">
        <span>1</span>
        <span>followers</span>
      </div>
      {ProfilePage &&(
        <>
        <div className="vl">

        </div>
        <div className="follow">
          <span>3</span>
          <span>Posts</span>
        </div>
        </>
      )}
    </div>
    <hr />
  </div>
  {ProfilePage ? "" : <span>
    My Profile
  </span>}
  
   </div>
  )
}

export default ProfileCard
