"use client";
import axios from "axios";
import { newOrder } from "@/lib/Utils/PaymentGateway";
import { fetchUser, getCookie } from "@/lib/Utils/Auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchById } from "@/lib/Utils/Panel";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

export default function page({ params }) {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [value, setValue] = useState(1);
  const [shipping_address, setShipping_Address] = useState("test");
  const [billing_address, setBilling_Address] = useState("test");
  const [phone, setPhone] = useState(9372103699);
  const [check, setCheck] = useState(false);
  const [address1, setaddress1] = useState({
    strtName: "",
    bldgName: "",
    Landmark: "",
    zipcode: "",
  });
  const [address2, setaddress2] = useState({
    strtName: "",
    bldgName: "",
    Landmark: "",
    zipcode: "",
  });
  const [data, setData] = useState({
    productImages: [],
  });
  const { sku } = params;

  const route = useRouter(null);

  const userDetails = async () => {
    const token = await getCookie();
    setEmail(token.data.value.email);
    if (token.data && token.data.value.email) {
      const res = await fetchUser(token.data.value.email);
      setAddress(res.data.data.shipping_address);
    }
  };

  const fetchProduct = async () => {
    const result = await fetchById(sku);
    setData(result.data.data);
    // setImage(result.data.data.productImages)
  };
  
  

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
        // route.push('/successful')
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

  // For Shipping Address
  const ShipAddress = (event) => {
    let { name, value } = event.target;
    setaddress1({
      ...address1,
      [name]: value,
    });
  };

  // For Billing Address
  const BillAdress = (event) => {
    let { name, value } = event.target;
    setaddress2({
      ...address2,
      [name]: value,
    });
  };

  let shipngAddress = `Street Name: ${address1.strtName}, Building Name / Flat No: ${address1.bldgName}, Landmark: ${address1.Landmark}, Pincode: ${address1.zipcode}`;

  let bilgAddress = `Street Name: ${address2.strtName}, Building Name / Flat No: ${address2.bldgName}, Landmark: ${address2.Landmark}, Pincode: ${address2.zipcode}`;

  const ProceedChk = () => {
    setShipping_Address(shipngAddress);

    setBilling_Address(check ? shipngAddress : bilgAddress);

    console.log(check ? shipngAddress : bilgAddress);
    console.log(data)
  };

  useEffect(() => {
    userDetails();
    fetchProduct();
  }, []);

  return (
    <main className="h-auto w-full">
      <h2 className="w-full text-center p-2 bg-slate-100 font-semibold text-2xl border-b shadow">
        Checkout
      </h2>
      <section className="flex gap-2 w-full h-full p-4 md:flex-row flex-col">
        <section className="w-full md:w-3/4 h-full bg-slate-100 rounded-md border border-slate-400 shadow  p-4 md:p-8 flex flex-col gap-3">
          <div>
            <h2 className="text-xl font-semibold ">Shipping Address:</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
              <span className="flex flex-col gap-1">
                Street Name
                <input
                  type="text"
                  placeholder="Enter Your Billing Address"
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
                  placeholder="Enter Your Billing Address"
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
                  placeholder="Enter Your Billing Address"
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
                  placeholder="Enter Your Billing Address"
                  required
                  name="zipcode"
                  className="p-1 rounded"
                  onChange={ShipAddress}
                />
              </span>
            </div>
          </div>
          <hr />
          <div>
            <h2 className="text-xl font-semibold ">Billing Address:</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mt-3">
              <span className="flex flex-col gap-1">
                Street Name
                <input
                  type="text"
                  placeholder="Enter Your Billing Address"
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
                  placeholder="Enter Your Billing Address"
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
                  placeholder="Enter Your Billing Address"
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
                  placeholder="Enter Your Billing Address"
                  required
                  name="zipcode"
                  value={address2.zipcode}
                  className="p-1 rounded"
                  onChange={BillAdress}
                />
              </span>
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
          </div>
          <hr />

          <div className="flex items-center gap-2">
               <p className="font-semibold">Set Quantity</p>
               <span  className="border flex w-36 justify-around p-1 rounded-md select-none mt-1">
               <button onClick={() => setValue((prev) => prev - 1)}>-</button>
                <p className="text-Secondary font-semibold"> {value < 1 ? setValue(1) : value} </p>
                <button onClick={() => setValue((prev) => prev + 1)}>+</button>
               </span>
              </div>
          <div>
            <hr />
            <span className="flex flex-col  w-full md:w-64 ">
              <p className="font-semibold">Phone No: </p>
              <input
                type="number"
                className="p-1 rounded"
                placeholder="Enter Your Phone Number"
                required
                onChange={(e)=>setPhone(e.target.value)}
              />
            </span>
            <p className="font-semibold text-xs opacity-70">
              This phone number should be active
            </p>
          </div>
          <span>
            <button
              onClick={() => {
                if (!email) {
                  toast.info("Please log in to order!", {
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
                  makePayment(data.price * value);
                  ProceedChk();
                }
              }}
              className="p-1 px-5 rounded text-white font-semibold bg-red-400 border transition-all mt-5 border-red-400 hover:bg-white hover:text-red-400"
            >
              Proceed
            </button>
          </span>
        </section>
        <section className="md:w-3/12 h-full p-2 w-full bg-slate-100 rounded-md border border-slate-400 shadow py-5">
          <h2 className="font-semibold text-xl">Order Summary</h2>
          <div>
            <div className="w-full h-72 bg-white shadow rounded mt-2 bg-[url('/img/hero-pattern.svg')]">
              <Image
                src={`http://localhost:4000/ProductImages/${data && data.productImages[1]}`}
                width={150}
                height={150}
                className="object-contain"
              />
        
            </div>
            <span className="flex gap-2  mt-3">
              <h3 className=" font-semibold text-red-400 whitespace-nowrap">Product name:</h3>{" "}
              <p className="opacity-75 truncate">{data.title}</p>
            </span>
            <span className="flex gap-2">
              <h3 className=" font-semibold text-red-400">Subtotal:</h3>{" "}
              <p className="opacity-75">Rs. {data.price * value}</p>
            </span>
            <hr />
            <span className="flex gap-2">
              <h3 className=" font-semibold text-red-400">Total:</h3>{" "}
              <p className="opacity-75">Rs. {data.price * value}</p>
            </span>
          </div>
        </section>
      </section>
      <ToastContainer />
    </main>
  );
}
