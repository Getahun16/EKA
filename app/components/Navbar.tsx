"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

const serviceTitles = [
  "Community-Based CKD Screening",
  "CME & Capacity-Building",
  "Public Awareness & Education",
  "Nephrology Workshop Facilitation",
  "Advocacy and Policy Engagement",
  "Research and Data Collection",
  "Hemodialysis Access Advocacy",
  "Health Program Evaluation",
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "News", href: "#news" },
  { name: "Services", href: "#services", dropdown: true },
  { name: "Our Kidney", href: "/ourkidney" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setOpen(false);
    setServicesDropdown(false);

    if (href.startsWith("#")) {
      if (pathname === "/") {
        const id = href.substring(1);
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  const handleServiceDropdownClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    title: string
  ) => {
    e.preventDefault();
    setOpen(false);
    setServicesDropdown(false);
    const anchor = `#service-${title.replace(/[^a-zA-Z0-9]+/g, "-")}`;
    if (pathname === "/") {
      window.dispatchEvent(
        new CustomEvent("scroll-to-service", { detail: { title } })
      );
    } else {
      router.push(`/${anchor}`);
    }
  };

  return (
    <nav className="bg-blue-300 border-b border-blue-400 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <div className="relative w-14 h-14">
              <Image
                src="/images/img.png"
                alt="Kidney Association Logo"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <span className="hidden sm:block text-sm lg:text-base xl:text-lg font-semibold text-sky-50 leading-tight tracking-tight capitalize">
              Ethiopian Kidney
              <br />
              Association
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-medium text-sky-50 hover:text-white transition cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setServicesDropdown((prev) => !prev);
                    }}
                    aria-haspopup="true"
                    aria-expanded={servicesDropdown}
                  >
                    {link.name}
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        servicesDropdown ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 mt-6 w-72 bg-blue-300 rounded-xl shadow-2xl z-50 py-2 border border-blue-200 transition-all duration-200 ${
                      servicesDropdown
                        ? "opacity-100 visible scale-100"
                        : "opacity-0 invisible scale-95"
                    }`}
                  >
                    {serviceTitles.map((title) => (
                      <a
                        key={title}
                        href={`#service-${title.replace(
                          /[^a-zA-Z0-9]+/g,
                          "-"
                        )}`}
                        onClick={(e) => handleServiceDropdownClick(e, title)}
                        className="block px-5 py-2 text-sky-700 hover:bg-sky-100 hover:text-sky-900 text-left text-sm rounded transition font-medium cursor-pointer"
                      >
                        {title}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm font-medium text-sky-50 hover:text-white transition"
                >
                  {link.name}
                </a>
              )
            )}

            <a
              href="/donate"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                router.push("/donate");
              }}
              className="bg-sky-500 text-white text-sm font-semibold py-1.5 px-4 rounded-full shadow hover:bg-sky-600 transition"
            >
              Donate
            </a>
            <a
              href="/registration"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                router.push("/registration");
              }}
              className="bg-sky-500 text-white text-sm font-semibold py-1.5 px-4 rounded-full shadow hover:bg-sky-600 transition"
            >
              Become a Member
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden text-sky-50 p-2 focus:outline-none"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-blue-300 border-t border-blue-400 transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-[1000px] p-4" : "max-h-0 p-0"
        }`}
      >
        <div className="flex flex-col space-y-4 text-center">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.href}>
                <button
                  className="w-full flex justify-center items-center gap-2 text-sky-50 font-medium"
                  onClick={() => setServicesDropdown((prev) => !prev)}
                  aria-expanded={servicesDropdown}
                  aria-haspopup="true"
                >
                  {link.name}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-200 ${
                      servicesDropdown ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`mt-2 transition-all ${
                    servicesDropdown ? "block" : "hidden"
                  } border border-blue-400 bg-blue-100 rounded-xl shadow-md p-2`}
                  style={{ maxHeight: "220px", overflowY: "auto" }}
                >
                  {serviceTitles.map((title) => (
                    <a
                      key={title}
                      href={`#service-${title.replace(/[^a-zA-Z0-9]+/g, "-")}`}
                      onClick={(e) => handleServiceDropdownClick(e, title)}
                      className="block px-5 py-2 text-sky-700 hover:bg-sky-100 hover:text-sky-900 text-sm rounded transition font-medium text-left"
                    >
                      {title}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-base font-medium text-sky-50 hover:text-white transition"
              >
                {link.name}
              </a>
            )
          )}

          <div className="flex flex-col items-center gap-2 pt-2">
            <a
              href="/donate"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                router.push("/donate");
              }}
              className="bg-sky-500 text-white text-sm font-semibold py-1.5 px-4 rounded-full shadow hover:bg-sky-600 transition"
            >
              Donate
            </a>

            <a
              href="/registration"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                router.push("/registration");
              }}
              className="bg-sky-500 text-white text-sm font-semibold py-1.5 px-4 rounded-full shadow hover:bg-sky-600 transition"
            >
              Become a Member
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
