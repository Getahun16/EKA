"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const token =
    typeof params.token === "string"
      ? params.token
      : Array.isArray(params.token)
      ? params.token[0]
      : "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMsg("Passwords don't match");
      return;
    }

    setIsLoading(true);
    setMsg("");

    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");

      setMsg(data.message);
      setTimeout(() => router.push("/admin/login"), 2000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMsg(error.message || "Something went wrong");
      } else {
        setMsg("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <form
        onSubmit={handleReset}
        className="space-y-6 w-full max-w-md bg-white p-8 shadow-lg rounded-lg"
      >
        <h1 className="text-3xl font-extrabold text-center text-gray-900">
          Reset Password
        </h1>
        {msg && (
          <p className="text-center text-lime-600 font-medium text-sm">{msg}</p>
        )}
        <label className="block">
          <span className="text-gray-700 font-semibold">New Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-300 focus:ring-opacity-50 transition"
          />
        </label>
        <label className="block">
          <span className="text-gray-700 font-semibold">Confirm Password</span>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-300 focus:ring-opacity-50 transition"
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 rounded text-white font-medium transition cursor-pointer ${
            isLoading
              ? "bg-sky-300 cursor-not-allowed"
              : "bg-sky-600 hover:bg-sky-700"
          }`}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
