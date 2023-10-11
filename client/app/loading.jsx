import Image from 'next/image'
import React from 'react'

function loader() {
    return (
        <main className='flex items-center justify-center h-screen w-screen z-50 absolute left-0 top-0 bg-Primary'>
            <Image
            alt="logo"
            src='/mainlogo.png'
            width={690}
            height={362}
            className='w-36 animate-ping'
        />
        </main>
    )
}

export default loader