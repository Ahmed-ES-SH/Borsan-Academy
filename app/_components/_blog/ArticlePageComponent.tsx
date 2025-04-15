/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useRef, useState } from "react";
import Img from "../Img";
import { getTranslations } from "@/app/_helpers/helpers";
import { UseVariables } from "@/app/context/VariablesContext";
import { BiHide } from "react-icons/bi";
import { CiCalendar, CiSearch, CiUser } from "react-icons/ci";
import { PiQuotes } from "react-icons/pi";
import { TfiCommentAlt, TfiLayoutLineSolid } from "react-icons/tfi";
import {
  ArticlesCategories,
  directionMap,
  Recentposts,
  tags,
} from "@/app/constants/_website/data";
import PaginationWithoutNumbers from "../PaginationWithoutNumbers";

export default function ArticlePageComponent() {
  const { locale } = UseVariables();
  const { ArticlePage } = getTranslations(locale);
  const formRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const handleShowForm = () => {
    setShowForm((prev) => !prev);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // تأخير بسيط حتى يظهر العنصر أولاً
  };

  return (
    <>
      <div dir={directionMap[locale]} className="w-full bg-gray-50">
        <div className="w-[90%] max-xl:w-full max-xl:p-2 max-xl:flex-col mx-auto  flex items-start justify-between my-4 gap-3">
          <div className="flex-1/2 border border-gray-200 min-h-screen shadow-md">
            {/* Main Article Image */}
            <div className="w-full group overflow-hidden h-[60vh] max-xl:h-[50vh] max-lg:h-[40vh] rounded-t-md relative">
              <Img
                src="/articles/article-1.jpg"
                className="w-full h-full group-hover:scale-125 duration-700 object-cover rounded-t-md"
              />
            </div>
            {/* Article Content */}
            <div className="flex flex-col gap-5 p-8 max-md:p-2 max-lg:p-4 max-xl:p-6">
              <div className="flex items-center gap-12 mt-2">
                <div className="flex items-center gap-3">
                  <CiCalendar className="size-5 text-light_text" />
                  <span>23 Jan 2024</span>
                </div>
                <div className="flex items-center gap-3">
                  <CiUser className="size-5 text-light_text" />
                  <p>{ArticlePage.author}</p>
                </div>
              </div>
              {/* Main Content */}
              <p className="text-gray-500 leading-8">
                When it comes to designing better links and sending better
                emails, Slava Shestopalov has a few tips on how to improve your
                website’s experience while accessibility in mind. There are so
                many websites out there that have not considered the overall
                usability of their visually impaired users. The participants
                will get general ideas of the land management system of
                business. Everyone must work, but for many of us that job isn’t
                just a paycheck, it’s an opportunity to express ourselves and
                make something better. Entrepreneurs and go-getters often feel
                as if they carry the weight of an entire organization on their
                backs, and therefore could always use a little extra motivation.
              </p>
              <p className="text-gray-500 leading-8">
                Cheeky bugger cracking goal starkers lemon squeezy lost the plot
                pardon me no biggie the BBC burke gosh boot so I said wellies,
                zonked a load of old tosh bodge barmy skive off he legged it
                morish spend a penny my good sir wind up hunky-dory. Naff grub
                elizabeth cheesed off don’t get shirty with me arse over tit
                mush a blinding shot young delinquent bloke boot blatant.
              </p>
              {/* quote */}
              <div className="w-full h-fit flex flex-col items-start gap-6 py-16 px-8 rounded-md shadow-sm bg-gray-100">
                <div className="w-full my-4">
                  <PiQuotes className="size-9 text-primary " />
                </div>
                <p className="text-2xl max-lg:text-lg max-md:text-[20px] font-semibold font-raleway">
                  {ArticlePage.quote}
                </p>
                <div className="flex items-center gap-3">
                  <TfiLayoutLineSolid className="size-7 text-primary" />
                  <p className="text-blue-700 text-lg">{ArticlePage.author}</p>
                </div>
              </div>
              <div className="w-full h-[50vh] max-md:h-[30vh] rounded-md relative">
                <Img
                  src="/articles/article-2.jpg"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h1 className="font-bold font-raleway text-3xl">
                Typography is the powerful element you will ever need
              </h1>
              <p className="text-gray-500 leading-8">
                The participants will get general ideas of the land management
                system of business. Everyone must work, but for many of us that
                job isn’t just a paycheck, it’s an opportunity to express
                ourselves and make something better. Entrepreneurs and
                go-getters often feel as if they carry the weight of an entire
                organization on their backs, and therefore could always use a
                little extra motivation.
              </p>
              <p className="text-gray-500 leading-8">
                When it comes to designing better links and sending better
                emails, Slava Shestopalov has a few tips on how to improve your
                website’s experience while accessibility in mind. There are so
                many websites out there that have not considered the overall
                usability of their visually impaired users.
              </p>
              {/* Tages  */}
              <div className="flex items-start gap-3">
                <p className="whitespace-nowrap">{ArticlePage.post_tags}</p>
                <div className="tages flex items-center flex-wrap gap-3">
                  {tags.slice(0, 4).map((tag, index) => (
                    <div
                      key={index}
                      className="p-2 text-center bg-gray-100 rounded-md shadow-sm cursor-pointer hover:bg-sky-500 hover:text-white duration-300 "
                    >
                      {locale == "ar" ? tag.title_ar : tag.title_en}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Comments Part */}
            <div
              id="comments"
              className="p-6 max-md:p-1 w-full pt-4 border-t border-primary bg-gray-100"
            >
              <div className="flex items-center justify-between">
                <h1 className="text-4xl max-md:text-2xl max-lg:text-3xl my-2">
                  {ArticlePage.comments_title}
                </h1>
                <div
                  onClick={handleShowForm}
                  className="w-12 h-12 flex items-center justify-center rounded-md bg-primary text-white hover:bg-white hover:text-black hover:border-primary border border-transparent hover:scale-110 duration-200 cursor-pointer"
                >
                  {showForm ? (
                    <BiHide className="size-6" />
                  ) : (
                    <TfiCommentAlt className="size-6" />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 mt-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    className="w-full border border-gray-200 shadow-sm bg-white p-3  rounded-md"
                    key={index}
                  >
                    <div className="flex items-start gap-2">
                      <Img
                        src="/defaults/default-male.png"
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <h2 className="text-lg font-bold">Eleanor Fant</h2>
                        <span className="text-light_text text-[14px]">
                          July 14, 2024
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-4">
                      So I said lurgy dropped a clanger Jeffrey bugger cuppa
                      gosh David blatant have it, standard A bit of how's your
                      father my lady absolutely.
                    </p>
                  </div>
                ))}
              </div>
              <PaginationWithoutNumbers
                currentPage={1}
                totalPages={4}
                onPageChange={() => {}}
              />
              {/* Add Comment */}
              {showForm && (
                <div ref={formRef} className="w-full h-fit my-4">
                  <textarea
                    className="input-style bg-white h-32 w-full"
                    name="comment"
                    placeholder={ArticlePage.write_comment}
                  />
                  <button className="btn-green-lg block w-fit ml-auto mt-2">
                    {ArticlePage.send_comment}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1  h-fit  max-xl:w-full flex flex-col gap-4">
            <div className="search hidden xl:block relative bg-white">
              <input
                type="text"
                className="w-full p-4 rounded-none input-style"
                placeholder={ArticlePage.search_placeholder}
              />
              <CiSearch
                className={`absolute top-1/2 -translate-y-1/2 size-6 ${
                  locale == "ar" ? "left-2" : "right-2"
                }`}
              />
            </div>
            <div className="Recentposts px-4 py-8 bg-white rounded-sm border border-gray-200">
              <h2 className="font-bold text-xl">{ArticlePage.recent_posts}</h2>
              <div className="mt-4 flex flex-col gap-3 max-xl:gap-6">
                {Recentposts.map((post, index) => (
                  <div key={index} className="w-full flex items-start gap-2">
                    <Img src={post.image} className="w-20 h-20 rounded-md" />
                    <div className="flex flex-col gap-1">
                      <span className="text-light_text text-[14px]">
                        {post.published_date[locale]}
                      </span>
                      <h2 className="text-sec-text font-bold hover:text-sky-500 duration-200 cursor-pointer font-raleway">
                        {post.title[locale]}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="Recentposts px-8 py-8 bg-white rounded-sm border border-gray-200">
              <h2 className="font-bold text-xl">{ArticlePage.category}</h2>
              <div className="mt-4 flex flex-col gap-3">
                <ul className="ml-6 list-disc flex flex-col gap-2">
                  {ArticlesCategories.map((cat, index) => (
                    <li
                      className="text-light_text  gap-1 text-[16px] cursor-pointer hover:text-primary duration-200"
                      key={index}
                    >
                      {locale == "ar" ? cat.title_ar : cat.title_en} (
                      {cat.articlesTotal})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="Recentposts px-4 py-8 bg-white rounded-sm border border-gray-200">
              <h2 className="font-bold text-xl">{ArticlePage.tags}</h2>
              <div className="mt-6 flex items-center flex-wrap gap-4">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="p-2 text-center bg-gray-100 rounded-md shadow-sm cursor-pointer hover:bg-sky-500 hover:text-white duration-300 "
                  >
                    {locale == "ar" ? tag.title_ar : tag.title_en}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
