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
        "/CategoryImages/ResidentialImg/Img1.webp",
        "/CategoryImages/ResidentialImg/Img2.webp",
        "/CategoryImages/ResidentialImg/Img3.webp",
        "/CategoryImages/ResidentialImg/Img4.webp",
        "/CategoryImages/ResidentialImg/Img5.webp",
        "/CategoryImages/ResidentialImg/Img6.webp",
        "/CategoryImages/ResidentialImg/Img6.webp",
        "/CategoryImages/ResidentialImg/Img8.webp",
        "/CategoryImages/ResidentialImg/Img9.webp",
        "/CategoryImages/ResidentialImg/Img10.webp",
        "/CategoryImages/ResidentialImg/Img11.webp",
        "/CategoryImages/ResidentialImg/Img12.webp",
        "/CategoryImages/ResidentialImg/Img13.webp",
        "/CategoryImages/ResidentialImg/Img15.webp",
      ],
    },
    {
      CtgName: "Commercial",
      ImgTxt: [
        "/CategoryImages/StudioImages/Img2.webp",
        "/CategoryImages/StudioImages/Img3.webp",
        "/CategoryImages/ResidentialImg/Img3.webp",
        "/CategoryImages/ResidentialImg/Img4.webp",
      ],
    },
    {
      CtgName: "Studio",
      ImgTxt: [
        {
          studioName: "Lambodara",
          stdImg: [
            "/CategoryImages/StudioImages/Img3.webp",
            `/CategoryImages/StudioImages/Img1.webp`,
            "/CategoryImages/StudioImages/Img4.webp",
          ],
        },
        {
          studioName: "Subhash",
          stdImg: [
            "/CategoryImages/StudioImages/Img3.webp",
            `/CategoryImages/StudioImages/Img1.webp`,
            "/CategoryImages/StudioImages/Img4.webp",
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
      <section>
        {ProductCtg.map((elem) => {
          if (elem.CtgName === ctg) {
            if (elem.CtgName === "Studio") {
              return (
                <div key={uuidv4()}>
                
                {elem.ImgTxt.map((elem,i) => {
                    return (
                      <div  key={uuidv4()} className="md:px-3">
                        <h1 className="text-3xl text-Secondary font-semibold underline">{elem.studioName}</h1>
                        <div  className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-9">
                        {
                          elem.stdImg.map((elem,i)=>{
                            return<Image
                            src={elem}
                            key={i}
                            alt="categories"
                            width={600}
                            height={300}
                          />
                          })
                        }
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
                  {elem.ImgTxt.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt="categories"
                      width={600}
                      height={300}
                    />
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
