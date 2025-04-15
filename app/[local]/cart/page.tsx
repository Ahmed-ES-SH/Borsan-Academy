/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import { TbPointFilled } from "react-icons/tb";
import { FaCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { motion } from "framer-motion";
import { BsCartX } from "react-icons/bs";
import { GiTireIronCross } from "react-icons/gi";
import { getTranslations } from "@/app/_helpers/helpers";
import { Cartcontext } from "@/app/context/CartContent";
import SuggestedCoursesSlider from "@/app/_components/_website/_Courses/SuggestedCoursesSlider";
import Img from "@/app/_components/Img";
import HeroBanner from "@/app/_components/_website/HeroBanner";
import LocaleLink from "@/app/_components/localeLink";
import { directionMap } from "@/app/constants/_website/data";
import { UseVariables } from "@/app/context/VariablesContext";

export default function CartPage() {
  const { cartitems, removefromcard } = Cartcontext();
  const { locale } = UseVariables();
  const translations = getTranslations(locale);

  const sideCart = translations.sideCart;
  const cartItem = translations.cartItem;
  const [promoCode, setPromoCode] = useState("A234ZFDD");

  const links = [
    {
      title_en: "Home",
      title_ar: "الرئيسية",
      href: "/",
    },
    {
      title_en: "Shopping Cart",
      title_ar: "سلة المشتريات",
      href: "/cart",
    },
  ];

  const mainTitle = {
    ar: "سلة المشتريات",
    en: "Shopping Cart",
  };

  const subtotal = cartitems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  const isNotEmpty = cartitems.length > 0;

  return (
    <>
      <HeroBanner
        mainTitle={mainTitle}
        titleSize="text-5xl"
        links={links}
        imagesrc={"/website/courses-cart-bg.webp"}
        height="35vh"
      />
      {/* Itmes & Checkout Box */}
      <div
        dir={directionMap[locale]}
        className="flex  justify-between min-h-[80vh] items-start  max-lg:flex-col mt-6 gap-3 p-2"
      >
        <div
          className={` ${
            !isNotEmpty && "items-center justify-center"
          }  h-fit flex flex-col  gap-5  flex-1/2 max-lg:w-full min-h-[70vh]  border bg-gray-50 rounded-md border-gray-200 p-2 `}
        >
          {cartitems && isNotEmpty ? (
            cartitems.map((item, index) => (
              <div
                className="w-full h-fit items-center justify-center relative"
                key={index}
              >
                <div className="w-full  bg-white rounded-md shadow-sm p-4 max-md:p-2">
                  <button
                    onClick={() => removefromcard(item)}
                    className=" absolute top-0 right-0 z-[99] bg-red-300 text-white p-2 rounded-b-md border  border-gray-200 shadow-sm hover:bg-red-400 duration-300"
                  >
                    <GiTireIronCross className=" size-4 " />
                  </button>
                  <div className="max-lg:flex-col flex  items-start gap-10">
                    <Img
                      src={item.image}
                      className="w-40 max-lg:w-full shadow-md rounded-md flex-1 object-contain"
                    />
                    <div
                      id="content"
                      className="flex-[75%] flex items-start justify-between w-full"
                    >
                      <div className="">
                        <div className="flex flex-col gap-2">
                          <h1 className="text-xl font-bold">
                            {item.title.length > 40
                              ? item.title.slice(0, 40) + "..."
                              : item.title}
                          </h1>
                          <p>By Online Trainig Plus and 2 Other</p>
                        </div>
                        <h6 className="flex items-center whitespace-nowrap mt-6">
                          {item.courseLongbydays} {cartItem.courseDetails}
                          <span>
                            <TbPointFilled className="text-light_text size-3" />
                          </span>
                          {item.lessons} {cartItem.lectures}
                          <span>
                            <TbPointFilled className="text-light_text size-3" />
                          </span>
                          <span className="text-primary">
                            {cartItem.beginner}
                          </span>
                        </h6>
                      </div>
                      <div className="">
                        <div className="flex flex-col gap-2">
                          <del className="text-gray-300  block text-xl">
                            ${Number(item.price + 20).toFixed(2)}
                          </del>
                          <h2 className="text-3xl font-bold text-secondery-green">
                            ${Number(item?.price).toFixed(2)}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <motion.div
              className="flex flex-col items-center"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BsCartX className="text-6xl text-gray-400 mb-4 " />
              <motion.h2
                className="text-xl font-semibold text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {sideCart.yourCartIsEmpty}
              </motion.h2>
              <motion.p
                className="mt-2 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {sideCart.looksLikeEmpty}
              </motion.p>
              <motion.button
                className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-500 transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                onClick={() => (window.location.href = "/shop")} // إضافة الرابط إلى المتجر
              >
                <LocaleLink href={"/courses"}>
                  {sideCart.startShopping}
                </LocaleLink>
              </motion.button>
            </motion.div>
          )}
        </div>
        <div className="flex-1 max-lg:w-full rounded-md border border-gray-200 shadow-md min-h-[70vh] p-3">
          {/* قسم السعر */}
          <div className="flex flex-col items-center gap-3 w-fit mx-auto">
            <h2 className="font-bold text-3xl text-primary mt-6">
              ${subtotal && Number(subtotal).toFixed(2)}
            </h2>
            <del className="text-gray-300 text-2xl">
              ${subtotal && (Number(subtotal) + 80).toFixed(2)}
            </del>
            <p className="text-sm text-gray-500 font-medium">
              {translations.checkout.includesTaxes}
            </p>
          </div>

          {/* زر الدفع */}
          <button className="w-[90%] pb-4 mx-auto hover:bg-white hover:text-black duration-300 hover:border-primary border border-transparent py-4 text-center bg-primary text-white flex items-center justify-center rounded-md shadow-md mt-5">
            {translations.checkout.button}
          </button>

          {/* فاصل */}
          <span className="block mt-6 h-[2px] w-full bg-gray-200"></span>

          {/* قسم العروض والخصومات */}
          <div className="flex flex-col gap-3 mt-3">
            <h1 className="text-lg font-semibold">
              {translations.checkout.promotions}
            </h1>

            {/* كود الخصم المستخدم */}
            <div className="flex items-center gap-2">
              <FaCheckCircle className="size-4 text-green-400" />
              <p className="text-green-400">
                {translations.checkout.couponApplied} "A234ZFDD"
              </p>
              <RxCross2 className="text-light_text size-4 cursor-pointer" />
            </div>

            {/* إدخال كود خصم جديد */}
            <div id="promoCode" className="relative w-full mt-4">
              <input
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                type="text"
                placeholder={translations.checkout.enterCoupon}
                className="input-style py-4 w-full px-4 rounded-md border border-gray-200 focus:outline-none focus:border-primary"
              />
              <button
                className={`p-2 hover:bg-gray-200 text-center bg-gray-100 rounded-md shadow-sm absolute top-1/2 -translate-y-1/2 ${
                  locale == "ar" ? "left-2" : "right-2"
                }`}
              >
                {translations.checkout.apply}
              </button>
            </div>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-6">
            <p className="text-sm text-gray-500 font-medium">
              {translations.checkout.contactInfo}{" "}
              <a
                href="mailto:support@borsanacademy.com"
                className="text-primary underline"
              >
                support@borsanacademy.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Courses */}
      <SuggestedCoursesSlider />
    </>
  );
}
