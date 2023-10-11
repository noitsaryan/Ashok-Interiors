'use client'
import { useAppContext } from "@/context/adminStore";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { RiArrowDropLeftLine, RiArrowDropRightLine, RiShoppingCartLine } from "react-icons/ri";

export default function RootLayout({ children }) {
    const location = usePathname('/shop')
    const {cart} = useAppContext()
    return (
        <main>
            <header className='flex md:flex-row space-y-2 flex-col items-center justify-between md:px-8'>

                <div className='list-none flex items-center space-x-4'>
                    <Link href="/shop"><li className={`hover:text-gray-400 transition-all cursor-pointer ${location === '/shop' ? 'border-b-2 border-Secondary' : 'border-b-2 border-transparent'}`}>All</li></Link>
                    <Link href="/shop/residence"><li className={`hover:text-gray-400 transition-all cursor-pointer ${location === '/shop/residence' ? 'border-b-2 border-Secondary' : 'border-b-2 border-transparent'}`}>Residential</li></Link>
                    <Link href="/shop/commercial"><li className={`hover:text-gray-400 transition-all cursor-pointer ${location === '/shop/commercial' ? 'border-b-2 border-Secondary' : 'border-b-2 border-transparent'}`}>Commercial</li></Link>
                    <Link href="/shop/studio"><li className={`hover:text-gray-400 transition-all cursor-pointer ${location === '/shop/studio' ? 'border-b-2 border-Secondary' : 'border-b-2 border-transparent'}`}>Studio</li></Link>
                </div>
                <Link className='text-Secondary relative text-2xl px-4 py-2  hidden md:block rounded-full flex ' href="/cart">
                    <RiShoppingCartLine />
                    <p className="absolute top-0 text-sm right-1">{cart}</p>
                </Link>
            </header>
            {
                children
            }
        </main>
    );
}
