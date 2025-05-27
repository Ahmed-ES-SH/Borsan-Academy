"use client";
import { DataProvider } from "@/app/context/DataContext";
import VariablesProvider from "@/app/context/VariablesContext";
import React, { Suspense, useEffect, useState } from "react";
import Loading from "../Loading";

type ClientLayoutProps = {
  children: React.ReactNode; // النوع المناسب لـ children
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // مثلاً 2 ثانية انتظار

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

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
