"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  Building2,
  Mail,
  UserCheck,
  ImageIcon,
  Settings2,
  CreditCard,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "News", href: "/admin/blog", icon: FileText },
  { name: "Partners", href: "/admin/partners", icon: Building2 },
  { name: "Contacts", href: "/admin/contacts", icon: Mail },
  { name: "Registrations", href: "/admin/registrations", icon: UserCheck },
  { name: "Slides", href: "/admin/slides", icon: ImageIcon },
  { name: "Donations", href: "/admin/donation-methods", icon: CreditCard },
  { name: "Settings", href: "/admin/settings", icon: Settings2 },
];

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="h-full flex flex-col">
      <div className="flex justify-between items-center px-4 py-3 border-b border-sky-700">
        {!collapsed && <h2 className="text-xl font-bold text-white ">Admin</h2>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white focus:outline-none cursor-pointer"
          aria-label="Toggle sidebar collapse"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="px-2 py-3 space-y-2 flex-1 overflow-y-auto">
        {links.map(({ name, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
                active
                  ? "bg-sky-700 text-white font-semibold"
                  : "hover:bg-sky-600"
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 px-2 py-2 rounded-md text-blue-300 mb-6 hover:text-white hover:bg-sky-600 cursor-pointer transition ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
}
