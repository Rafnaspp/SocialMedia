import React from 'react'
import './Auth.scss'
import Logo from '../../img/logo.png'
import OtpModal from '../../components/OtpModal/OtpModal'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { checkUser, logIn, signUp } from '../../Redux/actions/AuthAction.js'
import validate from '../../validation/validation.js'

const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(true)
  const [modalOpened, setModalOpened] = useState(false)
  const [data, setData] = useState({ firstname: "", lastname: "", password: "", confirmpass: "", username: "" })
  const [err, setErr] = useState({})


  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const [confirmPass, setConfirmPass] = useState(true)

 const handleSubmit = (e)=>{
    console.log('submited');
  setErr(validate(data))

    e.preventDefault()
  
    if(isSignUp){
      if( data.password === data.confirmpass ){
        dispatch(checkUser(data))
        setModalOpened(true)
      }
       else{
       setConfirmPass(false)
       } 
    }
    else{
      console.log(
        'logineddddddddddd'
      );
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
    username: "",
    mobile:""
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
        
        {modalOpened ? (<div>
        <OtpModal 
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        datas ={data}
        />
        </div>): ""}
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign Up" : "Log in"}</h3>
          {isSignUp &&
            <div>
              <div className="validation">
              <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange} value={data.firstname}/>
              {err.firstname ? <p style={{color:"red"}}> {err.firstname}</p> : <p></p> }
              </div>
              <div className="validation">
              <input type="text" placeholder='Last Name' className='infoInput' name='lastname'onChange={handleChange} value={data.lastname}/>
              {err.lastname ? <p style={{color:"red"}}> {err.lastname}</p> : <p></p> }
              </div>
            </div>
          }

          <div className='validation'>
            <input type="text" placeholder='Username' className='infoInput passInput1' name='username' onChange={handleChange} value={data.username}/>
            {err.username ? <p style={{color:"red"}}> {err.username}</p> : <p></p> }
          </div>
          
          {isSignUp &&
          <div  className='validation'>
            <input type="text" placeholder='Mobile' className='infoInput passInput1' name='mobile' onChange={handleChange} value={data.mobile}/>
            {err.mobile ? <p style={{color:"red"}}> {err.mobile}</p> : <p></p>}
         </div>
          
          }
          <div>
            <div  className='validation'>
            <input type="password" placeholder='Password' className='infoInput' name='password' onChange={handleChange} value={data.password}/>
            {err.password && <p style={{color:"red"}}> {err.password}</p>}
            </div>
            {isSignUp &&
            <div  className='validation'>
              <input type="password" placeholder='Confirm Password' className='infoInput' name='confirmpass' onChange={handleChange} value={data.confirmpass}/>
              {err.confirmpass && <p style={{color:"red"}}> {err.confirmpass}</p>}
           </div>
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