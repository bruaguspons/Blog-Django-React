import React, { useEffect, useState } from 'react'
import Blog from './componentsHome/Blog'

function Home() {
    const [blogs, setBlogs] = useState({})

    const getBlogs = async () => {
        const data = await fetch('http://localhost:8000/blogs')
        const blogs = await data.json()
        console.log(blogs)
        setBlogs(blogs)
    }

    useEffect(() => {
        getBlogs()
    }, [])
    return (
        <div className='w-full flex flex-col items-center gap-6 my-4'>
            {
                Object.keys(blogs).length === 0 ?
                    <div>Not Blogs Found</div> :
                    blogs.map((blog) => (
                        <Blog key={blog.uuid} blog={blog} />
                    )
                    )
            }
        </div>
    )
}

export default Home