"use client";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import CtaButton from "./CtaButton";

import {
  HiOutlineLogin,
  HiOutlineMenuAlt3,
  HiOutlineX,
  HiOutlineSearch,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { listProducts } from "@/lib/Utils/Panel";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/context/adminStore";

function Header() {
  const { login } = useAppContext();
  const [search, setSearch] = useState('');
  const [searchPct, setSearchPct] = useState([]);
  const [found, setFound] = useState(true); // Initialize with true
  const location = usePathname('/')
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Project", href: "/project" },
    { name: "Workshop", href: "workshop" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  let menu = "";

  function openMenu() {
    gsap.to(".menu", {
      top: "0",
      opacity: 1,
      zIndex: 100,
      duration: 0.5,
    });
  }

  function closeMenu() {
    gsap.to(".menu", {
      top: "-100%",
      zIndex: -100,
      opacity: 0,
      duration: 0.5,
    });
  }

  const SearchProduct = (event) => {
    const searchText = event.target.value.toLowerCase();
    setSearch(searchText);
    GetProductData(searchText);
  };

  const GetProductData = async (searchText) => {
    const result = await listProducts();

    const filteredProducts = result.data.data.filter((elem) =>
      elem.title.toLowerCase().includes(searchText)
    );

    setSearchPct(filteredProducts);

    setFound(filteredProducts.length > 0);
  };

  return (
    <nav className="flex items-center justify-between p-3">
      <Link href="/">
        <Image
          alt="logo"
          src="/mainlogo.png"
          width={690}
          height={362}
          priority={true}
          className="w-28 md:w-32 select-none cursor-pointer"
        />
      </Link>
      <div className="w-2/6 border hidden md:flex border-slate-300 p-1 px-2 rounded-full  items-center justify-between gap-3 relative">
      <HiOutlineSearch className="text-xl text-Secondary" />
    
        <input
          type="text"
          className="outline-none flex-1  pl-1"
          placeholder="Search products"
          value={search}
          onChange={SearchProduct}
        />


        <div
          className={`absolute h-auto w-full border z-10 top-9 bg-white rounded p-3 max-h-96 overflow-hidden overflow-y-scroll  flex flex-col gap-1 ${search ? "block" : "hidden"
            }`}
        >
          {found ? (
            searchPct.map((elem) => (
              <div
                key={elem.sku}
                onClick={() => (window.location.href = `/shop/${elem.parentCategory}/${elem.sku}`)}
                className="cursor-pointer"
              >
                <div className="w-full h-20 flex items-center justify-between gap-1">
                  <Image
                    width={300}
                    height={300}
                    alt="product-image"
                    src={`http://localhost:4000/ProductImages/${elem.productImages[0]}`}
                    className="aspect-video max-w-[100px] object-cover bg-slate-200 rounded"
                  />
                  <div className="flex-1 h-full p-2">
                    <p className="w-2/3 truncate">{elem.title}</p>
                    <h2 className="font-semibold text-Secondary">
                      Rs.{elem.price}
                    </h2>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No matching products found</p>
          )}
          {/* <h3 className="font-semibold mt-2">KEEP SHOPPING FOR</h3>
          <div className="w-full h-44 grid grid-cols-3 grid-rows-1 gap-2 pt-2">
            <div className="bg-slate-200"></div>
            <div className="bg-slate-200"></div>
            <div className="bg-slate-200"></div>
          </div> */}
        </div>
      </div>
      <div className="flex items-center  flex-row-reverse ">
        <HiOutlineMenuAlt3
          onClick={openMenu}
          className={` w-8 h-8 cursor-pointer md:hidden mx-2 z-10 ${menu}`}
        />
      </div>

      <div className="hidden md:flex space-x-4  items-center md:text-sm font-semibold text-PrimaryText">
        {navigation.map((e, i) => (
          e.name == 'Shop' ? <Link
            key={i}
            href={e.href}
            className={`subMenu border-b-2 border-transparent hover:border-b-2 ${location == e.href ? 'border-b-Secondary' : 'border-b-transparent'} hover:border-b-Secondary transition-all relative`}
          >
            {e.name.toUpperCase()}
            <div className="subMenudiv w-32 absolute rounded shadow-md p-2 flex flex-col">
              <p onClick={() => window.location.href = '/shop/residence'}>Residential</p>
              <p onClick={() => window.location.href = '/shop/commercial'}>Commercial</p>
              <p onClick={() => window.location.href = '/shop/studio'}>Studio</p>
            </div>
          </Link> : <Link
            key={i}
            href={e.href}
            className={`subMenu border-b-2 border-transparent hover:border-b-2 ${location == e.href ? 'border-b-Secondary' : 'border-b-transparent'} hover:border-b-Secondary transition-all relative`}

          >
            {e.name.toUpperCase()}
          </Link>
        ))}

        {login ? (
          <Link href="/account">
            {" "}
            <BiUser
              size={30}
              className="cursor-pointer hover:bg-Secondary hover:text-white text-Secondary transition-all ring rounded-full p-1"
            />{" "}
          </Link>
        ) : (
          <CtaButton
            btnTxt="LOG IN"
            btnLink="/login"
            btnIcon={HiOutlineLogin}
          />
        )}
      </div>
      <div className="menu fixed -top-full left-0 bg-Secondary h-screen w-screen opacity-0 p-16 flex items-center justify-center flex-col h-screen ">
        <HiOutlineX
          className="text-white absolute top-7 right-5 text-4xl"
          onClick={closeMenu}
        />

        <h1 className="text-3xl text-Primary h-20 underline">Menu</h1>
        <div className="flex items-center flex-col space-y-5 py-5 text-2xl text-Primary">
          {navigation.map((e, i) => (
            <Link key={i} href={e.href} onClick={closeMenu}>
              {e.name.toUpperCase()}
            </Link>
          ))}
          {login ? (
            <Link href="/account">
              <div className="flex items-center space-x-2 text-2xl">
                {" "}
                <BiUser size={25} /> <p>Account</p>{" "}
              </div>
            </Link>
          ) : (
            <CtaButton
              btnTxt="LOG IN"
              btnLink="/login"
              btnIcon={HiOutlineLogin}
            />
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
