import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/Card'
import { createUser } from '../../redux/state/User'
import PRIVATE from '../../routes/private.routes'

const emptyUser = {
    name: '',
    email: '',
    password: ''
}

function CreateUser() {
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    const [user, setUser] = useState(emptyUser)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const query = await fetch('http://localhost:8000/user/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
        const msg = await query.json()
        if (query.status === 400) {
            setUser(emptyUser)
            e.target.reset()
        } else {
            dispatcher(createUser({ token: msg.token }))
            console.log(msg)
            navigate(PRIVATE.PRIVATE, { replace: true })
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <Card>
                <form action="" className='h-80 w-64 flex flex-col justify-evenly items-center' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-pink-900 font-bold text-xl'>Name:</label>
                        <input type="text" name="name" id="name" onChange={handleChange} className='text-black' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-pink-900 font-bold text-xl'>Email:</label>
                        <input type="email" name="email" id="email" onChange={handleChange} className='text-black' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='text-pink-900 font-bold text-xl'>PassWord:</label>
                        <input type="password" name="password" id="password" onChange={handleChange} className='text-black' />
                    </div>
                    <button className='w-32 h-10 font-bold bg-gradient-to-r from-purple-800 to-pink-600 border-2 border-black rounded-md' type="submit">Create User</button>
                </form>
            </Card>
        </div>
    )
}

export default CreateUser