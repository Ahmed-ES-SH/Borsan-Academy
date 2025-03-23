"use client";
import DynamicElementPage from "@/app/_components/_dashboard/_dynamicComponents/DynamicElementPage";
import useDataContext from "@/app/context/DataContext";
import { useParams } from "next/navigation";
import React from "react";

export default function ArticlePage() {
  const { categories } = useDataContext();
  const params = useParams();
  const articleId = params.articleId as string;

  const inputsArticleData = [
    {
      name: "image",
      type: "file",
      fildType: "full-image",
      label: { ar: "صورة المقال", en: "" },
    },
    {
      name: "title_en",
      type: "text",
      fildType: "short-text",
      label: { ar: "(en) عنوان المقال", en: "" },
    },
    {
      name: "title_ar",
      type: "text",
      fildType: "short-text",
      label: { ar: "(ar) عنوان المقال", en: "" },
    },
    {
      name: "content_en",
      type: "text",
      fildType: "long-text",
      label: { ar: "(en) محتوى المقال", en: "" },
    },
    {
      name: "content_ar",
      type: "text",
      fildType: "long-text",
      label: { ar: "(ar) محتوى المقال", en: "" },
    },
    {
      name: "category_id",
      type: "",
      fildType: "select-type",
      label: { ar: "القسم الخاص بالمقال ", en: "" },
      selectItems: categories.data,
    },
    {
      name: "status",
      type: "",
      fildType: "select-type",
      label: { ar: "حالة المقال ", en: "" },
      selectItems: [
        { value: "draft", name: "مسودة" },
        { value: "published", name: "عام" },
        { value: "archived", name: "أرشيف" },
      ],
    },
  ];

  return (
    <>
      <DynamicElementPage
        id={articleId}
        api="/article"
        updateEndPoint="/update-article"
        inputsData={inputsArticleData}
        direct=""
      />
    </>
  );
}
