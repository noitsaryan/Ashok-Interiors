import { fetchUser, getCookie, removeCart } from '@/lib/Utils/Auth'
import { fetchById } from '@/lib/Utils/Panel'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MdCancel } from 'react-icons/md'

const CartDiv = ({price, title, sku, image}) => {

    const deleteFunction = async (key) => {
        const res1 = await getCookie();
        const res = await removeCart(res1.data.value.email, key);
        console.log(res)
        setTimeout(() => {
            location.reload()
        }, 1000)
    }

    return (
        <section className='relative w-full h-32 bg-slate-100 rounded flex justify-between  items-center px-4 '>
            <div>
                <h2 className='font-semibold text-2xl'>{title}</h2>
                <h3 className='font-semibold text-Secondary text-xl'>Rs. {price.toLocaleString()}</h3>
            </div>
            <div className='aspect-square bg-slate-400 mr-3 overflow-hidden object-cover'>
                <Image src={`http://localhost:4000/ProductImages/${image}`} width={200} height={200} alt='image' className='object-cover w-28' />
            </div>
            <MdCancel className='absolute top-2 right-2 text-3xl text-Secondary z-10 hover:opacity-70 cursor-pointer transition-all' onClick={() => {deleteFunction(sku)}} />
        </section>
    )
}

export default CartDiv