/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { JSX, useState } from "react";
import HeroBanner from "../HeroBanner";
import Stars from "../_Courses/Stars";
import Img from "../../Img";
import { FaCheck, FaLock, FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { MdCircle } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { LuYoutube } from "react-icons/lu";
import PaginationWithoutNumbers from "../../PaginationWithoutNumbers";
import CourseCardDetailes from "./CourseCardDetailes";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";
import { directionMap } from "@/app/constants/_website/data";

export default function CoursePageComponent() {
  const { locale } = UseVariables();
  const { review_form, CoursePage } = getTranslations(locale);

  const requirements = [
    {
      en: "High School Mathematics Level",
      ar: "مستوى الرياضيات في المرحلة الثانوية",
    },
    {
      en: "Basic Python Knowledge Require",
      ar: "يتطلب معرفة أساسية بلغة بايثون",
    },
    {
      en: "Broadband Internet",
      ar: "اتصال إنترنت عالي السرعة",
    },
  ];

  const learnedPoints = [
    {
      en: "Handle advanced techniques like Dimensionality Reduction",
      ar: "التعامل مع تقنيات متقدمة مثل تقليل الأبعاد",
    },
    {
      en: "Handle specific topics like Reinforcement Learning best",
      ar: "إتقان مواضيع محددة مثل التعلم المعزز",
    },
    {
      en: "Know which Machine Learning model to choose for each type of problem",
      ar: "معرفة نموذج التعلم الآلي المناسب لكل نوع من المشكلات",
    },
    {
      en: "Reinforcement learning upper confidence bound Thompson sampling",
      ar: "التعلم المعزز باستخدام حد الثقة الأعلى وعيّنة طومسون",
    },
    {
      en: "Model Selection & Boosting fold cross validation parameter",
      ar: "اختيار النموذج وتحسين الأداء باستخدام التحقق المتقاطع",
    },
    {
      en: "Use Machine Learning for personal purpose of machine",
      ar: "استخدام التعلم الآلي للأغراض الشخصية المتعلقة بالآلة",
    },
  ];

  const CurriculumSummary = [
    {
      id: 1,
      title: {
        en: "Welcome to the Course & Overview",
        ar: "مرحبًا بك في الدورة ونظرة عامة",
      },
      total_lectures: 8,
      total_minute: 47,
      details: "asdasdasds",
    },
    {
      id: 2,
      title: {
        en: "Introduction to Fundamental Concepts",
        ar: "مقدمة إلى المفاهيم الأساسية",
      },
      total_lectures: 10,
      total_minute: 60,
      details: "asdasdasds",
    },
    {
      id: 3,
      title: {
        en: "Deep Dive into Advanced Topics",
        ar: "التعمق في المواضيع المتقدمة",
      },
      total_lectures: 12,
      total_minute: 75,
      details: "asdasdasds",
    },
    {
      id: 4,
      title: {
        en: "Hands-on Projects & Case Studies",
        ar: "مشاريع تطبيقية ودراسات حالة",
      },
      total_lectures: 6,
      total_minute: 50,
      details: "asdasdasds",
    },
    {
      id: 5,
      title: {
        en: "Final Review & Course Completion",
        ar: "مراجعة نهائية وإكمال الدورة",
      },
      total_lectures: 5,
      total_minute: 30,
      details: "asdasdasds",
    },
  ];

  const ratingData = [
    {
      goldStars: 5,
      percent: 98,
    },
    {
      goldStars: 4,
      percent: 78,
    },
    {
      goldStars: 3,
      percent: 55,
    },
    {
      goldStars: 2,
      percent: 60,
    },
    {
      goldStars: 1,
      percent: 10,
    },
  ];

  // دالة لاختيار عدد النجوم عند الضغط على النجمة
  const handleStarClick = (stars: number) => {
    setRating(stars);
  };

  const handleSubmit = () => {};

  const renderStars = (): JSX.Element[] => {
    const stars: JSX.Element[] = []; // تحديد النوع هنا
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`cursor-pointer size-6 ${
            i <= rating ? "text-[#ffb013]" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const mainTitle = {
    en: "MySQL Database : Beginner SQL Database Design",
    ar: "قاعدة بيانات MySQL: تصميم قاعدة بيانات للمبتدئين",
  };

  const links = [
    {
      title_en: "Home",
      title_ar: "الرئيسية",
      href: "/",
    },
    {
      title_en: "Courses",
      title_ar: "الدورات",
      href: "/courses",
    },
    {
      title_en: "MySQL Database : Beginner SQL Database Design",
      title_ar: "قاعدة بيانات MySQL: تصميم قاعدة بيانات للمبتدئين",
      href: "/",
    },
  ];

  return (
    <>
      <HeroBanner
        mainTitle={mainTitle}
        titleSize="text-3xl"
        links={links}
        imagesrc={"/website/courses-bg-banner.jpg"}
      />
      <div dir={directionMap[locale]} className="w-full h-fit py-6 relative">
        <div className="max-xl:flex-col-reverse flex items-start justify-between gap-20 w-[95%]  mx-auto -mt-20 relative max-xl:w-full max-xl:gap-6 max-xl:p-0 h-fit  bg-transparent z-[9999]">
          <div className="flex-1/2 max-lg:w-full max-lg:p-4 max-md:p-2 bg-white  xl:rounded-md h-fit p-12 xl:border border-gray-300 shadow-lg flex flex-col gap-6">
            <h1 className="text-5xl leading-16 max-md:text-2xl max-lg:text-3xl max-xl:text-4xl max-xl:leading-normal raleway-bold">
              {CoursePage.course_title}
            </h1>
            <div className="flex items-center gap-2">
              <Stars goldStars={4} grayStars={1} size={14} />
              <p>(254 reviews)</p>
            </div>
            <div
              dir="ltr"
              id="second-section"
              className="flex items-center max-md:items-start justify-between max-md:flex-wrap max-lg:gap-3 w-full py-10 border-t-gray-200 border-b-gray-200 border-t border-b"
            >
              <div
                id="insractor"
                className="flex-1 max-md:justify-start max-md:items-start max-md:flex-auto max-md:mb-4 max-md:w-full flex items-center gap-3 lg:border-r border-gray-200"
              >
                <Img
                  className="w-14 h-14 border-2 border-white rounded-full"
                  src="/assets/course-meta.png"
                />
                <div className="flex flex-col gap-1 ">
                  <p className="text-light_text text-[15px]">
                    {CoursePage.created_by}
                  </p>
                  <h3 className="font-bold ">David Allberto</h3>
                </div>
              </div>
              <div
                id="Total-enrolled"
                className="flex-1 max-md:justify-start max-md:items-start max-lg:flex-auto flex items-center justify-center gap-3 lg:border-r border-gray-200"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-light_text text-[15px]">
                    {CoursePage.total_enrolled}
                  </p>
                  <h3 className="font-bold ">5,420</h3>
                </div>
              </div>
              <div
                id="Last-update"
                className="flex-1 max-md:justify-start max-md:items-start max-md:flex-auto flex items-center justify-center gap-3 lg:border-r border-gray-200"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-light_text text-[15px]">
                    {CoursePage.last_update}
                  </p>
                  <h3 dir={directionMap[locale]} className="font-bold ">
                    {CoursePage.date}
                  </h3>
                </div>
              </div>
              <div
                id="course-category"
                className="flex-1 max-md:justify-start max-md:items-start max-md:flex-auto flex items-center justify-center gap-3"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-light_text text-[15px]">
                    {CoursePage.category}
                  </p>
                  <h3 className="font-bold ">{CoursePage.category_value}</h3>
                </div>
              </div>
            </div>
            <div id="section-three" className="">
              <h1 className="text-4xl font-raleway font-semibold">
                {CoursePage.description_title}
              </h1>
              <p className="my-4 text-light_text">
                {CoursePage.description_content}
              </p>
            </div>
            <div id="section-four">
              <div className="w-full bg-[#f5f8ff] p-4 rounded-md">
                <h1 className="text-3xl font-raleway font-medium mt-4 mb-6">
                  {CoursePage.what_you_will_learn}
                </h1>
                <div className="w-full grid grid-cols-2 max-md:grid-cols-1 max-md:gap-4 gap-8">
                  {learnedPoints.map((point, index) => (
                    <div className="w-full flex items-center gap-2" key={index}>
                      <FaCheck className="size-4 text-primary" />
                      <p className="leading-10 text-[17px]  font-raleway font-medium">
                        {point[locale]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div id="section-five" className="w-full">
              <h1 className="text-3xl font-raleway font-semibold mt-4 mb-6">
                {CoursePage.requirements}
              </h1>
              <ul className="list-disc ml-6  flex flex-col gap-3">
                {requirements.map((line, index) => (
                  <li key={index}>{line[locale]}</li>
                ))}
              </ul>
            </div>
            <div id="section-six">
              <h1 className="my-6 font-raleway font-semibold">
                {CoursePage.curriculum}
              </h1>
              <h3 className="text-light_text">{CoursePage.curriculum_info}</h3>
              <div className="w-full rounded-md shadow-md p-4 max-md:p-2 border border-gray-200 mt-4">
                {CurriculumSummary.map((line, index) => (
                  <div key={index} className="w-full">
                    {/* العنصر الرئيسي */}
                    <div
                      className="w-full flex items-center max-md:flex-col max-md:items-start max-md:gap-3 justify-between px-2 py-4 border-gray-200 not-last:border-b cursor-pointer"
                      onClick={() => toggleSection(index)}
                    >
                      <div className="flex items-center gap-2">
                        {openIndex === index ? (
                          <FaMinus className="size-3 text-light_text transition-transform duration-300 rotate-180" />
                        ) : (
                          <FaPlus className="size-3 text-light_text transition-transform duration-300" />
                        )}
                        <p className="select-none">{line.title[locale]}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-[15px] font-raleway font-medium">{`${line.total_lectures} ${CoursePage.lectures}`}</h4>
                        <span className="flex items-center gap-1">
                          <MdCircle className="size-2 text-gray-200" />
                          {line.total_minute}{" "}
                          <p className="text-light_text text-[14px]">
                            {CoursePage.min}
                          </p>
                        </span>
                      </div>
                    </div>

                    {/* المحتوى القابل للفتح والإغلاق مع framer-motion */}
                    <AnimatePresence>
                      {openIndex == index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "fit-content" }} // استخدام height بدلاً من height
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="p- rounded-md  overflow-hidden flex flex-col gap-2"
                        >
                          {Array.from({ length: 3 }).map((_, index) => (
                            <div
                              className="flex items-center justify-between w-full p-2 max-lg:items-start  max-md:flex-col max-md:gap-2"
                              key={index}
                            >
                              <div className="flex items-center gap-2 ">
                                <LuYoutube className="size-4 text-[#c1c7d2]" />
                                <p className="text-[#141517] hover:text-sky-400 duration-200 cursor-pointer text-[15px]">
                                  {CoursePage.data_tool}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#c1c7d2] font-light font-raleway">
                                  6 : 30{" "}
                                </span>
                                <FaLock className="size-4 text-[#c1c7d2]" />
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
            <div id="section-seven">
              <h3 className="text-xl font-bold">
                {" "}
                {CoursePage.student_feedback}
              </h3>
              <div className="mt-4 flex items-start gap-8 w-full max-lg:flex-col max-lg:items-center">
                <div className="rating flex-1 max-lg:flex-auto border border-gray-200 rounded-sm flex items-center justify-center max-lg:w-full max-lg:h-fit max-lg:py-7  h-[200px]">
                  <div className="flex flex-col items-center  gap-3 w-full">
                    <h2 className="text-[#ffb013] text-8xl max-lg:text-7xl max-md:text-5xl font-bold ">
                      4.7
                    </h2>
                    <Stars goldStars={5} grayStars={0} size={18} />
                    <p className="text-sec-text px-12 py-2">
                      5785 {CoursePage.rating}
                    </p>
                  </div>
                </div>
                <div className="rating-percent flex-1/2  max-lg:flex-auto max-lg:w-full flex flex-col gap-5">
                  {ratingData.map((line, index) => (
                    <div key={index} className="w-full flex items-center gap-6">
                      <Stars
                        goldStars={line.goldStars}
                        grayStars={5 - line.goldStars}
                        size={15}
                      />
                      <div className="flex items-center w-full max-md:p-1 gap-3">
                        <div className="relative w-[90%]">
                          <span className="w-full h-[5px] bg-gray-200 rounded-md absolute top-0 left-0"></span>
                          <span
                            style={{ width: `${line.percent}%` }}
                            className={`h-[5px]  rounded-md absolute top-0 left-0 bg-[#0d6efd]`}
                          ></span>
                        </div>
                        <p className="whitespace-nowrap">{line.percent} %</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div id="section-eight">
              <h3 className="font-bold text-3xl font-raleway">
                {CoursePage.reviews}
              </h3>
              <div className="mt-12 max-md:mt-5 flex flex-col gap-12 w-full">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start max-md:flex-col  gap-3"
                  >
                    <Img
                      src="/defaults/default-male.png"
                      className="w-14 h-14 rounded-full"
                    />
                    <div className="flex flex-col gap-2">
                      <h4>{CoursePage.review_author}</h4>
                      <div className="flex w-full items-center gap-2">
                        <Stars goldStars={5} grayStars={0} size={14} />
                        <p className="text-[12px] whitespace-nowrap">
                          {CoursePage.review_time}
                        </p>
                      </div>
                      <p className="text-sec-text leading-8">
                        {CoursePage.review_content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <PaginationWithoutNumbers
                currentPage={1}
                totalPages={5}
                onPageChange={() => {}}
              />
              <div
                onClick={() => setShowReviewForm((prev) => !prev)}
                className=" max-lg:mx-auto text-white select-none bg-sky-500 hover:bg-white hover:border-sky-500 hover:scale-110 hover:text-black border border-transparent duration-300 cursor-pointer w-[200px] h-[60px] rounded-md shadow-md flex items-center justify-center"
              >
                {review_form.write_review}
              </div>
              <AnimatePresence>
                {showReviewForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "fit-content" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                      {/* حقل عنوان المراجعة */}
                      <div className="flex flex-col items-start gap-3">
                        <label
                          htmlFor="title"
                          className="block pb-2 border-b border-sky-300 w-fit text-sm font-semibold"
                        >
                          {review_form.title_label}
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="input-style"
                          placeholder={review_form.title_placeholder}
                        />
                      </div>

                      {/* حقل محتوى المراجعة */}
                      <div className="flex flex-col items-start gap-3">
                        <label
                          htmlFor="content"
                          className="block pb-2 border-b border-sky-300 w-fit  text-sm font-semibold"
                        >
                          {review_form.content_label}
                        </label>
                        <textarea
                          id="content"
                          className="input-style h-32"
                          placeholder={review_form.content_placeholder}
                          rows={4}
                        />
                      </div>

                      {/* اختيار النجوم */}
                      <div>
                        <label className="block pb-2 border-b border-sky-300 w-fit text-sm font-semibold">
                          {review_form.rating_label}
                        </label>
                        <div className="flex mt-2 gap-2">{renderStars()}</div>
                      </div>

                      {/* زر الإرسال */}
                      <button
                        type="submit"
                        className="w-full p-2 bg-primary text-white rounded-md hover:bg-blue-500 duration-150"
                      >
                        {review_form.submit_button}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <CourseCardDetailes />
        </div>
      </div>
    </>
  );
}
