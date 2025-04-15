"use client";
import React from "react";
import Img from "../../Img";
import { motion } from "framer-motion";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";
import { directionMap } from "@/app/constants/_website/data";

export default function CertificateBanner() {
  const { locale } = UseVariables();
  const translations = getTranslations(locale);
  return (
    <>
      <div
        dir={directionMap[locale]}
        className="w-full mt-20 min-h-[50vh]  relative bg-purble"
      >
        <div className="w-[80%] max-md:w-full max-md:p-3 h-full mx-auto ">
          <div className="content max-lg:h-[50vh] max-lg:flex max-lg:items-center justify-center z-[30] relative ">
            <div className="">
              <p className="text-[70px] max-md:text-[40px] pt-6 font-Reey text-yellow-400">
                {translations.certificateBanner.heading1}
              </p>
              <h1 className="text-5xl text-white leading-16">
                {translations.certificateBanner.heading2}
              </h1>
              <button className="btn block z-[50] relative overflow-hidden group/btn whitespace-nowrap px-16 py-4 max-md:w-full mt-6 text-center bg-black text-white rounded-full ">
                <p className="z-[3] relative block">
                  {translations.certificateBanner.button}
                </p>
                <span className=" block w-10 h-10 rounded-full top-1/2 left-full  max-md:group-hover/btn:w-[550px] lg:group-hover/btn:w-[350px] group-hover/btn:h-[200px] bg-secondery-green absolute -translate-x-1/2 -translate-y-1/2 group-hover/btn:left-0 group-hover/btn:top-0 duration-700"></span>
              </button>
            </div>
          </div>
        </div>
        <Img
          src="/assets/cta.webp"
          className={`w-[700px] max-md:w-[400px]  max-lg:w-[500px] mask-bottom absolute max-md:relative bottom-0 z-[5]  object-contain ${
            locale == "ar" ? "left-0" : "right-0"
          }`}
        />
        <div
          className={`${
            locale == "ar" ? "left-0 rotate-180" : "right-0"
          } w-[45%] h-full rounded-l-full max-md:w-[1200px]  mask-bottom bg-black/20 absolute top-0`}
        ></div>
        <div
          className={`flex items-center justify-between flex-col h-full  absolute ${
            locale == "ar" ? "right-10" : "left-10"
          } -top-12 `}
        >
          <motion.div
            initial={{ scale: "100%" }}
            animate={{ scale: ["100%", "130%", "100%"] }}
            transition={{ repeat: Infinity, duration: 3, repeatType: "mirror" }}
            className=""
          >
            <Img src="/assets/calc.webp" className="w-64 object-contain" />
          </motion.div>
          <Img
            src="/assets/icon-pin-clip.png"
            className="w-64 object-contain max-md:hidden"
          />
        </div>
      </div>
    </>
  );
}
