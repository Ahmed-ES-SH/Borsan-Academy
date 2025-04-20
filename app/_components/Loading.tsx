"use client";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <>
      <div className="w-full h-screen fixed top-0 left-0 z-[9999999] bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className=""
          >
            <AiOutlineLoading3Quarters className="size-32 max-md:size-20 text-secondery-green" />
          </motion.div>
        </div>
      </div>
    </>
  );
}
