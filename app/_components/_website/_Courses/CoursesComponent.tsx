import React from "react";
import HeroBanner from "../HeroBanner";
import CoursesCategoriesSidebar from "./CoursesCategoriesSidebar";
import Courses from "./Courses";

export default function CoursesComponent() {
  const mainTitle_en = "Courses";
  //   const mainTitle_ar = "الدورات التعليمية ";

  const links = [
    {
      title_en: "Home",
      href: "/",
    },
    {
      title_en: "Courses",
      href: "/",
    },
  ];

  return (
    <div className="w-full bg-gray-100">
      <HeroBanner
        imagesrc="/website/courses-bg-banner.jpg"
        mainTitle={mainTitle_en}
        titleSize="text-6xl"
        links={links}
      />
      <div className="w-full flex items-start min-h-screen relative">
        <CoursesCategoriesSidebar />
        <Courses />
      </div>
    </div>
  );
}
