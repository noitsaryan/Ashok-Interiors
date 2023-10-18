import React, { useEffect, useState } from 'react';
import { fetchById } from '@/lib/Utils/Panel';
import { fetchUser, getCookie } from '@/lib/Utils/Auth';
import { AiOutlineLink } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { removeCart } from '@/lib/Utils/Auth';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

function Carts() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]); // Array to store quantities
  const [pricing, setPricing] = useState(Number)
  const [email, setEmail] = useState(String)
  const deleteFunction = async (key) => {
    const res1 = await getCookie();
    const res = await removeCart(res1.data.value.email, key);
    console.log(res);
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  const findSku = async () => {
    try {
      const res = await getCookie();
      const user = await fetchUser(res.data.value.email);
      const cart = user.data.data.cart;
      return cart;
    } catch (error) {
      console.error('Error fetching user or cart:', error);
      return [];
    }
  };

  const cookie = async () => {
    const data = await getCookie();
    setEmail(data.data.value.email)
  }

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
        // console.log(productDescs);
        setCart(productDescs);

        // Initialize quantities array with 1 for each product
        const initialQuantities = Array(productDescs.length).fill(1);
        setQuantities(initialQuantities);
      } else {
        console.log('Cart is empty.');
      }
    } catch (error) {
      console.error('Error fetching product descriptions:', error);
    }
  };


  const updateQuantity = (index, newValue) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newValue;
    setQuantities(newQuantities);
    console.log(newQuantities)
  };

  function calculateTotalPrice(cart, quantities) {
    // Calculate the total price for each product and sum them up
    const totalPrice = cart.reduce((total, product, index) => {
      const productPrice = product.data.price * quantities[index];
      return total + productPrice;
    }, 0);
    console.log(totalPrice)
    return totalPrice;
  }

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async (amount) => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const data = await axios.get(
      `http://localhost:4000/api/checkout/${amount}`
    );

    const options = {
      key: process.env.RAZORPAY_KEY,
      name: "Ashok Interiors",
      currency: "INR",
      amount: data.data.order.amount,
      order_id: data.data.order.id,
      description: "Thankyou for purchasing our product!",
      image:
        "https://ashok-interiors.vercel.app/_next/image?url=%2Fmainlogo.png&w=750&q=75",
      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;
        const payment = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        };
        const order = await newOrder(
          data.data.order.id,
          payment,
          sku,
          value,
          shipping_address,
          billing_address,
          phone,
          email
        );
        if (order.data.success) {
          toast.success("Order Placed", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.success("No Order is placed!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }
      },
    };

    const check = await fetchUser(email);
    if (check.data.data.address === "") {
      toast.info("Add your address before placing order!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        route.push("/account/address");
      }, 2000);
    } else {
      const paymentObject = await new window.Razorpay(options);
      paymentObject.open();
    }
  };


  useEffect(() => {
    fetchProduct();
    cookie();
  }, []);

  useEffect(() => {
    const data = calculateTotalPrice(cart, quantities)
    setPricing(data)
  }, [quantities])

  return (
    <>
      {cart.map((e, i) => {
        return (
          <section key={i} className='my-2 py-4 w-full bg-slate-100 rounded flex justify-between  items-center px-4'>
            <div className='flex items-start gap-2 flex-col'>
              <h2 className='font-semibold text-xl'>{e.data.title}</h2>
              <div className='flex items-center'>
                <p>Quantity :</p>
                <div className='border flex gap-3 mx-1 justify-around px-4  rounded-md select-none bg-white'>
                  <button
                    onClick={() => {
                      const newValue = quantities[i] - 1;
                      updateQuantity(i, newValue < 1 ? 1 : newValue);
                    }}
                  >
                    -
                  </button>
                  <p> {quantities[i]} </p>
                  <button
                    onClick={() => {
                      const newValue = quantities[i] + 1;
                      updateQuantity(i, newValue);
                    }}
                  >
                    +
                  </button>
                </div>
                <h3 className='font-semibold text-lg ml-2'>₹ {e.data.price.toLocaleString()}</h3>
                <p className='text-sm mx-1'> (Inc. of all taxes and charges) </p>
              </div>
              <div className='flex items-center gap-2 '>
                <div className='flex cursor-pointer bg-white border max-w-min px-2 py-1 rounded-md items-center font-regular text-sm hover:opacity-70' onClick={() => { deleteFunction(sku) }}>
                  <BsTrash className=' text-lg text-Secondary  cursor-pointer transition-all' />
                  <p className='mx-1'>Remove</p>
                </div>
                <Link href={`/shop/${e.data.parentCategory}/${e.data.sku}`} className='flex cursor-pointer bg-white border max-w-min px-2 py-1 rounded-md items-center font-regular text-sm hover:opacity-70' onClick={() => { deleteFunction(sku) }} >
                  <AiOutlineLink className=' text-lg text-Secondary  cursor-pointer transition-all' />
                  <p className='mx-1'>Visit</p>
                </Link>
              </div>
            </div>
            <div className='aspect-square bg-slate-400 mr-3 overflow-hidden object-cover'>
              <Image src={`http://localhost:4000/ProductImages/${e.data.productImages[0]}`} width={200} height={200} alt='image' className='object-cover w-28 hidden md:block ' />
            </div>
          </section>
        );
      })}
      <button onClick={() => {
        makePayment(pricing)
      }} className='w-full bg-Secondary my-2 p-2 text-lg text-white font-semibold  rounded-lg'>
        Checkout
      </button>
    </>
  );
}

export default Carts;
