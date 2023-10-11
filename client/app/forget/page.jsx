'use client'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { forgetFunc, tokenValidate } from '@/lib/Utils/Auth';
import { useRouter } from 'next/navigation';
function page() {
    const [text, setText] = useState('password')
    const [visible, setVisible] = useState(true);
    const [password, setPassword] = useState('')
    const searchParam = useSearchParams()
    const token = searchParam.get('token')
    const [Email, setEmail] = useState(null)
    const route = useRouter(null)
    async function Recovery() {
        const res = await forgetFunc(Email)
        if (res.data.status === 'ok') {
            toast.success('Mail Sent! Check your inbox', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
        }
    }

    async function validate() {
        const res = await tokenValidate(token, password);
        if(res.data.status == 'ok') {
            toast.success('Password changed successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            route.push('/login')
        }
    }
    return (

        <main className='flex items-center justify-center border border-x-0 py-16' >
            {
                token ?
                    <div className='bg-white px-8 py-16 rounded-lg shadow-xl flex flex-col items-center space-y-2'>
                        <h1 className='text-lg font-semibold'>  Change Password </h1>
                        <div className='flex items-center justify-center bg-white rounded-full mb-2 w-auto'>
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type={text}
                                placeholder='Password'
                                className='px-8 py-3 rounded-full bg-none outline-none'
                            />
                            {
                                visible ? <AiOutlineEye className='text-3xl select-none cursor-pointer mr-5 text-gray-400' onClick={() => { setText('text'); setVisible(prev => !prev) }} /> : <AiOutlineEyeInvisible className='text-3xl select-none cursor-pointer mr-5 text-gray-400' onClick={() => { setText('password'); setVisible(true) }} />
                            }
                        </div>
                        <button className='bg-Secondary w-full py-2 text-white rounded-md' onClick={validate}>  Change </button>
                    </div>
                    : <div className='bg-white px-8 py-16 rounded-lg shadow-xl flex flex-col items-center space-y-2'>
                        <h1 className='text-lg font-semibold'>  Forget Password </h1>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email Adress' className='w-full px-6 py-4 bg-Primary outline-gray-400' />
                        <button className='bg-Secondary w-full py-2 text-white rounded-md' onClick={Recovery}>  Check </button>
                    </div>
            }
            <ToastContainer />
        </main>
    )
}

export default page