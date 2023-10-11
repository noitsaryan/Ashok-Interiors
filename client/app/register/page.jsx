'use client'
import React, { useEffect, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { registerFunc } from '@/lib/Utils/Auth';
function Page() {
    const route = useRouter(null)
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [visible, setVisible] = useState(true);
    const [text, setText] = useState('password');
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    async function register() {
        setIsLoading(true)
        const res = await registerFunc(Name, Email, Password)
        if (res.data.status === 'ok') {
            toast.success('Successfully Registered!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            setIsLoading(false)
            route.push('/login')
        } else if (res.data.errorCode === 403) {
            toast.error('Email Already Exists!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            setIsLoading(false)
        }
    }

    return (
        <main className='flex flex-col space-y-8 items-center justify-center border border-x-0 py-8 '>
            <div className='flex flex-col space-y-8 items-center justify-center md:shadow-xl border px-4 py-16 rounded-2xl'>
                <div className='flex items-center flex-col space-y-2 text-PrimaryText'>
                    <Image
                        src='/mainlogo.png'
                        width={300}
                        height={50}
                        alt='logo'
                        className='w-32 h-auto'
                    />
                    <h1 className='text-lg font-semibold'> Register </h1>
                </div>
                <div className='flex items-center justify-center flex-col max-w-lg space-y-5'>
                    {/* Full Name input */}
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder='Full Name'
                        className='min-w-full px-8 py-3 rounded-full bg-none outline-none'
                    />

                    {/* Email input with validation */}
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailValid(true); // Reset validation state
                        }}
                        type="email"
                        placeholder='Email Id'
                        className={`min-w-full px-8 py-3 rounded-full bg-none outline-none ${emailValid ? '' : 'border-red-500'}`}
                    />
                    {!emailValid && (
                        <p className="text-red-500 text-xs">Invalid email format</p>
                    )}

                    {/* Password input with validation */}
                    <div className='flex flex-col items-center justify-center bg-none rounded-full'>
                        <div className='flex items-center justify-center bg-white rounded-full mb-2'>
                            <input
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordValid(true); // Reset validation state
                                }}
                                type={text}
                                placeholder='Password'
                                className='px-8 py-3 rounded-full bg-none outline-none'
                            />
                            {
                                visible ? <AiOutlineEye className='text-3xl select-none cursor-pointer mr-5 text-gray-400' onClick={() => { setText('text'); setVisible(false) }} /> : <AiOutlineEyeInvisible className='text-3xl select-none cursor-pointer mr-5 text-gray-400' onClick={() => { setText('password'); setVisible(true) }} />
                            }
                        </div>
                        {!passwordValid && (
                            <p className="text-red-500 text-xs">Password must be at least 8 characters</p>
                        )}
                        {/* ... (your existing code) */}
                    </div>

                    {/* Submit button */}
                    <button className={`${isLoading ? "bg-white border-2 border-Secondary" : "bg-Secondary text-white"}  px-8 py-3 rounded-full`} onClick={register}> {isLoading ? <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-Secondary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg> : 'Submit'} </button>
                </div>
                <div className='text-sm '>
                    <Link href="/login">Already Registered?</Link>
                </div>
            </div>
            <ToastContainer />
        </main>
    );
}

export default Page;
