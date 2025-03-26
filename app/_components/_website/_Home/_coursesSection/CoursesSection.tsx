import React from "react";
import CoursesSlider from "./CoursesSlider";
import GridCourses from "./GridCourses";

export default function CoursesSection() {
  const showGrid = false;

  if (showGrid) return <GridCourses />;

  if (!showGrid) return <CoursesSlider />;
}
