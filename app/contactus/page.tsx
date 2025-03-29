import Link from "next/link";
import React from "react";
import { PiGreaterThan } from "react-icons/pi";
import ContactUsSection from "../_components/_website/_Home/ContactUsSection";
import FAQSection from "../_components/_website/FAQSection";

export default function page() {
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="min-h-[50vh] relative bg-[url('/website/contact-bg.jpg')] bg-cover bg-center ">
          <div className="w-2/3 max-md:w-full h-full absolute top-0 left-0 flex items-center justify-center  opacity-95 bg-[#192335] mask-right ">
            <div className="flex flex-col items-center  xl:items-start gap-5">
              <h1 className="text-7xl max-md:text-2xl font-bold text-white">
                Contact Us
              </h1>
              <div className="flex items-center gap-3 ">
                <Link
                  href={"/"}
                  className="flex items-center  gap-3 text-light_text hover:text-white duration-200"
                >
                  <p className="">Home</p>
                  <PiGreaterThan className="size-4 " />
                </Link>
                <div className="flex items-center  gap-3 text-light_text">
                  <p className="text-white">Contact Us</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* FAQ Section  */}
        <FAQSection />
        {/* Contact Section  */}
        <ContactUsSection />
      </div>
    </>
  );
}
