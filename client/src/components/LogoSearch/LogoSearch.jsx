import React from 'react'
import Logo from '../../img/logo.png'
import { LuSearch } from "react-icons/lu";
import './LogoSearch.css'
import { Link } from 'react-router-dom';
const LogoSearch = () => {
  return (
   <div className="LogoSearch">
    <Link to='../home'>
      <img src={Logo} alt="" />
    </Link>
    
    <div className="Search">
        <input type="text" placeholder="#Explore"/>
        <div className="s-icon">
        <LuSearch />
        </div>
    </div>
   </div>
  )
}

export default LogoSearch
