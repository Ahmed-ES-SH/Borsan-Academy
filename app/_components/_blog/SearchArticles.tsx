"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { AnimatePresence, motion } from "framer-motion";
import { UseVariables } from "@/app/context/VariablesContext";
import { formatTitle, getTranslations } from "@/app/_helpers/helpers";
import { realStaticArticles } from "@/app/constants/_website/data";
import LocaleLink from "../localeLink";

interface props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchArticles({ isOpen, onClose }: props) {
  const { locale } = UseVariables();
  const { search_articles } = getTranslations(locale);

  const [query, setQuery] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(realStaticArticles);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const results = realStaticArticles.filter((article) => {
        const title = article[`title_${locale}`]?.toLowerCase() || "";
        const content = article[`content_${locale}`]?.toLowerCase() || "";
        const searchTerm = query.toLowerCase();

        return title.includes(searchTerm) || content.includes(searchTerm);
      });

      setFilteredArticles(results);
      setLoading(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  useEffect(() => {
    if (query.length == 0) {
      setFilteredArticles(realStaticArticles);
    }
  }, [query.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -500, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-screen fixed top-0 left-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-[99999]"
        >
          <div className="w-[90%] max-md:w-[96%] min-h-[80vh] bg-white rounded-md shadow-md relative p-6 overflow-y-auto max-h-[90vh]">
            {/* زر إغلاق */}
            <GiTireIronCross
              onClick={onClose}
              className="absolute top-4 right-4 size-7 text-red-400 hover:rotate-360 duration-700 cursor-pointer"
            />

            {/* العنوان والنص التوضيحي */}
            <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
              {search_articles.search_title}
            </h2>
            <p className="text-center text-gray-600 mb-8">
              {search_articles.search_description}
            </p>

            {/* الحقل الإدخالي وزر البحث */}
            <div className="flex items-center gap-4 max-md:flex-col max-md:gap-4 w-full mt-12 max-md:mt-16 mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={search_articles.search_placeholder}
                  className="input-style block w-full py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 size-6" />
              </div>
              <button
                onClick={handleSearch}
                className="info-btn px-6 py-2 rounded-md bg-primary text-white hover:bg-secondary transition-all duration-300"
              >
                {search_articles.search_button}
              </button>
            </div>

            {/* حالة التحميل أو عرض النتائج */}
            <div className="mt-10">
              {loading ? (
                <motion.div
                  className="flex justify-center items-center h-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      ease: "linear",
                      duration: 1,
                    }}
                  />
                </motion.div>
              ) : (
                <>
                  {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-2 max-md:grid-cols-1  gap-4 mt-4">
                      {filteredArticles.map((article, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border p-4 rounded-md shadow-sm hover:shadow-md hover:scale-105 bg-white duration-300 transition"
                        >
                          <LocaleLink
                            href={`/blog/${formatTitle(article.title_en)}`}
                          >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {locale == "en"
                                ? article.title_en
                                : article.title_ar}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-3">
                              {locale == "en"
                                ? article.content_en
                                : article.content_ar}
                            </p>
                          </LocaleLink>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 mt-6 text-lg">
                      {search_articles.no_results || "لا توجد نتائج مطابقة."}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
