"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MdSignalCellularNodata } from "react-icons/md";
import { motion } from "framer-motion";
import { FaImage } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { FaUser, FaEnvelope, FaPhone, FaCalendar } from "react-icons/fa";
import Pagination from "../../PaginationComponent";
import LoadingSpin from "../../LoadingSpin";
import { instance } from "@/app/_helpers/axios";
import Img from "../../Img";
import { IoSettingsSharp } from "react-icons/io5";
import { UserType } from "@/app/types/_dashboard/GlobalTypes";

interface props {
  setSelectedUsersProp: Dispatch<SetStateAction<number[]>>;
}

export default function UsersForSelect({ setSelectedUsersProp }: props) {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastpage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectCurrentData, setSelectCurrentData] = useState("DefaultData");
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [searchLastPage, setSearchLastPage] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [contentSearch, setContentSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // حالة لتخزين المستخدمين المحددين
  const [allUsersIds, setAllUsersIds] = useState([]); // حالة لتخزين المستخدمين المحددين

  // دالة لإدارة اختيار المستخدم
  const handleSelectUser = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      // إذا كان المستخدم محددًا بالفعل، قم بإزالته
      setSelectedUsers(selectedUsers.filter((id: number) => id !== userId));
    } else {
      // إذا لم يكن محددًا، قم بإضافته
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  useEffect(() => {
    const getdata = async (page: number) => {
      try {
        const response = await instance.get(`/users?page=${page}`);
        if (response.status == 200) {
          const data = response.data.data;
          const pagination = response.data.pagination;
          setUsers(data);
          setCurrentPage(pagination.current_page);
          setLastpage(pagination.last_page);
        }
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getdata(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const getusersids = async () => {
      try {
        const response = await instance.get(`/users-ids`);
        setAllUsersIds(response.data.data);
      } catch (error: unknown) {
        console.log(error);
      }
    };
    getusersids();
  }, []);

  const getFilteredDataByTitle = async (title: string, page: number) => {
    if (title.trim() === "") {
      setSearchResult([]);
      setSelectCurrentData("DefaultData"); // العودة إلى البيانات الأصلية
      return;
    }
    setSearchResult([]);
    setSelectCurrentData("SearchData");
    try {
      setIsSearching(true);
      const response = await instance.post(
        `/search-for-user-by-name?page=${page}`,
        { name: contentSearch }
      );
      if (response.status === 200) {
        const data = response.data.data;
        const pagination = response.data.pagination;
        setSearchResult(data);
        setSearchCurrentPage(pagination.current_page);
        setSearchLastPage(pagination.last_page);
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  // تحديد البيانات الحالية للعرض
  const getCurrentData = () => {
    if (selectCurrentData === "SearchData" && contentSearch.length > 0) {
      return searchResult; // عرض نتائج البحث إذا كانت موجودة
    }
    return users; // عرض البيانات الافتراضية
  };

  // إعادة تعيين نتائج البحث إذا تم مسح حقل البحث
  useEffect(() => {
    if (contentSearch.trim() === "") {
      setSearchResult([]);
      setSelectCurrentData("DefaultData");
    }
  }, [contentSearch]);

  const handleSelectAllUsers = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(allUsersIds);
    }
    setSelectAll(!selectAll);
  };

  const getPaginationData = () => {
    switch (selectCurrentData) {
      case "SearchData":
        return {
          currentPage: searchCurrentPage,
          lastPage: searchLastPage,
          onPageChange: (newPage: number) => {
            setSearchCurrentPage(newPage);
            getFilteredDataByTitle(contentSearch, newPage);
          },
        };
      default:
        return {
          currentPage: currentPage,
          lastPage: lastPage,
          onPageChange: (newPage: number) => setCurrentPage(newPage),
        };
    }
  };

  const currentData = getCurrentData();
  const {
    currentPage: activePage,
    lastPage: activeLastPage,
    onPageChange,
  } = getPaginationData();

  useEffect(() => {
    if (selectedUsers.length > 0) {
      setSelectedUsersProp(selectedUsers);
    }
  }, [selectedUsers]);

  if (loading) return <LoadingSpin />;

  return (
    <>
      <div style={{ direction: "rtl" }} className="w-full  p-6 max-md:p-2 ">
        <h1 className="text-2xl max-md:text-[17px] w-fit mx-auto pb-3 border-b border-main_orange">
          حدد المستخدمين
        </h1>
        <div
          style={{ direction: "rtl" }}
          className="inputsearch  mb-5 mt-2 flex items-center gap-2 relative w-[50%] max-lg:w-3/4 max-md:w-[97%] mx-auto"
        >
          <div className="flex items-center w-full gap-2 max-md:flex-col ">
            <div className="relative bg-white rounded-md shadow-md h-[40px] flex items-center justify-center w-full">
              <LuSearch
                className={`${"right-2"} top-1/2 text-secend_text size-5`}
              />
              <input
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContentSearch(e.target.value)
                }
                name="titlesearch"
                value={contentSearch}
                placeholder={"إبحث عن المستخدم هنا  ..."}
                className="w-[90%] bg-transparent h-full pr-9 px-4 py-2 outline-none placeholder-shown:px-4 placeholder-shown:py-2 placeholder-shown:pr-9 placeholder-shown:text-[18px]"
              />
            </div>
            {
              <button
                onClick={() =>
                  getFilteredDataByTitle(contentSearch, searchCurrentPage)
                }
                className={`info-btn ${
                  contentSearch.length > 0
                    ? "opacity-100 block"
                    : "opacity-0 cursor-auto hidden"
                }`}
              >
                {"بحث"}
              </button>
            }
          </div>
        </div>
        {isSearching ? (
          <motion.div
            className="flex flex-col items-center justify-center gap-4 min-h-[70vh]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.3 }}
            >
              <IoSettingsSharp className="size-34 text-primary" />
            </motion.div>
            <p className="text-lg text-gray-600">{"جاري البحث..."}</p>
          </motion.div>
        ) : users && currentData.length > 0 ? (
          <motion.div
            className="overflow-auto h-[105vh] overflow-y-auto p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-auto">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-right">
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllUsers}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <p className="whitespace-nowrap">تحديد الكل </p>
                    </div>
                  </th>
                  <th className="py-3 px-4  text-right">
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <FaImage className="inline-block mr-2" />
                      الصورة
                    </div>
                  </th>
                  <th className="py-3 px-4  text-right">
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <FaUser className="inline-block mr-2" />
                      الإسم
                    </div>
                  </th>
                  <th className="py-3 px-4  text-right">
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <FaEnvelope className="inline-block mr-2" />
                      البريد الإلكترونى
                    </div>
                  </th>
                  <th className="py-3 px-4  text-right">
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <FaPhone className="inline-block mr-2" />
                      رقم الهاتف
                    </div>
                  </th>

                  <th className="py-3 px-4  text-right">
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <FaCalendar className="inline-block mr-2" />
                      وقت إنشاء الحساب
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {currentData.map((user: UserType) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`border-b border-gray-200 ${
                      selectedUsers.includes(user.id)
                        ? "bg-blue-50"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="form-checkbox h-5 w-5 text-blue-600 rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <Img
                        src={
                          user.image
                            ? user.image
                            : user.gender == "male"
                            ? "/defaults/default-male.png"
                            : "/defaults/default-femele.png"
                        }
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.phone || "غير موجود "}</td>
                    <td className="py-3 px-4">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : users.length == 0 ? (
          <div className="min-h-[90vh] w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <MdSignalCellularNodata className="text-gray-400 size-56" />
              <p>لا يوجد مستخدمين فى قاعدة البيانات حتى الان </p>
            </div>
          </div>
        ) : (
          <div className="min-h-[90vh] w-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <MdSignalCellularNodata className="text-gray-400 size-56" />
              <p>لا يوجد مستخدمين تطابق لعمليات البحث فى الوقت الحالى </p>
            </div>
          </div>
        )}
        <Pagination
          currentPage={activePage}
          totalPages={activeLastPage}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
