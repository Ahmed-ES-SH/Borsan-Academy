import React from "react";
import HeroSection from "../_components/_website/_Home/HeroSection";
import AboutSection from "../_components/_website/_Home/AboutSection";
import CoursesSection from "../_components/_website/_Home/_coursesSection/CoursesSection";
import CertificateBanner from "../_components/_website/_Home/CertificateBanner";
import TestimonialsSection from "../_components/_website/_Home/TestimonialsSection";
import BlogSection from "../_components/_website/_Home/BlogSection";
import ContactUsSection from "../_components/_website/_Home/ContactUsSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <CertificateBanner />
      <TestimonialsSection />
      <BlogSection />
      <ContactUsSection />
    </>
  );
}
