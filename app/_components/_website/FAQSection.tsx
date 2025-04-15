"use client";
import { directionMap, faqData } from "@/app/constants/_website/data";
import React, { useState } from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import PaginationWithoutNumbers from "../PaginationWithoutNumbers";
import { getTranslations } from "@/app/_helpers/helpers";
import { UseVariables } from "@/app/context/VariablesContext";

export default function FAQSection() {
  const { locale } = UseVariables(); // الحصول على اللغة الحالية
  const translations = getTranslations(locale); // استرجاع النصوص بناءً على اللغة
  const texts = translations.questions_section; // النصوص الخاصة بالأسئلة
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      dir={directionMap[locale]}
      className="w-[90%] max-lg:w-full max-xl:w-[95%] max-lg:p-3 mx-auto mt-12"
    >
      {/* العنوان الرئيسي */}
      <div className="flex max-lg:flex-col max-lg:items-start max-lg:gap-4 items-center justify-between w-full">
        <div className="flex flex-col items-start gap-6">
          <span className="p-3 font-light rounded-full bg-gray-200 text-center">
            {texts.questions_label}
          </span>
          <h1 className="font-bold text-6xl max-md:text-2xl max-lg:text-4xl">
            {texts.heading}
          </h1>
        </div>
        <p className="text-light_text text-[16px] self-end max-lg:self-start block">
          {texts.description_part_1}
          <br className="max-lg:hidden" />
          {texts.description_part_2}
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
              <p className="text-sec-text"> {item.question[locale]}</p>
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
                  <p className="text-gray-700 mt-2">{item.answer[locale]}</p>
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
