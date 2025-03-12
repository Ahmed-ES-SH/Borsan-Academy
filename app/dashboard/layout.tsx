import React from "react";
import Sidebar from "../_components/_dashboard/Sidebar";
import Topbar from "../_components/_dashboard/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Topbar />
      <div className="flex items-start gap-1 h-[120vh] overflow-hidden">
        <Sidebar />
        <div className="w-full h-full dark:bg-main_dash  mt-20  ">
          {children}
        </div>
      </div>
    </>
  );
}
