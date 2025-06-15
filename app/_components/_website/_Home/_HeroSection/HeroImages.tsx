"use client";
import Img from "@/app/_components/Img";
import React from "react";
import { motion } from "framer-motion";

const manVariants = {
  initial: { x: 0, y: 1200 },
  visible: { y: 0, transition: { duration: 0.8, delay: 0.4 } },
};

const imageVariants = {
  initial: { height: 0, y: 50, x: 0 },
  visible: {
    height: "fit-content",
    y: 0,
    x: 0,
    transition: { duration: 1.4, delay: 1.5 },
  },
};

export default function HeroImages() {
  const imageData = [
    {
      src: "/assets/icon-circle-3.png",
      width: "w-64",
      position: "top-0 left-0",
      alt: "circle-image",
    },
    {
      src: "/assets/icon-circle-2.png",
      width: "w-80",
      position: "bottom-8 -left-4",
      alt: "circle-image",
    },
    {
      src: "/assets/icon-dots-2.png",
      width: "w-[150px]",
      position: "top-0 right-0 animate-pulse",
      alt: "circle-image",
    },
    {
      src: "/assets/icon-bulb.webp",
      width: "w-56",
      position: "top-32 right-0 group-hover:animate-spin",
      alt: "bulb-image",
    },
    {
      src: "/assets/icon-arrow.webp",
      width: "w-56",
      position: "-left-1/4 top-1/4",
      alt: "arrow-image",
    },
  ];

  return (
    <>
      <div className="images flex-1    h-[115vh] max-xl:hidden relative flex  max-xl:-z-[1]">
        <div className="w-[850px]   h-[850px] z-[10] rounded-full self-end relative flex items-center justify-center max-xl:w-full max-2xl:w-[700px] max-2xl:h-[700px] ">
          <motion.div
            initial={{ y: 800, x: 0 }}
            animate={{ y: 0, x: 0 }}
            transition={{ duration: 1.4 }}
            className="bg-[url('/assets/icon-circle-1.png')] max-xl:hidden  bg-cover bg-center absolute top-0 left-0 w-[850px] h-[850px] rounded-full"
          ></motion.div>
          <motion.div
            variants={manVariants}
            initial="initial"
            animate="visible"
            className=" w-[600px]  z-20 overflow-hidden"
          >
            <Img
              src="/assets/man.png"
              alt="hero-image"
              className="w-full  z-20 object-cover"
              loading="eager"
            />
          </motion.div>
          {imageData.map((item, index) => (
            <motion.div
              key={index}
              variants={imageVariants}
              initial="initial"
              animate="visible"
              className={`absolute ${item.position} max-xl:hidden overflow-hidden`}
            >
              <Img
                src={item.src}
                alt={item.alt}
                className={`${item.width} object-contain`}
              />
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        variants={manVariants}
        initial="initial"
        animate="visible"
        className="xl:hidden absolute bottom-0 right-0 max-md:-right-1/3 max-sm:-right-[65%] z-[1]"
      >
        <Img src="/assets/man.png" className="w-[550px]" />
      </motion.div>
    </>
  );
}
