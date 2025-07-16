"use client";

import { useEffect, useState } from "react";

export default function AdminSettingsPage() {
  const [currentEmail, setCurrentEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch current email on mount
  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await fetch("/api/admin/me", { credentials: "include" });
        const data = await res.json();
        if (res.ok) {
          setCurrentEmail(data.email);
        } else {
          setMsg(data.error || "Failed to fetch email");
        }
      } catch {
        setMsg("Error fetching email");
      }
    };
    fetchEmail();
  }, []);

  // ✅ Handle email update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: newEmail, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setCurrentEmail(newEmail);
        setNewEmail("");
        setPassword("");
        setMsg(data.message || "Email updated");
      } else {
        setMsg(data.error || "Failed to update");
      }
    } catch {
      setMsg("Error updating email");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Admin Settings</h1>

      <div className="flex items-center mb-6 space-x-3">
        <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
          {/* User Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-sky-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 17.804A4 4 0 0112 14a4 4 0 016.879 3.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-600">Logged in as</p>
          <p className="text-base font-medium text-gray-800">
            {currentEmail || "Loading..."}
          </p>
        </div>
      </div>

      {/* Email change form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {msg && <p className="text-sm text-center text-blue-600">{msg}</p>}

        <label className="block">
          New Email
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <label className="block">
          Confirm Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        {/* Hello world how are you  */}
        <label className="block">
          Confirm Password
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-sky-600 hover:bg-sky-700 text-white cursor-pointer py-2 rounded"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Email"}
        </button>
      </form>
    </div>
  );
}
