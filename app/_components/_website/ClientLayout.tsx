import { DataProvider } from "@/app/context/DataContext";
import VariablesProvider from "@/app/context/VariablesContext";
import React, { Suspense } from "react";
import Loading from "../Loading";

type ClientLayoutProps = {
  children: React.ReactNode; // النوع المناسب لـ children
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <DataProvider>
        <Suspense fallback={<Loading />}>
          <VariablesProvider>{children}</VariablesProvider>
        </Suspense>
      </DataProvider>
    </>
  );
}
