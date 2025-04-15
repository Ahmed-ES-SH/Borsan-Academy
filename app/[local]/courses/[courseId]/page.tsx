import CoursePageComponent from "@/app/_components/_website/_CoursePage/CoursePageComponent";
import { getSharedMetadata, getTranslations } from "@/app/_helpers/helpers";
import React from "react";

export async function generateMetadata({ params }) {
  const { local } = params;
  const translations = getTranslations(local);
  const sharedMetadata = getSharedMetadata(local, translations);
  return {
    title: `Borsan Acdemy | ${translations.CoursePage.course_title}`,
    description: translations.CoursePage.description_content,
    ...sharedMetadata, // إضافة البيانات المشتركة هنا
  };
}

export default function page() {
  return (
    <>
      <CoursePageComponent />
    </>
  );
}
