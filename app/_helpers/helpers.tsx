import arTranslations from "../translations/ar.json";
import enTranslations from "../translations/en.json";

export const handlePageChange = (
  newPage: number,
  lastPage: number,
  setCurrentPage: (page: number) => void
) => {
  if (newPage > 0 && newPage <= lastPage) {
    setCurrentPage(newPage);
  }
};

export const formatTitle = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-");

// دالة لإعادة البيانات المشتركة
export const getSharedMetadata = (locale, translations) => ({
  keywords: [
    "Borsan Academy",
    "دورات تعليمية",
    "تعلم البرمجة",
    "مهارات التسويق",
    "دورات تصميم",
    "تعليم أونلاين",
    "تطوير الذات",
  ],
  openGraph: {
    title: translations.title,
    description: translations.description,
    url: `https://www.borsanacademy.com/${locale}/courses`, // رابط الصفحة بناءً على اللغة
    siteName: "Borsan Academy",
    images: [
      {
        url: "https://www.borsanacademy.com/images/og-image.jpg", // استبدل الرابط بصورة مناسبة
        width: 1200,
        height: 630,
        alt:
          locale === "ar"
            ? "شعار Borsan Academy - دورات تعليمية شاملة"
            : "Borsan Academy Logo - Comprehensive Courses",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: translations.title,
    description: translations.description,
    image: "https://www.borsanacademy.com/images/twitter-image.jpg", // استبدل الرابط بصورة مناسبة
  },
});

export const getTranslations = (locale) => {
  switch (locale) {
    case "ar":
      return arTranslations;
    case "en":
    default:
      return enTranslations;
  }
};
