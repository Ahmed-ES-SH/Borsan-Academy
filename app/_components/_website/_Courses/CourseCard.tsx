import React from "react";
import Img from "../../Img";
import { FaBook } from "react-icons/fa";
import { FcClock, FcRating } from "react-icons/fc";
import Stars from "./Stars";

interface props {
  course: {
    price: number;
    title: string;
    lessons: number;
    students: number;
    rating: number;
    courseLongbydays: number;
    image: string;
  };
}

export default function CourseCard({ course }: props) {
  return (
    <>
      <div className="w-full overflow-hidden cursor-pointer group h-[500px] bg-[#fff] relative border border-gray-300 rounded-t-md shadow-md max-md:w-full flex flex-col ">
        <div className="price absolute top-4 right-0 bg-red-400 text-white text-center z-[5] px-4 py-2 rounded-l-xl">
          {course.price}.00 $
        </div>
        <div className="flex-[20%] duration-500 overflow-hidden relative  border-b border-b-gray-300">
          <Img
            src={course.image || ""}
            alt="course-image"
            className="w-full h-full object-cover duration-500 group-hover:scale-110 absolute top-0 left-0 rounded-t-md"
          />
          <div className="absolute left-1/2 -translate-x-1/2 h-full bg-white w-0 group-hover:w-full transition-all duration-700 group-hover:opacity-0 delay-200"></div>
          <div className="absolute left-1/2 -translate-x-1/2 h-full bg-white w-0 group-hover:w-full transition-all duration-700 group-hover:opacity-0 delay-200"></div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              <FaBook className="text-secondery-green" />
              <p className="text-second_text">{course.lessons} lessons</p>
            </div>
            <div className="flex items-center gap-1">
              <FaBook className="text-secondery-green" />
              <p className="text-second_text">{course.students} students</p>
            </div>
          </div>
          <h1 className="text-xl text-sec-text mt-4 h-[80px] overflow-hidden pb-3 border-b border-gray-200 rtl">
            {course.title}
          </h1>
          <div className="flex items-center justify-between mt-4 w-full">
            <div className="flex items-center gap-1">
              <FcRating />
              <p>({course.rating} / 5 rating)</p>
            </div>
            <div className="flex items-center gap-1">
              <FcClock />
              <p>{course.courseLongbydays} day</p>
            </div>
          </div>
          <div className="stars absolute bottom-2 left-1/2 -translate-x-1/2 w-fit mx-auto mt-4">
            <Stars
              size={18}
              goldStars={course.rating}
              grayStars={5 - Math.floor(course.rating)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
