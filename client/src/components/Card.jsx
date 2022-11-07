import React from 'react'

function Card({ children }) {
    return (
        <div className='h-min w-min bg-gradient-to-r from-cyan-500 to-blue-500 border-4 border-black rounded-md '>
            {children}
        </div>
    )
}

export default Card