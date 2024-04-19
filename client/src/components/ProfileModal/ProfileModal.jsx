import Modal from 'react-bootstrap/Modal';
// import PropTypes from 'prop-types';
import './ProfileModal.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {  uploadImage  }from "../../actions/UploadAction"
import { updateUser } from "../../actions/UserAction"
import { useState } from 'react';
function ProfileModal({ show, onHide,data }) {
    const { password, ...other } = data;
    const [formData, setFormData] = useState(other);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const dispatch = useDispatch();
    const param = useParams();

    const { user } = useSelector((state) => state.authReducer.authData);
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const onImageChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        event.target.name === "profileImage"
          ? setProfileImage(img)
          : setCoverImage(img);
      }
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        let UserData = formData;
        if (profileImage) {
          const data = new FormData();
          const fileName = Date.now() + profileImage.name;
          data.append("name", fileName);
          data.append("file", profileImage);
          UserData.profilePicture = fileName;
          try {
            dispatch(uploadImage(data));
          } catch (err) {
            console.log(err);
          }
        }
        if (coverImage) {
          const data = new FormData();
          const fileName = Date.now() + coverImage.name;
          data.append("name", fileName);
          data.append("file", coverImage);
          UserData.coverPicture = fileName;
          try {
            dispatch(uploadImage(data));
          } catch (err) {
            console.log(err);
          }
        }
        dispatch(updateUser(param.id, UserData));
        onHide()
      };


    return (
        <Modal size='xl' show={show} onHide={onHide}>
             <Modal.Header closeButton>
        <Modal.Title><h3>Your info</h3></Modal.Title>
        
        </Modal.Header>
           <div className="infodiv">
            <form className="infoForm authForm" onSubmit={handleSubmit}>
                

                <div>
                    <input
                         value={formData.firstname}
                        type="text"
                        onChange={handleChange}
                        className="infoInput"
                        name="firstName"
                        placeholder="First Name"
                    />

                    <input
                        value={formData.lastname}
                        type="text"
                        onChange={handleChange}
                        className="infoInput"
                        name="lastName"
                        placeholder="Last Name"
                    />
                </div>
                <div>

                <input
                        type="text"
                        value={formData.relationship}
                        className="infoInput"
                        onChange={handleChange}
                        name="relationship"
                        placeholder="Relationship Status"
                    />
                <input
                        type="text"
                        value={formData.worksAt}
                        className="infoInput"
                        onChange={handleChange}
                        name="worksAt"
                        placeholder="WorksAt"
                    />

                </div>
             

                <div>
                    <input
                    value={formData.livesin}
                        type="text"
                        className="infoInput"
                        name="livesin"
                        onChange={handleChange}
                        placeholder="Lives in"
                    />
                    <input
                    value={formData.country}
                        type="text"
                        className="infoInput"
                        name="country"
                        onChange={handleChange}
                        placeholder="Country"
                    />

                    <input
                        value={formData.favoritefood}
                        type="text"
                        className="infoInput"
                        onChange={handleChange}
                        name="favoritefood"
                        placeholder="Favorite Food"
                    />
                </div>

               


                <div>
                    Profile Image
                    <input type="file" name='profileImage'  onChange={onImageChange}/>
                    Cover Image
                    <input type="file" name="coverImage"   onChange={onImageChange} />
                </div>

                <button onClick={handleSubmit} className="button infoButton" type="submit">
          Update
        </button>
               </form>
            </div>
        </Modal>

    )
}


export default ProfileModal;