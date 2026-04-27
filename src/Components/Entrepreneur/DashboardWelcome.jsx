import React from "react";
import {
  Bell,
  Users,
  CalendarDays,
  Eye,
  PlusCircle,
} from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Pending Requests",
    value: 1,
    icon: Bell,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Total Connections",
    value: 1,
    icon: Users,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    id: 3,
    title: "Upcoming Meetings",
    value: 2,
    icon: CalendarDays,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    id: 4,
    title: "Profile Views",
    value: 24,
    icon: Eye,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
];

export default function DashboardWelcome() {
  return (
    <section className="w-full rounded-xl bg-slate-50 p-4 sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Welcome, Sarah Johnson
          </h1>
          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Here's what's happening with your startup today
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <PlusCircle size={16} />
          Find Investors
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
            >
              <div
                className={`grid h-10 w-10 place-items-center rounded-full ${item.iconBg} ${item.iconColor}`}
              >
                <Icon size={18} />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-500">{item.title}</p>
                <p className="mt-1 text-2xl font-bold leading-none text-slate-900">
                  {item.value}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}