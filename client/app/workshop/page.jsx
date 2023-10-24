import Image from 'next/image';
import React from 'react'

const page = () => {
    const img=[
        "/workshop/WhatsApp Image 2023-10-21 at 5.05.29 PM (1).webp",
        "/workshop/WhatsApp Image 2023-10-21 at 5.05.29 PM (2).webp",
        "/workshop/WhatsApp Image 2023-10-21 at 5.05.29 PM.webp",
        "/workshop/WhatsApp Image 2023-10-21 at 5.05.30 PM (1).webp",
        "/workshop/WhatsApp Image 2023-10-21 at 5.05.30 PM (2).webp",
        "/workshop/WhatsApp Image 2023-10-21 at 5.05.31 PM (1).webp",
        "/workshop/WhatsApp Image 2023-10-21 at 5.05.31 PM (2).webp",
    ];
  return (
    <>
    <main className='flex flex-col items-center justify-center py-8'>
    <h1 className='text-3xl font-semibold bg-red-200 text-red-400 p-1 px-2'>Our Workshop</h1>
    
         
            <section
              className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-3 p-2"
            >
              {img.map((elem, i) => (
                <div className="overflow-hidden">
                <Image
                 src={elem}
                 key={i}
                 alt="categories"
                 width={600}
                 height={300}
                 className="hover:scale-105 transition-all hover:rotate-2"
               />
               </div>
              ))}
            </section>
          
    
    </main>
    </>
  )
}

export default page