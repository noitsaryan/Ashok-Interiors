import React, { useEffect, useState } from 'react'
import CartDiv from './CartDiv';
import { fetchById } from '@/lib/Utils/Panel';
import { fetchUser, getCookie } from '@/lib/Utils/Auth';


function Carts() {
  const [cart, setCart] = useState([])
  const findSku = async () => {
    try {
      const res = await getCookie();
      const user = await fetchUser(res.data.value.email);
      const cart = user.data.data.cart;
      return cart; 
    } catch (error) {
      console.error("Error fetching user or cart:", error);
      return [];
    }
  };

  const fetchProduct = async () => {
    try {
      const cart = await findSku();
      if (cart && cart.length > 0) {
        const productDescs = await Promise.all(
          cart.map(async (e) => {
            let productDesc = await fetchById(e.sku);
            return productDesc.data;
          })
        );
        console.log(productDescs)
        setCart(productDescs);
      } else {
        console.log("Cart is empty.");
      }
    } catch (error) {
      console.error("Error fetching product descriptions:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    cart.map((e,i) => <CartDiv sku={e.data.sku} image={e.data.productImages[0]} title={e.data.title} price={e.data.price} key={i} />)
    //     <main className='w-full h-full'>
    //     <div className='border-b border-slate-300 py-1 text-Secondary font-semibold text-2xl'>Carts</div>
    //      <div className='flex flex-col items-center justify-center gap-4 text-center h-full w-full'>
    //         <MdProductionQuantityLimits className='w-28 h-28 text-Secondary drop-shadow'/>
    //         <span>
    //             <h2 className='text-2xl font-semibold'>Your shopping cart is empty!</h2>
    //             <p>There are no selected carts to show</p>
    //             <button className='bg-Secondary px-3 py-2 text-white rounded mt-3 hover:bg-opacity-75 shadow-md'>START SHOPPING</button>
    //         </span>
    //      </div>
    // </main>
  )
}

export default Carts