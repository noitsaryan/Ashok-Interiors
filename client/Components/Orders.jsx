import { fetchOrders } from '@/lib/Utils/Panel'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Orders() {
  const [data, setData] = useState([])
  const [production, setProduction] = useState('')
  const [shipping, setShipping] = useState('')
  const [delivered, setDelivered] = useState('')
  async function order() {
    const res = await fetchOrders();
    let array = res.data.orders
    const reversed = array.reverse()
    setData(reversed)
  }
  const updateStatus = async (process, oid, message, userEmail) => {
    const res = await axios.put('http://localhost:4000/api/status', {
      process, oid, message, userEmail
    })
    console.log(res)
  }

  useEffect(() => {
    order();
  }, [])


  return (
    <main>
      {
        data && data.map((e, i) => {
          return <div key={i} className='flex flex-col gap-4 max-w-3xl mx-auto p-4 border rounded-lg my-4 shadow-lg w-full'>
            <div>
              <h1 className='font-semibold text-xl'>User Details</h1>
              <div>
                <p> Email: {e.email} </p>
                <p> Address: {e.address} </p>
              </div>
            </div>
            <div>
              <h1 className='font-semibold text-xl'> Order Details </h1>
              <div>
                <p> Order Id: {e.oid} </p>
                <p> Product SKU: {e.sku} </p>
                <p> Quantity: {e.quantity} </p>
              </div>
            </div>
            <div>
              <h1 className='font-semibold text-xl'> Payment Details </h1>
              <div>
                <p>Payment Id : {e.payment.razorpay_payment_id} </p>
                <p className='truncate'>Payment Signature : {e.payment.razorpay_signature} </p>
              </div>
            </div>
            <div>
              <h1 className='font-semibold text-xl'> Status Updates</h1>
              <div>
                <p className='font-semibold'> Current Message : {e.message} </p>
              </div>
              <div className={`border my-2 rounded-lg p-4 flex flex-col gap-4 ${e.status[1].completed ? 'bg-green-100' : ''}`}>
                <p>{
                  e.status[1].step_2
                }</p>
                <input type="text" name="" id="" placeholder='In Production*' className='outline-none ring-1 ring-slate-500 px-4 py-2 rounded-full '
                  onChange={(e) => setProduction(e.target.value)} />
                <button className={`${e.status[1].completed ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-full text-white `}
                  onClick={() => {
                    updateStatus("production", e.oid, production, e.email);
                    toast.success('Updated Status Successfully!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: "colored",
                    });
                    location.reload()
                  }}
                > {e.status[1].completed ? 'Done' : 'Not Done'} </button>
              </div>
              <div className={`border my-2 rounded-lg p-4 flex flex-col gap-4 ${e.status[2].completed ? 'bg-green-100' : 'bg-white'}`}>
                <p>{
                  e.status[2].step_3
                }</p>
                <input type="text" name="" id="" placeholder='In Shipping*' className='outline-none ring-1 ring-slate-500 px-4 py-2 rounded-full '
                  onChange={(e) => setShipping(e.target.value)}
                />
                <button className={`${e.status[2].completed ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-full text-white `}
                  onClick={() => {
                    updateStatus("shipping", e.oid, shipping, e.email);
                    toast.success('Updated Status Successfully!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: "colored",
                    });
                    location.reload()
                  }}
                > {e.status[2].completed ? 'Done' : 'Not Done'} </button>
              </div>
              <div className={`border my-2 rounded-lg p-4 flex flex-col gap-4 ${e.status[3].completed ? 'bg-green-100' : ''}`}>
                <p>{
                  e.status[3].step_4
                }</p>
                <input type="text" name="" id="" onChange={(e) => setDelivered(e.target.value)} placeholder='Delivered*' className='outline-none ring-1 ring-slate-500 px-4 py-2 rounded-full ' />
                <button className={`${e.status[3].completed ? 'bg-green-500' : 'bg-red-500'} px-4 py-2 rounded-full text-white `}
                  onClick={() => {
                    updateStatus("delivered", e.oid, delivered, e.email);
                    toast.success('Updated Status Successfully!', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                      theme: "colored",
                    });
                    location.reload()
                  }}
                > {e.status[3].completed ? 'Done' : 'Not Done'} </button>
              </div>
            </div>
          </div>
        })
      }
      <ToastContainer/>
    </main>
  )
}

export default Orders