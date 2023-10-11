import React from 'react'

function Cards({title, icon, data}) {
    return (
        <div className='bg-[#f4f4f4]  rounded-xl p-5 '>
            <div className=' w-52 text-xl  flex items-center justify-between'>
                <h1>{title}</h1>
                {icon} 
            </div>
            <div className='py-3 font-bold italic'>
                <h1> {data} </h1>
            </div>
        </div>
    )
}

export default Cards