import { Roboto } from "next/font/google";
import ClientLayout from "./_components/_website/ClientLayout";
import Navbar from "./_components/_website/Navbar";
import Footer from "./_components/_website/Footer";
import SideCart from "./_components/_website/SideCart";
import CartProvider from "./context/CartContext";
import { getSharedMetadata, getTranslations } from "./_helpers/helpers";
import { directionMap } from "./constants/_website/data";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistRoboto = Roboto({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700", "900"],
});

export async function generateMetadata({ params }) {
  const locale = params.locale || "en"; // اللغة الافتراضية هي الإنجليزية
  const translations = getTranslations(locale);

  // استخدام البيانات المشتركة
  const sharedMetadata = getSharedMetadata(locale, translations);

  return {
    title: translations.mainMetaData.title,
    description: translations.mainMetaData.title,
    ...sharedMetadata, // إضافة البيانات المشتركة هنا
  };
}

interface Props {
  params: { locale: string }; // أو أي باراميتر حسب مجلدك
  children: React.ReactNode;
}

export default function RootLayout({ params, children }: Props) {
  const locale = params.locale || "en"; // اللغة الافتراضية هي الإنجليزية
  return (
    <ClerkProvider>
      <html dir={directionMap[locale]} lang={locale}>
        <body className={` ${geistRoboto.className}  antialiased`}>
          <ClientLayout>
            <CartProvider>
              <Navbar />
              <div className="w-full mt-16">{children}</div>
              <Footer />
              <SideCart />
            </CartProvider>
          </ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  );
}
