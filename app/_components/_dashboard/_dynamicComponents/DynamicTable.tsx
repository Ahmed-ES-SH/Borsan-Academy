/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { instance } from "@/app/_helpers/axios";
import useFetchData from "@/app/_helpers/FetchDataWithAxios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaEdit, FaSort, FaTrash } from "react-icons/fa";
import Img from "../../Img";
import { formatDate } from "@/app/_helpers/dateHelper";
import {
  cellType,
  ItemDataType,
} from "@/app/types/_dashboard/DynamicTableTypes";
import LoadingSpin from "../../LoadingSpin";
import Pagination from "../../PaginationComponent";
import ConfirmDeletePopup from "../../_popups/ConfirmDeletePopup";
import SuccessAlart from "../../_popups/SuccessAlart";
import ErrorAlart from "../../_popups/ErrorAlart";
import SearchInput from "../SearchInput";
import { useRouter } from "next/navigation";

interface props {
  api: string;
  deletedApi: string;
  headers: string[];
  itemDirect: string;
  keys: cellType[];
  searchState?: boolean;
}

export default function DynamicTable({
  api,
  deletedApi,
  headers,
  keys,
  itemDirect,
  searchState = true,
}: props) {
  const { data, currentPage, setData, setCurrentPage, lastPage, loading } =
    useFetchData(api, true);
  ///////////////////////////////////////////
  // Start  Stats Lines  ////////////////
  ///////////////////////////////////////////
  const router = useRouter();
  const [confirmDeletePopup, setConfirmDeletePopup] = useState<boolean>(false);
  const [successPopup, setSuccessPopup] = useState<boolean>(false);
  const [errorPopup, setErrorPopup] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [query, setQuery] = useState<string>("");

  const onEdit = true;
  const onDelete = true;

  ///////////////////////////////////////////
  // End  Stats Lines  ////////////////
  ///////////////////////////////////////////

  ///////////////////////////////////////////
  // Start  Functions Lines  ////////////////
  ///////////////////////////////////////////

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage);
    }
  };

  const handleClose = () => {
    setConfirmDeletePopup(false);
  };

  const handleCloseAlart = () => {
    setSuccessPopup(false);
    setErrorPopup(false);
  };

  const handleRoute = (direct: string) => {
    router.push(direct);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await instance.delete(`${deletedApi}/${id}`);

      if (response.status === 200) {
        // تحديث البيانات بعد الحذف
        setData((prev: any) => prev.filter((item: any) => item.id !== id));

        // إظهار إشعار الحذف الناجح
        setSuccessPopup(true);
        setSuccessMessage("تم حذف العنصر المحدد بنجاح  .");
        setConfirmDeletePopup(false);
      }
    } catch (error) {
      console.error("Error deleting item:", error);

      // عرض رسالة خطأ للمستخدم
      setErrorMessage("حدث خطأ أثناء الحذف. الرجاء المحاولة مرة أخرى.");
    }
  };

  const handleConfirmDelete = (item: ItemDataType) => {
    setConfirmDeletePopup(true);
    setSelectedItem(item);
  };

  ///////////////////////////////////////////
  // End  Functions Lines  ////////////////
  ///////////////////////////////////////////

  console.log(query);

  return (
    <div className="w-full h-fit  hidden-scrollbar">
      {searchState && (
        <SearchInput handleSearch={() => {}} setSearchContent={setQuery} />
      )}
      <motion.div
        className="overflow-x-auto rounded-lg w-[98%] mx-auto h-fit   shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <table className="w-full border-collapse">
          {/* الرؤوس */}
          <thead className="bg-primary_dash text-white">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 whitespace-nowrap py-3 text-left text-sm font-semibold tracking-wider"
                >
                  {header}
                  <FaSort className="inline-block ml-2 cursor-pointer text-second_text" />
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-6 py-3">الإجراءات</th>}
            </tr>
          </thead>

          {/* محتوى الجدول */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={12}>
                  <LoadingSpin />
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item: ItemDataType, index) => (
                <motion.tr
                  key={index}
                  className="border-b transition-all hover:bg-secondery_dash"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {keys.map((cell: cellType, i) => {
                    //////////////////
                    // text Cell
                    //////////////////

                    if (cell.cellType === "text") {
                      return (
                        <td
                          key={i}
                          className="px-6 py-4 text-second_text text-md"
                        >
                          {item[cell.key]}
                        </td>
                      );
                    }

                    //////////////////
                    // Image Cell
                    //////////////////

                    if (cell.cellType === "image") {
                      return (
                        <td key={i} className="px-6 py-4">
                          <Img
                            src={
                              item[cell.key]
                                ? item[cell.key]
                                : item["gender"] == "male"
                                ? "/defaults/default-male.png"
                                : "/defaults/default-femele.png"
                            }
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                      );
                    }

                    //////////////////
                    // Date Cell
                    //////////////////

                    if (cell.cellType === "date") {
                      return (
                        <td
                          key={i}
                          className="px-6 py-4 text-second_text text-md"
                        >
                          {formatDate(item[cell.key])}
                        </td>
                      );
                    }

                    //////////////////
                    // Status Cell
                    //////////////////
                    if (cell.cellType === "status") {
                      return (
                        <td
                          key={i}
                          className={`px-6  py-4   text-white text-center  text-md`}
                        >
                          <span
                            className={`px-2 py-1 w-[150px] block text-center ${
                              item[cell.key] == cell.conditions?.green
                                ? "bg-green-300"
                                : item[cell.key] == cell.conditions?.red
                                ? "bg-red-300"
                                : "bg-yellow-200 text-black"
                            } rounded-lg`}
                          >
                            {item[cell.key]}
                          </span>
                        </td>
                      );
                    }

                    return null; // في حال لم يكن cellType متطابق مع أي نوع، يتم إرجاع null لتجنب الأخطاء
                  })}

                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 flex space-x-4">
                      <div className="w-fit mx-auto flex items-center gap-4">
                        {onEdit && (
                          <button
                            onClick={() =>
                              handleRoute(`/dashboard/${itemDirect}/${item.id}`)
                            }
                            className="text-blue-500 hover:text-blue-700 cursor-pointer"
                          >
                            <FaEdit size={20} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => handleConfirmDelete(item)}
                            className="text-red-500 cursor-pointer hover:text-red-700"
                          >
                            <FaTrash size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="text-center py-6 text-gray-400"
                >
                  لا توجد بيانات متاحة
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </motion.div>
      <Pagination
        currentPage={currentPage}
        totalPages={lastPage}
        onPageChange={handlePageChange}
      />
      <ConfirmDeletePopup
        title={
          selectedItem && selectedItem.name
            ? selectedItem.name
            : selectedItem?.title_en || ""
        }
        id={selectedItem?.id ?? 0}
        showConfirm={confirmDeletePopup}
        onDelete={() => handleDelete(selectedItem.id)}
        onClose={handleClose}
      />
      <SuccessAlart
        Message={successMessage}
        showAlart={successPopup}
        onClose={handleCloseAlart}
      />
      <ErrorAlart
        Message={errorMessage}
        showAlart={errorPopup}
        onClose={handleCloseAlart}
      />
    </div>
  );
}
