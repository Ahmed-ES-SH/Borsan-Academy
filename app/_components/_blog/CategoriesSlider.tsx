"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Img from "../Img";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { articleCategories, directionMap } from "@/app/constants/_website/data";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";
import Loading from "../Loading";

export default function CategoriesSlider() {
  const { locale } = UseVariables();
  const translations = getTranslations(locale);
  const texts = translations.article_categories_section;
  const swiperRef = useRef<any>(null);

  const [loading, setLoading] = useState(true);

  // تحريك السلايدر للخلف
  const goPrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  // تحريك السلايدر للأمام
  const goNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // إيقاف التمرير عند تحميل الصفحة
    document.body.style.overflow = "hidden";

    // إعادة التمرير بعد 3 ثوانٍ
    const timer = setTimeout(() => {
      document.body.style.overflow = "auto";
      setLoading(false);
    }, 2000); // 3000 مللي ثانية = 3 ثواني

    // تنظيف المؤقت عندما يغادر المستخدم الصفحة
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  return (
    <div dir={directionMap[locale]} className="w-[90%] mx-auto mt-12 mb-6">
      {/* قسم المقدمة الخاص بالأقسام */}
      <div className="text-center mb-6 relative pb-4">
        <h2 className="text-3xl max-md:text-xl font-bold text-primary">
          {texts.title}
        </h2>
        <p className="mt-2 max-md:text-[15px] text-light_text">
          {texts.description}
        </p>
        <span className="w-1/4 max-lg:w-1/2 max-md:w-3/4 absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-secondery-green "></span>
      </div>

      <div className="bg-white border border-gray-200 shadow-md rounded-xl relative py-2 max-md:w-[95%] mx-auto ">
        <Swiper
          style={{ direction: "ltr" }}
          slidesPerView={7}
          spaceBetween={20}
          modules={[Autoplay]}
          autoplay={{ delay: 2500, pauseOnMouseEnter: true }}
          breakpoints={{
            300: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {articleCategories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-center gap-3 cursor-pointer group">
                <div className="w-20 h-20 flex items-center overflow-hidden justify-center rounded-full">
                  <Img
                    src={category.imageUrl}
                    className="w-12 object-contain rounded-full"
                  />
                </div>
                <p className="group-hover:text-secondery-green duration-300">
                  {locale == "ar" ? category.title_ar : category.title_en}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          onClick={goNext}
          className="w-10 h-10 z-[30] border border-gray-300 absolute top-1/2 -right-6 -translate-y-1/2 cursor-pointer hover:bg-secondery-green hover:text-white duration-300 rounded-md bg-white flex items-center justify-center shadow-md"
        >
          <FaArrowRight className="size-4" />
        </div>
        <div
          onClick={goPrev}
          className="w-10 h-10 z-[30] border border-gray-300 absolute top-1/2 -left-6 -translate-y-1/2 cursor-pointer hover:bg-secondery-green hover:text-white duration-300 rounded-md bg-white flex items-center justify-center shadow-md"
        >
          <FaArrowLeft className="size-4" />
        </div>
      </div>
    </div>
  );
}
