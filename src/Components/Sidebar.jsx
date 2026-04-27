// SidebarMenu.jsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: HomeIcon, href: "/Dashboard" },
  { id: "startup", label: "My Startup", icon: StartupIcon, href: "/Profile" },
  { id: "investors", label: "Find Investors", icon: DollarIcon, href: "/Investors" },
  { id: "messages", label: "Messages", icon: MessageIcon, href: "/messages" },
  { id: "notifications", label: "Notifications", icon: BellIcon, href: "/Notification" },
  { id: "documents", label: "Documents", icon: DocIcon, href: "/Document" },
];

const settingsItems = [
  { id: "settings", label: "Settings", icon: GearIcon, href: "/settings" },
  { id: "support", label: "Help & Support", icon: HelpIcon, href: "/support" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Keeps selected state in sync with URL
  const [active, setActive] = useState(() => {
    const found =
      [...menuItems, ...settingsItems].find((item) => item.href === location.pathname)?.id ||
      "dashboard";
    return found;
  });

  const [open, setOpen] = useState(false);

  const handleNavigate = (item) => {
    setActive(item.id);
    setOpen(false);
    if (item.href) navigate(item.href);
  };

  return (
    <div className="hidden md:flex py-[2vw] w-fit px-4 z-10">
      <aside>
        <div>
          <nav>
            {menuItems.map((item) => (
              <SidebarButton
                key={item.id}
                label={item.label}
                Icon={item.icon}
                active={active === item.id}
                onClick={() => handleNavigate(item)}
              />
            ))}
          </nav>

          <div className="mt-7 px-2 text-xs font-bold tracking-widest text-slate-500">
            SETTINGS
          </div>

          <nav className="mt-2">
            {settingsItems.map((item) => (
              <SidebarButton
                key={item.id}
                label={item.label}
                Icon={item.icon}
                active={active === item.id}
                onClick={() => handleNavigate(item)}
              />
            ))}
          </nav>
        </div>

        <div className="mt-4 border-t">
          <div className="rounded-xl bg-white/60 p-4">
            <p className="text-slate-600">Need assistance?</p>
            <p className="mt-1 font-regular text-slate-900">Contact Support</p>
            <a
              href="mailto:support@businessnexus.com"
              className="mt-2 block text-blue-600 hover:underline"
            >
              support@businessnexus.com
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function SidebarButton({ label, Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-[80%] items-center gap-3 rounded-xl px-2 py-3 text-left transition
        ${
          active
            ? "bg-[#e7edf8] text-blue-700"
            : "text-slate-700 hover:bg-slate-200/70"
        }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-[18px] font-regular">{label}</span>
    </button>
  );
}

/* ---------- Simple SVG Icons ---------- */
function IconBase({ children, className = "h-5 w-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      {children}
    </svg>
  );
}
function HomeIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </IconBase>
  );
}
function StartupIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="4" y="3" width="10" height="18" rx="1.5" />
      <path d="M14 7h6v14h-6M7 7h4M7 11h4M7 15h4" />
    </IconBase>
  );
}
function DollarIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M15 9.5c0-1-1.2-1.5-3-1.5s-3 .5-3 1.5 1.2 1.5 3 1.5 3 .5 3 1.5-1.2 1.5-3 1.5-3-.5-3-1.5" />
    </IconBase>
  );
}
function MessageIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M21 12a8.5 8.5 0 0 1-8.5 8.5H7l-4 3 1.2-4.5A8.5 8.5 0 1 1 21 12Z" />
    </IconBase>
  );
}
function BellIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M6 9a6 6 0 1 1 12 0c0 6 2 7 2 7H4s2-1 2-7" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </IconBase>
  );
}
function DocIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5M10 13h6M10 17h6" />
    </IconBase>
  );
}
function GearIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.2a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1Z" />
    </IconBase>
  );
}
function HelpIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-.8.7-1.7 1.2-1.7 2.2" />
      <circle cx="12" cy="16.5" r="0.7" fill="currentColor" stroke="none" />
    </IconBase>
  );
}