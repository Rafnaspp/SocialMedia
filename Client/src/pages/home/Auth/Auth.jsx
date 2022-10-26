import React from 'react'
import './Auth.scss'
import Logo from '../../../img/logo.png'
import { useState } from 'react'

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true)

    const [data, setData] = useState({firstname: "" , lastname:"" , password:"" , confirmpass:"" , username:""})

    const handleChange = (e)=> {
        setData({...data, [e.target.name] : e.target.value})
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
            <form  className="infoForm authForm">
                <h3>{isSignUp? "Sign Up" : "Log in"}</h3>
             {isSignUp && 
             <div>
                <input type="text" placeholder='First Name' className='infoInput' name='firstname' />
             
                <input type="text" placeholder='Last Name' className='infoInput' name='lastname' />
             </div>
               }

             <div>
             <input type="text" placeholder='Username' className='infoInput' name='username' /> 
             </div>
             <div>
             <input type="text" placeholder='Password' className='infoInput' name='password' />
             {isSignUp  &&
             <input type="text" placeholder='Confirm Password' className='infoInput' name='confirmpass' />  
                }
             </div>
             <div>
                <span className='haveAnAc' onClick={()=>setIsSignUp((prev)=>!prev)}>
                    {isSignUp? "Already have an account. Login!" : "Don't have an account! SignUp"} </span>
             </div>
               <button className="button infoButton" type='submit'>{isSignUp? "Sign Up" : "Log In"}</button>
            </form>
        </div>

   </div>
  )
}





export default Auth
