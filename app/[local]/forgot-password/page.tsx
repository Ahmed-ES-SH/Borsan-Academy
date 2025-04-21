"use client";
import { useState } from "react";
import SendCodeForRestPassword from "@/app/_components/_website/_Auth/SendCodeForRestPassword";
import CheckCodeForResetPassword from "@/app/_components/_website/_Auth/CheckCodeForRestPassword";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [shardEmail, setShardEmail] = useState("");

  return (
    <div className="w-full h-screen flex items-center justify-center">
      {step == 1 && (
        <SendCodeForRestPassword
          setStep={setStep}
          setShardEmail={setShardEmail}
        />
      )}
      {step == 2 && <CheckCodeForResetPassword shardEmail={shardEmail} />}
    </div>
  );
}
