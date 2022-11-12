import React from 'react'
import { BlogProvider } from './context/blogContext'
import BlogViews from './componentsHome/BlogViews'
function Home() {

    return (
        <BlogProvider>
            <BlogViews />
        </BlogProvider>
    )
}

export default Home