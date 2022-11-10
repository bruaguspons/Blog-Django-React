export const getCategories = async () => {
    const data = await fetch('http://localhost:8000/category')
    const cate = await data.json()
    return cate
}