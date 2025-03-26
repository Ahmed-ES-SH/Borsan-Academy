"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { courses } from "@/app/constants/_website/data";
import CourseCard from "../../_Courses/CourseCard";
import CoursesButton from "./CoursesButton";
import "swiper/css";

export default function CoursesSlider() {
  const swiperRef = useRef<any>(null);

  // تحريك السلايدر للخلف
  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  // تحريك السلايدر للأمام
  const goNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-[90%] max-md:w-full max-md:p-2 mx-auto">
        <div className="flex max-md:items-start items-center justify-between max-md:flex-col max-md:gap-6 w-full">
          <div>
            <h1 className="text-secondery-green text-2xl text-left">
              Popular Courses
            </h1>
            <h2 className="text-[40px] max-md:text-3xl text-sec-text font-bold mt-4 block">
              Pick a course to <br /> get started your study
            </h2>
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
        <div className="swiper mt-6">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 2500,
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
              <SwiperSlide key={index}>
                <CourseCard course={course} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <CoursesButton />
      </div>
    </div>
  );
}
