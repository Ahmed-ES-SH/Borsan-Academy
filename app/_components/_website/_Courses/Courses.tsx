"use client";
import React from "react";
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
import { Cartcontext } from "@/app/context/CartContent";

export default function Courses() {
  const {
    showErrorAlart,
    showSuccessAlart,
    setShowErrorAlart,
    setShowSuccessAlart,
  } = Cartcontext();
  const { locale } = UseVariables(); // للحصول على اللغة الحالية
  const translations = getTranslations(locale); // استرجاع النصوص بناءً على اللغة
  const texts = translations.courses_page; // النصوص الخاصة بقسم الدورات

  return (
    <div
      dir={directionMap[locale]}
      className="h-full py-6 px-3 mx-auto w-[calc(100%-380px)] max-lg:w-full"
    >
      {/* المحتوى النصي الجذاب */}
      <div className="text-center mb-8 relative">
        <span className="w-[50px] left-1/2 -translate-x-1/2 h-[2px] bg-secondery-green absolute"></span>
        <h1 className="text-4xl font-bold text-secondery-green mb-4 animate-fade-in pt-2">
          {texts.discover_knowledge}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{texts.learning_journey}</p>
      </div>

      {/* مربع البحث */}
      <div className="w-[90%] max-lg:w-full rounded-xl mx-auto flex items-center relative overflow-hidden">
        <input type="text" className="input-style bg-white rounded-full" />
        <button className="rounded-r-full border absolute right-0 bg-primary text-center text-white py-4 px-12 max-lg:px-6">
          {texts.search_button}
        </button>
      </div>

      {/* بطاقات الدورات */}
      <div className="grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2 overflow-hidden max-sm:grid-cols-1 gap-4 mt-6">
        {courses.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
      <Pagination currentPage={1} totalPages={4} onPageChange={() => {}} />
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
