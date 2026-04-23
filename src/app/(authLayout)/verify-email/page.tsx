import VerifyContent from "@/components/auth/VerifyContent";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Suspense fallback="Loading...">
        <VerifyContent />
      </Suspense>
    </div>
  );
}
