import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PRIVATE from '../../routes/private.routes'
import Navbar from './Navbar'
import Home from './home/Home'
import Category from './Category/Category'
import CreateBlog from './CreateBlog/CreateBlog'
function Private() {
    return (
        <div className='w-full min-h-screen'>
            <Navbar />

            <Routes>
                <Route path='/' element={<Navigate to={PRIVATE.HOME} />} />
                <Route path={PRIVATE.HOME} element={<Home />} />
                <Route path={PRIVATE.CATEGORY} element={<Category />} />
                <Route path={PRIVATE.CREATEBLOG} element={<CreateBlog />} />
            </Routes>


        </div>
    )
}

export default Private