"use client";
import Product from "@/Components/Product";
import { listProducts } from "@/lib/Utils/Panel";
import React, { useEffect, useState } from "react";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";

const page = () => {
  const [product, setProduct] = useState([]);
  const [pagination, setpagination] = useState(1);

  const fetchProducts = async () => {
    const data = await listProducts()
    setProduct(data.data.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const ChangePage = (value) => {
    if (value == "prev") {
      if (pagination == 1) {
        setpagination(1);
      } else {
        setpagination(pagination - 1);
      }
    } else if (value === "next") {
      setpagination(pagination + 1);
    }
  };
  return (
    <>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-6 px-4 md:px-8">
        {product &&
          product.map((e, i) => {
            return i < pagination * 20 ? (
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
      </section>
      <div className="flex items-center justify-center w-full text-3xl cursor-pointer gap-5">
        <RiArrowDropLeftLine onClick={() => ChangePage("prev")} />
        <p className="text-xl select-none">{pagination}</p>
        <RiArrowDropRightLine onClick={() => ChangePage("next")} />
      </div>
    </>
  );
};

export default page;
