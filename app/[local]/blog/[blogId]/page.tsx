import ArticlePageComponent from "@/app/_components/_blog/ArticlePageComponent";
import HeroBanner from "@/app/_components/_website/HeroBanner";
import { getSharedMetadata, getTranslations } from "@/app/_helpers/helpers";
import React from "react";

export async function generateMetadata({ params }) {
  const locale = params.locale || "en"; // اللغة الافتراضية هي الإنجليزية
  const translations = getTranslations(locale);

  // استخدام البيانات المشتركة
  const sharedMetadata = getSharedMetadata(locale, translations);

  return {
    title: `Bosrsan Academy | ${translations.ArticlePage.how_to_teach_web_design}`,
    description: `Bosrsan Academy | ${translations.ArticlePage.how_to_teach_web_design}`,
    ...sharedMetadata, // إضافة البيانات المشتركة هنا
  };
}

export default function ArticlePage() {
  const links = [
    {
      title_en: "Home",
      title_ar: "الرئيسية",
      href: "/",
    },
    {
      title_en: "blog",
      title_ar: "المدونة",
      href: "/blog",
    },
    {
      title_en: "How to teach web design to the new students",
      title_ar: "كيفية تدريس تصميم الويب للطلاب الجدد",
      href: "/",
    },
  ];

  const mainTitle = {
    ar: "كيفية تدريس تصميم الويب للطلاب الجدد",
    en: "How to teach web design to the new students",
  };

  return (
    <>
      <HeroBanner
        imagesrc="/website/sign-bg.webp"
        mainTitle={mainTitle}
        titleSize="text-3xl"
        links={links}
      />
      <ArticlePageComponent />
    </>
  );
}
