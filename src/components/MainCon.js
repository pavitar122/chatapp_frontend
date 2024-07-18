import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainCon = () => {
    return (
        <div className='main-container'>
            <Sidebar/>
            <Outlet />
        </div>
    )
}

export default MainCon;