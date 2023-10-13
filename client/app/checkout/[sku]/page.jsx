'use client'
import axios from "axios"
import { newOrder } from "@/lib/Utils/PaymentGateway"
import { fetchUser, getCookie } from "@/lib/Utils/Auth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { fetchById } from "@/lib/Utils/Panel"
import { ToastContainer, toast } from "react-toastify"

export default function page({ params }) {
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [value, setValue] = useState(1)
    const [shipping_address, setShipping_Address] = useState('test')
    const [billing_address, setBilling_Address] = useState('test')
    const [phone, setPhone] = useState(9372103699)
    const [data, setData] = useState({
        productImages: []
    })
    const { sku } = params;

    const route = useRouter(null)

    const userDetails = async () => {
        const token = await getCookie()
        setEmail(token.data.value.email)
        if (token.data && token.data.value.email) {
            const res = await fetchUser(token.data.value.email)
            setAddress(res.data.data.shipping_address)
        }
    }

    const fetchProduct = async () => {
        const result = await fetchById(sku)
        setData(result.data.data)
        // setImage(result.data.data.productImages)
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

        const data = await axios.get(`http://localhost:4000/api/checkout/${amount}`)

        const options = {
            key: process.env.RAZORPAY_KEY,
            name: "Ashok Interiors",
            currency: 'INR',
            amount: data.data.order.amount,
            order_id: data.data.order.id,
            description: "Thankyou for purchasing our product!",
            image: "https://ashok-interiors.vercel.app/_next/image?url=%2Fmainlogo.png&w=750&q=75",
            handler: async function (response) {
                const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
                const payment = {
                    razorpay_order_id, razorpay_payment_id, razorpay_signature
                }
                const order = await newOrder(data.data.order.id, payment, sku, value, shipping_address, billing_address, phone, email);
                if (order.data.success) {
                    toast.success('Order Placed', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    })
                } else {
                    toast.success('No Order is placed!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    })
                }
                // route.push('/successful')
            }
        };

        const check = await fetchUser(email);
        if (check.data.data.address === '') {
            toast.info('Add your address before placing order!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            })
            setTimeout(() => {
                route.push('/account/address')
            }, 2000)
        } else {
            const paymentObject = await new window.Razorpay(options);
            paymentObject.open();
        }

    };

    useEffect(() => {
        userDetails();
        fetchProduct();
    }, [])

    return (
        <>
            <button onClick={() => {
                if (!email) {
                    toast.info('Please log in to order!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                    })
                } else {
                    makePayment(data.price * value)
                }

            }} >
                Checkout
            </button>
            <ToastContainer />
        </>
    )
}