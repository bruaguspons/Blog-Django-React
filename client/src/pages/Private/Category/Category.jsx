import React, { useState, useEffect } from 'react'
import { getCategories } from '../../../utils/getCategories'
import Spinner from '../../../components/Spinner'
function Category() {
    const [cate, setCate] = useState([])
    const [loading, setLoading] = useState(true)
    const [add, setAdd] = useState(true)
    const [title, setTitle] = useState('')


    useEffect(() => {
        getCategories().then(data => {
            setCate(data)
            setLoading(!loading)
        })
    }, [])

    const handleSubmit = async (e) => {
        const data = await fetch('http://localhost:8000/category/', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ title: title })
        })
        e.target.reset()
    }
    const handleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleClick = async (title) => {
        const res = await fetch('http://localhost:8000/category/blogs/', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ category: title })
        })
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <h2 className='text-4xl'>Categories:</h2>
            <div className='w-full flex justify-evenly flex-wrap'>
                {
                    loading ? <div className='absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max'><Spinner /></div> :
                        cate.map(cate => (
                            <button key={cate.id} onClick={() => handleClick(cate.title)} className=' flex items-center h-32 w-32 text-black font-bold justify-center bg-gradient-to-r from-orange-300 to-amber-500 border-4 border-amber-900 rounded-xl m-4'>
                                {cate.title}
                            </button>
                        ))
                }
            </div>
            {
                add ? <button className='w-14 h-14 text-3xl bg-gradient-to-r from-orange-300 to-amber-500 border-4 border-amber-900 rounded-xl' onClick={() => setAdd(!add)}>+</button> :
                    <form action="" className='flex items-end' onSubmit={handleSubmit}>
                        <div className='flex flex-col m-2'>
                            <label htmlFor="title" className='text-pink-900 font-bold text-xl'>Title:</label>
                            <input type="text" id='title' name='title' className='bg-gradient-to-r from-orange-300 to-amber-500 border-2 border-amber-900 rounded-md px-2' onChange={handleChange} />
                        </div>
                        <button type="submit" className='px-6 h-8 mb-1.5 bg-blue-600 text-white font-medium text-xs rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center'>Add</button>
                    </form>
            }
        </div>
    )
}

export default Category