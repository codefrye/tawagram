// import React from 'react'
// import './Post.css'
// import Comment from '../../img/comment.png'
// import Share from '../../img/share.png'
// import Heart from '../../img/like.png'
// import Notlike from'../../img/notlike.png'




// const Post = ({data}) => {
//   return (
//     <div  className="Post">
//       <img src={data.img} alt="" />


//     <div className="postReact">
//         <img src={data.liked?Heart:Notlike} alt="" />
//         <img src={Comment} alt="" />
//         <img src={Share} alt="" />
//      </div>
//      <span style={{color:"var(--gray)",fontSize:"12px"}}>{data.likes}likes</span>
//      <div className="detail">
//         <span><b>{data.name}</b></span>
//         <span> {data.desc}</span>

//      </div>
//     </div>
//   )
// }

// export default Post
import { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";
import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)

  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  return (
    <div className="Post">
      <img
        src={data.image ? import.meta.env.VITE_PUBLIC_FOLDER+ data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        {/* <img src={Comment} alt="" />
        <img src={Share} alt="" /> */}
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{data.name} </b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  );
};

export default Post;