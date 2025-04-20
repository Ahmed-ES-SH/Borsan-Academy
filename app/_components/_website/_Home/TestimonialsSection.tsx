"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { directionMap, testimonials } from "@/app/constants/_website/data";
import Img from "../../Img";
import Stars from "../_Courses/Stars";
import { IoMdQuote } from "react-icons/io";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";

export default function TestimonialsSection() {
  const { locale } = UseVariables();
  const translations = getTranslations(locale);
  const texts = translations.testimonials;
  return (
    <>
      <div
        dir={directionMap[locale]}
        className="w-full min-h-[70vh] flex  items-center justify-center max-md:p-2 p-6 bg-[url('/assets/main-gray-bg.jpg')] bg-cover bg-center"
      >
        <div className="w-[95%] max-xl:w-full mx-auto flex max-xl:flex-col items-center justify-between ">
          <div className="content w-[30%] max-xl:w-full flex flex-col gap-4">
            <h1 className="text-xl text-secondery-green">{texts.title}</h1>
            <h2 className=" font-bold font-mono text-2xl 2xl:text-[55px] max-md:text-[35px] text-sec-text">
              {texts.heading}
            </h2>
            <p className="text-[15px] max-md:text-[20px] text-light_text 2xl:w-1/2 xl:w-3/4 max-md:w-full">
              {texts.description}
            </p>
          </div>
          <div dir="ltr" className="slider-Testimonials w-[70%] max-xl:w-full ">
            <Swiper
              style={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                placeItems: "center",
                minHeight: "70vh",
              }}
              slidesPerView={2}
              spaceBetween={20}
              modules={[Autoplay]}
              autoplay={{
                delay: 2500,
              }}
              breakpoints={{
                300: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                900: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide style={{ height: "fit-content" }} key={index}>
                  <div className="w-full h-[350px] border-2 border-dashed border-secondery-green flex flex-col items-start justify-center p-3 overflow-visible relative rounded-md bg-[#fff] shadow-md ">
                    <div className="w-36 h-36  bg-gray-100 rounded-full absolute -top-16 right-6 flex items-center justify-center">
                      <Img
                        src={testimonial.user.image || "/public"}
                        className="w-32 rounded-full "
                      />
                    </div>
                    <div className="contnet flex flex-col gap-6">
                      <Stars size={25} goldStars={5} grayStars={0} />
                      <p
                        dir="rtl"
                        style={{ overflowWrap: "anywhere" }}
                        className=""
                      >
                        {testimonial.comment}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-purble flex items-center justify-center">
                          <IoMdQuote className="text-white size-6 " />
                        </div>
                        <div className="flex flex-col gap-2">
                          <h2 className="text-sec-text text-2xl font-bold">
                            {testimonial.user.name}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
