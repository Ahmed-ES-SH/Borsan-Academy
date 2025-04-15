"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { UseVariables } from "../context/VariablesContext";

interface LocaleLinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export default function LocaleLink({
  children,
  className,
  href,
}: LocaleLinkProps) {
  const { locale } = UseVariables();
  const formattedHref = `/${locale}/${href}`.replace(/\/+/g, "/");
  return (
    <Link href={formattedHref} className={className}>
      {children}
    </Link>
  );
}
