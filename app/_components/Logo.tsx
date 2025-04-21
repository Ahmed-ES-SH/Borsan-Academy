import React from "react";
import LocaleLink from "./localeLink";
import Img from "./Img";

export default function Logo() {
  return (
    <>
      <div className="logo group flex items-center gap-2 ">
        <LocaleLink
          href="/"
          className="flex items-center justify-center w-12 h-12 max-md:w-10 max-md:h-10 bg-white rounded-full"
        >
          <Img
            className="w-12 h-12 rounded-full max-md:w-10 max-md:h-10"
            alt="logo"
            width={200}
            height={100}
            src="/website/logo.png"
          />
        </LocaleLink>
        <div
          style={{ direction: "ltr" }}
          className="text-logo  flex items-center max-md:hidden"
        >
          <span className="text-secondery-green text-3xl max-md:text-xl font-serif">
            B-
          </span>
          <p className="font-serif group-hover:text-secondery-green duration-700 text-xl max-md:text-lg italic text-second_text">
            Academy
          </p>
        </div>
      </div>
    </>
  );
}
