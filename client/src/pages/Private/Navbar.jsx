import React from 'react'
import { NavLink } from 'react-router-dom'
import PRIVATE from '../../routes/private.routes'

function Navbar() {
    return (
        <nav className='text-lg font-bold text-white bg-gradient-to-r from-purple-800 to-pink-600 border-b-2 border-black sticky top-0 z-50'>
            <div className=' p-4 flex flex-row items-center justify-between' >
                <p>hola</p>
                <ul className='flex justify-start gap-4'>
                    <li>
                        <NavLink to={PRIVATE.PROFILE}>Move</NavLink>
                    </li>
                    <li>
                        <NavLink to={PRIVATE.HOME}><button className='w-10 h-5 '>Home</button></NavLink>
                    </li>
                    <li>
                        <NavLink to={PRIVATE.CREATEBLOG}><button className='h-5 '>New Blog</button></NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar