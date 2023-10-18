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
            <div className="relative w-full  flex items-center justify-between p-3 " onClick={() => setTrackOrders(prev => !prev)}>
                <div>
                    <p className="opacity-70 text-sm font-semibold">SKU: #{product && product.sku}</p>
                    <h1 className=" text-md md:text-xl font-semibold">{product && product.title}</h1>
                </div>
                <div className="aspect-video h-full overflow-hidden">
                    <Image src={`http:localhost:4000/ProductImages/${product && product.productImages[0]}`} width={300} height={300} alt="image" className="object-contain hidden md:block " />
                </div>
            </div>
            <div className="w-full h-auto overflow-x-hidden" onClick={() => setTrackOrders(prev => !prev)}>
                <span className="flex items-center justify-between p-3  border-t border-b">
                    <p className="opacity-70 text-sm font-semibold">Track Order</p> <button><RiArrowDownSLine className={`${trackOrders ? 'rotate-0' : 'rotate-180'} hover:text-red-500 font-semibold`} /></button>
                </span>
                <div class={`flex-row md:flex-col py-2 ${trackOrders ? 'hidden' : 'flex'}`}>
                    <div className=" flex  items-center justify-center flex-col md:flex-row ">
                        <div className=" flex items-center justify-center flex-col md:flex-row ">
                            <RiBox2Line className={`text-5xl-5 bg-white rounded-full border-2 border-green-400 p-1 md:text-4xl text-black ${orderStatus && orderStatus[0]?.completed ? "opacity-100" : " opacity-50"}  `} />
                            <hr className={`md:w-40 md:h-1 w-1 h-40 ${orderStatus && orderStatus[0]?.completed ? 'bg-green-500' : 'bg-green-200'} border-0  "`} />
                        </div>
                        <div className=" flex items-center justify-center flex-col md:flex-row">
                            <RiArticleLine className={`text-5xl-5 bg-white rounded-full border-2 border-green-400 p-1 md:text-4xl text-black ${orderStatus && orderStatus[1]?.completed ? "opacity-100" : " opacity-50"}  `} />
                            <hr className={`md:w-40 md:h-1 w-1 h-40 ${orderStatus && orderStatus[1]?.completed ? 'bg-green-500' : 'bg-green-200'} border-0  "`} />
                        </div>
                        <div className=" flex items-center justify-center flex-col md:flex-row">
                            <RiListCheck3 className={`text-5xl-5 bg-white rounded-full border-2 border-green-400 p-1 md:text-4xl text-black ${orderStatus && orderStatus[2]?.completed ? "opacity-100" : " opacity-50"}  `} />
                            <hr className={`md:w-40 md:h-1 w-1 h-40 ${orderStatus && orderStatus[2]?.completed ? 'bg-green-500' : 'bg-green-200'} border-0  "`} />
                        </div>
                        <div className=" flex items-center justify-center flex-col md:flex-row">
                            <RiTruckLine className={`text-5xl-5 bg-white rounded-full border-2 border-green-400 p-1 md:text-4xl text-black ${orderStatus && orderStatus[3]?.completed ? "opacity-100" : " opacity-50"}  `} />
                        </div>

                    </div>
                    <div className="w-full flex items-center justify-between flex-col md:flex-row gap-3 p-4 pb-8">
                        <div className={`max-w-[200px] h-auto relative whitespace-nowrap bg-slate-200 shadow-md rounded-md p-2 md:m-2 -translate-x-14 md:-translate-x-0 md:-translate-y-3 ${orderStatus && orderStatus[0]?.completed ? 'opacity-100' : 'opacity-50'}`}>
                            <h3 className="font-semibold">Order Placed</h3>
                            <p className="text-xs  whitespace-normal opacity-70">
                                Status: {order[0].status[0].message}
                            </p>
                        </div>
                        <div className={` h-auto relative whitespace-nowrap bg-slate-200 shadow-md rounded-md p-2 md:m-2 -translate-x-14 md:-translate-x-0 md:-translate-y-3 ${orderStatus && orderStatus[1]?.completed ? 'opacity-100' : 'opacity-50'}`}>
                            <h3 className="font-semibold">Order Processing</h3>
                            <p className="text-xs  whitespace-normal opacity-70">
                                {
                                    !order[0].status[1].message ? null : `Status: ${order[0].status[1].message}`
                                }
                            </p>
                        </div>
                        <div className={` h-auto relative whitespace-nowrap bg-slate-200 shadow-md rounded-md p-2 md:m-2 -translate-x-14 md:-translate-x-0 md:-translate-y-3 ${orderStatus && orderStatus[2]?.completed ? 'opacity-100' : 'opacity-50'}`}>
                            <h3 className="font-semibold">Order Shipped</h3>
                            <p className="text-xs  whitespace-normal opacity-70">
                                {
                                    !order[0].status[2].message ? null : `Status: ${order[0].status[2].message}`
                                }
                            </p>
                        </div>
                        <div className={` h-auto relative whitespace-nowrap bg-slate-200 shadow-md rounded-md p-2 md:m-2 -translate-x-14 md:-translate-x-0 md:-translate-y-3 ${orderStatus && orderStatus[3]?.completed ? 'opacity-100' : 'opacity-50'}`}>
                            <h3 className="font-semibold">Delivered</h3>
                            <p className="text-xs  whitespace-normal opacity-70">
                                {
                                    !order[0].status[3].message ? null : `Status: ${order[0].status[3].message}`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderDiv;