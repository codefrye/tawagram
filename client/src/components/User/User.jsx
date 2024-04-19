import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/UserAction';
import { useSelector } from 'react-redux';

const User = ({person}) => {
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.authReducer.authData);
  const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow=()=>{
    following
    ? dispatch(unfollowUser(person._id, user))
    : dispatch(followUser(person._id, user));
  setFollowing((prev) => !prev);
  }
  return (
    <div className="follower" key={person.id}>
    <div >
     <img src={ person.profilePicture
                ? serverPublic + person.profilePicture
                : serverPublic + "defaultProfile.png"} alt="" className="followerImg" />
     <div className="name">
         <span>{person.firstname}</span>
         <span>@{person.username}</span>
     </div>
    </div>
    <button onClick={handleFollow} className={ following ? "button fc-button UnfollowButton" : "button fc-button"}>{following ? "Unfollow" : "Follow"}</button>
 </div>
  )
}

export default User
