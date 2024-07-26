import React from 'react'
import logo from "../logo/logo.png"

const WelcomeCon = () => {
    
    return (
        <div className='welcome-page'>
            <img className='welcome-page__image' src={logo} alt="Chat Logo" />
            <p className='welcome-page__text'>View and text to people.</p>
        </div>
    )
}

export default WelcomeCon