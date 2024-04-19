import React, { useState, useEffect } from 'react'
import { getUser } from '../../api/UserRequests'
import { addMessage, getMessages } from "../../api/MessageRequests";
import { format } from "timeago.js";
import './ChatBox.css'
import InputEmoji from 'react-input-emoji'
const ChatBox = ({ chat, currentUser,setSendMessage,receivedMessage  }) => {

  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  

  useEffect(() => {
    const UserId = chat?.members?.find((id) => id !== currentUser)
    const getUserData = async () => {
      try {
        const { data } = await getUser(UserId)
        setUserData(data)
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }
  
  const handleSend = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : currentUser,
      text: newMessage,
      chatId: chat._id,
  } 
  const receiverId = chat.members.find((id)=>id!==currentUser);
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    const { data } = await addMessage(message);
    setMessages([...messages, data]);
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}
// Receive Message from parent component
useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
  }

},[receivedMessage])
  
  return (
    <>
      <div className="ChatBox-container">
        {chat?(
        <>
            {/* chat-header */}
          <div className="chat-header">
            <div className="follower">
              <div>

                <img src={userData?.profilePicture ? import.meta.env.VITE_PUBLIC_FOLDER + userData.profilePicture : import.meta.env.VITE_PUBLIC_FOLDER + 'defaultProfile.png'} alt="" className='followerImage' style={{ width: '50px', height: '50px' }} />
                <div className="name" style={{ fontSize: "0.8rem" }}>
                  <span>{userData?.firstname} {userData?.lastname}</span>
                </div>
              </div>
            </div>
            <hr style={{
              width: "95%",
              border: "0.1px solid #ececec",
              marginTop: "20px",
            }} />
          </div>
               {/* chat-body */}
          <div className="chat-body">
        {messages.map((message) => (
          <>
            <div    className={
                      message.senderId === currentUser
                        ? "message own"
                        : "message"} >
              <span>{message.text}</span>{" "}
              <span>{format(message.createdAt)}</span>
            </div>
          </>
        ))}
      </div>
        {/*chat-sender*/ }
        <div className="chat-sender">
          <div>+</div>
          <InputEmoji
          value={newMessage}
          onChange={handleChange}
          />
          <div onClick={handleSend} className="send-button button">➤</div>
        </div>

        </> ) : (
          <span className="chatbox-empty-message">
            Tap on a chat to start conversation...
          </span>
        )}
      </div>
     
    </>
  )
}

export default ChatBox
