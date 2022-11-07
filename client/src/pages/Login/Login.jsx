import React from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import Card from '../../components/Card'
import PUBLIC from '../../routes/public.routes'

function Login() {
    const navigate = useNavigate()

    return (
        <Card>
            <div className='h-96 w-80 flex flex-col justify-evenly items-center'>
                <h1 className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-600 '>Login</h1>
                <div className='flex flex-col'>
                    <label htmlFor="email" className='text-pink-900 font-bold text-xl'>Email:</label>
                    <input type="email" name="" id="email" />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="password" className='text-pink-900 font-bold text-xl'>PassWord:</label>
                    <input type="password" name="" id="password" />
                </div>
                <div>
                    <button className='w-32 h-10 font-bold bg-gradient-to-r from-purple-800 to-pink-600 border-2 border-black rounded-md mr-2'>Login</button>
                    <button className='w-32 h-10 font-bold bg-gradient-to-r from-purple-800 to-pink-600 border-2 border-black rounded-md ml-2' onClick={() => navigate(PUBLIC.CREATE)}>Sing Up</button>
                </div>
            </div>
        </Card>
    )
}

export default Login