import React, { useState } from 'react'
import { useEffect } from 'react'
import { addMessage, getMessages } from '../../Api/MessageRequest.js'
import { getUser } from '../../Api/UserRequest'
import Profile from '../../img/Profile.jpeg'
import './ChatBox.scss'
import {format} from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { useRef } from 'react'

const ChatBox = ({ chat, currentUser, setSendMessage , receiveMessage}) => {

    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef()

    useEffect(()=>{
        
        if(receiveMessage !== null && receiveMessage.chatId===chat._id){
            setMessages([...messages,receiveMessage])
        }

    },[receiveMessage])

    console.log('senderId:',messages.senderId,'userid',currentUser);

    //fetching data for header
    useEffect(() => {
        console.log('chat boxxxxxxxxxxxxxxxxxxx');
        const userId = chat?.members?.find((id) => id !== currentUser)
        const getUserData = async () => {
            try {
                const { data } = await getUser(userId)
                setUserData(data)
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        if (chat !== null) getUserData();
    }, [chat, currentUser])

    useEffect(()=>{
        const fetchMessages = async()=>{
              try {
          const {data} = await getMessages(chat?._id)
          console.log(data,'here mwssage get');
           setMessages(data)
            }
         catch (error) {
            console.log(error);
        }
    }
    if(chat !== null) fetchMessages()

},[chat])

      const handleChange = (newMessage)=>{
            setNewMessage(newMessage)
      }     


      const handleSend = async(e)=>{
        e.preventDefault()
        const message = {
            senderId : currentUser,
            text: newMessage,
            chatId : chat._id,
        }

        // send message to database
        try {
            const {data} = await addMessage(message)
            setMessages([...message,data])
            setNewMessage("")
        } catch (error) {
            console.log(error);
        }
        
        //sende message to socket server
       const receiverId = chat.members.find((id) => id !== currentUser)
       setSendMessage({...message,receiverId})
      }
    

      //always scroll to the last message
      useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"})
      },[messages])

    return (
        <>
        
            <div className="ChatBox-container">
                {chat? (
                     <>
                     <div className="chat-header">
                         <div className="Follower">
                             <div>
                                 <img src={userData?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : Profile} alt=""
                                     className='followerImage'
                                     style={{ width: '50px', height: '50px' }}
                                 />
                                 <div className="name" style={{ fontSize: "0.8rem" }} >
                                     <span >{userData?.firstname} {userData?.lastname}</span>
                                 </div>
                             </div>
                         </div>
                          
                 <hr style={{width:'85%', border:'0.1px solid #ececec'}} />
                     </div>
                     {/* Chat box messages */}
                     <div className="chat-body">
                       
                          {messages.map((message)=>(
                             <>
                             <div  ref={scroll} 
                               className={message.senderId === currentUser ? "message own" : "message"}>
                               <span>{message.text}</span>
                               <span>{format(message.createdAt)}</span>
                             </div>
                             </>
                          ))}
                     </div>
                     {/* chat sender */}
                     <div className="chat-sender">
                         <div>+</div>
                         <InputEmoji
                         value={newMessage}
                         onChange = {handleChange}
                         />
                         <div className="send-button button" onClick={handleSend} >SEND</div>
                     </div>
                 </>
                ):(
                    <span className='chatbox-empty-message'>Tap On a Chat to start Conversation</span>
                )}
               

            </div>
        
        </>
    )
}

export default ChatBox
