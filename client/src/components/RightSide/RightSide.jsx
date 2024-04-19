import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './RightSide.css';
import Home from '../../img/home.png';
import Noti from '../../img/noti.png';
import Comment from '../../img/comment.png';
import { MdSettings } from 'react-icons/md';
import TrendCard from '../TrendCard/TrendCard';
import PostShare from '../PostShare/PostShare';
import { Link } from 'react-router-dom';
import NavIcons from '../NavIcons/NavIcons';
const RightSide = () => {
  const [modalOpened, setModalOpened] = React.useState(false);
  
  const handleClose =()=>setModalOpened(false);
  const handleShow = () => setModalOpened(true);
  return (
      
      <div className='RightSide'>
        
      <NavIcons></NavIcons>
          
        

        <TrendCard />

        <button className="button  r-button" onClick={handleShow}>Share</button>
        <Modal centered  size="lg"
      aria-labelledby="contained-modal-title-vcenter" show={modalOpened} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Whats On your mind??</Modal.Title>
        
        </Modal.Header>
        <Modal.Body><PostShare/></Modal.Body>
      </Modal>
      </div>

  
  );
};





export default RightSide;
