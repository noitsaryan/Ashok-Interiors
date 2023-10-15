import { fetchUser, getCookie } from "@/lib/Utils/Auth";
import React, { useEffect, useState } from "react";
import OrderDiv from "./OrderDiv";

const MyOrder = () => {
  const [products, setProducts] = useState([]);
  const getOrder = async () => {
    const res = await getCookie();
    const email = res.data.value.email;
    const user = await fetchUser(email);
    setProducts(user.data.data.order);
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <section className="flex flex-col gap-4">
      {products.map((e, i) => (
        <OrderDiv key={i} sku={e.sku} order={products} />
      ))}
    </section>
  );
};

export default MyOrder;
