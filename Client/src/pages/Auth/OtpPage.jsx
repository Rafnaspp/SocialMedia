import React from 'react'
import './Auth.scss'
import Logo from '../../img/logo.png'
import {useDispatch,useSelector} from 'react-redux'
import { signUp } from '../../actions/AuthAction'
import { useState } from 'react'
import { otpVerify } from '../../actions/AuthAction'

const OtpPage = () => {

    const dispatch = useDispatch()
    const datas = useSelector((state)=>state.authReducer.authData)
    const [data, setData] = useState({})

    const handleChange = (e) => {
        setData({ ...datas, [e.target.name]: e.target.value })
      }

   const handleSubmit =(e)=>{
       e.preventDefault() 
         
       dispatch(otpVerify(data))
      
   }

  return (
    <div className="Auth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="webName">
          <h1>WIDE VERSE</h1>
          <h6>Explore!!!</h6>
        </div>
      </div>
      {/* Right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>OTP PAGE</h3>

          <div>
            <input type="number" placeholder='Enter Otp' className='infoInput' name='otp' onChange={handleChange} value={data.otp}/>
          </div>
           
         
          <button className="button infoButton" type='submit'>
           SUBMIT </button>
        </form>
      </div>

    </div>
  )
}

export default OtpPage
