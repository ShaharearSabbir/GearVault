"use client";

import { useState } from "react";
import Link from "next/link";
import { createUser } from "@/actions/auth.action";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  // Unified handler for all inputs using the 'name' attribute
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    try {
      const registered = await createUser({
        email: formData.email,
        password: formData.password,
      });

      if (!registered.success) {
        setError(registered.message);
        return;
      }

      setSuccess(registered.message);
    } catch {
      setError("Something went wrong. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-vault-card border border-vault-border rounded-2xl shadow-2xl shadow-vault-primary/5">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-vault-main tracking-tight">
          Create Your Vault
        </h1>
        <p className="text-sm text-vault-muted mt-2">
          Join the elite community of gear enthusiasts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="group">
          <label
            htmlFor="email"
            className="block mb-2 text-xs uppercase tracking-widest font-bold text-vault-main group-focus-within:text-vault-accent transition-colors"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-vault-input border border-vault-border text-vault-main rounded-xl outline-none transition-all focus:ring-2 focus:ring-vault-accent focus:border-transparent placeholder:text-vault-muted/40"
          />
        </div>

        {/* Password Field */}
        <div className="group">
          <label
            htmlFor="password"
            className="block mb-2 text-xs uppercase tracking-widest font-bold text-vault-main group-focus-within:text-vault-accent transition-colors"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-vault-input border border-vault-border text-vault-main rounded-xl outline-none transition-all focus:ring-2 focus:ring-vault-accent focus:border-transparent placeholder:text-vault-muted/40"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-vault-muted hover:text-vault-main"
            >
              {showPassword ? "HIDE" : "SHOW"}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="group">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-xs uppercase tracking-widest font-bold text-vault-main group-focus-within:text-vault-accent transition-colors"
          >
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            required
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-vault-input border border-vault-border text-vault-main rounded-xl outline-none transition-all focus:ring-2 focus:ring-vault-accent focus:border-transparent placeholder:text-vault-muted/40"
          />

          {error && (
            <div className="flex items-center gap-2 mt-3 text-vault-error">
              <span className="w-1.5 h-1.5 bg-vault-error rounded-full animate-pulse" />
              <p className="text-xs font-bold uppercase tracking-tighter">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="relative w-full py-4 mt-2 overflow-hidden font-bold uppercase tracking-widest text-white bg-vault-primary rounded-xl transition-all hover:bg-vault-accent hover:shadow-lg hover:shadow-vault-accent/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <span className={`${isSubmitting ? "opacity-0" : "opacity-100"}`}>
            Establish Access
          </span>

          {isSubmitting && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            </div>
          )}
        </button>

        {success && (
          <div className="flex items-center gap-2 mt-3 text-vault-success">
            <span className="w-1.5 h-1.5 bg-vault-success rounded-full animate-pulse" />
            <p className="text-xs font-bold tracking-tighter">{success}</p>
          </div>
        )}
      </form>

      <footer className="mt-8 pt-6 border-t border-vault-border text-center">
        <p className="text-sm text-vault-muted">
          Already a member?{" "}
          <Link
            href="/login"
            className="font-bold text-vault-main hover:text-vault-accent transition-colors underline underline-offset-4 decoration-vault-border hover:decoration-vault-accent"
          >
            Sign In
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default RegisterForm;
