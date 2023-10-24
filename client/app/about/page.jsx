import React from "react";
import { RiUserStarLine, RiThumbUpLine, RiGroupLine } from "react-icons/ri";

const page = () => {
  return (
    <main className="w-full flex items-center justify-center flex-col">
      <section className="bg-[url('/CategoryImages/Showroom/1P2A4873.jpg')] bg-cover bg-center h-[80vh] w-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className=" text-5xl font-extrabold drop-shadow-lg mb-5">
            ABOUT US
          </h1>
          {/* <p className="drop-shadow-lg text-xl underline-offset-8">
            Creating Beautiful Spaces with Ashok Interiors
          </p> */}
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full md:w-4/5 gap-4 -translate-y-1/4 bg-white p-8 shadow-md rounded-md">
        <div>
          <p>
            <span className=" text-red-400 p-1">OUR MISSION</span> is to create thoughtful, beautiful interiors that
            meet our clients' aesthetic, functional, and economic goals. For us,
            honesty is the only policy and we strive to complete all projects
            with integrity, not just with our clients, but also our suppliers
            and contractors.
          </p>
          <br />
          <p>
            <sapn className=" text-red-400 p-1">OUR PERSPECTIVE</sapn> is proven by record of accomplishment and we
            are a reputable interior contractor company in Mumbai. We ensure
            that all projects are done with utmost professionalism using quality
            materials while offering clients the support and accessibility.
          </p>
          <br />
          <p>
            <span className=" text-red-400 p-1">OUR EXPERIENCE AND EXPERTISE</span> applies to all types of interior
            projects including residential, commercial, studio and industrial,
            we focus on the interiors and work in tandem with architectural and
            engineering teams.
          </p>
        </div>
      </section>
      <section className="flex items-start -translate-y-14 md:items-center justify-center md:flex-row flex-col gap-10 md:m-3 p-3 bg-slate-50 w-full">
        <div>
          <h2 className="p-2 text-red-400 w-fit text-xl">OUR ESTEEMED CLIENTS</h2>
        <ul className="list-disc pl-5 mt-2"> <li>LAMBODARA STUDIOS SIDDHARTH & SHANKAR</li> <li>MAHADEVAN SUBHASH STUDIOS PVT. LTD.</li> <li>SOUND AND VISION STUDIOS PVT. LTD.</li> <li>ISLAND CITY STUDIOS</li> <li>CANOPY MEDIA</li> <li>SIAMO LIFESTYLE</li> <li>K.C FABRICS</li> </ul>
        </div>
        <div>
          <h2 className="p-2 text-red-400 w-fit text-xl">OUR RESPECTED ARCHITECTS</h2>
        <ul className="list-disc pl-5 mt-2"> <li>MUNRO ACOUSTICS</li> <li>SOUND WIZARD</li> <li>ZZ ARCHITECTS</li> <li>KIRAN SHETTY DESIGN STUDIO</li> <li>ARCHITECT ZARIR MULLAN</li> <li>ARCHITECT JABALI MEHTA</li> <li>ARCHITECT KIRAN PATKI</li> </ul>
        </div>
      </section>
      <section className="w-full h-auto bg-slate-50 flex items-center justify-center p-4 gap-8 shadow-inner flex-col">
        <div>
          <h2 className="text-center font-semibold flex gap-2 flex-col">
            Experience, Expertise, and Satisfaction
            <p className="bg-Secondary text-white  text-3xl">
              Our Promise to You
            </p>
          </h2>
        </div>
        <div className="flex gap-4">
          <div className="h-full md:w-36 bg-white flex items-center justify-center flex-col gap-2 rounded p-3 shadow-sm">
            <RiUserStarLine className="text-6xl text-Secondary" />{" "}
            <div className="flex items-center justify-center gap-1 flex-col text-center">
              <h2 className="text-3xl text-black font-semibold">30</h2>
              <p className="text-sm">Years of<br/>  Experience</p>
            </div>
          </div>
          <div className="h-full md:w-36 bg-white flex items-center justify-center flex-col gap-2 rounded p-3 shadow-sm">
            <RiThumbUpLine className="text-6xl text-Secondary" />{" "}
            <div className="flex items-center justify-center gap-1 flex-col text-center">
              <h2 className="text-3xl text-black font-semibold">200</h2>
              <p className="text-sm">Projects <br/> Completed</p>
            </div>
          </div>
          <div className="h-full md:w-36 bg-white flex items-center justify-center flex-col gap-2 rounded  p-3 shadow-sm">
            <RiGroupLine className="text-6xl text-Secondary" />{" "}
            <div className="flex items-center justify-center gap-1 flex-col text-center">
              <h2 className="text-3xl text-black font-semibold">190</h2>
              <p className="text-sm">Satisfied<br/> Clients</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;