import React, { useState ,useEffect,useRef} from 'react'
import { useDispatch, useSelector } from "react-redux";
import './Chat.css'
import LogoSearch from '../../components/LogoSearch/LogoSearch'
import { userChats } from '../../api/ChatRequests';
import Conversation from '../../components/Conversation/Conversation';
import NavIcons from '../../components/NavIcons/NavIcons'
import ChatBox from '../../components/ChatBox/ChatBox';
import { io } from "socket.io-client";
const Chat = () => {
    const dispatch = useDispatch();
    const socket = useRef();
    const { user } = useSelector((state) => state.authReducer.authData);
    console.log(user);
    const [chats ,setChats]=useState([])
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    useEffect(()=>{
        const getChats=async()=>{
            try {
                const{data}=await userChats(user._id)
                setChats(data)
                console.log(data);
            } catch (error) {
                console.log(error)   
            }
        }
        getChats()
    },[user._id])

    useEffect(() => {
        socket.current = io("ws://localhost:8800");
        socket.current.emit("new-user-add", user._id);
        socket.current.on("get-users", (users) => {
          setOnlineUsers(users);
        });
      }, [user]);
      useEffect(() => {
        if (sendMessage!==null) {
          socket.current.emit("send-message", sendMessage);}
      }, [sendMessage]);
    
    
      // Get the message from socket server
      useEffect(() => {
        socket.current.on("recieve-message", (data) => {
          console.log(data)
          setReceivedMessage(data);
        }
    
        );
      }, []);
    
    
      const checkOnlineStatus = (chat) => {
        const chatMember = chat.members.find((member) => member !== user._id);
        const online = onlineUsers.find((user) => user.userId === chatMember);
        return online ? true : false;
      };

  return (
    <div className='Chat'>
      <div className="Left-Side-chat">
            <LogoSearch></LogoSearch>
            <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
                {chats.map((chat)=>(
                    <div onClick={()=>setCurrentChat(chat)}>
                        <Conversation data={chat} currentUserId={user._id}
                        online={checkOnlineStatus(chat)}
                        />
                   </div>

                ))}
            </div>
            </div>
      </div>
    <div className="Right-side-chat">
    <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          />
    </div>
    </div>
  )
}

export default Chat
