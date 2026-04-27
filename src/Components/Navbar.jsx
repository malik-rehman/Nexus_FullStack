// TopNavbar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Dashboard", href: "/Dashboard" },
  { name: "Messages", href: "/Message" },
  { name: "Notifications", href: "/Notification" },
  { name: "Profile", href: "/Profile" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const Navigate=useNavigate();

  return (
    <header className="w-full border-b border-gray-200 bg-white z-10">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-blue-600 text-white">
            {/* Simple grid icon */}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="4" y="4" width="6" height="6" />
              <rect x="14" y="4" width="6" height="6" />
              <rect x="4" y="14" width="6" height="6" />
              <rect x="14" y="14" width="6" height="6" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800 sm:text-base">
            Business Nexus
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-600 transition hover:text-gray-900"
            >
              {link.name}
            </a>
          ))}
          <button  onClick={() => {Navigate("/")}} className="text-sm text-gray-600 transition hover:text-gray-900 cursor-pointer">
            Logout
          </button>
        </nav>

        {/* User card (desktop) */}
        <div className="hidden items-center gap-2 rounded-md border border-gray-200 px-2 py-1 md:flex">
          <img
            src="https://i.pravatar.cc/100?img=47"
            alt="Sarah Johnson"
            className="h-7 w-7 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700">Sarah Johnson</span>
        </div>

        {/* Mobile menu button */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="space-y-1 px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              className="block w-full rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {Navigate("/")}}
            >
              Logout
            </button>

            <div className="mt-2 flex items-center gap-2 rounded-md border border-gray-200 px-2 py-2">
              <img
                src="https://i.pravatar.cc/100?img=47"
                alt="Sarah Johnson"
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-sm text-gray-700">Sarah Johnson</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}