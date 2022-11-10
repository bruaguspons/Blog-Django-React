import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PRIVATE from '../../routes/private.routes'
import Navbar from './Navbar'
import Home from './home/Home'
import Profile from './profile/Profile'
import CreateBlog from './CreateBlog/CreateBlog'
function Private() {
    return (
        <div className='w-full min-h-screen'>
            <Navbar />

            <Routes>
                <Route path='/' element={<Navigate to={PRIVATE.HOME} />} />
                <Route path={PRIVATE.HOME} element={<Home />} />
                <Route path={PRIVATE.PROFILE} element={<Profile />} />
                <Route path={PRIVATE.CREATEBLOG} element={<CreateBlog />} />
            </Routes>


        </div>
    )
}

export default Private