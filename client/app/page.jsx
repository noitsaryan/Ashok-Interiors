"use client";
import React, { useState, useEffect } from "react";
import CtaButton from "@/Components/CtaButton";
import { RiArrowRightLine } from "react-icons/ri";
import Image from "next/image";
import Product from "@/Components/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"
import { Pagination, EffectFade, Autoplay, Navigation } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css/autoplay"
import Link from "next/link";
import { listProducts } from "@/lib/Utils/Panel";

export default function page() {
  const [product, setProduct] = useState()

  const getProducts = async () => {
    const data = await listProducts();
    setProduct(data.data.data)
  }

  const HeroSecImg = [
    "/HeroSectionImg/hero1.webp",
    "/HeroSectionImg/hero2.webp",
    "/HeroSectionImg/hero3.webp",
    "/HeroSectionImg/hero4.webp",
    "/HeroSectionImg/hero5.webp",
    "/HeroSectionImg/hero6.webp",
  ];

  const Residence = [
    "/CategoryImages/ResidentialImg/Img1.webp",
    "/CategoryImages/ResidentialImg/Img2.webp",
    "/CategoryImages/ResidentialImg/Img3.webp",
    "/CategoryImages/ResidentialImg/Img4.webp",
    "/CategoryImages/ResidentialImg/Img5.webp",
    "/CategoryImages/ResidentialImg/Img6.webp",
    "/CategoryImages/ResidentialImg/Img7.webp",
    "/CategoryImages/ResidentialImg/Img8.webp",
    "/CategoryImages/ResidentialImg/Img10.webp",
    "/CategoryImages/ResidentialImg/Img13.webp",
    "/CategoryImages/ResidentialImg/Img15.webp",
  ]
  const Commercial = [
    "/CategoryImages/ResidentialImg/Img8.webp",
    "/CategoryImages/ResidentialImg/Img10.webp",
    "/CategoryImages/StudioImages/Img2.webp",
    "/CategoryImages/StudioImages/Img3.webp",
  ]
  const Studio = [
    "/CategoryImages/StudioImages/Img1.webp",
    "/CategoryImages/StudioImages/Img2.webp",
    "/CategoryImages/StudioImages/Img3.webp",
    "/CategoryImages/StudioImages/Img5.webp",
  ]

  const ClientsImg = [
    "/ClientsImg/image 1.jpg",
    "/ClientsImg/image 2.jpg",
    "/ClientsImg/image 3.jpg",
    "/ClientsImg/image 4.jpg",
    "/ClientsImg/image 5.jpg",
    "/ClientsImg/image 6.jpg",
  ];

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <main className="HomeMain">
      <div className="w-full flex gap-8 pb-3 items-center justify-center">
        <p className="text-[16px] font-semibold border-Secondary">FURNITURE</p>
        <p className="text-[16px] font-semibold border-Secondary">CONTRACTORS</p>
        <p className="text-[16px] font-semibold">INTERIORS</p>
        <p className="text-[16px] font-semibold">ACOUSTICS</p>
      </div>
      <div className="w-full px-2 h-[450px] md:h-[550px] flex gap-2">
        <div className=" w-full  md:w-3/4 h-full">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination, Navigation]}
            pagination={{ clickable: true }}
            className="w-full h-full"
            effect={'fade'}
            spaceBetween={50}
            slidesPerView={1}
            navigation={
              true
            }
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {HeroSecImg.map((elem, i) => (
              <SwiperSlide key={i}>
                <div

                  style={{ backgroundImage: `url('${elem}')` }}
                  className="h-full w-full bg-cover bg-no-repeat bg-center"
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden md:flex flex-col h-full w-1/4 gap-2">
          <Swiper

            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={
              {
                delay: 3000,
                disableOnInteraction: false,
              }
            }
            className=" w-full h-1/2 bg-slate-100"
            spaceBetween={50}
            slidesPerView={1}
          >
            {product &&
              product.slice(0, 2).map((e, i) => {
                return (
                  <SwiperSlide className="w-full" key={i}>
                    <p className="absolute font-semiboldabold text-white text-2xl z-10 bottom-2 left-2 max-w-xs my-2 truncate">{e.title}</p>
                    <Image
                      onClick={() => {
                        window.location.href = `/shop/${e.parentCategory}/${e.sku}`;
                      }}
                      width={500}
                      height={500}
                      alt="Images"
                      className="cursor-pointer "
                      src={`http://localhost:4000/ProductImages/${e.productImages[0]}`}
                    />
                  </SwiperSlide>
                )
              })}
          </Swiper>
          <Swiper

            modules={[Autoplay, Pagination, EffectFade]}
            effect="fade"
            autoplay={
              {
                delay: 3000,
                disableOnInteraction: false,
              }
            }
            className=" w-full h-1/2  bg-slate-100"
            spaceBetween={50}
            slidesPerView={1}
          >
            {product &&
              product.slice(1, 3).map((e, i) => {
                return (
                  <SwiperSlide className="w-full" key={i}>
                    <p className="absolute font-semiboldabold text-white text-2xl z-10 bottom-2 left-2 max-w-xs my-2 truncate">{e.title}</p>
                    <Image
                      onClick={() => {
                        window.location.href = `/shop/${e.parentCategory}/${e.sku}`;
                      }}
                      width={500}
                      height={500}
                      alt="Images"
                      className="cursor-pointer "
                      src={`http://localhost:4000/ProductImages/${e.productImages[0]}`}
                    />
                  </SwiperSlide>
                )
              })}
          </Swiper>

        </div>
      </div>

      <section className="my-6">
        <div className="flex items-center justify-evenly">
          <div className=" md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] w-[100px] h-[100px]  ">
            <Link href='/shop/residence'>
              <Image
                src="/assets/ResidentialCategory.jpg"
                alt="categories"
                width={300}
                height={300}
                className="object-cover rounded-full w-full h-full hover:rotate-6 transition-all cursor-pointer"
              />
            </Link>
            <h1 className="font-medium "> Residential </h1>
          </div>
          <div className="md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] w-[100px] h-[100px]  ">
            <Link href='/shop/commercial'>
              <Image
                src="/assets/CommericialCategory.jpg"
                alt="categories"
                width={500}
                height={300}
                className="object-cover rounded-full w-full h-full hover:rotate-6 transition-all cursor-pointer"
              />
            </Link>
            <h1 className="text-lg font-medium "> Commercial </h1>
          </div>
          <div className="  md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px] w-[100px] h-[100px] medium">
            <Link href='/shop/studio'>
              <Image
                src="/assets/StudioCategory.jpg"
                alt="categories"
                width={600}
                height={300}
                className="object-cover rounded-full w-full h-full hover:rotate-6 transition-all cursor-pointer"
              />
            </Link>
            <h1 className="text-lg font-medium "> Studio </h1>
          </div>
        </div>
      </section>

      <section className="px-4">
        <Swiper
          className="w-full h-full px-4 items-center gap-6  mx-auto"
          modules={[Pagination, Navigation]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            "@1.50": {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
        >
          {product &&
            product.map((e, i) => {
              return i < 10 ? (
                <SwiperSlide key={i}>
                  <Product
                    image={e.productImages?.[0]}
                    title={e.title}
                    sku={e.sku}
                    price={e.price}
                    category={e.parentCategory}

                  />
                </SwiperSlide>
              ) : null;
            })}
        </Swiper>
      </section>

      <CtaButton
        btnTxt="SHOP NOW"
        btnLink="/shop"
        styles='mx-auto'
        btnIcon={RiArrowRightLine}
      />
      <section className="flex md:flex-col items-center px-8" >
        <h2 className="text-3xl my-4 underline underline-offset-2 ">Residential</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={
            {
              delay: 3000,
              disableOnInteraction: false,
            }
          }
          className="w-full h-full"
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >


          {
            Residence.map((e, i) => {
              return <SwiperSlide key={i} className="h-full w-full">
                <Image
                  alt="portfolio"
                  src={e}
                  width={500}
                  height={500}
                  className="rounded-md aspect-video"
                />
              </SwiperSlide>
            })
          }
        </Swiper>
        <h2 className="text-3xl my-4 underline underline-offset-2 ">Commercial</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={
            {
              delay: 3000,
              disableOnInteraction: false,
            }
          }
          className="w-full h-full"
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >


          {
            Commercial.map((e, i) => {
              return <SwiperSlide key={i} className="h-full w-full">
                <Image
                  alt="portfolio"
                  src={e}
                  width={500}
                  height={500}
                  className="rounded-md aspect-video"
                />
              </SwiperSlide>
            })
          }
        </Swiper>
        <h2 className="text-3xl my-4 underline underline-offset-2 ">Studio</h2>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={
            {
              delay: 3000,
              disableOnInteraction: false,
            }
          }
          pagination={{ clickable: true }}
          className="w-full h-full"
          spaceBetween={10}
          slidesPerView={3}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            "@1.50": {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
        >

          {
            Studio.map((e, i) => {
              return <SwiperSlide key={i} className="h-full w-full">
                <Image
                  alt="portfolio"
                  src={e}
                  width={500}
                  height={500}
                  className="rounded-md aspect-video"
                />
              </SwiperSlide>
            })
          }
        </Swiper>
        <CtaButton
          btnTxt="Project"
          btnLink="/project"
          btnIcon={RiArrowRightLine}
        />
      </section>

      <section className="border-t pt-2">
        <div className="clientsImageDiv">
          <div className="slide-track">
            {ClientsImg.map((elem, i) => (
              <Image
                key={i}
                width={500}
                height={500}
                alt="clients"
                src={elem}
                className="animationOfClients"
              />
            ))}
            {ClientsImg.map((elem, i) => (
              <Image
                key={i}
                width={500}
                height={500}
                alt="clients"
                src={elem}
                className="animationOfClients"
              />
            ))}
          </div>
        </div>
        <span className="gradSection"></span>
      </section>
    </main>
  );
}
