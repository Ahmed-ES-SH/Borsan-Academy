"use client";
import React from "react";
import { LuBookMarked } from "react-icons/lu";
import { SiSololearn } from "react-icons/si";
import { TbPigMoney } from "react-icons/tb";
import Img from "../../Img";
import { motion } from "framer-motion";
import { PiTriangleFill } from "react-icons/pi";

export default function AboutSectionTwo() {
  const staticData = [
    {
      h1: "Expand Yourself",
      paragraph:
        "Expand your professional network, build your expertise, and earn money on each paid enrollment and find the university",
      icon: <LuBookMarked className="size-20 text-secondery-green" />,
    },
    {
      h1: "Expand Yourself",
      paragraph:
        "Publish the course you want, in the way you want, and always have of control your own content. If you are passionate",
      icon: <SiSololearn className="size-20 text-secondery-green" />,
    },
    {
      h1: "Expand Yourself",
      paragraph:
        "Earn money from Law is a career-oriented course after your 12th or graduation. We have jotted some of the instructors.",
      icon: <TbPigMoney className="size-20 text-secondery-green" />,
    },
  ];
  return (
    <>
      <div
        style={{ height: "calc(100% + 20vh)" }}
        className="w-full relative bg-gray-100 max-md:pb-[20vh] max-lg:pb-[30vh] pb-[50vh]"
      >
        <div className="w-[80%] max-md:w-full max-md:p-2 max-lg:w-[95%] mx-auto pt-12">
          <h1 className="text-5xl font-bold text-center">
            Global Online <br />
            Education{" "}
            <span className="text-3xl text-yellow-300 font-Reey">
              Categories
            </span>
          </h1>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 max-md:gap-16 gap-32 mt-24">
            {staticData.map((line, index) => (
              <div
                className="w-full flex items-center flex-col gap-4 group"
                key={index}
              >
                <div className="w-fit group-hover:-translate-y-8 duration-200">
                  {line.icon}
                </div>
                <h2 className="text-3xl font-semibold">{line.h1}</h2>
                <p className="text-light_text leading-7 text-[16px]">
                  {line.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[60%] max-lg:w-[95%] max-xl:w-[85%]  max-md:w-full shadow-lg bg-white h-[65vh] max-lg:h-[50vh]   absolute -bottom-1/4 left-1/2 -translate-x-1/2  flex items-center justify-center p-4 max-md:p-2 rounded-md">
          <div className="shap-right hidden xl:flex absolute -right-32 top-1/2 -translate-y-1/2  flex-col gap-8">
            <h4 className="text-lg font-bold">
              65k+
              <br />{" "}
              <span className="text-light_text font-light text-[15px]">
                views daily
              </span>
            </h4>
            <Img
              src="/assets/features-shape-2.png"
              className="w-11 object-contain"
            />
          </div>
          <div className="shap-left hidden xl:flex absolute -left-32 bottom-0 -translate-y-1/2  flex-col gap-2">
            <Img
              src="/assets/features-shape.png"
              className="w-11 object-contain"
            />
            <h4 className="text-lg font-semibold text-sahdow w-1/2">
              Get help from this video
            </h4>
          </div>
          <div className="w-full h-full relative">
            <Img
              src="/assets/course-2.jpg"
              className="w-full h-full object-cover"
            />
            <div className="flex max-lg:flex-col max-lg:gap-8 absolute items-center gap-4 z-[10] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
              <div className=" relative z-[20] cursor-pointer  w-20 h-20 flex items-center justify-center bg-white rounded-full border border-gray-200">
                <PiTriangleFill className="size-5 text-primary rotate-90" />
                <motion.div
                  animate={{ opacity: [0.1, 0.2, 0], scale: [0.8, 1.5, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 animate-pulse  opacity-100  bg-white rounded-full "
                ></motion.div>
              </div>
              <h1 className="text-xl font-semibold text-white font-raleway">
                Watch Video Intro
              </h1>
            </div>
            <div className="w-full h-full absolute top-0 left-0 bg-black/50"></div>
          </div>
        </div>
      </div>
    </>
  );
}
