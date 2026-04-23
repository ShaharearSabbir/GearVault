"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyUserToken } from "@/actions/auth.action";

const VerifyContent = () => {
  const token = useSearchParams().get("token");
  const router = useRouter();
  const [msg, setMsg] = useState("Verifying...");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!token) return setMsg("Missing token.");

    verifyUserToken(token).then((res) => {
      if (res.success) {
        setMsg("Verified! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setMsg(res.error || "Failed to verify.");
      }
    });
  }, [token, router]);

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl text-center">
      <h1 className="text-xl font-bold mb-4">GearVault</h1>
      <p>{msg}</p>
      {msg.includes("Failed") && (
        <button
          onClick={() => router.push("/register")}
          className="mt-4 text-blue-600 underline"
        >
          Try registering again
        </button>
      )}
    </div>
  );
};

export default VerifyContent;
