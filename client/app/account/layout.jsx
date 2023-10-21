'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FiBox, FiChevronRight, FiHome, FiLock, FiLogOut, FiShoppingBag, FiUser } from "react-icons/fi";
import { Logout } from '@/lib/Utils/Auth';


export default function RootLayout({ children }) {
    const route = useRouter(null)
    const logout = async () => {
        const res = await Logout()
        // route.push('/login')
    }
    const location = usePathname('/account')
    useEffect(() => {
        logout()
    }, [])
    return (
        <main className='w-full bg-slate-100 flex items-start justify-center gap-3 md:p-10 relative flex-col md:flex-row'>
            <section className='h-full w-96 bg-Primary flex-col items-stretch md:p-4 gap-3 hidden md:flex'>
                <div><h2 className='font-semibold text-2xl'>My Account</h2></div>
                <Link href="/account/orders" className={`h-20 ${location == '/account/orders' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-200 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiBox className='text-3xl text-Secondary' />Orders</span><FiChevronRight /></Link>
                <Link href="/account/carts" className={`h-20 ${location == '/account/carts' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-200 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiShoppingBag className='text-3xl text-Secondary' />Carts</span><FiChevronRight /></Link>
                <Link href="/account/address" className={`h-20  ${location == '/account/address' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-200 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiHome className='text-3xl text-Secondary' />Address</span><FiChevronRight /></Link>
                <Link href="/account/userdata" className={`h-20 ${location == '/account/personaldata' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-200 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiUser className='text-3xl text-Secondary' />Personal Data</span><FiChevronRight /></Link>
                <Link href="/forget" className={`h-20 ${location == '/account/password' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-200 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiLock className='text-3xl text-Secondary' />Password</span><FiChevronRight /></Link>
                <button onClick={logout} className={`h-20 ${location == '/account/signout' ? 'bg-slate-200' : 'bg-white'} hover:bg-slate-200 rounded-sm shadow flex items-center justify-between px-2`}><span className='flex items-center justify-center gap-2'><FiLogOut className='text-3xl text-Secondary' />Sign Out</span><FiChevronRight /></button>


            </section>
            <section className='w-full h-32 bg-Primary shadow-md mt-2 md:hidden'>
                <h2 className='font-semibold text-2xl m-3 text-center'>My Account </h2>
                <div className=' w-full flex items-center justify-evenly gap-3'>
                    <Link href="/" className='text-3xl text-Secondary p-1 rounded hover:bg-slate-200'><FiBox /></Link>
                    <Link href="/" className='text-3xl text-Secondary p-1 rounded hover:bg-slate-200'>< FiShoppingBag /></Link>
                    <Link href="/" className='text-3xl text-Secondary p-1 rounded hover:bg-slate-200'>< FiHome /></Link>
                    <Link href="/" className='text-3xl text-Secondary p-1 rounded hover:bg-slate-200'>< FiUser /></Link>
                    <Link href="/" className='text-3xl text-Secondary p-1 rounded hover:bg-slate-200'>< FiLock /></Link>
                    <button onClick={() => logout()} className='text-3xl text-Secondary p-1 rounded hover:bg-slate-200'><FiLogOut /></button>

                </div>
            </section>
            <section className=' w-full md:flex-1 bg-Primary p-3 '>
                {children}
            </section>
        </main>
    );
}