import { addCart, getCookie, setCart } from "@/lib/Utils/Auth";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function Product({ image, title, price, sku, category }) {
  const [load, setLoad] = useState(true);
  setTimeout(() => {
    setLoad(false);
  }, 1000);
  return load ? (
    <div
      role="status"
      className="animate-pulse col-span-2 flex flex-col justify-center py-8 cursor-pointer lg:col-span-1 max-w-sm gap-3"
    >
      <div className="flex items-center justify-center md:rounded-sm aspect-square bg-gray-300 rounded sm:w-96 dark:bg-gray-500">
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
      <div className="w-full">
        <div className="h-8 bg-gray-200 rounded dark:bg-gray-700 mb-4"></div>
        <div className="flex gap-3">
          <div className="h-8 w-3/5 bg-gray-200 rounded dark:bg-gray-700 "></div>
          <div className="grid grid-cols-2 w-2/5 gap-2">
            <div className="h-8 bg-gray-200  rounded dark:bg-gray-700 "></div>
            <div className="h-8 bg-gray-200  rounded dark:bg-gray-700 "></div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  ) : (
    <Link href={`/shop/${category}/${sku}`}>
      <div className="col-span-2 flex flex-col justify-center py-8 cursor-pointer lg:col-span-1 max-w-sm ">
        <div className="overflow-hidden">
          <Image
            width={300}
            height={300}
            alt="product-image"
            src={`http://localhost:4000/ProductImages/${image}`}
            className="md:rounded-md object-cover aspect-square duration-500 hover:scale-105 transition-all"
          />
        </div>
        <div className="flex items-start flex-col ">
          <h1 className="font-bold max-w-xs my-2 truncate"> {title} </h1>
          <div className="flex items-center justify-between w-full py-2">
            <span className="font-semibold">₹{price}/-</span>
            <div className="space-x-3">
              <button
                className="ring-1 rounded-sm ring-inset text-Secondary ring-Secondary px-3 py-1"
                onClick={async () => { await addCart(email, sku) }}
              >
                Add to cart
              </button>
              <button className="bg-Secondary px-3 py-1 text-white rounded-sm hover:opacity-80 transition-all">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;
