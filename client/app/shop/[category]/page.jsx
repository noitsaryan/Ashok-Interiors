'use client'
import Product from '@/Components/Product'
import { fetchByCategory, listProducts } from '@/lib/Utils/Panel';
import React, { useEffect, useState } from 'react'

function page({ params }) {
    const [product, setProduct] = useState([])
    const { category } = params;

    const getProducts = async () => {
        const data = await fetchByCategory(category)
        setProduct(data.data.data)
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6 px-4 md:px-8'>
            {
                product.length > 0 && product.map((e, i) => {
                    return <Product image={e.productImages?.[0]} title={e.title} sku={e.sku} price={e.price} category={e.parentCategory} key={i} />
                })
            }
        </div>
    )
}

export default page