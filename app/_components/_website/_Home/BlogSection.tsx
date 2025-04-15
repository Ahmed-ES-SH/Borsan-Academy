"use client";
import { articles, directionMap } from "@/app/constants/_website/data";
import React from "react";
import Img from "../../Img";
import { FaArrowRight, FaComments, FaUser } from "react-icons/fa";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";

export default function BlogSection() {
  const { locale } = UseVariables();
  const translations = getTranslations(locale);
  const texts = translations.blog_section;
  return (
    <>
      <div
        dir={directionMap[locale]}
        className="w-full flex  items-center flex-col min-h-[80vh] mt-16 mb-52 "
      >
        <div className="head-title text-center">
          <h1 className="text-xl font-bold text-secondery-green">
            {texts.title.toUpperCase()}
          </h1>
          <h2 className="text-[45px] max-md:text-[24px] text-sec-text mt-4 font-mono font-bold">
            {texts.heading}
          </h2>
        </div>
        <div className="w-[90%] mx-auto grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1  gap-x-8 gap-y-32 mt-6">
          {articles.slice(0, 8).map((article, index) => (
            <div
              key={index}
              className="w-full h-[450px]  group relative bg-[#fff] rounded-md shadow-md border border-gray-300"
            >
              <div className="w-full h-full overflow-hidden">
                <Img
                  src={article.image ? article.image : "/defaults/no-image.jpg"}
                  className="absolute  w-full h-full group-hover:scale-110 duration-300 object-cover rounded-md"
                />
              </div>
              <div className="card overflow-hidden  absolute -bottom-24 left-1/2 -translate-x-1/2 w-3/4 bg-white rounded-md shadow-lg h-fit">
                <div className="flex items-center justify-between w-full p-6">
                  <div className="flex items-center gap-2">
                    <FaUser className="size-4 text-secondery-green" />
                    <p className="text-[14px]">{article.author.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaComments className="size-4 text-secondery-green" />
                    <p className="text-[14px]">{article.commentsNumber}</p>
                  </div>
                </div>
                <h1 className="my-3 text-2xl max-2xl:text-xl font-bold px-3">
                  {article.title}
                </h1>
                <div className="pt-5 border-t border-gray-300 w-full px-3 pb-2 cursor-pointer group/arrow">
                  <div className="flex items-center justify-between w-full duration-300 group-hover/arrow:text-secondery-green">
                    <p>{texts.readMore}</p>
                    <FaArrowRight className="text-sec-text size-4 group-hover/arrow:translate-x-2 duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
