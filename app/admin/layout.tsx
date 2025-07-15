"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const showSidebar =
    !pathname.includes("/admin/login") && !pathname.includes("/admin/register");

  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCollapsed(isSmallScreen); // collapse automatically on small screens
  }, [isSmallScreen]);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {showSidebar && (
        <div
          className={`bg-sky-900 text-white transition-all duration-300 h-full shrink-0
          ${collapsed ? "w-20" : "w-64"}`}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 overflow-auto">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
