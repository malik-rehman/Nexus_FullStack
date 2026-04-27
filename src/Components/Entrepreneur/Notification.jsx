import React, { useMemo, useState } from "react";
import { MessageCircle, UserPlus, DollarSign } from "lucide-react";

/**
 * Responsive + functional + dynamic notifications page
 * Tailwind CSS only
 */

const initialNotifications = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80&auto=format&fit=crop",
    text: "sent you a message about your startup",
    type: "message", // message | connection | investment
    timeAgo: "5 minutes ago",
    isNew: true,
    isRead: false,
  },
  {
    id: 2,
    user: "Michael Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&q=80&auto=format&fit=crop",
    text: "accepted your connection request",
    type: "connection",
    timeAgo: "2 hours ago",
    isNew: true,
    isRead: false,
  },
  {
    id: 3,
    user: "Jennifer Lee",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop",
    text: "showed interest in investing in your startup",
    type: "investment",
    timeAgo: "1 day ago",
    isNew: false,
    isRead: false,
  },
];

const typeStyles = {
  message: {
    icon: MessageCircle,
    color: "text-blue-500",
  },
  connection: {
    icon: UserPlus,
    color: "text-emerald-500",
  },
  investment: {
    icon: DollarSign,
    color: "text-amber-500",
  },
};

export default function Notification() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all"); // all | unread | read

  const filteredNotifications = useMemo(() => {
    if (filter === "unread") return notifications.filter((n) => !n.isRead);
    if (filter === "read") return notifications.filter((n) => n.isRead);
    return notifications;
  }, [notifications, filter]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications]
  );

  const markOneRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, isRead: true, isNew: false } : n
      )
    );
  };

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, isRead: !n.isRead, isNew: n.isRead ? n.isNew : false }
          : n
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, isNew: false }))
    );
  };

  const clearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.isRead));
  };

  return (
    <section className="w-full min-h-screen bg-slate-100 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-6xl">
        {/* Top header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              Stay updated with your network activity
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={markAllAsRead}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Mark all as read
            </button>
            <button
              onClick={clearRead}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Clear read
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          {["all", "unread", "read"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium capitalize transition ${
                filter === item
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Notification list */}
        <div className="space-y-3">
          {filteredNotifications.map((n) => {
            const Icon = typeStyles[n.type].icon;
            const iconColor = typeStyles[n.type].color;

            return (
              <article
                key={n.id}
                className={`rounded-xl border bg-white shadow-sm transition ${
                  n.isRead
                    ? "border-slate-200"
                    : "border-blue-200 ring-1 ring-blue-100"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
                  <div className="flex min-w-0 items-start gap-3">
                    <img
                      src={n.avatar}
                      alt={n.user}
                      className="h-11 w-11 rounded-full object-cover ring-1 ring-slate-200"
                    />

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-semibold text-slate-900 sm:text-xl">
                          {n.user}
                        </h3>
                        {n.isNew && (
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                            New
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600">{n.text}</p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <Icon size={14} className={iconColor} />
                        <span className="text-sm text-slate-500">{n.timeAgo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {!n.isRead && (
                      <button
                        onClick={() => markOneRead(n.id)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        Mark read
                      </button>
                    )}

                    <button
                      onClick={() => toggleRead(n.id)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      {n.isRead ? "Mark unread" : "Toggle"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-slate-700">No notifications found.</p>
            <p className="mt-1 text-sm text-slate-500">
              Try another filter or wait for new activity.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}