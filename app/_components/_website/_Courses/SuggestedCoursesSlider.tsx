"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  courses,
  directionMap,
  ErrorMessage,
  SuccessMessage,
} from "@/app/constants/_website/data";
import "swiper/css";
import CourseCard from "./CourseCard";
import { UseVariables } from "@/app/context/VariablesContext";
import SuccessAlart from "../../_popups/SuccessAlart";
import ErrorAlart from "../../_popups/ErrorAlart";
import { Cartcontext } from "@/app/context/CartContext";

export default function SuggestedCoursesSlider() {
  const {
    showErrorAlart,
    showSuccessAlart,
    setShowErrorAlart,
    setShowSuccessAlart,
  } = Cartcontext();
  const { locale } = UseVariables();
  const swiperRef = useRef<any>(null);

  // تحريك السلايدر للخلف
  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  // تحريك السلايدر للأمام
  const goNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const mainTitle = {
    ar: "دورات مرشحة",
    en: "Suggested Courses",
  };

  return (
    <>
      <div
        dir={directionMap[locale]}
        className="w-full h-fit py-6 border-t border-gray-200 "
      >
        <div className="w-full max-md:p-2 p-8 mx-auto">
          <div className="flex max-md:items-start items-center justify-between max-md:flex-col max-md:gap-6 w-full">
            <div>
              <h1 className="text-secondery-green text-2xl">
                {mainTitle[locale]}
              </h1>
            </div>

            {/* أزرار التنقل */}
            <div className="flex items-center self-center gap-3">
              <div
                onClick={goPrev}
                className="w-12 h-12 group flex items-center justify-center duration-300 cursor-pointer hover:border-black border border-gray-300 rounded-full"
              >
                <FaArrowLeft className="cursor-pointer group-hover:text-black duration-300 text-gray-400" />
              </div>
              <div
                onClick={goNext}
                className="w-12 h-12 flex items-center justify-center border duration-300 cursor-pointer border-gray-300 hover:border-black group rounded-full"
              >
                <FaArrowRight className="cursor-pointer text-gray-400 group-hover:text-black duration-300" />
              </div>
            </div>
          </div>

          {/* السلايدر */}
          <div className="swiper w-full h-full mt-6">
            <Swiper
              style={{ direction: "ltr" }}
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
                pauseOnMouseEnter: true,
              }}
              slidesPerView={4}
              spaceBetween={10}
              breakpoints={{
                320: { spaceBetween: 20, slidesPerView: 1 },
                640: { spaceBetween: 20, slidesPerView: 2 },
                768: { spaceBetween: 30, slidesPerView: 2 },
                900: { spaceBetween: 20, slidesPerView: 3 },
                1200: { spaceBetween: 20, slidesPerView: 4 },
                1600: { spaceBetween: 20, slidesPerView: 5 },
              }}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {courses.map((course, index) => (
                <SwiperSlide
                  className="w-full h-full rounded-t-md bg-transparent"
                  key={index}
                >
                  <CourseCard index={index} course={course} />
                </SwiperSlide>
              ))}
            </Swiper>
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
