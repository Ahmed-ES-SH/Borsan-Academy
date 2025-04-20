import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";

// نجهز middleware الخاص بـ Clerk مرة واحدة
const clerk = clerkMiddleware();

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const { pathname } = req.nextUrl;

  const isMissingLocale =
    !pathname.startsWith("/en") && !pathname.startsWith("/ar");

  if (isMissingLocale && !pathname.startsWith("/api")) {
    const url = req.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  // هنا نمرر المعاملين معًا (request و event)
  return clerk(req, event);
}

export const config = {
  matcher: [
    // استبعاد الملفات الثابتة وملفات النظام
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
