"use client";
import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { PiTriangleFill } from "react-icons/pi";
import Img from "../../Img";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { CiBookmark, CiClock2, CiHeart } from "react-icons/ci";
import { TbCategory2 } from "react-icons/tb";
import { TfiWorld } from "react-icons/tfi";
import { GoTrophy } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";
import { Cartcontext } from "@/app/context/CartContext";
import {
  courses,
  ErrorMessage,
  SuccessMessage,
} from "@/app/constants/_website/data";
import SuccessAlart from "../../_popups/SuccessAlart";
import ErrorAlart from "../../_popups/ErrorAlart";

export default function CourseCardDetailes() {
  const { locale } = UseVariables();
  const {
    addToCart,
    addToWishlist,
    showErrorAlart,
    showSuccessAlart,
    setShowErrorAlart,
    setShowSuccessAlart,
  } = Cartcontext();
  const { CourseCardDetailes } = getTranslations(locale);
  const containerRef = useRef<HTMLDivElement>(null);
  const courseDetailes = [
    {
      icon: <GiSettingsKnobs className="size-4 text-light_text" />,
      title: { ar: "المستوى", en: "Level" },
      value: { ar: "مبتدئين", en: "Beginners" },
    },
    {
      icon: <MdOutlineScreenshotMonitor className="size-4 text-light_text" />,
      title: { ar: "عدد المحاضرات", en: "Lectures" },
      value: { ar: "8 محاضرات", en: "8 Lectures" },
    },
    {
      icon: <CiClock2 className="size-4 text-light_text" />,
      title: { ar: "المدة", en: "Duration" },
      value: { ar: "1h 30m 12s", en: "1h 30m 12s" },
    },
    {
      icon: <TbCategory2 className="size-4 text-light_text" />,
      title: { ar: "الفئة", en: "Category" },
      value: { ar: "علوم البيانات", en: "Data Science" },
    },
    {
      icon: <TfiWorld className="size-4 text-light_text" />,
      title: { ar: "اللغة", en: "Language" },
      value: { ar: "English", en: "English" },
    },
    {
      icon: <CiBookmark className="size-4 text-light_text" />,
      title: { ar: "مدة الوصول", en: "Access" },
      value: { ar: "مدى الحياة", en: "Full Lifetime" },
    },
    {
      icon: <GoTrophy className="size-4 text-light_text" />,
      title: { ar: "شهادة", en: "Certificate" },
      value: { ar: "نعم", en: "Yes" },
    },
    {
      icon: <FaRegFileAlt className="size-4 text-light_text" />,
      title: { ar: "الموارد", en: "Resources" },
      value: { ar: "5 ملفات قابلة للتحميل", en: "5 Downloadable Files" },
    },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let start: number | null = null;
    const distance = 2;
    let direction = -1;

    const scrollStep = (timestamp: number) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / 5000, 1); // مدة النعومة
      const easeInOut = 0.5 - Math.cos(progress * Math.PI) / 2;

      el.scrollTop += distance * direction * easeInOut;

      if (progress < 1) {
        requestAnimationFrame(scrollStep);
      } else {
        direction *= -1;
        start = null;
        setTimeout(() => requestAnimationFrame(scrollStep), 500);
      }
    };

    requestAnimationFrame(scrollStep);

    return () => {
      start = null;
    };
  }, []);
  return (
    <>
      <div
        ref={containerRef}
        className="flex-1  max-xl:w-full h-[90vh] max-lg:h-fit overflow-y-auto hidden-scrollbar p-2 bg-white rounded-md   xl:border border-gray-300 shadow-lg xl:sticky  right-0 top-[80px]"
      >
        <div className="video-image w-[95%] max-xl:h-[300px] mx-auto mt-6 rounded-md relative">
          <div className="absolute top-0 left-0 bg-black/30 w-full h-full rounded-md"></div>
          <motion.div
            animate={{ opacity: [0.1, 0.2, 0], scale: [0.8, 1.5, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 animate-pulse  opacity-100  bg-white rounded-full "
          ></motion.div>
          <div className="absolute cursor-pointer z-[10] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center bg-white rounded-full border border-gray-200">
            <PiTriangleFill className="size-5 text-primary rotate-90" />
          </div>
          <Img
            src="/assets/course-video.png"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="flex items-center justify-between w-full mt-3 p-3">
          <p className="font-raleway">{CourseCardDetailes.ticket_costs}</p>
          <div className="flex items-center gap-3">
            <div className="current-price font-bold text-3xl ">$24.00</div>
            <del className="price-before text-gray-300 text-xl">$48.00</del>
          </div>
        </div>
        <div className="course-detailes flex flex-col gap-3 mt-6">
          {courseDetailes.map((line, index) => (
            <div
              key={index}
              className="level-line flex items-center justify-between w-full p-2 pb-2 border-b border-gray-200"
            >
              <div className="flex items-center gap-2 ">
                {line.icon}
                <p className="text-sec-text">{line.title[locale]}</p>
              </div>
              <span className="">{line.value[locale]}</span>
            </div>
          ))}
        </div>
        <div className="btns mt-4 flex items-center justify-between w-[90%] max-md:w-full max-md:p-1 max-md:flex-col gap-3 mx-auto">
          <div
            onClick={() => addToCart(courses[2])}
            className="flex-1 max-md:w-full p-1 cursor-pointer py-4 bg-blue-500 hover:bg-blue-600 duration-200 rounded-sm border border-transparent flex items-center justify-center"
          >
            <div className="flex items-center gap-2 text-white">
              <FaCartShopping className="size-5" />
              <p className="whitespace-nowrap">
                {CourseCardDetailes.add_to_cart}
              </p>
            </div>
          </div>
          <div
            onClick={() => addToWishlist(courses[2])}
            className="flex-1 max-md:w-full p-1 cursor-pointer bg-gray-50 hover:text-white hover:bg-blue-500 duration-300 py-4   border border-gray-200 rounded-sm flex items-center justify-center"
          >
            <div className="flex items-center gap-2 ">
              <CiHeart className="size-5" />
              <p className="whitespace-nowrap">
                {CourseCardDetailes.add_to_wishlist}
              </p>
            </div>
          </div>
        </div>
        <div className="my-4 flex items-center  gap-6 w-fit  mx-auto">
          <div className="pb-2 border-b border-blue-500 text-blue-500 hover:text-blue-600 hover:border-blue-600 cursor-pointer font-bold duration-300">
            {CourseCardDetailes.apply_coupon}
          </div>
          <div className="pb-2 border-b hover:border-blue-500 hover:text-blue-500 cursor-pointer font-bold duration-300">
            {CourseCardDetailes.gift_courses}
          </div>
        </div>
      </div>
      <SuccessAlart
        showAlart={showSuccessAlart}
        Message={SuccessMessage[locale]}
        onClose={() => setShowSuccessAlart(false)}
      />
      <ErrorAlart
        showAlart={showErrorAlart}
        Message={ErrorMessage[locale]}
        onClose={() => setShowErrorAlart(false)}
      />
    </>
  );
}
