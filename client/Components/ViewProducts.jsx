import { listProducts } from '@/lib/Utils/Panel';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
function ViewProducts() {
    const [data, setData] = useState([])
    const getProducts = async () => {
        const Data = await listProducts();
        setData(Data.data.data)
    }
    useEffect(() => {
        getProducts()
    }, [])

    return (data ? <div className='max-w-xl mx-auto'>
        {
            data && data.map((e, i) => {
                return <div key={i} className='space-y-4 w-full my-4 px-4 py-3 rounded-lg shadow-xl border'>
                    <div className='flex md:flex-row flex-col items-start space-x-4'>
                        <Image
                            src={`http://localhost:4000/ProductImages/${e.productImages[0]}`}
                            alt='productImage'
                            width={500}
                            height={500}
                            className='md:w-44'
                        />
                        <div>
                            <h1>Name: {e.title} </h1>
                            <p >Desc: {e.description}</p>
                        </div>
                        <div className='flex-1'>
                            <AiTwotoneDelete onClick={() => deleteProduct(e.sku)} className='text-red-600 cursor-pointer text-2xl' />
                        </div>
                    </div>
                    <div className='flex space-x-4'>
                        <p>Price: ₹{e.price}</p>
                        <p>SKU: {e.sku}</p>
                        <p>Category: {e.parentCategory}</p>
                    </div>
                </div>
            })
        }
    </div> : <h1> No Products </h1>
    )
}

export default ViewProducts