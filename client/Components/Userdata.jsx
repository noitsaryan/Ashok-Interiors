'use client'
import { fetchUser, getCookie } from '@/lib/Utils/Auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Userdata = () => {
    const [fname, setFName] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const updatePersonalData = async () => {
        const res = await getCookie();
        const res2 = await fetchUser(res.data.value.email)
        setName(res2.data.data.name)
        setEmail(res2.data.data.email)
    }

    const updateUserData = async (value) => {
        const res = await axios.put('http://localhost:4000/api/user/personal', {
            name: value,
            email
        })
        if(res.data.success) {
            toast.success('Name updated successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
              });
              setTimeout(()=>{
                location.reload();
              },1000)
        }

    }
    useEffect(() => {
        updatePersonalData()


    }, [])


    return (
        <main className='flex flex-col  gap-5'>

            <label className='bg-slate-100 p-4 rounded'>
                <span className='font-semibold text-Secondary'>Full Name:</span><br />
                <input type="text" placeholder={name} onChange={(e) => { setFName(e.target.value) }} className='p-2 w-3/5 rounded mt-2 bg-Primary' />
            </label>

            <label className='bg-slate-100 p-4 rounded'>
                <span className='font-semibold text-Secondary'>Email:</span><br />
                <input type="email" placeholder={email} className='p-2 w-3/5 rounded mt-2 bg-Primary' disabled />
            </label>

            <span> <button className='bg-Secondary hover:bg-Primary font-semibold hover:text-Secondary transition-all border-2 border-Secondary p-2 px-7 rounded-md text-white' onClick={() => updateUserData(fname)}>Save</button></span>

            <ToastContainer />
        </main>

    )
}

export default Userdata