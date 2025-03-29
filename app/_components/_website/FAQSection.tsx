"use client";
import { faqData } from "@/app/constants/_website/data";
import React, { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PaginationWithoutNumbers from "../PaginationWithoutNumbers";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="w-[90%] max-lg:w-full max-xl:w-[95%] max-lg:p-3 mx-auto mt-12">
      {/* العنوان الرئيسي */}
      <div className="flex max-lg:flex-col max-lg:items-start max-lg:gap-4 items-center justify-between w-full">
        <div className="flex flex-col items-start gap-6">
          <span className="p-3 font-light rounded-full bg-gray-200 text-center">
            Questions
          </span>
          <h1 className="font-bold text-6xl max-md:text-2xl max-lg:text-4xl">
            Looking For Answers?
          </h1>
        </div>
        <p className="text-light_text text-[16px] self-end max-lg:self-start block">
          They are bought and sold online, frequently with cryptocurrency, and
          they <br className="max-lg:hidden" />
          are generally encoded with the same underlying.
        </p>
      </div>

      {/* قائمة الأسئلة */}
      <div className="flex flex-col gap-5 mt-12">
        {faqData.slice(0, 15).map((item, index) => (
          <div key={index} className="border-b border-gray-300 pb-2">
            <button
              className="w-full text-left flex justify-between items-center py-2 text-lg font-medium outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <p className="text-sec-text"> {item.question}</p>
              <span>{openIndex === index ? <FaSortUp /> : <FaSortDown />}</span>
            </button>

            {/* إجابة السؤال مع تأثير الفتح والإغلاق */}
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-700 mt-2">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <PaginationWithoutNumbers
        currentPage={1}
        totalPages={3}
        onPageChange={() => {}}
      />
    </div>
  );
}
