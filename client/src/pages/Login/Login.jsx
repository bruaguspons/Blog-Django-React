import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import Card from '../../components/Card'
import PUBLIC from '../../routes/public.routes'
import { useDispatch, useSelector } from 'react-redux'
import PRIVATE from '../../routes/private.routes'
import { modifyUser } from '../../redux/state/User'
function Login() {

    const emptyUser = {
        email: '',
        password: ''
    }
    const { token } = useSelector(state => state.user)
    const dispatcher = useDispatch()
    const [user, setUser] = useState(emptyUser)


    const getLogin = async () => {
        const query = await fetch('http://localhost:8000/user/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })
        const msg = await query.json()
        if (query.status === 200) {
            dispatcher(modifyUser(msg))
            navigate(`/${PRIVATE.PRIVATE}`, { replace: true })
        }
    }
    const navigate = useNavigate()
    useEffect(() => {
        getLogin()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const query2 = await fetch('http://localhost:8000/user/login/', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })
        if (query2.status === 400) {
            setUser(emptyUser)
            e.target.reset()
        } else {
            const meg2 = await query2.json()
            dispatcher(modifyUser(meg2))
            navigate(`/${PRIVATE.PRIVATE}`, { replace: true })
        }
    }


    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <Card>
            <div className='h-96 w-80 flex flex-col justify-evenly items-center'>
                <h1 className='text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-600 '>Login</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="email" className='text-pink-900 font-bold text-xl'>Email:</label>
                        <input type="email" name="email" id="email" onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password" className='text-pink-900 font-bold text-xl'>PassWord:</label>
                        <input type="password" name="password" id="password" onChange={handleChange} />
                    </div>
                    <button className='w-32 h-10 font-bold bg-gradient-to-r from-purple-800 to-pink-600 border-2 border-black rounded-md mr-2'>Login</button>
                </form>
                <button className='w-32 h-10 font-bold bg-gradient-to-r from-purple-800 to-pink-600 border-2 border-black rounded-md ml-2' onClick={() => navigate(PUBLIC.CREATE)}>Sing Up</button>
            </div>
        </Card>
    )
}

export default Login