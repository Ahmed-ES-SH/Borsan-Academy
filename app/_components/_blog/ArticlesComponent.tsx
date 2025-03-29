"use client";
import { StaticArticles } from "@/app/constants/_website/data";
import React, { useState } from "react";
import ArticleCard from "../_dashboard/_articles/ArticleCard";
import Pagination from "../PaginationComponent";
import { motion } from "framer-motion";
import { HiDocumentSearch } from "react-icons/hi";
import SearchArticles from "./SearchArticles";
export default function ArticlesComponent() {
  const [openSearch, setOpenSearch] = useState(false);

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };
  return (
    <>
      <div className="w-full grid grid-cols-2  max-md:grid-cols-1 gap-x-4 gap-y-8 overflow-hidden p-6 max-md:p-2 ">
        {StaticArticles.map((article, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.3 }}
            key={index}
            className="w-full"
          >
            <ArticleCard Article={article} key={index} />
          </motion.div>
        ))}
      </div>
      <div
        onClick={() => setOpenSearch((prev) => !prev)}
        className="fixed w-20 h-20 border border-transparent hover:bg-white hover:border-secondery-green hover:text-black duration-300 cursor-pointer z-[30] rounded-full bottom-4 right-4 bg-secondery-green flex items-center justify-center text-white"
      >
        <HiDocumentSearch className="size-8" />
      </div>
      <SearchArticles isOpen={openSearch} onClose={handleCloseSearch} />
      <Pagination currentPage={1} totalPages={4} onPageChange={() => {}} />
    </>
  );
}
