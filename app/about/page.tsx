import React from "react";
import HeroBanner from "../_components/_website/HeroBanner";
import HeroAboutPage from "../_components/_website/_About/HeroAboutPage";
import AboutSectionTwo from "../_components/_website/_About/AboutSectionTwo";
import AboutStatusSection from "../_components/_website/_About/AboutStatusSection";
import PartnersSection from "../_components/_website/_About/PartnersSection";

export default function AboutPage() {
  const links = [
    {
      title_en: "Home",
      href: "/",
    },
    {
      title_en: "About",
      href: "/about",
    },
  ];
  return (
    <>
      <HeroBanner
        imagesrc="/website/about/about-bg.jpg"
        titleSize="text-6xl"
        links={links}
        mainTitle="About"
      />
      <HeroAboutPage />
      <AboutSectionTwo />
      <AboutStatusSection />
      <PartnersSection />
    </>
  );
}
