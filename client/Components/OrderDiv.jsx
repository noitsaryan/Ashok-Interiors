"use client"
import { useAppContext } from "@/context/adminStore";
import { fetchById } from "@/lib/Utils/Panel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCircleDot } from "react-icons/fa6";
import { RiArrowDownSLine, RiArticleLine, RiBox2Line, RiListCheck3, RiTruckLine } from "react-icons/ri";


const OrderDiv = ({ sku, order }) => {
    const [product, setProduct] = useState(null);
    const [orderStatus, setOrderStatus] = useState([]);
    const fetchProduct = async () => {
        const res = await fetchById(sku);
        setProduct(res.data.data);
        setOrderStatus(order[0].status)
    };

    useEffect(() => {
        fetchProduct();
    }, [sku]);
    useEffect(() => {
        console.log(order[0].status)
    }, [order])
    
    const [trackOrders, setTrackOrders] = useState(true)
    return (
        <section className=" w-full shadow-md bg-slate-100">
            <div className="relative w-full h-24 flex items-center justify-between p-3 ">
                <div>
                    <p className="opacity-70 text-sm font-semibold">SKU: #{product && product.sku}</p>
                    <h1 className="text-2xl font-semibold">{product && product.title}</h1>
                </div>
                <div className="aspect-video h-full overflow-hidden">
                    <Image src={`http:localhost:4000/ProductImages/${product && product.productImages[0]}`} width={300} height={300} alt="image" />
                </div>
            </div>
            <div className="w-full h-auto overflow-x-hidden">
                <span className="flex items-center justify-between p-3 h-2 border-t border-b" onClick={() => setTrackOrders(!trackOrders)}>
                    <p className="opacity-70 text-sm font-semibold">Track Order</p> <button><RiArrowDownSLine className={`${trackOrders ? 'rotate-0' : 'rotate-180'} hover:text-red-500 font-semibold`} /></button>
                </span>
                <div class={`flex flex-row md:flex-col ${trackOrders ? 'hidden' : 'visible'} mt-8 `}>
                    <div className="h-auto w-full flex p-4 items-center justify-center flex-col md:flex-row  pb-10">

                        
                        <span className="relative flex items-center justify-center flex-col md:flex-row">
                            <FaCircleDot className={`${ orderStatus && orderStatus[0]?.completed ? 'text-green-500' : 'text-red-500'}`} />
                            <RiBox2Line className={`absolute text-5xl -top-2 right-10 md:-left-2 md:-top-10 md:bottom-5 bg-white rounded-full border-2 border-green-400 p-1 md:text-4xl text-black ${orderStatus && orderStatus[0]?.completed ? "opacity-100": " opacity-50"}  `} />
                            <hr className={`md:w-40 md:h-1 w-1 h-40 ${ orderStatus && orderStatus[0]?.completed ? 'bg-green-500' : 'bg-red-500'} border-0 relative "`} />
                        </span>
                        <span className="relative flex items-center justify-center flex-col md:flex-row">
                            <FaCircleDot className={`${ orderStatus && orderStatus[0]?.completed ? 'text-green-500' : 'text-red-500'}`} />
                            <RiArticleLine className={`absolute text-5xl -top-2 right-10 md:-left-2 md:-top-10 md:bottom-5 bg-white rounded-full border-2 border-green-400 p-1 md:text-4xl text-black ${orderStatus && orderStatus[1]?.completed ? "opacity-100": " opacity-50"}  `} />
                            <hr className={`md:w-40 md:h-1 w-1 h-40 ${ orderStatus && orderStatus[0]?.completed ? 'bg-green-500' : 'bg-red-500'} border-0 relative "`} />
                        </span>
                        <span className="relative flex items-center justify-center flex-col md:flex-row">
                            <FaCircleDot className={`${ orderStatus && orderStatus[0]?.completed ? 'text-green-500' : 'text-red-500'}`} />
                            <RiListCheck3 className={`absolute text-5xl -top-2 right-10 md:-left-2 md:-top-10 md:bottom-5 bg-white rounded-full border-2 border-green-400 p-1 md:text-4xl text-black ${orderStatus && orderStatus[2]?.completed ? "opacity-100": " opacity-50"}  `} />
                            <hr className={`md:w-40 md:h-1 w-1 h-40 ${ orderStatus && orderStatus[0]?.completed ? 'bg-green-500' : 'bg-red-500'} border-0 relative "`} />
                        </span>
                        <span className="relative flex items-center justify-center flex-col md:flex-row">
                            <FaCircleDot className={`${ orderStatus && orderStatus[0]?.completed ? 'text-green-500' : 'text-red-500'}`}/>
                            <RiTruckLine className={`absolute text-5xl -top-2 right-10 md:-left-2 md:-top-10 md:bottom-5 bg-white rounded-full border-2 border-green-400 p-1 md:text-4xl text-black ${orderStatus && orderStatus[1]?.completed ? "opacity-100" : " opacity-50"}  `} />
                        </span>

                    </div>

                    <div className="w-full flex items-center justify-between flex-col md:flex-row gap-3 p-4 pb-8">

                        <span className={` h-auto relative whitespace-nowrap bg-slate-200 shadow-md rounded-md p-2 md:m-2 -translate-x-14 md:-translate-x-0 md:-translate-y-3 ${ orderStatus && orderStatus[0]?.completed ? 'opacity-100' :'opacity-50'}`}>
                            <h3 className="font-semibold">Order Placed</h3>
                            <p className="text-xs  whitespace-normal opacity-70">
                                status: {order[0].message} 
                            </p>

                        </span>
                        <span className={` h-auto relative whitespace-nowrap bg-slate-200 shadow-md rounded-md p-2 md:m-2 -translate-x-14 md:-translate-x-0 md:-translate-y-3 ${ orderStatus && orderStatus[1]?.completed ? 'opacity-100' :'opacity-50'}`}>
                            <h3 className="font-semibold">Order Confirmed</h3>
                            <p className="text-xs  whitespace-normal opacity-70">
                            status: {order[0].message}
                            </p>

                        </span>
                        <span className={` h-auto relative whitespace-nowrap bg-slate-200 shadow-md rounded-md p-2 md:m-2 -translate-x-14 md:-translate-x-0 md:-translate-y-3 ${ orderStatus && orderStatus[2]?.completed ? 'opacity-100' :'opacity-50'}`}>
                            <h3 className="font-semibold">Order Processed</h3>
                            <p className="text-xs  whitespace-normal opacity-70">
                            status: {order[0].message}
                            </p>

                        </span>
                        <span className={` h-auto relative whitespace-nowrap bg-slate-200 shadow-md rounded-md p-2 md:m-2 -translate-x-14 md:-translate-x-0 md:-translate-y-3 ${ orderStatus && orderStatus[3]?.completed ? 'opacity-100' :'opacity-50'}`}>
                            <h3 className="font-semibold">Out of Delivery</h3>
                            <p className="text-xs  whitespace-normal opacity-70">
                            status: {order[0].message}
                            </p>

                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderDiv;