import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUser } from '../../Api/UserRequest'
import Profile from '../../img/Profile.jpeg'
import '../FollowersCard/FollowersCard.scss'


const Conversation = ({data, currentUserId,online}) => {

   const [userData, setUserData] = useState(null)
   const userId = data.members.find((id)=>id!==currentUserId)
   console.log(userId);

   useEffect(()=>{
    const getUserData = async()=>{
        try {
            const {data} = await getUser(userId)
            setUserData(data)
            console.log(data);  
        } catch (error) {
            console.log(error);
        }
    }
    getUserData()
   },[])

  return (
    <>
    <div className="follower conversation" >
        <div>
        
        {online && <div className="online-dot"></div>}
        <img src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture: Profile} alt="" 
        className='followerImage'
        style={{width:'50px', height:'50px'}}
        />
        <div className="name" style={{fontSize:"0.8rem"}} >
            <span >{userData?.firstname} {userData?.lastname}</span>
            <span>{online? "Online" : "Offline"} </span>
             </div>
    </div>
    </div>
    <hr style={{width:'85%', border:'0.1px solid #ececec'}} />
    </>
  )
}

export default Conversation
