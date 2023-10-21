"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const Page = () => {
  const [ctg, setctg] = useState("Studio");
  const ProductCtg = [
    {
      CtgName: "Residential",
      ImgTxt: [
        // "/CategoryImages/ResidentialImg/Img1.webp",
        // "/CategoryImages/ResidentialImg/Img2.webp",
        "/CategoryImages/ResidentialImg/Img15.webp",
        "/CategoryImages/ResidentialImg/Img13.webp",
        "/CategoryImages/ResidentialImg/Img12.webp",
        "/CategoryImages/ResidentialImg/Img11.webp",
        "/CategoryImages/ResidentialImg/Img10.webp",
        "/CategoryImages/ResidentialImg/Img9.webp",
        "/CategoryImages/ResidentialImg/Img8.webp",
        "/CategoryImages/ResidentialImg/Img7.webp",
        "/CategoryImages/ResidentialImg/Img6.webp",
        "/CategoryImages/ResidentialImg/Img5.webp",
        "/CategoryImages/ResidentialImg/Img4.webp",
        "/CategoryImages/ResidentialImg/Img3.webp"
      ],
    },
    {
      CtgName: "Commercial",
      ImgTxt: [
        "/showroomSiamo/WhatsApp Image 2023-06-05 at 09.08.55.webp",
        "/showroomSiamo/WhatsApp Image 2023-06-05 at 09.10.08.webp",
        "/showroomSiamo/WhatsApp Image 2023-06-05 at 09.10.41.webp",
        "/showroomSiamo/WhatsApp Image 2023-06-05 at 09.10.43.webp",
        "/showroomSiamo/WhatsApp Image 2023-06-05 at 09.10.44.webp",
        "/showroomSiamo/WhatsApp Image 2023-06-05 at 09.10.50.webp",
      ],
    },
    {
      CtgName: "Studio",
      ImgTxt: [
        {
          studioName: "Lambodara Studios- Shankar Mahadevan",
          stdImg: [
            "/LambodaraStd/20200313_123953.webp",
            "/LambodaraStd/20200313_124001.webp",
            "/LambodaraStd/b13ee9_49bc19abf4ac4bd389163d3bb2c53a9e~mv2.webp",
            "/LambodaraStd/b13ee9_4329df269f304e05991908c6fc21c5cd~mv2.webp",
            "/LambodaraStd/b13ee9_531985e805d148c8a230709050141428~mv2.webp",
            "/LambodaraStd/b13ee9_de28cd5e0c114c1daef5a1283e424976~mv2.webp",
          ],
        },
        {
          studioName: "Shankar Mahadevan Home Theatre",
          stdImg: [
            "/shankar mahadevan/1697544403-xiTzZ64SQfaX.webp",
            "/shankar mahadevan/1697544404-4PtxaIox4Kv0.webp",
            "/shankar mahadevan/1697544404-TogHgJQudUFk.webp",
            "/shankar mahadevan/1697544405-asjMzxfOhxFg.webp",
          ],
        },
       
        {
          studioName: " Sound and Vision Studios",
          stdImg: [
            "/sound and studios/Screenshot_20230709_231132_Instagram.webp",
            "/sound and studios/Screenshot_20230709_231225_Instagram.webp",
            "/sound and studios/Screenshot_20230709_231235_Instagram.webp",
            "/sound and studios/Screenshot_20230709_231245_Instagram.webp",
            "/sound and studios/Screenshot_20230709_231255_Instagram.webp",
            "/sound and studios/Screenshot_20230709_231329_Instagram.webp",
            "/sound and studios/Screenshot_20230709_231406_Instagram.webp",
            "/sound and studios/studio (2).webp"

          ],
        },
        {
          studioName: "Subhash Studios",
          stdImg: [
            "/subhashStd/IMG_1754.webp",
            "/subhashStd/IMG_1758.webp",
            "/subhashStd/IMG_1760.webp",
            "/subhashStd/IMG_1776.webp",
            "/subhashStd/IMG_1791.webp",
            "/subhashStd/IMG_1809.webp",
            "/subhashStd/IMG_1822.webp",
            "/subhashStd/IMG_1828.webp",
            "/subhashStd/IMG_1836.webp",
            "/subhashStd/IMG_1844.webp",
            "/subhashStd/IMG_1849.webp",
            "/subhashStd/IMG_1860.webp",
            "/subhashStd/studio  (1).webp",
            "/subhashStd/studio .webp",
          ],
        },
        {
          studioName: "Canopy Media",
          stdImg: [
            "/canopyStd/1a2e7e06-fcb2-4f57-b976-cea1556d5667.webp",
            "/canopyStd/3e22baad-ae96-402d-9e32-d57dda04e314.webp",
            "/canopyStd/22e61168-4973-4070-b103-e8df24cb2bb4.webp",
            "/canopyStd/519f9b86-9dd3-4256-bac5-663f7364dafe.webp",
            "/canopyStd/6272b28e-76d0-4719-8e01-27c6eb4c10be.webp",
            "/canopyStd/7873cecf-dad2-4403-9f31-de6e948f52dd.webp",
            "/canopyStd/8948d3ac-a220-4cfd-886a-5dddfbda8349.webp",
            "/canopyStd/714404c1-8e38-4b1b-ad85-e46c50ef7f23.webp",
            "/canopyStd/c753aab2-306f-481a-a49a-af36a590456e.webp",
            // "/canopyStd/cc944934-61c7-448f-af56-4fb451df8720.webp"
          ],
        },
        {
          studioName: "Island City Studios",
          stdImg: [
            "/IslandCity/b13ee9_0c36118e4a5b41fe85389c1c989920dd~mv2.webp",
            "/IslandCity/b13ee9_7b7c3274a59d4237a1bfeef977a36a13~mv2.webp",
            "/IslandCity/b13ee9_9e8d640d3d1949d8a11f534d4a1b4b4a~mv2.webp",
            "/IslandCity/b13ee9_761f963d5f494b8cbad52b4c3d2b7f0e~mv2.webp",
            "/IslandCity/b13ee9_20317d9e553e406aa0bc558bf23baae4~mv2.webp",
            "/IslandCity/b13ee9_44400733bd1d43078812e258077d48ce~mv2.webp",
            "/IslandCity/b13ee9_add065ee50c746c4834a3d926dc92aee~mv2.webp",
            "/IslandCity/b13ee9_f037d9471c9e4ef5b6729cd21bb82d04~mv2.webp",
            "/IslandCity/DSC_5474.webp",
            "/IslandCity/DSC_5495.webp",
            "/IslandCity/DSC_5833.webp",
            "/IslandCity/DSC_5857.webp",
          ],
        },
      ],
    },
  ];

  const ClickedCtg = (value) => {
    setctg(value);
  };

  return (
    <main>
      <section className="ctgSection">
        <h1 className="HtmlH1Txt">HAVE A GLANCE AT OUR PROJECTS</h1>
        <div>
          {ProductCtg.map((elem, i) => (
            <p
              key={i}
              onClick={() => ClickedCtg(elem.CtgName)}
              style={{
                borderBottom: `${
                  ctg == elem.CtgName
                    ? "3px solid var(--Accent)"
                    : "3px solid transparent"
                }`,
              }}
            >
              {elem.CtgName}
            </p>
          ))}
        </div>
      </section>
      <section className="mt-8">
        {ProductCtg.map((elem) => {
          if (elem.CtgName === ctg) {
            if (elem.CtgName === "Studio") {
              return (
                <div key={uuidv4()}>
                  {elem.ImgTxt.map((elem, i) => {
                    return (
                      <div key={uuidv4()} className="md:px-3 flex flex-col items-center justify-center">
                        <h1 className=" text-xl md:text-2xl bg-red-100 text-red-400 font-semibold p-2 text-center m-3 w-fit">
                          {elem.studioName}
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-9">
                          {elem.stdImg.map((elem, i) => {
                            return (
                             <div className="overflow-hidden">
                               <Image
                                src={elem}
                                key={i}
                                alt="categories"
                                width={600}
                                height={300}
                                className="hover:scale-105 transition-all hover:rotate-2"
                              />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            } else {
              return (
                <div
                  key={uuidv4()}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-3 p-2"
                >
                  {elem.ImgTxt.map((elem, i) => (
                    <div className="overflow-hidden">
                    <Image
                     src={elem}
                     key={i}
                     alt="categories"
                     width={600}
                     height={300}
                     className="hover:scale-105 transition-all hover:rotate-2"
                   />
                   </div>
                  ))}
                </div>
              );
            }
          }
          return null;
        })}
      </section>
    </main>
  );
};

export default Page;
