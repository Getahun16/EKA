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

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      setMsg("Passwords don't match");
      return;
    }

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
      console.error("Reset error:", error);
      if (error instanceof Error) {
        setMsg(error.message || "Something went wrong");
      } else {
        setMsg("Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleReset}
        className="space-y-4 w-full max-w-md bg-white p-6 shadow rounded"
      >
        <h1 className="text-2xl font-bold text-center">Reset Password</h1>
        {msg && <p className="text-center text-lime-600">{msg}</p>}
        <label className="block">
          New Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>
        <label className="block">
          Confirm Password
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-2 cursor-pointer rounded hover:bg-sky-600"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
