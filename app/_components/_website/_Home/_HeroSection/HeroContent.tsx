"use client";
import Img from "@/app/_components/Img";
import React from "react";
import { motion } from "framer-motion";
export default function HeroContent() {
  return (
    <>
      <motion.div
        initial={{ height: 0, y: -1200, x: 0 }}
        animate={{ height: "fit-content", y: 0, x: 0 }}
        transition={{ duration: 1.2, delay: 1.1 }}
        className="content z-[5] overflow-hidden self-center ml-12 max-md:ml-6 flex-1 max-lg:w-full"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-xl text-light_text">START TO NEW JOURNEY</h1>
          <Img src="/assets/line-text.webp" className="w-[221px]" />
        </div>
        <h1 className="flex select-none flex-col gap-0 font-serif 2xl:text-[74px] xl:text-[50px] max-xl:text-[65px] max-md:text-[44px]">
          <div className="flex items-center gap-3">
            <span>Best</span>
            <span className="text-[50px] text-yellow-400 font-sans italic">
              Online
            </span>
          </div>
          <span>courses from</span>
          <span>
            <span className="text-secondery-green">B</span>-Academy
          </span>
        </h1>
        <div className="text-light_text text-[18px] leading-[30px] select-none">
          World-class training and development programs
          <br />
          developed by top teachers
        </div>
        <button className=" relative group/btn z-[50] block overflow-hidden px-16 py-4 my-4 bg-black/80 text-white group text-center rounded-full shadow-md">
          <p className=" block relative z-[2]">Find Course</p>
          <span className="block w-10 h-10 rounded-full top-1/2 left-full  group-hover/btn:w-[350px] group-hover/btn:h-[200px] bg-secondery-green absolute -translate-x-1/2 -translate-y-1/2 group-hover/btn:left-0 group-hover/btn:top-0 duration-700"></span>
        </button>
      </motion.div>
    </>
  );
}
