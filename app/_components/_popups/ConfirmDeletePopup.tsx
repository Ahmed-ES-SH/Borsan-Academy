"use client";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { GiTireIronCross } from "react-icons/gi";
import { MdErrorOutline } from "react-icons/md";

interface props {
  title: string;
  id: number;
  showConfirm: boolean;
  onDelete: (id: number) => void;
  onClose: () => void;
}

export default function ConfirmDeletePopup({
  title,
  id,
  showConfirm,
  onDelete,
  onClose,
}: props) {
  return (
    <>
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
            className="w-full h-screen z-[999999] flex items-center justify-center bg-black/60 fixed top-0 left-0"
          >
            <motion.div
              initial={{ y: -500 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ y: -500 }}
              className="w-1/3 max-xl:w-1/2 max-lg:w-3/4 max-md:w-[95%]  h-fit bg-[#fff] relative pt-4  rounded-md shadow-lg flex items-center flex-col gap-6 "
            >
              <div onClick={onClose} className="close-btn">
                <GiTireIronCross className="size-6" />
              </div>
              <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
                  <MdErrorOutline className="text-red-400 size-10" />
                </div>
              </div>
              <div
                style={{ direction: "rtl" }}
                className="content flex flex-col gap-3 mt-3 items-center"
              >
                <h1 className="text-center">
                  {"أنت على وشك حذف هذا العنصر بشكل نهائى "}
                </h1>
                <p className="text-center">
                  هل أنت متأكد من رغبتك في حذف
                  <span className="text-red-400 px-2">{title}</span> سيتم الحذف
                  بشكل نهائي.
                </p>
              </div>
              <div className="btns w-full py-4 bg-gray-100 rounded-b-md flex items-center justify-center gap-6">
                <button onClick={onClose} className="cancle-btn">
                  <FaTimes />
                  <p>إلغاء</p>
                </button>
                <button onClick={() => onDelete(id)} className="danger-btn">
                  <FaTrash />
                  <p>حذف</p>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
