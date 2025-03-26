import { courses } from "@/app/constants/_website/data";
import React from "react";
import CourseCard from "../../_Courses/CourseCard";
import CoursesButton from "./CoursesButton";

export default function GridCourses() {
  return (
    <>
      <div className="w-[90%] max-xl:w-[95%] max-lg:w-full  mx-auto p-6 max-md:p-2">
        <div className="flex max-md:items-start items-center justify-between max-md:flex-col max-md:gap-6 w-full">
          <div>
            <h1 className="text-secondery-green text-2xl text-left">
              Popular Courses
            </h1>
            <h2 className="text-[40px] max-md:text-3xl text-sec-text font-bold mt-4 block">
              Pick a course to <br /> get started your study
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 mt-6 ">
          {courses.slice(0, 8).map((course, index) => (
            <CourseCard course={course} key={index} />
          ))}
        </div>
        <CoursesButton />
      </div>
    </>
  );
}
