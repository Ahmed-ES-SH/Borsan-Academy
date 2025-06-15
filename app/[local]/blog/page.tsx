import MainBlogComponent from "@/app/_components/_blog/MainBlogComponent";
import { getSharedMetadata, getTranslations } from "@/app/_helpers/helpers";
import React from "react";

export async function generateMetadata({ params }) {
  const locale = params.locale || "en";
  const translations = getTranslations(locale);

  const sharedMetadata = getSharedMetadata(locale, translations);

  return {
    title: translations.blogMeta.title,
    description: translations.blogMeta.description,
    ...sharedMetadata,
  };
}

export default function page() {
  return (
    <>
      <MainBlogComponent />
    </>
  );
}
