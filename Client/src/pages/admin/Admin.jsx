import React, { useState } from 'react'
import '../Auth/Auth.scss'
import Logo from '../../img/logo.png'
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux'
import { adminLogIn } from '../../Redux/actions/AuthAction';

const Admin = () => {
  
    const [data, setData] = useState({ firstname: "", password: "" })
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
      }

    const admin = false
   const handleSubmit =(e)=>{
    console.log(data,'adminData');
    e.preventDefault()

    if(data.firstname==="admin" && data.password==="12345"){
         navigate("/admin/user")
         console.log('submitted');
         dispatch(adminLogIn(data))
    }
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
    <div className="a-right">
    <form className="infoForm authForm" onSubmit={handleSubmit}>
        ADMIN 
         <div> 
              <input type="text" placeholder='First Name' className='infoInput' name='firstname'  onChange={handleChange}/>
             </div>
             <div  className='validation'>
            <input type="password" placeholder='Password' className='infoInput' name='password' onChange={handleChange}/>
            </div>
            <button className="button infoButton" type='submit'>Submit</button>
    </form>
       
    </div>
    </div>
  )
}

export default Admin
