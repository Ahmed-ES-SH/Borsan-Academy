import CartWrapper from "@/app/_components/_website/_cart/CartWrapper";
import { getSharedMetadata, getTranslations } from "@/app/_helpers/helpers";
import React from "react";

export async function generateMetadata({ params }) {
  const locale = params.locale || "en"; // اللغة الافتراضية هي الإنجليزية
  const translations = getTranslations(locale);

  const sharedMetadata = getSharedMetadata(locale, translations);

  return {
    title: translations.cartMeta.title,
    description: translations.cartMeta.description,
    ...sharedMetadata,
  };
}

export default function CartPage() {
  return <CartWrapper />;
}
