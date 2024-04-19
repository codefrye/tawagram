import React, { useState } from "react";
import { useSelector } from "react-redux";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import ProfileModal from "../ProfileModal/ProfileModal";
const NavIcons = () => {
  const [modalOpened , setModalOpened]=useState(false)
  const handleClose =()=>setModalOpened(false);
  const handleShow = () => setModalOpened(true);
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <UilSetting  style={{cursor:"pointer" }} onClick={handleShow}/>
      <ProfileModal show={modalOpened}
           onHide={handleClose} data={user}/>
     
     <Link to="../chat">
        <img src={Comment} alt="" />
      </Link> 
      <Link to="../noti">
        <img src={Noti} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;