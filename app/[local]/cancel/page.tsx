"use client";
import React from "react";
import { motion } from "framer-motion";
import { MdErrorOutline } from "react-icons/md";
import LocaleLink from "@/app/_components/localeLink";
import { UseVariables } from "@/app/context/VariablesContext";
import { getTranslations } from "@/app/_helpers/helpers";
import Img from "@/app/_components/Img";

export default function PaymentFailedPage() {
  const { locale } = UseVariables();
  const { errorPage } = getTranslations(locale); // تأكد من وجود errorPage في ملف الترجمة

  return (
    <div className="w-full h-screen bg-gradient-to-br from-red-500 via-rose-600 to-red-700 flex items-center justify-center p-4 max-md:p-1">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center space-y-8"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="text-red-100 text-7xl mx-auto drop-shadow-lg"
        >
          <MdErrorOutline />
        </motion.div>

        <div className="w-40 h-40 mx-auto rounded-full bg-white flex items-center justify-center">
          <Img src="/website/logo.png" className="w-40" />
        </div>

        <h1 className="text-4xl font-bold text-white font-raleway drop-shadow-sm">
          {errorPage.title}
        </h1>

        <p className="text-lg text-white/80 font-medium leading-relaxed">
          {errorPage.description}
        </p>

        <motion.div whileTap={{ scale: 0.95 }}>
          <LocaleLink
            href="/"
            className="inline-block px-6 py-3 bg-white text-red-600 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-all"
          >
            {errorPage.backToHome}
          </LocaleLink>
        </motion.div>
      </motion.div>
    </div>
  );
}
