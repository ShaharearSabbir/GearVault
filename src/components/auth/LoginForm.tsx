"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth.action";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await loginUser(email as string, password as string);

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-8 shadow-sm border border-slate-200"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="admin@gearvault.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          placeholder="••••••••"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-slate-900 py-2 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
      >
        {loading ? "Authenticating..." : "Sign In"}
      </button>
    </form>
  );
}
