import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userChats } from '../../Api/ChatRequest'
import Conversation from '../../components/Conversation/Conversation'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import './Chat.scss'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import {Link} from 'react-router-dom'
import ChatBox from '../../components/ChatBox/ChatBox'
import {io} from 'socket.io-client'
import { useRef } from 'react'


const Chat = () => {
    
  
    const {user} = useSelector((state) => state.authReducer.authData)
    console.log(user._id,'userid');

    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers,setOnlineUsers]= useState([])
    const [sendMessage,setSendMessage] = useState(null)
    const [receiveMessage,setReceiveMessage] = useState(null)
    const socket = useRef()



    
    useEffect(()=>{
      socket.current = io('ws://localhost:8800')
      socket.current.emit("new-user-add", user._id)
      socket.current.on('get-users', (users)=>{
        setOnlineUsers(users)
      })
    },[user])

    
    //sending message to socket server
    useEffect(()=>{
      console.log('sendMessage before check:',sendMessage);
      if(sendMessage !== null){
        console.log('sendMessage after check:',sendMessage);
    socket.current.emit('send-message', sendMessage)
      }
    },[sendMessage])
    
    //recieve message from socket server
     useEffect(()=>{
       socket.current.on("receive-message", (data)=>{
        console.log("Data received in parent Chat.jsx",data);
        setReceiveMessage(data)
       })
     },[])

      
    useEffect(()=>{
        const getChats = async()=>{
            try {
                const {data} = await userChats(user._id)
                setChats(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        getChats()
    },[user])

    const checkOnlineStatus = (chat)=>{
      const chatMembers = chat.members.find((member)=> member !== user._id)
      const online = onlineUsers.find((user)=> user.userId === chatMembers)
      return online ? true : false
    }

  return (
    <div className='Chat'>
      {/* left side */}
      <div className='Left-side-chat'>
        <LogoSearch/>
        <div className="Chat-container">
        <h2>Chats</h2>
        <div className='Chat-list'>
         {chats.map((chat)=>(
                <div onClick={()=> setCurrentChat(chat)}>
                    <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)}/>
                </div>
        ) )}
        </div>
      </div>
      </div>
      {/* Right Side */}
      <div className="Right-side-chat">
           <div style={{width:"20rem", alignSelf :'flex-end'}}>
           <div className="navIcons">
                <Link to='../home'>
                <img src={Home} alt="" />
                </Link>
                {/* <UilSetting /> */}
                {/* <img src={Noti} alt="" /> */}
                <Link to="../chat">
                <img src={Comment} alt="" />
                </Link>
            </div>
         </div>
       {/* Chat body */}
       <div>
         <ChatBox chat = {currentChat} currentUser = {user._id}  setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}/>
          </div>
      </div>
    </div>
  )
}

export default Chat