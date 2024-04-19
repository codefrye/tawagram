import  { useState } from 'react'
import "./Auth.css";

import Logo from "../../img/logo.png";
import { useDispatch,useSelector } from 'react-redux';

import {logIn, signUp } from '../../actions/AuthActions';
const Auth = () => {
    const loading=useSelector((state)=>state.authReducer.loading)
    const dispatch= useDispatch()
    const [confirmPass,SetconfirmPass]=useState(true)
   const [isSignUp ,setisSignUp]=useState(false);
    const [data,setData] =useState({
        firstname:"",
        lastname:"",
        username:"",
        password:"",
        confirmpass:""
    })
    const handleChange=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }
    const handleSubmit=(e)=>{
        e.preventDefault()

        if(isSignUp)
        {
            data.password===data.confirmpass?dispatch(signUp(data)):SetconfirmPass(false)
        }else
        {
            dispatch(logIn(data))
        }
    }
const resetForm=()=>{
    SetconfirmPass(true)
    setData({
        firstname:"",
        lastname:"",
        username:"",
        password:"",
        confirmpass:""
    })
}
    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>tawagram</h1>
                    <h6>dive into the world of foods</h6>
                </div>
            </div>
           <div className="a-right">
            <form onSubmit={handleSubmit} className="infoForm authForm">
            <h3>{isSignUp?"Sign Up":"Log In"}</h3>
            {
                   isSignUp&&<div> 
            <input type="text" 
            placeholder='First Name' 
            name="firstname" 
            className='infoInput' 
            onChange={handleChange}
            value={data.firstname}/>  
            <input type="text" 
            placeholder='Last Name' 
            name="lastname" 
            className='infoInput' 
            onChange={handleChange}
            value={data.lastname}/>     
            </div>  
            }
                    
            <div>
            <input type="text" 
            placeholder='Username' 
            name="username" 
            className='infoInput' 
            onChange={handleChange}
            value={data.username}/>    
            </div>       
            <div>
            <input type='password' 
            placeholder='Password' 
            name="password" 
            className='infoInput' 
            onChange={handleChange}
            value={data.password}/>   
           {isSignUp&& 
           <input type='password' 
            placeholder='Confirm Password'
            name="confirmpass" 
            className='infoInput' 
            onChange={handleChange}
            value={data.confirmpass}/>  
            }
            
            </div>   
            <span style={
                {display:confirmPass? "none":"block",
                color:"red"
                }}>*Passwords do not match  </span>    
            <div className="">
                <span style={{fontSize:"18px",cursor:"pointer"}} onClick={()=>{setisSignUp((prev)=>!prev);resetForm()}}>
              {isSignUp?"Already have an account. Login!":"Sign Up! to create Account"}      
                </span>
            </div>
            <button type='submit' className="button infoButton" disabled={loading}>{ loading? "Loading...." : isSignUp?"Sign Up":"Log In"}</button>
            </form>
           </div>
        </div>
    )
}

export default Auth
