import React from 'react'
const OnlUser = ({username, image, conversation, status}) => {
 
    return (
        <div className='online-users' onClick={conversation}>
            <div className='online-users__cont'>
                <img className='online-users__image' src={image} alt=''></img>
            </div>
            <div className={`online-users__status ${status}`}></div>
            <h1 className='online-users__text'>{username}</h1>
        </div>
    )
}

export default OnlUser


