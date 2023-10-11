import React from "react";
import { RiUserStarLine, RiThumbUpLine, RiGroupLine } from "react-icons/ri";

const page = () => {
  return (
    <main className="w-full flex items-center justify-center flex-col">
      <section className="bg-[url('/HeroSectionImg/hero5.webp')] bg-cover bg-center h-[80vh] w-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className=" text-5xl font-extrabold drop-shadow-lg mb-5">
            ABOUT US
          </h1>
          <p className="drop-shadow-lg text-xl underline-offset-8">
            Creating Beautiful Spaces with Ashok Interiors
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center w-full md:w-4/5 gap-4 -translate-y-1/4 bg-white p-8 shadow-md rounded-md">
        <div>
          <p>
            <b>OUR MISSION</b> is to create thoughtful, beautiful interiors that
            meet our clients' aesthetic, functional, and economic goals. For us,
            honesty is the only policy and we strive to complete all projects
            with integrity, not just with our clients, but also our suppliers
            and contractors.
          </p>
          <br />
          <p>
            <b>OUR PERSPECTIVE</b> is proven by record of accomplishment and we
            are a reputable interior contractor company in Mumbai. We ensure
            that all projects are done with utmost professionalism using quality
            materials while offering clients the support and accessibility.
          </p>
          <br />
          <p>
            <b>OUR EXPERIENCE AND EXPERTISE</b> applies to all types of interior
            projects including residential, commercial, studio and industrial,
            we focus on the interiors and work in tandem with architectural and
            engineering teams.
          </p>
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
              <h2 className="text-3xl text-black font-semibold">29</h2>
              <p className="text-sm">Years of<br/>  Experience</p>
            </div>
          </div>
          <div className="h-full md:w-36 bg-white flex items-center justify-center flex-col gap-2 rounded p-3 shadow-sm">
            <RiThumbUpLine className="text-6xl text-Secondary" />{" "}
            <div className="flex items-center justify-center gap-1 flex-col text-center">
              <h2 className="text-3xl text-black font-semibold">150</h2>
              <p className="text-sm">Projects <br/> Completed</p>
            </div>
          </div>
          <div className="h-full md:w-36 bg-white flex items-center justify-center flex-col gap-2 rounded  p-3 shadow-sm">
            <RiGroupLine className="text-6xl text-Secondary" />{" "}
            <div className="flex items-center justify-center gap-1 flex-col text-center">
              <h2 className="text-3xl text-black font-semibold">24</h2>
              <p className="text-sm">Satisfied<br/> Clients</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
