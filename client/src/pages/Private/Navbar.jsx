import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import PRIVATE from '../../routes/private.routes'
import { useDispatch, useSelector } from 'react-redux'
import { createSearch } from '../../redux/state/Search'
import { useState } from 'react'
import PUBLIC from '../../routes/public.routes'
import { resetUser } from '../../redux/state/User'
function Navbar() {
    const [serchWord, setSearchWord] = useState('')
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatcher = useDispatch()

    const handleChange = (e) => {
        setSearchWord(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatcher(createSearch(serchWord))
        // e.target.reset()
    }
    return (
        <nav className='text-lg font-bold text-white bg-gradient-to-r from-purple-800 to-pink-600 border-b-2 border-black sticky top-0 z-50'>
            <div className=' p-4 flex flex-row items-center justify-between' >
                <p>Hi! {user.name}</p>


                <div className="xl:w-96">
                    <form action="" className='flex items-center justify-center w-full' onSubmit={handleClick}>

                        <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search Title" aria-label="Search" onChange={handleChange}></input>
                        <button type="submit" className='px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center'>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" className="w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                        </button>

                    </form>
                </div>


                <ul className='flex justify-start gap-4'>
                    <li>
                        <NavLink to={PRIVATE.CATEGORY}>Categories</NavLink>
                    </li>
                    <li>
                        <NavLink to={PRIVATE.HOME}><button className=' h-5 '>Home</button></NavLink>
                    </li>
                    <li>
                        <NavLink to={PRIVATE.CREATEBLOG}><button className='h-5 '>New Blog</button></NavLink>
                    </li>
                    <li>
                        <button className='h-5 ' onClick={() => {

                            dispatcher(resetUser())
                            navigate(`${PUBLIC.LOGIN}`, { replace: true })
                        }
                        }>Logout</button>
                    </li>

                </ul>
            </div>
        </nav >
    )
}

export default Navbar