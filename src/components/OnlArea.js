import React, { useEffect } from 'react';
import logo from "../logo/logo.png";
import OnlUser from "../components/OnlUser.js";
import useUsers from '../hooks/useUsers.js';
import { useSelector } from 'react-redux';
import { useSocketContext } from '../context/socketContext';
import { useConversationContext } from '../context/ConversationContext.js';
import useConversations from '../hooks/useConversations.js';

const OnlArea = () => {
  const { getUsers } = useUsers();
  const lightTheme = useSelector((state) => state.theme.lightTheme);
  const { onlineUsers } = useSocketContext();
  const { allUsers } = useConversationContext();
  const { startConversation } = useConversations();

  useEffect(() => {
    getUsers()
  },[getUsers])

  return (
    <div className='oa'>
      <div className={`oa-header ${lightTheme ? "" : "dark"}`}>
        <img className='oa-header__image' src={logo} alt="Chat Logo" />
        <p className='oa-header__text'>Users</p>
      </div>
      <div className={`oa-online-users ${lightTheme ? "" : "dark"}`}>


        {allUsers.map((user, index) => (
          <OnlUser key={index}
            username={user.fullName}
            image={user.profilePic}
            conversation={() => startConversation(user._id)}
            status={onlineUsers.includes(user._id) ? "online" : "offline"}
          />
        ))}

      </div>
    </div>
  );
};

export default OnlArea;
