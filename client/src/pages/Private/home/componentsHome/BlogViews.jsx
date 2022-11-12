import React from 'react'
import { UseBlogContext } from '../context/blogContext'
import Blog from './Blog'

function BlogViews() {
    const { blogs, setBlogs } = UseBlogContext()

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

export default BlogViews
