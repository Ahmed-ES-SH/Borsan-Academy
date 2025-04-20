import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    // قراءة البيانات من الجسم (body) باستخدام JSON
    const { productName, amount, currency, quantity, locale } =
      await request.json();

    // التحقق من وجود جميع البيانات المطلوبة
    if (!productName || !amount || !currency || !quantity || !locale) {
      return NextResponse.json(
        { error: "بيانات الدفع غير مكتملة" },
        { status: 400 }
      );
    }

    // إنشاء الجلسة باستخدام البيانات الديناميكية
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: currency, // يمكن أن يكون "usd" أو "eur" أو غيرها
            product_data: {
              name: productName,
            },
            unit_amount: amount * 100, // المبلغ يتم تحويله إلى سنت
          },
          quantity: quantity, // كمية المنتج
        },
      ],
      success_url: `http://localhost:3000/${locale}/success?payment_status=success&product=${encodeURIComponent(
        productName
      )}&amount=${amount}`,
      cancel_url: `http://localhost:3000/${locale}/cancel`,
    });

    // إرجاع session ID في الرد
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json(
      { error: "فشل إنشاء جلسة الدفع" },
      { status: 500 }
    );
  }
}
