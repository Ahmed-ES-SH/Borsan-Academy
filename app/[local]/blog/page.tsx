import ArticlesComponent from "@/app/_components/_blog/ArticlesComponent";
import CategoriesSlider from "@/app/_components/_blog/CategoriesSlider";
import TobThreeArticles from "@/app/_components/_blog/TobThreeArticles";
import { getSharedMetadata, getTranslations } from "@/app/_helpers/helpers";
import React from "react";

export async function generateMetadata({ params }) {
  const locale = params.locale || "en"; // اللغة الافتراضية هي الإنجليزية
  const translations = getTranslations(locale);

  // استخدام البيانات المشتركة
  const sharedMetadata = getSharedMetadata(locale, translations);

  return {
    title: translations.blogMeta.title,
    description: translations.blogMeta.description,
    ...sharedMetadata, // إضافة البيانات المشتركة هنا
  };
}

export default function page() {
  return (
    <>
      <TobThreeArticles />
      <CategoriesSlider />
      <ArticlesComponent />
    </>
  );
}
