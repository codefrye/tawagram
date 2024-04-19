import { useEffect,useState } from 'react'
import './infoCard.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";
import { logout } from "../../actions/AuthActions";
import { LuPencil } from 'react-icons/lu'
import ProfileModal from '../ProfileModal/ProfileModal'
const InfoCard = () => {
  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened , setModalOpened]=useState(false)
  const handleClose =()=>setModalOpened(false);
  const handleShow = () => setModalOpened(true);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const handleLogOut = ()=> {
    dispatch(logout())
  }

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);


  return (
    <div className='infoCard'>
      <div className="infoHead">
        <h4>Profile info</h4>
        {user._id === profileUserId ? (
       <div> 
        <LuPencil style={{cursor:"pointer" }}   width="2rem"
            height="1.2rem" onClick={handleShow} />
        <ProfileModal show={modalOpened}
           onHide={handleClose} data={user}/>
           </div>     ) : (
          ""
        )}
      </div>
    <div className="info">
      <span><b>Status </b></span>
      <span>{profileUser.relationship}</span>
    </div>
   
    <div className="info">
      <span><b>Fovotite Food </b></span>
        <span>{profileUser. favoritefood}</span>
    </div>
    <div className="info">
      <span><b>Works At: </b></span>
        <span>{profileUser.worksAt}</span>
    </div> 
    <div className="info">
      <span><b>Lives in </b></span>
    <span>{profileUser.livesin}</span> 
    </div>
    <div className="info">
      <span><b>Country: </b></span>
        <span>{profileUser.country}</span>
    </div>
    <button className="button Lo-btn"  onClick={handleLogOut}>LogOut</button>
    </div>
  )
}

export default InfoCard
