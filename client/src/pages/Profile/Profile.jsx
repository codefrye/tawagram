import React from 'react'
import './Profile.css'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/ProfileCard/ProfileCard'
import PostSide from '../../components/PostSide/PostSide'
import RightSide from '../../components/RightSide/RightSide'
const Profile = () => {
  return (
    <div className='Profile'>
      <ProfileLeft></ProfileLeft>
      <div className="Profile-center">
        <ProfileCard location ="profilePage"></ProfileCard><br />
        <PostSide></PostSide>
       
      </div> 
      <RightSide></RightSide>
    </div>
  )
}

export default Profile
