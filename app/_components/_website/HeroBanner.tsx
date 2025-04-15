"use client";
import React from "react";
import { PiGreaterThan } from "react-icons/pi";
import LocaleLink from "../localeLink";
import { UseVariables } from "@/app/context/VariablesContext";
import { directionMap } from "@/app/constants/_website/data";

interface linkType {
  [key: string]: string;
}

interface props {
  mainTitle: { ar: string; en: string };
  titleSize: string;
  links: linkType[];
  imagesrc: string;
  height?: string;
}

export default function HeroBanner({
  mainTitle,
  titleSize,
  links,
  height = "50vh",
  imagesrc,
}: props) {
  const { locale } = UseVariables();
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${imagesrc})`,
          height: height,
          direction: directionMap[locale] || "ltr",
        }}
        className={`max-lg:min-h-[35vh] z-[5] relative  bg-cover bg-center `}
      >
        <div
          className={`w-2/3 max-lg:p-3 max-md:w-full h-full absolute top-0 right-0 flex items-center justify-center  opacity-95 bg-[#192335] mask-right rtl:right-0 ltr:left-0 ${
            locale == "en" ? "mask-right" : "mask-left"
          }`}
        >
          <div className="flex flex-col items-start gap-10 max-md:gap-5">
            <h1
              className={`${titleSize} text-shadow-sm max-md:text-2xl  font-bold text-white py-2`}
            >
              {mainTitle[locale]}
            </h1>
            <div className="flex items-center  max-md:text-[12px]  gap-3">
              {links.map((link, index) =>
                index !== links.length - 1 ? (
                  <LocaleLink
                    key={index}
                    href={link.href || "/"}
                    className="flex items-center gap-3 text-light_text hover:text-white duration-200"
                  >
                    <p>{locale == "en" ? link?.title_en : link?.title_ar}</p>
                    <PiGreaterThan className="size-4" />
                  </LocaleLink>
                ) : (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-light_text"
                  >
                    <p className="text-white lg:hidden">
                      {locale == "en"
                        ? link?.title_en.length > 40
                          ? link?.title_en?.slice(0, 35) + "..."
                          : link?.title_en
                        : link?.title_ar}
                    </p>
                    <p className="text-white max-lg:hidden">
                      {locale == "en" ? link?.title_en : link?.title_ar}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
