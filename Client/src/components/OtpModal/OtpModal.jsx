import React from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { signUp } from '../../Redux/actions/AuthAction.js'

const OtpModal = ({ modalOpened, setModalOpened,datas}) => {
    const dispatch = useDispatch()
    const theme = useMantineTheme(); 
    const [data, setData] = useState(datas)


    console.log(data);
    const check = useSelector((state)=>state.authReducer.check)
    console.log(check,'checkkkkkkk');

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
      }
console.log(data);
console.log('incluse otpppppp');

    const handleSubmit = (e)=>{
        e.preventDefault()
      console.log('calleddddddddddddd submit');
        dispatch(signUp(data))
    }

  return (
         
       <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='55%'
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            
            {check === true?(
            <form className="infoForm">
                <h3>Enter Otp</h3>
                <div>
                    <input type="text" className="infoInput" name='OTP' placeholder='Enter OTP' 
                   onChange={handleChange}
                    />
                   

                </div>
               
               
                <button className='button infoButton' onClick={handleSubmit}>Submit</button>
            </form>):  (
                <div className="infoForm infoInput">username already exist!! please use another one </div>
            ) }
            
        </Modal>

  )
}

export default OtpModal
