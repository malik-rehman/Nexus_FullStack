import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const initialRequests = [
  {
    id: 1,
    name: "Michael Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&q=80&auto=format&fit=crop",
    time: "over 2 years ago",
    text: "I'd like to explore potential investment in TechWave AI. Your AI-driven financial analytics platform aligns well with my investment thesis.",
    status: "Pending",
  },
  {
    id: 2,
    name: "Jennifer Lee",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop",
    time: "over 2 years ago",
    text: "Interested in discussing how TechWave AI can incorporate sustainable practices. Lets connect to explore potential collaboration.",
    status: "Accepted",
  },
];

const investors = [
  {
    id: 1,
    name: "Michael Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&q=80&auto=format&fit=crop",
    role: "Investor",
    investments: "12 investments",
    stageTags: ["Seed", "Series A"],
    interests: ["FinTech", "SaaS", "AI/ML"],
    bio: "Early-stage investor with focus on B2B SaaS and fintech. Previously founded and exited two startups.",
    range: "$250K - $1.5M",
  },
  {
    id: 2,
    name: "Jennifer Lee",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop",
    role: "Investor",
    investments: "18 investments",
    stageTags: ["Seed", "Series A", "Series B"],
    interests: ["CleanTech", "AgTech", "Sustainability"],
    bio: "Backs mission-driven teams building practical climate and sustainability products.",
    range: "$300K - $2M",
  },
];

const badgeStyle = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Accepted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Declined: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function CollaborationAndInvestors() {
  const [requests, setRequests] = useState(initialRequests);

  const updateStatus = (id, status) => {
    setRequests((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <section className="w-full bg-slate-50 p-[2vw] sm:p-4 lg:p-6 -z-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Left: Collaboration Requests */}
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Collaboration Requests
              </h2>
              <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
                {
                  requests.filter((r) => r.status.toLowerCase() === "pending")
                    .length
                }{" "}
                pending
              </span>
            </div>

            <div>
              {requests.map((req, index) => (
                <article
                  key={req.id}
                  className={`px-4 py-4 sm:px-5 ${
                    index !== requests.length - 1
                      ? "border-b border-slate-200"
                      : ""
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <img
                        src={req.avatar}
                        alt={req.name}
                        className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div className="min-w-0">
                        <h3 className="truncate text-xl font-semibold text-slate-900 sm:text-2xl">
                          {req.name}
                        </h3>
                        <p className="text-sm text-slate-500">{req.time}</p>
                      </div>
                    </div>

                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-medium ring-1 ${
                        badgeStyle[req.status]
                      }`}
                    >
                      {req.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {req.text}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    {req.status === "Pending" ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => updateStatus(req.id, "Declined")}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                          <X size={14} />
                          Decline
                        </button>
                        <button
                          onClick={() => updateStatus(req.id, "Accepted")}
                          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                        >
                          Accept
                        </button>
                      </div>
                    ) : (
                      <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                        <MessageCircle size={15} />
                        Message
                      </button>
                    )}

                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                      {req.status === "Accepted" ? "View Profile" : "Message"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Recommended Investors */}
        <aside className="xl:col-span-1">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 sm:px-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Recommended Investors
              </h2>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View all
              </button>
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              {investors.map((inv) => (
                <article
                  key={inv.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">

                    <img
                      src={inv.avatar}
                      alt={inv.name}
                      className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <span className="bg-green-400 border-2 border-white absolute bottom-0  right-0 rounded-full w-3 h-3"></span>
                      </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-xl font-semibold text-slate-900 sm:text-2xl">
                        {inv.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {inv.role} • {inv.investments}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {inv.stageTags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h4 className="mt-4 text-sm font-semibold text-slate-900">
                    Investment Interests
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {inv.interests.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {inv.bio}
                  </p>

                  <div className="mt-3">
                    <p className="text-sm text-slate-500">Investment Range</p>
                    <p className="text-base font-semibold text-slate-900">
                      {inv.range}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}