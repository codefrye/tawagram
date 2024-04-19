import React, { useState } from 'react'
import './FollowersCard.css'

import User from '../User/User'
import {useSelector} from "react-redux"
import { useEffect } from 'react'
import { getAllUsers } from '../../api/UserRequests'
const FollowersCard = () => {
  const {user}=useSelector((state)=>state.authReducer.authData);
  const [persons, setPersons]=useState([])
  useEffect(()=>{
    const fetchPersons=async()=>{
      const{data}=await getAllUsers();
      setPersons(data)
      console.log(data)
    };
    fetchPersons()
  },[]);
  return (
    <div  className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
        
    </div>
  )
}

export default FollowersCard
