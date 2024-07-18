import React from 'react'
import { useSelector } from 'react-redux';

const Conversation = ({name, date, image, status, openChat}) => {
  const lightTheme = useSelector((state) => state.theme.lightTheme);
  return (
    <div className={'conversation-item' + (lightTheme ? "" : " dark_conversations")} onClick={openChat} >
      <div className={`conversation-item__status ${status}` }></div>
      <img className='conversation-item__image' src={image} alt=''></img>
      <h1 className='conversation-item__username'>{name}</h1>
      <h3 className='conversation-item__time'>{date}</h3>


    </div>
  )
}

export default Conversation;