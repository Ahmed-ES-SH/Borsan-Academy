import Link from "next/link";
import React from "react";
import { PiGreaterThan } from "react-icons/pi";

interface linkType {
  [key: string]: string;
}

interface props {
  mainTitle: string;
  titleSize: string;
  links: linkType[];
  imagesrc: string;
}

export default function HeroBanner({
  mainTitle,
  titleSize,
  links,
  imagesrc,
}: props) {
  return (
    <>
      <div
        style={{ backgroundImage: `url(${imagesrc})` }}
        className={`min-h-[50vh] max-lg:min-h-[35vh] z-[5] relative  bg-cover bg-center `}
      >
        <div className="w-2/3 max-lg:p-3 max-md:w-full h-full absolute top-0 left-0 flex items-center justify-center  opacity-95 bg-[#192335] mask-right ">
          <div className="flex flex-col items-start gap-5">
            <h1
              className={`${titleSize} text-shadow-sm max-md:text-2xl  font-bold text-white py-2`}
            >
              {mainTitle}
            </h1>
            <div className="flex items-center  max-md:text-[12px]  gap-3">
              {links.map((link, index) =>
                index !== links.length - 1 ? (
                  <Link
                    key={index}
                    href={link.href || "/"}
                    className="flex items-center gap-3 text-light_text hover:text-white duration-200"
                  >
                    <p>{link?.title_en}</p>
                    <PiGreaterThan className="size-4" />
                  </Link>
                ) : (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-light_text"
                  >
                    <p className="text-white lg:hidden">
                      {link?.title_en.length > 40
                        ? link?.title_en?.slice(0, 35) + "..."
                        : link?.title_en}
                    </p>
                    <p className="text-white max-lg:hidden">{link?.title_en}</p>
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
