import React from "react";
import HeroBanner from "../HeroBanner";
import CoursesCategoriesSidebar from "./CoursesCategoriesSidebar";
import Courses from "./Courses";

export default function CoursesComponent() {
  const mainTitle = {
    ar: "الكورسات",
    en: "Courses",
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
  ];

  return (
    <div className="w-full bg-gray-100">
      <HeroBanner
        imagesrc="/website/courses-bg-banner.jpg"
        mainTitle={mainTitle}
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
