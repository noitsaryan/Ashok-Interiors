'use client'
import { fetchUser, getCookie } from '@/lib/Utils/Auth';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TbAddressBookOff } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';

const UserAddress = () => {

  const [landmark, setLandmark] = useState('')
  const [pincode, setPincode] = useState('')
  const [streetName, setStreetName] = useState('')
  const [bldgName, setbldgName] = useState('')
  const [address, setAddress] = useState('No address available')
  const [email, setEmail] = useState('')


  const addressLiteral = `Street Name: ${streetName}, Building Name / Flat No: ${bldgName}, Landmark: ${landmark}, Pincode: ${pincode}`



  const userAddress = async () => {
    const res = await getCookie();
    const res2 = await fetchUser(res.data.value.email)
    setAddress(res2.data.data.shipping_address)
    setEmail(res2.data.data.email)
  }


  const updateUserAddress = async (value) => {
    const res = await axios.put('http://localhost:4000/api/user/address', {
      address: value,
      email
    })
    console.log(res)
    if (res.data.success) {
      toast.success('Name updated successfully!', {
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
        location.reload();
      }, 1000)
    }

  }

  useEffect(() => {
    userAddress()
  }, [])

  return (


    <main className='flex flex-col  gap-3 overflow-hidden overflow-y-scroll'>
      <ToastContainer />
      <label className='bg-slate-100 p-4 rounded'>
        <span className='font-semibold text-Secondary'>Shipping Address:</span><br />
        <input value={address} disabled className='p-2 w-full rounded mt-2 bg-Primary' />
      </label>
      <hr />
      <h2 className='font-semibold  text-xl text-gray-400 '>Update Shipping Address:</h2>
      <label className='bg-slate-100 p-4 rounded'>
        <span className='font-semibold text-Secondary'>Street Name:</span><br />
        <input type="text" onChange={(e) => setStreetName(e.target.value)} className='p-2 w-full rounded mt-2 bg-Primary' />
      </label>
      <label className='bg-slate-100 p-4 rounded'>
        <span className='font-semibold text-Secondary'>Building Name / Flat No:</span><br />
        <input type="text" onChange={(e) => setbldgName(e.target.value)} className='p-2 w-full rounded mt-2 bg-Primary' />
      </label>

      <label className='bg-slate-100 p-4 rounded'>
        <span className='font-semibold text-Secondary'>Landmark:</span><br />
        <input type="text" onChange={(e) => setLandmark(e.target.value)} className='p-2 w-full rounded mt-2 bg-Primary' />
      </label>
      <label className='bg-slate-100 p-4 rounded'>
        <span className='font-semibold text-Secondary'>Zip Code:</span><br />
        <input type="number" onChange={(e) => setPincode(e.target.value)} className='p-2 w-full rounded mt-2 bg-Primary' />
      </label>

      <span><button className='bg-Secondary hover:bg-Primary font-semibold hover:text-Secondary transition-all border-2 border-Secondary p-2 px-7 rounded-md text-white' onClick={() => updateUserAddress(addressLiteral)}>Update</button></span>

    </main>

  )
}

export default UserAddress