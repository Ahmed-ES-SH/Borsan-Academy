import { Metadata } from "next";
import React from "react";
import TobThreeArticles from "../_components/_blog/TobThreeArticles";
import CategoriesSlider from "../_components/_blog/CategoriesSlider";
import ArticlesComponent from "../_components/_blog/ArticlesComponent";

export const metadata: Metadata = {
  title: "Borsan Academy - أكاديمية بورسان  صفحة المقالات",
  description:
    "Explore high-quality courses and insightful articles designed to empower your learning journey at Borsan Academy.",
};

export default function page() {
  return (
    <>
      <TobThreeArticles />
      <CategoriesSlider />
      <ArticlesComponent />
    </>
  );
}
