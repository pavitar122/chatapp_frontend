import React from 'react'

const MsgOther = ({name, message, time}) => {
  return (
    <div className='msg-others'>
        <div className='msg-others__msg-container'>
            <h1 className='msg-others__msg-container__username'>{name}</h1>
            <p className='msg-others__msg-container__message'>{message}</p>
            <div className='msg-others__ts'>
            <p className='msg-others__ts__timestamp'>{time}</p>
            </div>
           
        </div>
    </div>
  )
}

export default MsgOther