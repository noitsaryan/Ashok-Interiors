import { useAppContext } from "@/context/adminStore";
import { deleteProduct, listProducts } from "@/lib/Utils/Panel";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MyModal from "./headlessComponents/UpdateModal";

function ViewProducts() {
  const [data, setData] = useState([]);
  const { setIsOpen, setSKU } = useAppContext();
  const getProducts = async () => {
    const Data = await listProducts();
    setData(Data.data.data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <main className="w-full h-auto  p-2 flex  items-center justify-center flex-col">
      <section className="flex w-full gap-2 ">
        <section className="flex w-full h-auto flex-col  overflow-y-scroll">
          <div className="grid grid-cols-8 items-center justify-items-center h-16 p-3  font-semibold bg-slate-100 border-slate-200 border-t border-b w-full">
            <p>No. </p>
            <p>SKU</p>
            <p>Image</p>
            <p>Name</p>
            <p>Price</p>
            <p>Category</p>
            <p> Update </p>
            <p>Remove</p>
          </div>

          {data &&
            data.map((e, i) => {
              return (
                <div className="grid grid-cols-8 h-20 items-center justify-items-center text-center text-ellipsis my-4 border-b" key={i}>
                  <span className="hover:text-red-500 cursor-pointer">{i + 1}</span>
                  <span className=" hover:text-red-500 cursor-pointer hover:font-semibold">
                    {e.sku}
                  </span>
                  <Image
                    src={`http://localhost:4000/ProductImages/${e.productImages[0]}`}
                    alt="productImage"
                    width={200}
                    height={200}
                    className="h-20 mb-2"
                  />

                  <span className="cursor-pointer truncate overflow-hidden text-ellipsis w-36" title="view product">
                    {e.title}
                  </span>
                  <span>₹{e.price}</span>
                  <p>{e.parentCategory}</p>
                  <button className="bg-green-400 px-2 py-1 rounded-lg text-white" onClick={async () => {
                    await setIsOpen(true);
                    await setSKU(e.sku);
                  }} > Update </button>
                  <button
                    className="bg-red-200 text-red-500 p-1 text-sm rounded-md hover:opacity-80"
                    onClick={() => deleteProduct(e.sku)}
                  >Remove</button>
                </div>
              );
            })}
        </section>
      </section>
      <MyModal />
    </main>
  );
}

export default ViewProducts;
