"use client";
import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa";
import Img from "../../Img";
import { motion } from "framer-motion";

export default function HeroAboutPage() {
  const listData = [
    "Free for physically handcraft",
    "Easy to enroll courses",
    "Course certificate for particular course",
  ];
  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center max-xl:mt-12 max-xl:h-fit py-4">
        <div className="w-[80%] max-xl:w-[90%]  max-md:w-full max-md:p-2 flex items-center justify-between max-xl:flex-col max-xl:items-start max-xl:gap-12">
          <div
            id="content"
            className="flex-1 max-xl:w-full flex flex-col gap-8"
          >
            <h1 className="text-5xl max-md:text-3xl max-md:leading-12 font-bold font-raleway ">
              Why Students{" "}
              <span className="text-4xl text-yellow-300 font-Reey">Choose</span>{" "}
              Us for <br className="max-md:hidden" /> Gain Their Knowledge
            </h1>
            <p className="text-light_text text-lg w-3/4 max-xl:w-full leading-8">
              Helping employees gain skills and providing career development
              often take a back seat to business priorities but workplace better
              right now. Seventy percent of workers think that.
            </p>
            <ul className="flex flex-col gap-4">
              {listData.map((line, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 border border-gray-300">
                    <FaCheck className="size-4 text-white" />
                  </div>
                  <li key={index}>{line}</li>
                </div>
              ))}
            </ul>
            <Link href={"/courses"} className="btn-green-lg">
              Check Courses
            </Link>
          </div>
          <div
            id="images"
            className="flex-1 max-xl:w-full max-xl:overflow-hidden"
          >
            <div className="w-full h-fit relative">
              {/* main Image */}
              <Img
                className="relative xl:w-[620px] w-[550px] z-10  ml-auto object-cover max-xl:mx-auto"
                src="/website/about/about.png"
              />
              {/* blue square */}
              <div className="w-48 h-40 hidden xl:block bg-[#2467ec] rounded-md shadow-sm absolute -top-6 left-[70%] -translate-x-1/2 "></div>
              {/* Yellow square */}
              <div className="w-48 h-40 hidden xl:block bg-[#ffb013] rounded-md shadow-sm absolute top-1/2 -left-[8%] -translate-y-1/2 "></div>
              {/* circle Shape */}
              <Img
                className="w-[190px] z-[2] object-cover absolute -bottom-12 left-1/2 -translate-x-1/2"
                src="/website/about/about-circle-sahp.png"
              />
              {/* about-shape-1-1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute hidden xl:block  -top-8 left-[15%]"
              >
                <Img
                  src="/assets/about-shape-1-1.png"
                  className="w-[120px] object-cover "
                />
              </motion.div>
              {/* student-shape-06 */}
              <Img
                src="/website/about/student-shape-06.png"
                className="w-[520px] object-cover -top-1/2 -right-[20%] absolute z-[-2] hidden xl:block"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
