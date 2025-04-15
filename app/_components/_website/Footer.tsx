"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaPhone } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { footerLinks } from "@/app/constants/_website/data";
import Link from "next/link";
import { socialIcons } from "@/app/constants/_website/navbar";
import LocaleLink from "../localeLink";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";
import Logo from "../Logo";

export default function Footer() {
  const { locale } = UseVariables();
  const translations = getTranslations(locale);
  return (
    <>
      <div
        dir={locale == "ar" ? "rtl" : "ltr"}
        className="w-full min-h-[40vh] relative overflow-hidden "
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="w-full h-full z-[2] absolute top-0 left-0 bg-[url('/assets/footer.jpg')] bg-cover bg-center"
        ></motion.div>
        <div className="flex max-xl:flex-col max-xl:gap-12 items-start gap-2 mt-12 relative w-[90%] max-xl:w-full p-2 mx-auto z-[20] pb-6 border-b border-secondery-green">
          <div className="content-info max-xl:pb-2 max-xl:border-b border-secondery-green flex-1 w-fit">
            <div className=" flex flex-col gap-6 w-fit ">
              <Logo />
              <p className="text-white text-[16px] w-1/2 max-lg:w-full">
                {translations.footer.longText}
              </p>
              <div className="flex items-center gap-4">
                <FaPhone className="text-secondery-green size-6" />
                <p className="text-[15px] text-white">518 564 3200</p>
              </div>
              <div className="flex items-center gap-4">
                <TfiEmail className="text-secondery-green size-6" />
                <p className="text-[15px] text-white">BorsanAcademy@info.com</p>
              </div>
            </div>
          </div>
          <div className="listes w-full flex-1/2 grid grid-cols-5 max-lg:grid-cols-2  max-xl:grid-cols-4 max-2xl:grid-cols-4 gap-8">
            {footerLinks.map((list, index) => (
              <div key={index} className="w-full p-1">
                <h1 className="text-xl text-white">
                  {locale == "ar" ? list.title_ar : list.title_en}
                </h1>
                <div className="mt-2 flex flex-col gap-2 ml-1">
                  {list.links.map((link, index) => (
                    <LocaleLink
                      key={index}
                      href={"#"}
                      className="text-light_text hover:ml-2 hover:text-white duration-200 whitespace-nowrap"
                    >
                      {locale == "ar" ? link.name_ar : link.name_en}
                    </LocaleLink>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-4  max-md:col-span-2 max-xl:col-span-3">
              <h1 className="text-white">
                {translations.footer.titlesubscribe}
              </h1>
              <p className="text-light_text">
                {translations.footer.descsubscribe}
              </p>
              <input
                type="text"
                className="input-style bg-white"
                placeholder={translations.footer.enterEmail}
              />
              <button className="btn-green-lg w-full text-center flex items-center justify-center py-2">
                {translations.footer.subscribeBtn}
              </button>
            </div>
          </div>
        </div>
        <div className="flex max-md:flex-col max-md:gap-6 items-center justify-between w-[90%] max-xl:w-full p-2 mx-auto relative z-[20] my-4">
          <p className="text-white text-[15px]">
            Copyright © B-Academy. All Rights Reserved.
          </p>
          <div className="flex items-center gap-3">
            {socialIcons.map((item, index) => (
              <div
                key={index}
                className="w-10 h-10 max-md:w-8 max-md:h-8 overflow-hidden hover:bg-secondery-green hover:border-transparent duration-300 border rounded-md border-gray-300 flex items-center justify-center"
              >
                <Link className="text-white" href={"#"}>
                  {item.icon}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
