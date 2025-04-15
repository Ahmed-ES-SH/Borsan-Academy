"use client";
import React from "react";
import Img from "../../Img";
import { motion } from "framer-motion";
import { MdOutlineCastForEducation } from "react-icons/md";
import { PiStudentThin } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { getTranslations } from "@/app/_helpers/helpers"; // تأكد من أنك تستخدم دالة getTranslations
import { UseVariables } from "@/app/context/VariablesContext";
import { directionMap } from "@/app/constants/_website/data";
import LocaleLink from "../../localeLink";

export default function AboutSection() {
  const { locale } = UseVariables();
  const translations = getTranslations(locale);

  return (
    <div
      dir={directionMap[locale]}
      className="w-full h-screen max-xl:h-fit max-xl:p-4 relative overflow-hidden"
    >
      <div className="flex max-xl:flex-col max-xl:gap-4 items-center justify-between w-[90%] mx-auto h-full max-xl:w-full mt-2">
        <div className="left-side relative 2xl:w-[550px] 2xl:h-[550px] w-[450px] h-[450px] max-md:w-[300px] max-md:h-[300px]">
          <div className="w-full h-full absolute top-0 left-0 bg-cover bg-center bg-[url('/assets/about-1.png')] z-[3]"></div>
          <motion.div
            initial={{ translateY: "-50%" }}
            animate={{ translateY: ["-50%", "-48%", "-50%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            className="w-3/4 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 z-[4] bg-secondery-green opacity-20 rounded-full"
          ></motion.div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity }}
            className="h-fit w-[120px] absolute top-0 -left-[2%]"
          >
            <Img
              alt="about-shape-1"
              src="/assets/about-shape-1-1.png"
              className="w-[150px] z-[2] object-contain"
            />
          </motion.div>
        </div>
        <div className="right-side w-[60%] max-xl:w-full z-[2] flex flex-col gap-4">
          <h2 className="text-primary text-xl my-2 ml-2">
            {translations.about.title}
          </h2>
          <h1 className="text-5xl max-xl:text-4xl max-md:text-3xl text-indigo-900 w-3/4 max-xl:w-full">
            {translations.about.mainTitle}
          </h1>
          <p className="text-[16px] text-light_text w-3/4 max-md:w-full">
            {translations.about.description}
          </p>
          <div className="flex flex-col gap-3">
            <div className="w-full flex items-center max-md:flex-col max-md:gap-2 max-md:items-start gap-4 rounded-md border border-secondery-green p-3">
              <div className="flex items-center justify-center w-28 h-28 max-md:w-20 max-md:h-20 relative">
                <div className="absolute top-0 left-0 bg-primary opacity-5 w-full h-full rounded-md z-[1]"></div>
                <PiStudentThin className="size-12 max-md:size-8 text-secondery-green z-[3]" />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl max-md:text-2xl text-secondery-green font-bold">
                  {translations.about.flexibleClasses.title}
                </h1>
                <p className="text-[15px] text-second_text w-3/4 max-md:w-full">
                  {translations.about.flexibleClasses.description}
                </p>
              </div>
            </div>
            <div className="w-full flex items-center max-md:flex-col max-md:gap-2 max-md:items-start gap-4 rounded-md border border-secondery-green p-3">
              <div className="flex items-center justify-center w-28 h-28 max-md:w-20 max-md:h-20 relative">
                <div className="absolute top-0 left-0 bg-primary opacity-5 w-full h-full rounded-md z-[1]"></div>
                <MdOutlineCastForEducation className="size-12 max-md:size-7 text-secondery-green z-[3]" />
              </div>
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl max-md:text-2xl text-secondery-green font-bold">
                  {translations.about.liveClasses.title}
                </h1>
                <p className="text-[15px] text-second_text w-3/4 max-md:w-full">
                  {translations.about.liveClasses.description}
                </p>
              </div>
            </div>
          </div>
          <LocaleLink href={"/about"} className="btn-green-lg">
            <p>{translations.about.discoverMore}</p>
            <FaArrowRightLong />
          </LocaleLink>
        </div>
      </div>
      <Img
        src="/assets/Meanders.png"
        className="w-[1200px] absolute -top-3/4 -right-[5%] z-[1]"
      />
    </div>
  );
}
