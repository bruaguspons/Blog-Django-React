import React, { useEffect, useState } from 'react'
import Card from '../../../components/Card'
import Spinner from '../../../components/Spinner'
import { getCategories } from '../../../utils/getCategories'
import { useSelector } from 'react-redux'
function CreateBlog() {
    const author = useSelector(state => state.user)
    const [cate, setCate] = useState({})
    const [newBlog, setNewBlog] = useState({
        title: '',
        content: '',
        author: author.id,
        category: []
    })
    useEffect(() => {
        getCategories().then(data => {
            setCate(data)
            console.log(data)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const query = await fetch('http://localhost:8000/blogs/', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newBlog)
        })
        const msg = await query.json()
        console.log(msg)
    }
    const handleChange = (e) => {
        setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
        console.log(newBlog)
    }
    const handleClick = (e) => {
        const [value] = cate.filter(cate => cate.title === e.target.name)
        if (newBlog.category.some((elem) => elem.title === value.title)) {
            const data = newBlog.category.filter(cate => cate.title !== value.title)
            setNewBlog({ ...newBlog, category: data })
        } else {
            setNewBlog({ ...newBlog, category: newBlog.category.concat(value) })
        }
    }


    return (
        <div className='absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max'>
            <Card>
                <form action="" className='flex flex-col items-center ' onSubmit={handleSubmit}>

                    <div className='flex flex-col m-2'>
                        <label htmlFor="title" className='text-pink-900 font-bold text-xl'>Title:</label>
                        <input type="text" id='title' name='title' onChange={handleChange} />
                    </div>
                    <div className='flex flex-col my-2 mx-4'>

                        <label htmlFor="content" className='text-pink-900 font-bold text-xl'>Content:</label>
                        <textarea name="content" id="content" cols="30" rows="10" onChange={handleChange}></textarea>
                    </div>
                    <div className='m-3'>
                        {
                            !cate.length ? <Spinner /> :
                                cate.map(ca => (
                                    <div key={ca.id}>
                                        <input type="checkbox" id={`category-${ca.title}`} name={ca.title} onClick={handleClick} />
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

// import React, { useEffect, useState } from 'react'
// import Card from '../../../components/Card'
// import Spinner from '../../../components/Spinner'
// import { getCategories } from '../../../utils/getCategories'
// import { useSelector } from 'react-redux'
// function CreateBlog() {
//     const author = useSelector(state => state.user)
//     const [cate, setCate] = useState({})
//     const [newBlog, setNewBlog] = useState({
//         title: '',
//         content: '',
//         author: author,
//         category: {}
//     })
//     useEffect(() => {
//         getCategories().then(data => {
//             setCate(data)
//             console.log(data)
//         })
//     }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault()

//         const query = await fetch('http://localhost:8000/blogs/', {
//             method: 'POST',
//             headers: { 'content-type': 'application/json' },
//             body: JSON.stringify(newBlog)
//         })
//         const msg = await query.json()
//         console.log(msg)
//     }
//     const handleChange = (e) => {
//         setNewBlog({ ...newBlog, [e.target.name]: e.target.value })
//         console.log(newBlog)
//     }
//     const handleClick = (e) => {
//         const [value] = cate.filter(cate => cate.title === e.target.name)
//         if (Object.keys(newBlog.category).some((elem) => elem === value.title)) {
//             const data = newBlog.category
//             delete data[value.title]
//             // const data = Object.values(newBlog.category).filter(cate => cate.title !== value.title)
//             setNewBlog({ ...newBlog, category: data })
//         } else {
//             const data = newBlog.category
//             data[value.title] = value
//             setNewBlog({ ...newBlog, category: data })
//         }
//     }


//     return (
//         <div className='absolute top-0 bottom-0 left-0 right-0 m-auto w-max h-max'>
//             <Card>
//                 <form action="" className='flex flex-col items-center ' onSubmit={handleSubmit}>

//                     <div className='flex flex-col m-2'>
//                         <label htmlFor="title" className='text-pink-900 font-bold text-xl'>Title:</label>
//                         <input type="text" id='title' name='title' onChange={handleChange} />
//                     </div>
//                     <div className='flex flex-col my-2 mx-4'>

//                         <label htmlFor="content" className='text-pink-900 font-bold text-xl'>Content:</label>
//                         <textarea name="content" id="content" cols="30" rows="10" onChange={handleChange}></textarea>
//                     </div>
//                     <div className='m-3'>
//                         {
//                             !cate.length ? <Spinner /> :
//                                 cate.map(ca => (
//                                     <div key={ca.id}>
//                                         <input type="checkbox" id={`category-${ca.title}`} name={ca.title} onClick={handleClick} />
//                                         <label htmlFor={`category-${ca.title}`}>{ca.title}</label>
//                                     </div>
//                                 ))
//                         }
//                     </div>
//                     <button type="submit" className='w-32 h-10 font-bold text-white bg-gradient-to-r from-purple-800 to-pink-600 border-2 border-black rounded-md mb-3'>Add</button>
//                 </form>
//             </Card>
//         </div>
//     )
// }

// export default CreateBlog