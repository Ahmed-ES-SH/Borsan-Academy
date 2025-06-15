"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // 👈 نضيف Framer Motion
import CourseCard from "./CourseCard";
import {
  courses,
  directionMap,
  ErrorMessage,
  SuccessMessage,
} from "@/app/constants/_website/data";
import Pagination from "../../PaginationComponent";
import { getTranslations } from "@/app/_helpers/helpers";
import { UseVariables } from "@/app/context/VariablesContext";
import SuccessAlart from "../../_popups/SuccessAlart";
import ErrorAlart from "../../_popups/ErrorAlart";
import { Cartcontext } from "@/app/context/CartContext";

export default function Courses() {
  const {
    showErrorAlart,
    showSuccessAlart,
    setShowErrorAlart,
    setShowSuccessAlart,
  } = Cartcontext();

  const { locale } = UseVariables();
  const translations = getTranslations(locale);
  const texts = translations.courses_page;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = courses.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
      setLoading(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    if (searchQuery.length == 0) {
      setFilteredCourses(courses);
    }
  }, [searchQuery.length]);

  return (
    <div
      dir={directionMap[locale]}
      className="h-full py-6 px-3 mx-auto w-[calc(100%-380px)] max-lg:w-full"
    >
      <div className="text-center mb-8 relative">
        <span className="w-[50px] left-1/2 -translate-x-1/2 h-[2px] bg-secondery-green absolute"></span>
        <h1 className="text-4xl font-bold text-secondery-green mb-4 animate-fade-in pt-2">
          {texts.discover_knowledge}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{texts.learning_journey}</p>
      </div>

      {/* مربع البحث */}
      <div className="w-[90%] max-lg:w-full rounded-xl mx-auto flex items-center relative overflow-hidden">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="input-style bg-white rounded-full"
          placeholder={texts.search_placeholder || "ابحث عن دورة..."}
        />
        <button
          onClick={handleSearch}
          className="rounded-r-full border absolute right-0 bg-primary text-center text-white py-4 px-12 max-lg:px-6"
        >
          {texts.search_button}
        </button>
      </div>

      {/* حالة التحميل */}
      {loading ? (
        <motion.div
          className="flex justify-center items-center h-[90vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin"
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 1,
            }}
          />
        </motion.div>
      ) : (
        <>
          {/* بطاقات الدورات */}
          <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 overflow-hidden max-sm:grid-cols-1 gap-4 mt-6 min-h-screen">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course, index) => (
                <CourseCard course={course} index={index} key={index} />
              ))
            ) : (
              <div className="text-center col-span-full text-gray-500 text-lg">
                {texts.no_results || "لم يتم العثور على نتائج."}
              </div>
            )}
          </div>
        </>
      )}

      <Pagination currentPage={1} totalPages={4} onPageChange={() => {}} />

      {/* التنبيهات */}
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
    </div>
  );
}
