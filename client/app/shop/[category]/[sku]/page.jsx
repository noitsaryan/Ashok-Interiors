'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import Product from "@/Components/Product"
import Link from "next/link"
import { fetchByCategory, fetchById } from "@/lib/Utils/Panel"
import { PinCode } from "@/lib/Utils/PinCode"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addCart, getCookie } from "@/lib/Utils/Auth"
import { useAppContext } from "@/context/adminStore"
import { useRouter } from "next/navigation"


function page({ params }) {
  const {value, setValue} = useAppContext()
  const [data, setData] = useState({
    productImages: []
  })
  const [expand, setExpand] = useState(false)
  const [pinCode, setpinCode] = useState('Pin Code')
  const [image, setImage] = useState()
  const [email, setEmail] = useState()
  const [related, setRelated] = useState([])
  const [switchDiv, setSwitchDiv] = useState(Boolean)
  const [pinInput, setPinInput] = useState('')
  const [load, setLoad] = useState(true)
  const { productImages } = data;
  const { sku } = params;
  const { category } = params;
  const route = useRouter(null)


  const fetchProduct = async () => {
    const result = await fetchById(sku);
    setData(result.data.data);
    setImage(result.data.data.productImages?.[0]);
  };

  const getProducts = async () => {
    const data = await fetchByCategory(category)
    setRelated(data.data.data)
  }

  const fetchPin = async (e) => {
    const res = await PinCode(pinInput);

    setPinInput("");
    setpinCode(
      `${res.data?.[0].PostOffice?.[0].Name}, ${res.data?.[0].PostOffice?.[0].Block}`
    );
    if (
      res.data?.[0].PostOffice?.[0].Block == "Thane" ||
      res.data?.[0].PostOffice?.[0].Block == "Mumbai" ||
      res.data?.[0].PostOffice?.[0].Block == "Kalyan" ||
      res.data?.[0].PostOffice?.[0].Block == "Palghar" ||
      res.data?.[0].PostOffice?.[0].Block == "Navi Mumbai" ||
      res.data?.[0].PostOffice?.[0].Block == "Vasai"
    ) {
      toast.success("Delivery Available!", {
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
      toast.error("Delivery Not Available!", {
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
  };


  const fetchUserData = async () => {
    const res = await getCookie();
    setEmail(res.data.value.email)
    return res
  }

  useEffect(() => {
    fetchProduct();
    getProducts();
    fetchUserData()
  }, [])

  setTimeout(() => {
    setLoad(false);
  }, 1000);
  return (
    <main>
      {load ? (
        <div
          role="status"
          className="space-y-8 animate-pulse flex flex-col md:items-start items-center mx-auto justify-center md:px-10 md:flex-row"
        >
          <div className="flex flex-col items-center p-5 bg-white rounded-md  ">
            <div>
              <div className="text-sm text-left font-normal text-slate-400 my-2 w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="flex items-center justify-center md:w-96 md:h-96 bg-gray-300 rounded w-full h-48 dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="space-x-5  p-2 rounded-md my-2 w-16 bg-gray-200 dark:bg-gray-700 h-14 "></div>
              <div className="space-x-5  p-2 rounded-md my-2 w-16 bg-gray-200 dark:bg-gray-700 h-14 "></div>
              <div className="space-x-5  p-2 rounded-md my-2 w-16 bg-gray-200 dark:bg-gray-700 h-14 "></div>
            </div>
          </div>
          <div className="md:w-1/2 pb-4 md:pb-0 md:py-8">
            <div className="flex flex-col items-start px-4 mt-3">
              <h1 className="text-xl font-regular w-1/2 dark:bg-gray-700  h-8 rounded-full "></h1>
              <div className="w-full mt-4 flex flex-col gap-2">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px]"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] "></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] "></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section className="flex flex-col md:items-start items-center mx-auto justify-center my-8 md:px-10 md:flex-row">
          <div className="flex flex-col items-center p-5 bg-white rounded-md  ">
            <div>
              <div className="text-sm text-left font-normal text-slate-400 my-2">
                <Link href={`/shop`} className="hover:text-slate-600">
                  /shop/
                </Link>
                <Link
                  href={`/shop/${data.parentCategory}`}
                  className="hover:text-slate-600"
                >
                  {data.parentCategory}/
                </Link>
                <span>{data.title}</span>
              </div>
              <Image
                width={500}
                height={500}
                alt="Product Image"
                className="max-w-2xl object-contain max-h-min"
                src={`http://localhost:4000/ProductImages/${image}`}
              />
            </div>
            <div className="flex items-center space-x-5 overflow-y-hidden max-h-16 p-2 rounded-md my-2">
              {productImages &&
                productImages.map((e, i) => (
                  <Image
                    width={150}
                    height={150}
                    alt="Product Image"
                    key={i}
                    className=" w-[80px] filter hover:grayscale  cursor-pointer transition-all"
                    onClick={() => setImage(e)}
                    src={`http://localhost:4000/ProductImages/${e}`}
                  />
                ))}
            </div>
          </div>
          <div className="md:w-1/2 pb-4 md:pb-0 md:py-8">
            <div className="flex flex-col items-start px-4 mt-3 w-screen md:w-full">
              <h1 className="text-xl font-regular"> {data.title} </h1>
              <p className="text-gray-400 text-sm"> ({data.sku}) </p>
              {data.price ? (
                <p className="font-bold text-3xl mt-2 text-Secondary">
                  &#x20B9;{data.price.toLocaleString()}
                </p>
              ) : (
                <p className="font-bold text-3xl mt-2"></p>
              )}
            </div>
            <div className="px-4 py-4 h-auto flex flex-col items-start gap-2 w-full ">
              <span className="text-gray-400 flex gap-4 items-center justify-center"><button className={`border-Secondary ${switchDiv ? "border-b-0" : "border-b-2"}`}onClick={()=>setSwitchDiv(false)}>Description</button> <button className={`border-Secondary ${switchDiv ? "border-b-2" : "border-b-0"}`} onClick={()=>setSwitchDiv(true)}>Specifications</button></span>

              <div
                className={`text-left text-sm max-w-md ${
                  expand ? "overflow-visible h-auto" : "overflow-hidden"
                } ${switchDiv ? "hidden" : "visible"} h-6`}
                
              >
                <p> {data.description}</p>
              </div>
              <div className={`text-left w-full flex flex-col gap-2 text-sm ${switchDiv ? "visible" : "hidden"}`}>
                <p>Unit (U):{data.specification.unit}</p>
                <p>Size: {data.specification.size}</p>
                <p>Color: {data.specification.color} </p>
                <p>Packaging: {data.specification.packaging}</p>
              </div>
              <button
                className={`text-sm font-semibold ${
                  switchDiv ? "hidden" : "visible"
                }`}
                onClick={() => setExpand((prev) => !prev)}
              >
                {expand ? "Less" : "More"}
              </button>
              {/* <div className="flex flex-col gap-3 border-t border-b py-3 w-full">
                <span className="border-b-2 border-Secondary w-10">Color</span>
                <div className="flex gap-2">
                 <div className="h-9 w-9 rounded-md  bg-red-900"></div> 
                 <div className="h-9 w-9 rounded-md  bg-yellow-600"></div> 
                 <div className="h-9 w-9 rounded-md  bg-yellow-900"></div> 
                 </div>
              </div> */}
            </div>
            <div className="flex-col md:flex-row flex items-center font-semibold m-4 gap-2">
              <p>Quantity</p>
              <div className="border flex w-36 justify-around p-2 rounded-md select-none">
                <button onClick={() => setValue((prev) => prev - 1)}>-</button>
                <p> {value < 1 ? setValue(1) : value} </p>
                <button onClick={() => setValue((prev) => prev + 1)}>+</button>
              </div>
              <p className="flex gap-1 text-gray-400 text-sm md:text-md">
                Rs.
                {data.price ? (
                  <span className="">
                    &#x20B9;{(data.price * value).toLocaleString()}
                  </span>
                ) : (
                  <span className="font-bold text-3xl mt-2"></span>
                )}
                (incl. of all taxes)
              </p>
            </div>

            <div className="max-w-xs flex items-center justify-between px-4 py-1 m-4 ring-1 ring-gray-200 rounded-md  ">
              <input
                type="number"
                className="w-full outline-none"
                value={
                  pinInput > 999999 ? pinInput.toString().slice(0, 5) : pinInput
                }
                onChange={(e) => setPinInput(e.target.value)}
                placeholder={pinCode}
              />
              <button
                onClick={fetchPin}
                className="text-Secondary  p-2  rounded-lg"
              >
                Apply
              </button>
            </div>

            <div className=" md:flex md:flex-row space-y-1 md:space-y-0 flex-col px-4 items-center">
              <button className="w-full md:w-auto text-lg font-medium bg-Secondary px-5 mx-1 rounded-sm hover:opacity-80 text-white py-2 " onClick={() => route.push(`/checkout/${sku}`)} > Buy now</button>
              <button className=" w-full md:w-auto  text-lg font-medium  px-4 mx-1 text-Secondary ring-1 ring-inset ring-Secondary py-2 rounded-sm hover:opacity-80 " onClick={async () => {
                if (!email) {
                  toast.info('Please log in to continue!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                  })
                } else {
                  await addCart(email, sku)
                  toast.info('Added to cart!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                  })
                }
              }} >Add to cart</button>
            </div>
          </div>
        </section>
      )}
      <section className="mx-auto">
        <h1 className="text-center text-2xl font-bold">Related Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6 px-4 md:px-8 mx-auto">
          {related &&
            related.map((e, i) => {
              return i < 6 ? (
                <Product
                  image={e.productImages?.[0]}
                  title={e.title}
                  sku={e.sku}
                  price={e.price}
                  category={e.parentCategory}
                  key={i}
                />
              ) : null;
            })}
        </div>
      </section>
      <ToastContainer />
    </main>
  );
}

export default page;
