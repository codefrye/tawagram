import React from 'react'
import './Home.css'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'


const Home = () => {
  return (

  <div className="Home">
        <ProfileSide></ProfileSide>
        <div className="Postside"><PostSide></PostSide></div>
        <div className="Rightsisde"><RightSide></RightSide></div>
    </div>

  )
}

export default Home
