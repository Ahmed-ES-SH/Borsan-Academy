"use client";
import React from "react";
import { getTranslations } from "@/app/_helpers/helpers";
import { UseVariables } from "@/app/context/VariablesContext";
import { directionMap } from "@/app/constants/_website/data";

export default function CoursesButton() {
  const { locale } = UseVariables();
  const translations = getTranslations(locale); // أو استبدل "en" بالـ locale المناسب

  return (
    <>
      <div
        dir={directionMap[locale]}
        className="w-1/2 max-2xl:w-[65%] max-xl:w-[70%] max-lg:w-fit max-md:w-full max-md:border-none flex items-center justify-center mx-auto rounded-full border max-md:py-1 max-md:px-2 mt-6"
      >
        <div className="flex items-center justify-between max-md:flex-col max-md:gap-4 p-4 w-full">
          <div className="flex max-md:flex-col items-center gap-2 self-center">
            <p className="text-red-400 text-3xl max-md:text-xl">23,000+</p>
            <p className="text-second_text whitespace-nowrap">
              {translations.coursesButton.moreSkillfulCourses}
            </p>
          </div>
          <button className="btn block z-[50] relative overflow-hidden group/btn whitespace-nowrap px-16 py-4 max-md:w-full text-center bg-black text-white rounded-full ">
            <p className="z-[3] relative block">
              {translations.coursesButton.exploreAllCourses}
            </p>
            <span className=" block w-10 h-10 rounded-full top-1/2 left-full max-lg:group-hover/btn:w-[550px] lg:group-hover/btn:w-[350px] group-hover/btn:h-[200px] bg-secondery-green absolute -translate-x-1/2 -translate-y-1/2 group-hover/btn:left-0 group-hover/btn:top-0 duration-700"></span>
          </button>
        </div>
      </div>
    </>
  );
}
