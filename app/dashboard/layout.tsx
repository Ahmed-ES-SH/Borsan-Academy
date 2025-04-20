"use client";
import React from "react";
import Sidebar from "../_components/_dashboard/Sidebar";
import Topbar from "../_components/_dashboard/Topbar";
import { UseVariables } from "../context/VariablesContext";
import { getTranslations } from "../_helpers/helpers";
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale } = UseVariables();
  const { forbidden } = getTranslations(locale);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-red-300">
      <div className="flex flex-col gap-6">
        <p>{forbidden}</p>
        <MdDoNotDisturbAlt className="md:size-32 size-20 text-white" />
      </div>
    </div>
  );

  return (
    <>
      <Topbar />
      <div className="flex items-start gap-1 h-fit max-md:overflow-visible overflow-hidden">
        <Sidebar />
        <div className="w-full h-full overflow-y-auto duration-200 mt-20  ">
          {children}
        </div>
      </div>
    </>
  );
}
