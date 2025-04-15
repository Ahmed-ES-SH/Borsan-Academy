"use client";
import React from "react";
import Img from "../../Img";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";

export default function PartnersSection() {
  const { locale } = UseVariables();
  const { trustedSection } = getTranslations(locale);
  const PartnersImages = [
    "/website/about/partner-01.png",
    "/website/about/partner-02.png",
    "/website/about/partner-03.png",
    "/website/about/partner-04.png",
    "/website/about/partner-05.png",
    "/website/about/partner-06.png",
    "/website/about/partner-07.png",
    "/website/about/partner-08.png",
    "/website/about/partner-09.png",
    "/website/about/partner-10.png",
  ];

  return (
    <section className="w-full  py-16">
      <div className="w-[80%] mx-auto max-md:w-full max-md:px-4 max-lg:w-[95%] text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {trustedSection.title}
        </h2>
        <p className="text-gray-600 text-base md:text-lg mb-10 max-w-3xl mx-auto">
          {trustedSection.description}
        </p>
      </div>

      <div className="w-[80%] mx-auto max-md:w-full max-md:p-2 max-lg:w-[95%] grid grid-cols-6 max-xl:grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-2 justify-items-center items-center gap-12">
        {PartnersImages.map((src, index) => (
          <Img
            key={index}
            src={src}
            className="w-20 grayscale hover:grayscale-0 transition duration-300 object-contain"
            alt={`Partner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
