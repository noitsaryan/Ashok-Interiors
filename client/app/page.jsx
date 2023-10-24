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
    "/BG Images/_D0A5093.webp",
    "/BG Images/_D0A5930.webp",
    "/BG Images/_D0A5957.webp",
    "/BG Images/1P2A4338.webp",
    "/BG Images/1P2A4525.webp",
    "/BG Images/1P2A4548.webp",
    "/BG Images/714404c1-8e38-4b1b-ad85-e46c50ef7f23.webp",
    "/BG Images/b13ee9_4329df269f304e05991908c6fc21c5cd~mv2.webp",
    "/BG Images/DSC_5833.webp",
    "/BG Images/FB_IMG_1688702749578.webp",
    "/BG Images/FB_IMG_1688702751912.webp",
    "/BG Images/FB_IMG_1688702765935.webp",
    "/BG Images/IMG_1844.webp",
    "client/public/BG Images/IMG-20200313-WA0148.webp"
  ];

  const Residence = [
    "/CategoryImages/ResidentialImg/Img6.webp",
    "/CategoryImages/ResidentialImg/Img7.webp",
    "/CategoryImages/ResidentialImg/Img8.webp",
    "/CategoryImages/ResidentialImg/Img10.webp",
    "/CategoryImages/ResidentialImg/Img13.webp",
    "/CategoryImages/ResidentialImg/Img15.webp",
    "/CategoryImages/ResidentialImg/Img1.webp",
    "/CategoryImages/ResidentialImg/Img2.webp",
    "/CategoryImages/ResidentialImg/Img4.webp",
    "/CategoryImages/ResidentialImg/Img5.webp",
  ]
  const Commercial = [
    "/CategoryImages/Showroom/_D0A5187.jpg",
    "/CategoryImages/Showroom/_D0A5454.jpg",
    "/CategoryImages/Showroom/_D0A5822.jpg",
    "/CategoryImages/Showroom/_D0A5921.jpg",
    "/CategoryImages/Showroom/_D0A6001.jpg",
    "/CategoryImages/Showroom/1P2A4508.jpg",
    "/CategoryImages/Showroom/1P2A4873.jpg",
    "/CategoryImages/Showroom/1P2A4921.jpg",
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
      <div className="w-full md:gap-8 gap-2 pb-3 items-center justify-center text-xs md:text-sm hidden md:flex ">
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
                  className="h h-full w-full bg-cover bg-no-repeat bg-center"
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
        <div className="flex  items-center justify-evenly  gap-4 px-4 ">

          <div class="wrapper">
            <div class="overflow-hidden" >
              <Link href='/shop/residence'>
                <Image
                  src="/Ctg Images/1.jpg"
                  alt="categories"
                  width={300}
                  height={300}
                  className="object-cover w-[100px] h-[100px] rounded-full md:h-[200px] lg:h-[300px] md:w-[200px] lg:w-[300px]  shadow-md transition-all cursor-pointer"
                />
              </Link>
              <h1>Residence</h1>
            </div>
          </div>


          <div class="wrapper  ">
            <div class="" >
              <Link href='/shop/commercial'>
                <Image
                  src="/Ctg Images/2.jpg"
                  alt="categories"
                  width={300}
                  height={300}
                  className="object-cover w-[100px] h-[100px] rounded-full md:h-[300px] md:w-[300px] shadow-md transition-all cursor-pointer"
                />
              </Link>
              <h1>Commercial</h1>
            </div>
          </div>


          <div class="wrapper cursor-pointer  ">
            <div class="" >
              <Link href='/shop/studio'>
                <Image
                  src="/Ctg Images/3.jpg"
                  alt="categories"
                  width={300}
                  height={300}
                  className="object-cover   w-[100px] h-[100px] rounded-full md:h-[300px] md:w-[300px] shadow-md transition-all cursor-pointer"
                />
              </Link>
              <h1>Studio</h1>
              {/* <h2>RESIDENCE</h2>
              <p> <Link href='/shop/studio'>Shop Now</Link></p> */}
            </div>
          </div>

        </div>

      </section>
      <br />
      <CtaButton
        btnTxt="SHOP NOW"
        btnLink="/shop"
        styles='mx-auto'
        btnIcon={RiArrowRightLine}
      />
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
        <h2 className="text-3xl my-4 underline underline-offset-2 ">Showroom</h2>

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
        <br />
        <CtaButton
          btnTxt="Project"
          btnLink="/project"
          btnIcon={RiArrowRightLine}
        />
        <br />
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