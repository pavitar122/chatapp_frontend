import React from 'react'

const MsgSelf = ({message, time}) => {
    return (
        <div className='msg-self'>
          <div className='msg-self__msg-container'>
          <p className='msg-self__msg-container__message'>{message}</p>
    
          <div className='msg-self__ts'>
                <p className='msg-self__ts__timestamp'>{time}</p>
                </div>
          </div>
     
        </div>
      )
}

export default MsgSelf