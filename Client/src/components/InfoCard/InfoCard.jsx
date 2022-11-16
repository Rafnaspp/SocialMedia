import React, { useState } from 'react'
import './infoCard.scss'
import { UilPen } from '@iconscout/react-unicons'
import { useSetState } from '@mantine/hooks'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import * as UserApi from '../../Api/UserRequest.js'
import { logOut } from '../../Redux/actions/AuthAction.js'

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false)

    const dispatch = useDispatch()
    const params = useParams()

    const profileUserId = params.id
    const [profileUser, setProfileUser] = useState({})

    const {user} = useSelector((state)=>state.authReducer.authData)

    useEffect(()=>{
        const fetchPrfoileUser = async ()=>{
            if(profileUserId === user._id){
                setProfileUser(user)            }
            else{
                const profileUser = await UserApi.getUser(profileUserId)
                setProfileUser(profileUser)
            }
        }
        fetchPrfoileUser()
    },[user])

    const handleLogOut = ()=>{
        dispatch(logOut())
    }

    return (
        <div className="InfoCard">
            {user._id === profileUserId ? (
                <div className="infoHead">
                <h4>your info</h4>
                <div>
                    <UilPen width='1rem' height='1.2rem' onClick={() =>  setModalOpened(true)} />
                    <ProfileModal 
                        modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                        data = {user}
                    />
                </div>
            </div>
            ): ""}
            
            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>{profileUser.relationship}</span>
            </div>
            <div className="info">
                <span>
                    <b> lives in </b>
                </span>
                <span>{profileUser.livesin}</span>
            </div>
            <div className="info">
                <span>
                    <b>works at </b>
                </span>
                <span>{profileUser.worksAt}</span>
            </div>
            <button className='button logout-button' onClick={handleLogOut} >Log out</button>
        </div>
    )
}

export default InfoCard
