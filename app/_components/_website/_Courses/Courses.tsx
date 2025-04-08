"use client";
import React from "react";
import CourseCard from "./CourseCard";
import { courses } from "@/app/constants/_website/data";
import Pagination from "../../PaginationComponent";

export default function Courses() {
  return (
    <div className="h-full py-6 px-3 mx-auto w-[calc(100%-380px)] max-lg:w-full">
      {/* المحتوى النصي الجذاب */}
      <div className="text-center mb-8 relative">
        <span className="w-[50px] left-1/2 -translate-x-1/2 h-[2px] bg-secondery-green absolute"></span>
        <h1 className="text-4xl font-bold text-secondery-green mb-4 animate-fade-in pt-2">
          Discover the world of knowledge
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Embark on an endless learning journey with our premium courses
          designed just for you .
        </p>
      </div>

      {/* مربع البحث */}
      <div className="w-[90%] max-lg:w-full rounded-xl mx-auto flex items-center relative overflow-hidden">
        <input type="text" className="input-style bg-white rounded-full" />
        <button className="rounded-r-full border absolute right-0 bg-primary text-center text-white py-4 px-12 max-lg:px-6">
          Search
        </button>
      </div>

      {/* بطاقات الدورات */}
      <div className=" grid grid-cols-4 max-2xl:grid-cols-3 max-xl:grid-cols-2  overflow-hidden max-sm:grid-cols-1 gap-4 mt-6">
        {courses.map((course, index) => (
          <CourseCard course={course} key={index} />
        ))}
      </div>
      <Pagination currentPage={1} totalPages={4} onPageChange={() => {}} />
    </div>
  );
}
