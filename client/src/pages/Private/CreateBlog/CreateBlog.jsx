import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card'
import Spinner from '../../../components/Spinner'
import { getCategories } from '../../../utils/getCategories'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PRIVATE from '../../../routes/private.routes'
import getBlogs from '../../../utils/getBlogs'


function CreateBlog() {

    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("id")

    const navigate = useNavigate()
    const author = useSelector(state => state.user)

    const [cate, setCate] = useState({})
    const [loading, setLoading] = useState(true)
    const [newBlog, setNewBlog] = useState({
        title: '',
        content: '',
        author: author.id,
        category: []
    })


    useEffect(() => {
        getCategories().then(data => {
            setCate(data)
        })
        if (id !== null) {
            getBlogs(id).then(data => {
                const cate = data.category.map(cate => cate.id)
                setNewBlog({ ...newBlog, title: data.title, content: data.content, category: cate })
                setLoading(!loading)
            })
        } else setLoading(!loading)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (id) {
            const query = await fetch(`http://localhost:8000/blogs/${id}/`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newBlog)
            })
            const msg = await query.json()
            console.log(msg)
            navigate(`/${PRIVATE.PRIVATE}/${PRIVATE.HOME}`, { replace: true })
        } else {
            const query = await fetch('http://localhost:8000/blogs/', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newBlog)
            })
            const msg = await query.json()
            console.log(msg)
            navigate(-1)
        }
    }
    const handleChange = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
        console.log(newBlog)
    }
    const handleClick = (e) => {

        const [value] = cate.filter(cate => cate.title === e.target.name)
        if (newBlog.category.some((elem) => elem === value.id)) {
            const data = newBlog.category.filter(cate => cate !== value.id)
            setNewBlog({ ...newBlog, category: data })
        } else {
            setNewBlog({ ...newBlog, category: newBlog.category.concat(value.id) })
        }
    }


    return (
        loading ? <div className='absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max'><Spinner /></div> :
            <div className='absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max'>
                <Card>
                    <form action="" className='flex flex-col items-center ' onSubmit={handleSubmit}>

                        <div className='flex flex-col m-2'>
                            <label htmlFor="title" className='text-pink-900 font-bold text-xl'>Title:</label>
                            <input type="text" id='title' name='title' onChange={handleChange} value={newBlog.title} />
                        </div>
                        <div className='flex flex-col my-2 mx-4'>

                            <label htmlFor="content" className='text-pink-900 font-bold text-xl'>Content:</label>
                            <textarea name="content" id="content" cols="30" rows="10" onChange={handleChange} value={newBlog.content}></textarea>
                        </div>
                        <div className='m-3 flex flex-wrap'>
                            {
                                !cate.length ? <Spinner /> :
                                    cate.map(ca => (
                                        <div key={ca.id} className='mx-1'>
                                            <input type="checkbox" id={`category-${ca.title}`} name={ca.title} onChange={handleClick} defaultChecked={newBlog.category.some(id => id == ca.id)} />
                                            <label htmlFor={`category-${ca.title}`}>{ca.title}</label>
                                        </div>
                                    ))
                            }
                        </div>
                        <button type="submit" className='w-32 h-10 font-bold text-white bg-gradient-to-r from-purple-800 to-pink-600 border-2 border-black rounded-md mb-3'>Add</button>
                    </form>
                </Card>
            </div>
    )
}

export default CreateBlog
