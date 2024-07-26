import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import Conversation from './Conversation';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { themeChange } from '../feature/themeSlice';
import useLogout from '../hooks/useLogout';
import useConversations from "../hooks/useConversations"
import { useAuthContext } from '../context/AuthContext';
import { useSocketContext } from '../context/socketContext';
import { useConversationContext } from '../context/ConversationContext';

const Sidebar = () => {
    const navigate = useNavigate();
    const lightTheme = useSelector((state) => state.theme.lightTheme);
    const dispatch = useDispatch();
    const { logout } = useLogout();
    const { getConversations } = useConversations();
    const { authUser } = useAuthContext();
    const { onlineUsers } = useSocketContext();
    const { sidebarConversations } = useConversationContext();


    useEffect(() => {
        getConversations();
    }, [authUser, getConversations])

    // useEffect(() => {
    //     if(socket){
    //         const handleNewMessage = (newMessage) => {
    //             setmessages(messages => [...messages, newMessage]);
    //         };
    //         socket.on("newMessage", handleNewMessage);
    
    //         return () => {
    //             socket.off("newMessage", handleNewMessage);
    //         };
    //     }
      
    // }, []);



    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    }

    return (
        <div className='sidebar-container'>
            <div className={'sb-header' + (lightTheme ? "" : " dark")}>

                <div className='mobile-user_icon'>
                    <i className={"bi bi-person-circle sb-header__icon" + (lightTheme ? "" : " dark_icon")} />
                </div>

                <div className='sb-header_icons'>
                    <i className={"bi bi-box-arrow-left sb-header__icons" + (lightTheme ? "" : " dark_icon")} onClick={handleLogout} />
                    <i className={"bi bi-people sb-header__icons" + (lightTheme ? "" : " dark_icon")} onClick={() => navigate("users")} />

                    <Link onClick={() => dispatch(themeChange())}>
                        {lightTheme ? <i className={"bi bi-moon-fill sb-header__link" + (lightTheme ? "" : " dark_icon")}></i> :
                            <i className={"bi bi-brightness-high-fill sb-header__link" + (lightTheme ? "" : " dark_icon")}></i>}
                    </Link>
                </div>

            </div>

            {/* <div className={'sb-search' + (lightTheme ? "" : " dark")}>
                <i className={"bi bi-search sb-search__icon" + (lightTheme ? "" : " dark_icon")} />
                <input placeholder='Search' className={'sb-search__input' + (lightTheme ? "" : " dark_input")} />
            </div> */}

            <div className={'sb-conversation' + (lightTheme ? "" : " dark")}>
                {sidebarConversations.map(chat => {
                    const otherParticipant = chat.participants.find(person => person._id !== authUser._id);
                    return (
                        <Conversation
                            key={chat._id}
                            name={otherParticipant.fullName || 'Unknown'}
                            image={otherParticipant.profilePic || 'Picture'}
                            date={otherParticipant.createdAt.slice(0, 10) || 'Date'}
                            openChat={() => navigate(`/app/chat/${chat._id}`)}
                            status={onlineUsers.find(id => id === otherParticipant._id) ? "online" : "offline"}

                        />
                    )
                }

                )}
            </div>

        </div>
    )
}

export default Sidebar;