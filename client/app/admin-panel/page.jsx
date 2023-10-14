'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AiOutlineAppstoreAdd } from 'react-icons/ai'
import { FiPackage } from 'react-icons/fi'
import { BsBorderAll } from 'react-icons/bs'
import {GoSignOut} from 'react-icons/go'
import Home from '@/Components/Home'
import Orders from '@/Components/Orders'
import NewProducts from '@/Components/NewProducts'
import ViewProducts from '@/Components/ViewProducts'
import { Logout, getCookie } from '@/lib/Utils/Auth'
import { RiDashboardLine } from "react-icons/ri";

function AdminPanel() {
  const route = useRouter(null);
  const [section, setSection] = useState('home')

  async function checkAdminToken() {
    const res = await getCookie();
    if (!res.data.data.adminToken) {
      route.push('/admin-login')
    }
  }

  async function logout() {
    await Logout();
  }

  useEffect(() => {
    checkAdminToken();
  }, [])

  return (
    <main className='relative px-10 my-8 w-full'>
      <aside className='fixed py-8  w-[45px] left-0 top-1/2 -translate-y-1/2 bg-white shadow-2xl border rounded-lg  z-10'>
        <nav className='list-none space-y-5 w-full flex flex-col items-center justify-center'>
        <li className={`cursor-pointer hover:-translate-y-1 transition-all hover:bg-slate-200 ${section=='home'? 'bg-slate-200' : 'bg-transparent'} w-full flex justify-center p-1`} title='home' onClick={() => setSection('home')} ><RiDashboardLine size={30} /></li>
          <li className={`cursor-pointer hover:-translate-y-1 transition-all hover:bg-slate-200 ${section=='orders'? 'bg-slate-200' : 'bg-transparent'} w-full flex justify-center p-1`} title='Orders' onClick={() => setSection('orders')} ><FiPackage size={30} /></li>
          <li className={`cursor-pointer hover:-translate-y-1 transition-all hover:bg-slate-200 ${section=='new'? 'bg-slate-200' : 'bg-transparent'} w-full flex justify-center p-1`} title='Add New Product' onClick={() => setSection('new')} > <AiOutlineAppstoreAdd size={30} /> </li>
          <li className={`cursor-pointer hover:-translate-y-1 transition-all hover:bg-slate-200 ${section=='products'? 'bg-slate-200' : 'bg-transparent'} w-full flex justify-center p-1`} title='View Products' onClick={() => setSection('products')} ><BsBorderAll size={30} /></li>
          <li className={`cursor-pointer hover:-translate-y-1 transition-all hover:bg-slate-200 w-full flex justify-center p-1`} title='Log Out' onClick={logout} ><GoSignOut size={30} /></li>
        </nav>
      </aside>
      <section className='min-h-[50vh]'>
        <div className='my-4'>
        <h1 className='font-semibold text-3xl text-red-400 border-b w-full text-center pb-2'> {section.charAt(0).toUpperCase() + section.slice(1,)} </h1>
        </div>
        {

          section === 'home' ? <Home /> : null ||
            section === 'orders' ? <Orders /> : null ||
              section === 'new' ? <NewProducts /> : null ||
                section === 'products' ? <ViewProducts /> : null
        }
      </section>
    </main>
  )
}

export default AdminPanel;
