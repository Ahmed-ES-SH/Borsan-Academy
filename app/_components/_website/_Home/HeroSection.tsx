"use client";
import React, { useEffect } from "react";
import HeroImages from "./_HeroSection/HeroImages";
import Img from "../../Img";
import HeroContent from "./_HeroSection/HeroContent";
import { motion } from "framer-motion";
import { directionMap } from "@/app/constants/_website/data";
import { UseVariables } from "@/app/context/VariablesContext";

export default function HeroSection() {
  const { locale } = UseVariables();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        dir={directionMap[locale]}
        className=" overflow-hidden group w-full relative h-screen  flex items-center justify-center"
      >
        <div className="w-full h-full z-[20] bg-transparent absolute top-0 left-0 "></div>
        <motion.div
          initial={{ y: -1000, scale: "1000%", x: 0 }}
          animate={{ y: 0, scale: "100%", x: 0 }}
          transition={{ duration: 1 }}
          className=" -z-[1] absolute top-0 left-0 bg-cover bg-center  bg-[url('/assets/main-gray-bg.jpg')] w-full h-screen"
        ></motion.div>
        <div className=" w-[90%] max-xl:w-full max-lg:flex-col flex items-center justify-center h-full max-xl:h-fit mx-auto">
          <HeroContent />
          <HeroImages />
        </div>
        <Img
          src="/assets/icon-book.png"
          alt="book-icon"
          width={200}
          className="w-16 object-contain absolute top-1/4 left-12"
        />
        <Img
          src="/assets/icon-dots.png"
          alt="book-icon"
          width={200}
          className="w-16 object-contain absolute bottom-12 left-12"
        />
      </div>
    </>
  );
}
