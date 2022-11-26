import React, { useState } from 'react'
import './RightSide.scss'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'
import {Link} from 'react-router-dom'
import TrendCard from '../TrendCard/TrendCard'
import ShareModal from '../ShareModal/ShareModal'
import ChatOnLand from '../../pages/chat/ChatOnLand'

const RightSide = () => {
    
    const [modalOpened, setModalOpened] = useState(false)


    return (
        <div className="RightSide">
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

            {/* <TrendCard /> */}
          <ChatOnLand />
            <button className='button r-button' onClick={() => setModalOpened(true)} >
                share
            </button>
            <ShareModal modalOpened={modalOpened}
                setModalOpened={setModalOpened}
            />
        </div>
    )
}

export default RightSide
