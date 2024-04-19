import React, {useState, useEffect } from 'react'
import { getUser } from '../../api/UserRequests'

const Conversation = ({data, currentUserId,online }) => {
  const [userData, setUserData]=useState(null)
  useEffect(()=>{
    const UserId= data.members.find((id)=>id!==currentUserId)
    const getUserData=async()=>{
        try {
             const {data}=await getUser(UserId)
        setUserData(data)
        } catch (error) {
            console.log(error);
        }}
        getUserData();
  },[])
    return(
        <>
    <div className=' follower conversation'>
      <div>
      {online && <div className="online-dot"></div>}
        <img src={userData?.profilePicture?import.meta.env.VITE_PUBLIC_FOLDER+userData.profilePicture:import.meta.env.VITE_PUBLIC_FOLDER+'defaultProfile.png'} alt="" className='followerImage' style={{width:'50px',height:'50px'}} />
     <div className="name" style={{fontSize:"0.8rem"}}>
        <span>{userData?.firstname} {userData?.lastname}</span>
        <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
     </div>
     </div>
    </div>
    <hr style={{ width: "85%" }}  />
    </>
  )
}

export default Conversation
