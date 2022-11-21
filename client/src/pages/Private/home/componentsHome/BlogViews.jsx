import React from 'react'
import { useState } from 'react'
import { UseBlogContext } from '../context/blogContext'
import Blog from './Blog'

function BlogViews() {
    const { blogs, setBlogs } = UseBlogContext()
    const [currentPage, setCurrentPage] = useState(0)
    // setBlogs({ ...blogs, count: 0 })

    const handleClick = async (dir) => {
        const res = await fetch(dir)
        const data = await res.json()
        setBlogs(data)
    }
    return (

        <div className='w-full flex flex-col items-center gap-6 my-4'>
            {
                !blogs.count ?
                    <div>Not Blogs Found</div> :
                    blogs.results.map((blog) => (
                        <Blog key={blog.uuid} blog={blog} />
                    )
                    )
            }
            <div className='flex gap-4'>
                <button disabled={!blogs.previous} className={!!blogs.previous ? 'px-4 py-2 bg-gradient-to-r from-orange-300 to-amber-500  rounded-xl hover:from-orange-500 hover:to-amber-700' : 'px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-400  rounded-xl'} onClick={() => {
                    setCurrentPage(currentPage - 1)
                    handleClick(blogs.previous)
                }}>prev page</button>
                <span>{currentPage}</span>
                <button disabled={!blogs.next} className={!!blogs.next ? 'px-4 py-2 bg-gradient-to-r from-orange-300 to-amber-500  rounded-xl hover:from-orange-500 hover:to-amber-700' : 'px-4 py-2 bg-gradient-to-r from-gray-300 to-gray-400  rounded-xl'} onClick={() => {
                    setCurrentPage(currentPage + 1)
                    handleClick(blogs.next)
                }}>next page</button>
            </div>
        </div>
    )
}

export default BlogViews
