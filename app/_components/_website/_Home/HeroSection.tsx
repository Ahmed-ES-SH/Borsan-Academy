"use client";
import React from "react";
import HeroImages from "./_HeroSection/HeroImages";
import Img from "../../Img";
import HeroContent from "./_HeroSection/HeroContent";
import { motion } from "framer-motion";
export default function HeroSection() {
  const manVariants = {
    initial: { x: 0, y: 1200 },
    visible: { y: 0, transition: { duration: 0.8, delay: 0.4 } },
  };
  return (
    <>
      <div className=" overflow-hidden group w-full relative h-screen  flex items-center justify-center">
        <div className="w-full h-full z-[30] bg-transparent absolute top-0 left-0 pointer-events-none"></div>
        <motion.div
          initial={{ y: -1000, scale: "1000%", x: 0 }}
          animate={{ y: 0, scale: "100%", x: 0 }}
          transition={{ duration: 1 }}
          className=" -z-[1] absolute top-0 left-0 bg-cover bg-center  bg-[url('/assets/main-gray-bg.jpg')] w-full h-screen"
        ></motion.div>
        <div className=" w-[90%] max-xl:w-full max-lg:flex-col flex items-center justify-center h-full max-xl:h-fit mx-auto relative max-xl:static">
          <HeroContent />
          <HeroImages />
          {/* Dynamic Hero Image */}
          <motion.div
            variants={manVariants}
            initial="initial"
            animate="visible"
            className="w-full  max-2xl:absolute bottom-0 -right-1/2 z-[1] xl:hidden overflow-hidden"
          >
            <Img
              src="/assets/man.png"
              alt="hero-image"
              className="w-full  max-md:w-full  max-xl:w-[550px] object-contain z-20"
            />
          </motion.div>
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
