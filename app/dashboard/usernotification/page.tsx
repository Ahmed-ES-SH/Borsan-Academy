"use client";

import UsersForSelect from "@/app/_components/_dashboard/_notifications/UsersForSelect";
import SuccessAlart from "@/app/_components/_popups/SuccessAlart";
import LoadingSpin from "@/app/_components/LoadingSpin";
import { instance } from "@/app/_helpers/axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function UserNotification() {
  const [messageuser, setmessageuser] = useState<string>("");
  const [mainError, setMainError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const onClose = () => {
    setShowSuccessPopup(false);
  };

  const maxSteps = 2;

  const canProceed =
    (step === 1 && selectedUsers.length > 0) ||
    (step === 2 && messageuser.length > 0);

  const handleNextStep = () => {
    if (!canProceed) return;

    setStep((prev) => (prev < maxSteps ? prev + 1 : prev));
  };

  const handlePrevStep = () => {
    setStep((prev) => (prev > 1 ? prev - 1 : prev));
    setSelectedUsers([]);
  };

  const handleSendNotification = async () => {
    if (!messageuser.trim()) {
      setMainError("يرجى إدخال نص الإشعار");
      return;
    }

    try {
      setMainError("");
      setLoading(true);

      const formData = new FormData();
      formData.append("user_ids", JSON.stringify(selectedUsers));
      formData.append("sender_id", "1");
      formData.append("content", messageuser);
      const response = await instance.post(
        "/send-multiple-notification",
        formData
      );
      if (response.status == 200) {
        setmessageuser("");
        setShowSuccessPopup(true);
        setSelectedUsers([]);
        setLoading(false);
        setStep(1);
      }
    } catch (error: unknown) {
      console.log(error);
      setMainError("حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpin />;

  return (
    <>
      <div className="w-full bg-gray-50 min-h-screen py-6 px-4 max-md:px-2">
        {step === 1 && (
          <UsersForSelect setSelectedUsersProp={setSelectedUsers} />
        )}

        {step === 2 && selectedUsers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white shadow rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-main_orange">
              <h2 className="text-xl max-md:text-sm">
                عدد المستخدمون المحددون :{" "}
                {selectedUsers.length > 0 && selectedUsers.length}
              </h2>
              <button
                onClick={() => {
                  setSelectedUsers([]);
                  setStep(1);
                }}
                className="hover:text-red-500 hover:bg-white hover:border-red-400 border text-sm border-transparent duration-150 text-white bg-red-400 rounded-md shadow-md text-center px-4 py-2 max-md:px-2 max-md:py-1 flex items-center gap-2"
              >
                <FaTimes />
                إلغاء
              </button>
            </div>
            <textarea
              value={messageuser}
              onChange={(e) => setmessageuser(e.target.value)}
              placeholder="أدخل نص الإشعار..."
              className="input-style h-60"
            ></textarea>
            {mainError && (
              <p className="text-red-500 w-fit mx-auto underline underline-red-300 mt-2">
                {mainError}
              </p>
            )}
          </motion.div>
        )}
      </div>
      <div className="w-full z-[9999999999] fixed bottom-0 left-0 bg-gray-200 shadow-md  p-6 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={handlePrevStep}
            className="px-8 py-2 text-center duration-200 text-white shadow-md rounded-md hover:bg-white hover:text-black hover:border-gray-300 border border-transparent bg-red-300"
          >
            السابق
          </button>
        ) : (
          <div />
        )}

        {step < maxSteps ? (
          <button
            onClick={handleNextStep}
            disabled={!canProceed}
            className={`px-8 py-2 text-center duration-200 text-white shadow-md rounded-md 
            border border-transparent ${
              canProceed
                ? "bg-primary hover:bg-white hover:text-black hover:border-primary"
                : "bg-gray-300 cursor-not-allowed opacity-50"
            }`}
          >
            التالي
          </button>
        ) : (
          <button
            onClick={handleSendNotification}
            disabled={selectedUsers.length < 0 || messageuser.length === 0}
            className={`px-8 cursor-pointer py-2 text-center duration-200 text-white shadow-md rounded-md 
            border border-transparent ${
              selectedUsers?.length && messageuser.length > 0
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-300 cursor-not-allowed opacity-50"
            }`}
          >
            إرسال
          </button>
        )}
      </div>
      <SuccessAlart
        showAlart={showSuccessPopup}
        onClose={onClose}
        Message="تم إرسال الإشعار الى المستخدمين المحددين بنجاح ."
      />
    </>
  );
}
