'use client'
import { getCookie } from '@/lib/Utils/Auth'
import React, { useEffect, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import Cards from './Cards'

function Personal() {
    const [userData, setUserData] = useState()
    const fetchUser = async () => { const data = await getCookie('userToken'); setUserData(data.data.cookie) }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div className=' w-3/4 px-16 my-8'>
            <h1 className='text-3xl font-bold'> Personal Information </h1>
            <div className='flex flex-wrap gap-6 items-center  py-4'>
                <Cards title='Email' icon={<AiOutlineMail/>} data={userData && userData.email} />
                <Cards title='Email' icon={<AiOutlineMail/>} data={userData && userData.email} />
                <Cards title='Email' icon={<AiOutlineMail/>} data={userData && userData.email} />
            </div>
        </div>
    )
}

export default Personal