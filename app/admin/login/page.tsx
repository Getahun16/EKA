"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "", form: "" };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        // Show spinner for a short time before redirect
        setTimeout(() => {
          setIsLoading(false);
          router.push("/admin");
        }, 800);
      } else {
        const data = await res.json();
        setErrors((prev) => ({
          ...prev,
          form: data.message || "Login failed",
        }));
        setIsLoading(false);
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: "An error occurred during login",
      }));
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-md border border-white/20"
        noValidate
      >
        <div className="flex justify-center mb-6">
          {/* Lock Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-sky-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-sky-700 text-center">
          Admin Login
        </h2>

        {errors.form && (
          <p className="text-red-600 text-sm mb-4 text-center">{errors.form}</p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: "" }));
            }}
            className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none focus:outline-sky-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((p) => ({ ...p, password: "" }));
            }}
            className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none focus:outline-sky-500 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            isLoading ? "opacity-80 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Authenticating...
            </>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-right mt-2">
          <a
            href="/forgot-password"
            className="text-sm text-sky-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
