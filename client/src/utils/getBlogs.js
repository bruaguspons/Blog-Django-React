const getBlogs = async (id = '') => {
    const data = await fetch(`http://localhost:8000/blogs/${id}`)
    const blogs = await data.json()
    return blogs
}

export default getBlogs