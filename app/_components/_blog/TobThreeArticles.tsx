import React from "react";
import Img from "../Img";
import { FaComments } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { VscReactions } from "react-icons/vsc";

export default function TobThreeArticles() {
  return (
    <>
      <div className="w-full p-6 max-md:p-2 max-lg:p-4 flex items-center gap-3 min-h-[60vh] mt-16 max-xl:flex-col ">
        <div className="First-Article  xl:flex-1/2 relative overflow-hidden rounded-md h-[60vh] max-md:h-[42vh] cursor-pointer group  max-xl:w-full">
          <div className="title absolute z-[10] w-full text-white h-[100px] group-hover:h-[200px] duration-300  bottom-0  left-0 bg-black/50 p-2 ">
            <h1 className="text-3xl font-semibold">
              أهمية تطوير الواجهات الأمامية في 2025
            </h1>
          </div>
          <Img
            src="/articles/article-3.jpg"
            className="rounded-md w-full h-full z-[2] absolute top-0 left-0 object-cover group-hover:scale-125 duration-500"
          />
          <div className="flex items-center justify-between z-[10] w-full p-4 absolute -top-40 group-hover:top-3 left-0 duration-300">
            <div className="flex items-center gap-2">
              <Img
                src="/defaults/default-male.png"
                className="w-12 rounded-full"
              />
              <p className="text-white">Mohmed Ali</p>
            </div>
            <div className="flex items-center gap-2">
              <FaComments className="size-8 text-secondery-green" />
              <p className="text-white">344</p>
            </div>
          </div>
          <div className="flex items-center justify-between z-[10] w-full p-4 absolute -bottom-40 group-hover:bottom-3 left-0 duration-300">
            <div className="flex items-center gap-2">
              <BsCalendar2DateFill className="size-8 text-secondery-green" />
              <p className="text-white">12 / 2 / 2025</p>
            </div>
            <div className="flex items-center gap-2">
              <VscReactions className="size-8 text-secondery-green" />
              <p className="text-white">524</p>
            </div>
          </div>
          <div className="w-full h-0 absolute top-0 left-1/2 -translate-x-1/2 group-hover:h-full bg-black/70 duration-300 opacity-50 z-[8] "></div>
        </div>
        <div className=" xl:flex-1 flex flex-col max-xl:flex-row max-md:flex-col gap-6 h-[60vh]  max-xl:w-full">
          <div className="second-article  max-xl:flex-1/3 max-lg:flex-1  w-full h-full rounded-md shadow-md overflow-hidden relative cursor-pointer group">
            <div className="title absolute z-[10] w-full text-white h-[60px] group-hover:h-[120px] duration-300  bottom-0  left-0 bg-black/50 p-2 ">
              <h1 className="text-xl font-semibold">
                أفضل الممارسات في تحسين تجربة المستخدم
              </h1>
            </div>
            <Img
              src="/articles/article-1.jpg"
              className="rounded-md w-full h-full absolute top-0 left-0 object-cover group-hover:scale-125 duration-500"
            />
            <div className="flex items-center justify-between z-[10] w-full p-4 absolute -top-40 group-hover:top-3 left-0 duration-300">
              <div className="flex items-center gap-2">
                <Img
                  src="/defaults/default-male.png"
                  className="w-8 rounded-full"
                />
                <p className="text-white">mostafa Mohmed Ali</p>
              </div>
              <div className="flex items-center gap-2">
                <FaComments className="size-6 text-secondery-green" />
                <p className="text-white">234</p>
              </div>
            </div>
            <div className="flex items-center justify-between z-[10] w-full p-4 absolute -bottom-40 group-hover:bottom-3 left-0 duration-300">
              <div className="flex items-center gap-2">
                <BsCalendar2DateFill className="size-6 text-secondery-green" />
                <p className="text-white">1 / 5 / 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <VscReactions className="size-6 text-secondery-green" />
                <p className="text-white">224</p>
              </div>
            </div>
            <div className="w-full h-0 absolute top-0 left-1/2 -translate-x-1/2 group-hover:h-full bg-black/70 duration-300 opacity-50 "></div>
          </div>
          <div className="thired-article  max-xl:flex-1 max-lg:flex-1  w-full h-full rounded-md shadow-md overflow-hidden relative cursor-pointer group">
            <div className="title absolute z-[10] w-full text-white h-[60px] group-hover:h-[120px] duration-300  bottom-0  left-0 bg-black/50 p-2 ">
              <h1
                style={{ direction: "rtl" }}
                className="text-xl font-semibold"
              >
                لماذا يعتبر React.js الخيار الأول للمطورين؟
              </h1>
            </div>
            <Img
              src="/articles/article-2.jpg"
              className="rounded-md w-full h-full absolute top-0 left-0 object-cover group-hover:scale-125 duration-500"
            />
            <div className="flex items-center justify-between z-[10] w-full p-4 absolute -top-40 group-hover:top-3 left-0 duration-300">
              <div className="flex items-center gap-2">
                <Img
                  src="/defaults/default-male.png"
                  className="w-8 rounded-full"
                />
                <p className="text-white">Ali Mohmed</p>
              </div>
              <div className="flex items-center gap-2">
                <FaComments className="size-6 text-secondery-green" />
                <p className="text-white">421</p>
              </div>
            </div>
            <div className="flex items-center justify-between z-[10] w-full p-4 absolute -bottom-40 group-hover:bottom-3 left-0 duration-300">
              <div className="flex items-center gap-2">
                <BsCalendar2DateFill className="size-6 text-secondery-green" />
                <p className="text-white">2 / 5 / 2025</p>
              </div>
              <div className="flex items-center gap-2">
                <VscReactions className="size-6 text-secondery-green" />
                <p className="text-white">842</p>
              </div>
            </div>
            <div className="w-full h-0 absolute top-0 left-1/2 -translate-x-1/2 group-hover:h-full bg-black/70 duration-300 opacity-50 "></div>
          </div>
        </div>
      </div>
    </>
  );
}
