import ContactUsSection from "@/app/_components/_website/_Home/ContactUsSection";
import FAQSection from "@/app/_components/_website/FAQSection";
import HeroBanner from "@/app/_components/_website/HeroBanner";
import React from "react";

export default function page() {
  const mainTitle = {
    ar: "تواصل معنا",
    en: "Contact Us",
  };

  const links = [
    {
      href: "/",
      title_en: "Home",
      title_ar: "الرئيسية",
    },
    {
      href: "/",
      title_en: "Contact Us",
      title_ar: "تواصل معنا",
    },
  ];
  return (
    <>
      <div className="w-full min-h-screen">
        <HeroBanner
          mainTitle={mainTitle}
          links={links}
          imagesrc="/website/contact-bg.jpg"
          titleSize={"text-6xl"}
          height="50vh"
        />
        {/* FAQ Section  */}
        <FAQSection />
        {/* Contact Section  */}
        <ContactUsSection />
      </div>
    </>
  );
}
