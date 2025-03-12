import VariablesProvider from "@/app/context/VariablesContext";
import React from "react";

type ClientLayoutProps = {
  children: React.ReactNode; // النوع المناسب لـ children
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <VariablesProvider>{children}</VariablesProvider>
    </>
  );
}
