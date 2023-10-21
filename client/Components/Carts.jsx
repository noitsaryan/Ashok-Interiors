import React, { useEffect, useState } from 'react';
import { fetchById } from '@/lib/Utils/Panel';
import { fetchUser, getCookie } from '@/lib/Utils/Auth';
import { AiOutlineLink } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { removeCart } from '@/lib/Utils/Auth';
import { GrClose } from 'react-icons/gr'
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Carts() {
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState([]); // Array to store quantities
  const [pricing, setPricing] = useState(0)
  const [email, setEmail] = useState('')
  const [shipping_address, setShipping_Address] = useState('');
  const [billing_address, setBilling_Address] = useState('');
  const [phone, setPhone] = useState(Number);
  const [gstin, setGstin] = useState(Number);
  const [visible, setVisible] = useState(false);
  const [check, setCheck] = useState(false);
  const [sku, setSku] = useState(String)
  const [address1, setaddress1] = useState({
    strtName: "",
    bldgName: "",
    Landmark: "",
    zipcode: "",
  });
  console.log(quantities)

  const [address2, setaddress2] = useState({
    strtName: "",
    bldgName: "",
    Landmark: "",
    zipcode: "",
  });

  const BillAdress = (event) => {
    let { name, value } = event.target;
    setaddress2({
      ...address2,
      [name]: value,
    });
  };

  const ShipAddress = (event) => {
    let { name, value } = event.target;
    setaddress1({
      ...address1,
      [name]: value,
    });
  };

  let shipngAddress = `Street Name: ${address1.strtName}, Building Name / Flat No: ${address1.bldgName}, Landmark: ${address1.Landmark}, Pincode: ${address1.zipcode}`;

  let bilgAddress = `Street Name: ${address2.strtName}, Building Name / Flat No: ${address2.bldgName}, Landmark: ${address2.Landmark}, Pincode: ${address2.zipcode}, GSTIN No. : ${gstin}`;

  const ProceedChk = () => {
    setShipping_Address(shipngAddress);

    setBilling_Address(check ? shipngAddress : bilgAddress);
  };

  const deleteFunction = async (key) => {
    console.log(key)
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
  };

  function calculateTotalPrice(cart, quantities) {
    // Calculate the total price for each product and sum them up
    const totalPrice = cart.reduce((total, product, index) => {
      const productPrice = product.data?.price * quantities[index];
      return total + productPrice;
    }, 0);
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

  const makePayment = async () => {
    try {
      const res = await initializeRazorpay();

      if (!res) {
        return toast.error("Razorpay SDK Failed to load", {
          // Error handling for SDK loading failure
        });
      }

      const data = await axios.get(`http://localhost:4000/api/checkout/${pricing}`);

      const options = {
        // Your Razorpay payment options
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

      // Wait for the payment to be completed
      paymentObject.on("payment.success", async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
        const payment = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        };

        // Create orders for each product in the cart
        const orderPromises = cart.map(async (e, i) => {
          // Replace with the actual implementation of your 'newOrder' function
          return newOrder(
            data.data.order.id,
            payment,
            e.data?.sku,
            quantities[i],
            shipping_address,
            billing_address,
            phone,
            email
          );
        });

        // Wait for all order creation promises to complete
        const orders = await Promise.all(orderPromises);

        // Check if all orders were successfully created
        const allOrdersSuccessful = orders.every(order => order.data.success);

        if (allOrdersSuccessful) {
          // All orders were successful
          toast.success("Order Placed", {
            // Success message
          });
        } else {
          // Some orders failed
          toast.error("Order placement failed.", {
            // Error message
          });
        }
      });
    } catch (error) {
      // Handle other errors during payment
      console.error("Error during payment:", error);
      toast.error("An error occurred during the payment process", {
        // Error message
      });
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
              <h2 className='font-semibold text-xl'>{e.data?.title}</h2>
              <div className='flex items-center'>
                {/* <p>Quantity :</p> */}
                {/* <div className='border flex gap-3 mx-1 justify-around px-4  rounded-md select-none bg-white'>
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
                </div> */}
                <h3 className='font-semibold text-lg ml-2'>₹ {e.data?.price.toLocaleString()}</h3>
                <p className='text-sm mx-1'> (Inc. of all taxes and charges) </p>
              </div>
              <div className='flex items-center gap-2 '>
                <div className='flex cursor-pointer bg-white border max-w-min px-2 py-1 rounded-md items-center font-regular text-sm hover:opacity-70' onClick={() => { deleteFunction(e.data?.sku) }}>
                  <BsTrash className=' text-lg text-Secondary  cursor-pointer transition-all' />
                  <p className='mx-1'>Remove</p>
                </div>
                <Link href={`/shop/${e.data?.parentCategory}/${e.data?.sku}`} className='flex cursor-pointer bg-white border max-w-min px-2 py-1 rounded-md items-center font-regular text-sm hover:opacity-70' onClick={() => { deleteFunction(sku) }} >
                  <AiOutlineLink className=' text-lg text-Secondary  cursor-pointer transition-all' />
                  <p className='mx-1'>Visit</p>
                </Link>
              </div>
            </div>
            <div className='aspect-square bg-slate-400 mr-3 overflow-hidden object-cover'>
              <Image src={`http://localhost:4000/ProductImages/${e.data?.productImages[0]}`} width={200} height={200} alt='image' className='object-cover w-28 hidden md:block ' />
            </div>
          </section>
        );
      })}
      <button onClick={() => {
        setVisible(prev => !prev)
      }} className='w-full bg-Secondary my-2 p-2 text-lg text-white font-semibold  rounded-lg'>
        Proceed
      </button>

      <div className='absolute w-screen  z-50 top-0 left-0 bg-white py-12' style={{ display: visible ? 'block' : 'none' }}>
        <GrClose onClick={() => setVisible(prev => !prev)} size={25} className='absolute right-5 top-5 cursor-pointer hover:bg-gray-300 p-1 rounded-full transition-all' />

        <section className='px-4 '>
          <div>
            <h2 className="text-xl font-semibold ">Shipping Address:</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
              <span className="flex flex-col gap-1">
                Street Name
                <input
                  type="text"
                  placeholder="Enter Street Name"
                  required
                  className="p-1 rounded"
                  name="strtName"
                  onChange={ShipAddress}
                />
              </span>
              <span className="flex flex-col gap-1">
                Building Name/ Flat No:
                <input
                  type="text"
                  placeholder="Enter Building Name/ Flat No"
                  required
                  name="bldgName"
                  className="p-1 rounded"
                  onChange={ShipAddress}
                />
              </span>
              <span className="flex flex-col gap-1">
                Landmark:
                <input
                  type="text"
                  placeholder="Enter Landmark"
                  required
                  name="Landmark"
                  className="p-1 rounded"
                  onChange={ShipAddress}
                />
              </span>
              <span className="flex flex-col gap-1">
                Zipcode:
                <input
                  type="text"
                  placeholder="Enter Zipcode"
                  required
                  name="zipcode"
                  className="p-1 rounded"
                  onChange={ShipAddress}
                />
              </span>
            </div>
          </div>
          <div>
            <p className='text-xl font-semibold'> Billing Address </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
              <span className="flex flex-col gap-1">
                Street Name
                <input
                  type="text"
                  placeholder="Enter Street Name"
                  required
                  className="p-1 rounded"
                  name="strtName"
                  value={address2.strtName}
                  onChange={BillAdress}
                />
              </span>
              <span className="flex flex-col gap-1">
                Building Name/ Flat No:
                <input
                  type="text"
                  placeholder="Enter Building Name/ Flat No"
                  required
                  name="bldgName"
                  value={address2.bldgName}
                  className="p-1 rounded"
                  onChange={BillAdress}
                />
              </span>
              <span className="flex flex-col gap-1">
                Landmark:
                <input
                  type="text"
                  placeholder="Enter Landmark"
                  required
                  name="Landmark"
                  value={address2.Landmark}
                  className="p-1 rounded"
                  onChange={BillAdress}
                />
              </span>
              <span className="flex flex-col gap-1">
                Zipcode:
                <input
                  type="text"
                  placeholder="Enter Zipcode"
                  required
                  name="zipcode"
                  value={address2.zipcode}
                  className="p-1 rounded"
                  onChange={BillAdress}
                />
              </span>
              <span className="flex flex-col gap-1">
                Have GSTIN?
                <input
                  type="text"
                  placeholder="Enter GSTIN"
                  required
                  name="gstin"
                  value={gstin}
                  className="p-1 rounded"
                  onChange={(e) => {
                    setGstin(e.target.value)
                  }}
                />
              </span>
            </div>
          </div>
          <span className="mt-2 font-semibold text-xs opacity-70 flex items-center  gap-2">
            <input
              type="checkbox"
              onClick={(e) => {
                e.target.checked ? setCheck(true) : setCheck(false);

                e.target.checked
                  ? setaddress2({
                    ...address1,
                  })
                  : setaddress2({
                    ...address2,
                  });
              }}
            />{" "}
            Same as shipping address
          </span>
          <div className='my-4'>
            <span className="flex flex-col  w-full md:w-64 ">
              <p className="font-semibold text-xl">Phone No: </p>
              <input
                type="number"
                className="p-1 rounded"
                placeholder="Enter Your Phone Number"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </span>
          </div>
        </section>
        <hr />
        <section className='px-4 py-8 flex flex-col items-center'>
          <h1 className='text-xl font-semibold'>Order Summary:</h1>
          {cart.map((e, i) => {
            return (
              <div key={i} className='my-2 py-4 w-full bg-slate-100 rounded flex justify-between  items-center px-4'>
                <div className='flex items-start gap-2 flex-col'>
                  <h2 className='font-semibold text-xl'>{e.data?.title}</h2>
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
                    <h3 className='font-semibold text-lg ml-2'>₹ {e.data?.price.toLocaleString()}</h3>
                    <p className='text-sm mx-1'> (Inc. of all taxes and charges) </p>
                  </div>
                  <div className='flex items-center gap-2 '>
                    <div className='flex cursor-pointer bg-white border max-w-min px-2 py-1 rounded-md items-center font-regular text-sm hover:opacity-70' onClick={() => { deleteFunction(e.data?.sku) }}>
                      <BsTrash className=' text-lg text-Secondary  cursor-pointer transition-all' />
                      <p className='mx-1'>Remove</p>
                    </div>
                    <Link href={`/shop/${e.data?.parentCategory}/${e.data?.sku}`} className='flex cursor-pointer bg-white border max-w-min px-2 py-1 rounded-md items-center font-regular text-sm hover:opacity-70' onClick={() => { deleteFunction(sku) }} >
                      <AiOutlineLink className=' text-lg text-Secondary  cursor-pointer transition-all' />
                      <p className='mx-1'>Visit</p>
                    </Link>
                  </div>
                </div>
                <div className='aspect-square bg-slate-400 mr-3 overflow-hidden object-cover'>
                  <Image src={`http://localhost:4000/ProductImages/${e.data?.productImages[0]}`} width={200} height={200} alt='image' className='object-cover w-28 hidden md:block ' />
                </div>
              </div>
            );
          })}
          <button onClick={() => {
            if (!shipping_address || !billing_address || !phone) {
              toast.info("Please fill in all required information.", {
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
              makePayment()
            }; ProceedChk()
          }} className='w-full text-white bg-Secondary py-2 rounded-lg'>Checkout</button>
        </section>
      </div>
      <ToastContainer />
    </>
  );
}

export default Carts;
