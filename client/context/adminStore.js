"use client";
import { getCookie } from "@/lib/Utils/Auth";
import React, { createContext, useState, useContext, useEffect } from "react";
const AppContext = createContext();
export const AppProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [adminLogin, setAdminLogin] = useState(Boolean);
  const [value, setValue] = useState(Number);
  const [isOpen, setIsOpen] = useState(false);
  const [sku, setSKU] = useState("AIWD002");
  const [checkout, setCheckout] = useState(Number);
  async function checkToken() {
    const res = await getCookie();
    if (res.data.value) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }
  useEffect(() => {
    checkToken();
  }, []);

  const data = {
    login,
    adminLogin,
    setAdminLogin,
    value,
    setValue,
    isOpen,
    setIsOpen,
    sku,
    setSKU,
    checkout,
    setCheckout,
  };
  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
