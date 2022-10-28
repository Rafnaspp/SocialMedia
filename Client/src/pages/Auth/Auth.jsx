import React from 'react'
import './Auth.scss'
import Logo from '../../img/logo.png'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction.js'

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(true)
  const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const [confirmPass, setConfirmPass] = useState(true)

 const handleSubmit = (e)=>{
    e.preventDefault()

    if(isSignUp){
       data.password === data.confirmpass 
       ?dispatch(signUp(data))
       :setConfirmPass(false)
    }
    else{
      dispatch(logIn(data))
    }
 }
 
 const resetForm = ()=>{
  setConfirmPass(true)
  setData({
    firstname: "",
    lastname: "", 
    password: "", 
    confirmpass: "", 
    username: ""
    })
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
          <h3>{isSignUp ? "Sign Up" : "Log in"}</h3>
          {isSignUp &&
            <div>
              <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange} value={data.firstname}/>

              <input type="text" placeholder='Last Name' className='infoInput' name='lastname'onChange={handleChange} value={data.lastname}/>
            </div>
          }

          <div>
            <input type="text" placeholder='Username' className='infoInput' name='username' onChange={handleChange} value={data.username}/>
          </div>
          <div>
            <input type="password" placeholder='Password' className='infoInput' name='password' onChange={handleChange} value={data.password}/>
            {isSignUp &&
              <input type="password" placeholder='Confirm Password' className='infoInput' name='confirmpass' onChange={handleChange} value={data.confirmpass}/>
            }
          </div>

            {!confirmPass && (<span className='confirmPass'> *Confirm Password is not same</span>)}
           
          <div>
            <span className='haveAnAc' onClick={() => {setIsSignUp((prev) => !prev); resetForm()}}>
              {isSignUp ? "Already have an account. Login!" : "Don't have an account! SignUp"} </span>
          </div>
          <button className="button infoButton" type='submit' disabled={loading}>
            {loading? "Loading...." : isSignUp ? "Sign Up" : "Log In"}</button>
        </form>
      </div>

    </div>
  )
}





export default Auth
