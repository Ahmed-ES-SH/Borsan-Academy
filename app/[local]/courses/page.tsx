import CoursesComponent from "@/app/_components/_website/_Courses/CoursesComponent";
import { getSharedMetadata, getTranslations } from "@/app/_helpers/helpers";
import React from "react";

export async function generateMetadata({ params }) {
  const locale = params.locale || "en"; // اللغة الافتراضية هي الإنجليزية
  const translations = getTranslations(locale);

  const sharedMetadata = getSharedMetadata(locale, translations);

  return {
    title: translations.courses.title,
    description: translations.courses.description,
    ...sharedMetadata,
  };
}

export default function CoursesPage() {
  return (
    <>
      <CoursesComponent />
    </>
  );
}
