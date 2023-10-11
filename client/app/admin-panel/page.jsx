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

function AdminPanel() {
  const route = useRouter(null);
  const [section, setSection] = useState('orders')

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
    <main className='relative px-16 my-8 w-full'>
      <aside className='fixed py-8 px-2 left-0 top-1/2 -translate-y-1/2 bg-white shadow-2xl border rounded-lg  z-10'>
        <nav className='list-none space-y-5'>
          <li className='cursor-pointer hover:-translate-y-1 transition-all ' title='Orders' onClick={() => setSection('orders')} ><FiPackage size={30} /></li>
          <li className='cursor-pointer hover:-translate-y-1 transition-all ' title='Add New Product' onClick={() => setSection('new')} > <AiOutlineAppstoreAdd size={30} /> </li>
          <li className='cursor-pointer hover:-translate-y-1 transition-all ' title='View Products' onClick={() => setSection('products')} ><BsBorderAll size={30} /></li>
          <li className='cursor-pointer hover:-translate-y-1 transition-all ' title='Log Out' onClick={logout} ><GoSignOut size={30} /></li>
        </nav>
      </aside>
      <section className='min-h-[50vh]'>
        <div className='my-4'>
          <p className='text-center font-medium text-2xl'> {section.charAt(0).toUpperCase() + section.slice(1,)} </p>
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
