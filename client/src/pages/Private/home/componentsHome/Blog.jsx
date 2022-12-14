import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PRIVATE from '../../../../routes/private.routes';
import { UseBlogContext } from '../context/blogContext';

function Blog({ blog }) {

    const navigate = useNavigate()
    const { blogs, setBlogs } = UseBlogContext()

    const dateDiff = (date) => {
        const date1 = new Date(date);
        const date2 = Date.now();
        const diffTime = Math.abs(date2 - date1);
        const diffsec = (Math.floor(diffTime / (1000))) % 60;
        const diffMin = (Math.floor(diffTime / (1000 * 60))) % 60;
        const diffHour = (Math.floor(diffTime / (1000 * 60 * 60))) % 60;
        const diffDays = (Math.floor(diffTime / (1000 * 60 * 60 * 24)));

        if (diffDays) return diffDays + " days ago"
        if (diffHour) return diffHour + " h ago"
        if (diffMin) return diffMin + " min ago"
        if (diffsec) return diffsec + " sec ago"
    }
    const user = useSelector(state => state.user)

    const handleclickDelete = async (pk) => {
        const req = await fetch(`http://localhost:8000/blogs/${pk}`, {
            method: "DELETE"
        })
        if (req.status === 202) {
            const blog_deleted = blogs.filter(blog => blog.uuid !== pk)
            setBlogs(blog_deleted)
        }
    }

    const handleClickUpdate = async (pk) => {
        const req = await fetch(`http://localhost:8000/blogs/${pk}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()

        })
    }

    return (
        <div className='w-2/3 text-white bg-gradient-to-r from-orange-300 to-amber-500 border-4 border-amber-900 rounded-xl'>
            <div className='relative flex ml-4 text-black'>
                <p>{blog.author.name} - {blog.author.email}</p>
                <p className='absolute right-0 mx-3'>{dateDiff(blog.modified)}</p>

            </div>
            <div className='text-center text-xl font-bold text-black'>
                <h2>{blog.title}</h2>
            </div>
            <div className=' bg-amber-800 rounded-xl m-4 p-2'>
                <p>{blog.content}</p>
            </div>
            <div className='bg-amber-800 rounded-xl my-4 mx-4 p-2'>
                <p>Categories:</p>
                <div className='flex justify-evenly'>
                    {
                        blog.category.map(cat => (
                            <div key={cat.id} className='bg-orange-300 rounded-xl p-2 mt-1 mb-4 text-black'>
                                <span>{cat.title}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                (user.id == blog.author.id) &&
                <div className='flex justify-evenly '>
                    <button className='bg-amber-800 rounded-xl mb-2 py-2 px-4 hover:bg-amber-700' onClick={() => handleclickDelete(blog.uuid)}>Delete</button>
                    <button className='bg-amber-800 rounded-xl mb-2 py-2 px-4 hover:bg-amber-700' onClick={() => navigate(`/${PRIVATE.PRIVATE}/${PRIVATE.CREATEBLOG}?id=${blog.uuid}`, { replace: true })}>Modify</button>
                </div>
            }
        </div>
    )
}

export default Blog