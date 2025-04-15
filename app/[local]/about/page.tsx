import AboutSectionTwo from "@/app/_components/_website/_About/AboutSectionTwo";
import AboutStatusSection from "@/app/_components/_website/_About/AboutStatusSection";
import HeroAboutPage from "@/app/_components/_website/_About/HeroAboutPage";
import PartnersSection from "@/app/_components/_website/_About/PartnersSection";
import HeroBanner from "@/app/_components/_website/HeroBanner";
import React from "react";

export default function AboutPage() {
  const links = [
    {
      title_en: "Home",
      title_ar: "الرئيسية",
      href: "/",
    },
    {
      title_en: "About",
      title_ar: "عن المنصة",
      href: "/about",
    },
  ];

  const mainTitle = {
    ar: "عن المنصة",
    en: "About",
  };
  return (
    <>
      <HeroBanner
        imagesrc="/website/about/about-bg.webp"
        titleSize="text-6xl"
        links={links}
        mainTitle={mainTitle}
      />
      <HeroAboutPage />
      <AboutSectionTwo />
      <AboutStatusSection />
      <PartnersSection />
    </>
  );
}
