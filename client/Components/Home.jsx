import React from 'react'

import { RiBankCard2Line, RiEmotionLine, RiShoppingBag3Line, RiShoppingBagLine } from "react-icons/ri";

const Home = () => {
  return (
    <main className=' w-full h-screen flex  items-center flex-col  p-5 '>
   <div className='w-full text-start  mt-4'>
   <span className='bg-red-400 p-2 font-semibold text-white text-xl'>Hello Admin</span>
   <p className='mt-2 font-semibold text-red-400'>Checkout the analytics that we have achieved yet</p>
   </div>

   <section className='w-full mt-6'>
    <div className='grid grid-cols-1 md:grid-cols-4 w-full h-24 gap-3'>
      <div className='bg-yellow-100 rounded-md border-yellow-300 border shadow flex gap-4 items-center justify-start p-2'><RiEmotionLine className="text-6xl p-2 text-white  bg-yellow-400 rounded-md"/><span><h3 className='text-3xl font-semibold text-yellow-700'>Happy Clients</h3><p className='font-semibold opacity-75 text-yellow-700 text-xl'>10,000</p></span></div>
      <div className='bg-blue-100 rounded-md border-blue-300 border shadow flex gap-4 items-center justify-start p-2'><RiShoppingBagLine className="text-6xl p-2 text-white  bg-blue-400 rounded-md"/><span><h3 className='text-3xl font-semibold text-blue-700'>Total Orders</h3><p className='font-semibold opacity-75 text-blue-700 text-xl'>1000</p></span></div>
      <div className='bg-green-100 rounded-md border-green-300 border shadow flex gap-4 items-center justify-start p-2'><RiBankCard2Line className="text-6xl p-2 text-white  bg-green-400 rounded-md"/><span><h3 className='text-3xl font-semibold text-green-700'>Total Sales</h3><p className='font-semibold opacity-75 text-green-700 text-xl'>9000</p></span></div>
      <div className='bg-orange-100 rounded-md border-orange-300 border shadow flex gap-4 items-center justify-start p-2'><RiShoppingBag3Line className="text-6xl p-2 text-white  bg-orange-400 rounded-md"/><span><h3 className='text-3xl font-semibold text-orange-700'>Total Products</h3><p className='font-semibold opacity-75 text-orange-700 text-xl'>2000</p></span></div>


    </div>
   </section>
    </main>
  )
}


export default Home