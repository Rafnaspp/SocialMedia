import React, { useState } from 'react'
import './infoCard.scss'
import { UilPen } from '@iconscout/react-unicons'
import { useSetState } from '@mantine/hooks'
import ProfileModal from '../ProfileModal/ProfileModal'

const InfoCard = () => {

    const [modalOpened, setModalOpened] = useState(false)

    return (
        <div className="InfoCard">
            <div className="infoHead">
                <h4>your info</h4>
                <div>
                    <UilPen width='1rem' height='1.2rem' onClick={() =>  setModalOpened(true)} />
                    <ProfileModal modalOpened={modalOpened}
                        setModalOpened={setModalOpened}
                    />
                </div>
            </div>
            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>in relationship</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives In </b>
                </span>
                <span>Kannur</span>
            </div>
            <div className="info">
                <span>
                    <b>Work at </b>
                </span>
                <span>Broto</span>
            </div>
            <button className='button logout-button'>Log out</button>
        </div>
    )
}

export default InfoCard
