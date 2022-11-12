import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetSearch } from "../../../../redux/state/Search";

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState({})
    const dispatcher = useDispatch()
    const search = useSelector(state => state.search)

    const getBlogs = async () => {
        let data
        if (search === '') {
            data = await fetch(`http://localhost:8000/blogs/`)
        } else {
            data = await fetch(`http://localhost:8000/blogs/search/${search}`)
            // dispatcher(resetSearch())
        }
        const blogs = await data.json()
        console.log(blogs)
        setBlogs(blogs)
    }

    useEffect(() => {
        getBlogs()
    }, [search])

    return (
        <BlogContext.Provider value={{ blogs, setBlogs }}>
            {children}
        </BlogContext.Provider>
    )
}

export const UseBlogContext = () => {

    const context = useContext(BlogContext)
    if (context === undefined) {
        throw new Error('UseBlogContext must be used within a BlogProvider')
    }
    return context
}
