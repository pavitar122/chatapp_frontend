import React, { useEffect, useState, useRef } from 'react';
import MsgOther from './MsgOther';
import MsgSelf from '../components/MsgSelf';
import { useSelector } from 'react-redux';
import { useAuthContext } from '../context/AuthContext';
import { format } from 'date-fns';
import useConversations from "../hooks/useConversations"
import { useSocketContext } from '../context/socketContext';
import { useConversationContext } from '../context/ConversationContext';


const ChatArea = () => {
    const [inputMessage, setinputMessage] = useState("")
    const { authUser } = useAuthContext();
    const lightTheme = useSelector((state) => state.theme.lightTheme);
    const messageEndRef = useRef(null);
    const { onlineUsers } = useSocketContext();
    const { messages, reciever } = useConversationContext();
    const { fetchMessages, sendMessage, deleteConversation } = useConversations();

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages.length, messages]);


    useEffect(() => {
        fetchMessages();
    }, [fetchMessages])


    const formatTime = (time) => {
        return format(new Date(time), 'hh:mm a');
    };

    const send = (e) => {
        e.preventDefault();
        sendMessage(inputMessage)
        setinputMessage("")
    }



   


    return (

        <div className='chat-area'>
            <div className={`ca-header ${lightTheme ? "" : "dark"}`}>
                <div className='ca-header-container'>
                    <img className='ca-header__profilepic' src={reciever.profilePic} alt=''></img>
                    <div className='ca-header-detail'>
                        <h1 className={`ca-header-detail-user ${lightTheme ? "" : "dark_icon"}`}>{reciever.fullName}</h1>
                        <h2 className={`ca-header-detail-status ${lightTheme ? "" : "dark_icon"}`}>{onlineUsers.includes(reciever._id) ? "Online" : "offline"}</h2>
                    </div>
                </div>
                <i className={`bi bi-trash ca-header__del-icon ${lightTheme ? "" : "dark_icon"}`} onClick={deleteConversation}></i>
            </div>

            <div className={`ca-message ${lightTheme ? "" : "dark"}`}>
                {messages.map(message => (
                    message.senderId === authUser._id ? (
                        <MsgSelf key={message._id} message={message.message} time={formatTime(message.createdAt)} />
                    ) : (
                        <MsgOther key={message._id} message={message.message} time={formatTime(message.createdAt)} />
                    )
                ))}
                <div ref={messageEndRef}></div>
            </div>


            <div className={`ca-input ${lightTheme ? "" : "dark"}`}>
                <form className='input-form' onSubmit={send}>
                    <input placeholder='Type a Message' className={`ca-input__input ${lightTheme ? "" : "dark_input"}`} value={inputMessage} onChange={(e) => setinputMessage(e.target.value)} />
                    <i className={`bi bi-send ca-input__send-icon ${lightTheme ? "" : " dark_icon"}`} type='submit' onClick={send} />
                </form>
            </div>
        </div>
    );
};

export default ChatArea;


// socket.on("newMessage", (newMessage)=>{
//     console.log(newMessage)

// })
