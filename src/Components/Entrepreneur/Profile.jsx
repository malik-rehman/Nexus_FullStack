import React, { useMemo, useState } from "react";
import {
  CircleDollarSign,
  FileText,
  Globe,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";

/**
 * Responsive + functional profile page (Tailwind CSS)
 * - Left: founder profile + startup cards
 * - Right: funding + documents
 * - Mobile: right panel moves below content
 */

const profile = {
  name: "Sarah Johnson",
  role: "AI Founder",
  location: "San Francisco, CA",
  email: "sarah@techwave.ai",
  phone: "+1 (415) 555-0188",
  website: "www.techwave.ai",
  tags: ["FinTech", "B2B SaaS", "Sustainability", "AI/ML"],
};

const startupsData = [
  {
    id: 1,
    name: "TechWave AI",
    stage: "Series A",
    founded: "2021",
    status: "Active",
    team: ["Jack Brown", "Noah Brown", "Nisha Lee"],
    about:
      "Smart enterprise AI for predictive analytics and workflow automation.",
    problem:
      "Many businesses have data but no practical way to turn it into decisions quickly.",
    solution:
      "A no-code insights engine that converts raw data into clear operational recommendations.",
    competition:
      "Traditional BI tools are complex and slower for non-technical teams.",
  },
  {
    id: 2,
    name: "CloudSync",
    stage: "Seed",
    founded: "2022",
    status: "Growing",
    team: ["Liam Stone", "Ava Johnson", "Sophia Clark"],
    about:
      "Cloud-native collaboration platform for distributed product teams.",
    problem:
      "Remote teams struggle with fragmented tooling and scattered communication.",
    solution:
      "Unified async collaboration with shared docs, updates, and review workflows.",
    competition:
      "General chat tools do not provide enough product-delivery context.",
  },
  {
    id: 3,
    name: "EcoMetrics",
    stage: "Pre-Seed",
    founded: "2023",
    status: "Pilot",
    team: ["Ethan Harris", "Emma White"],
    about:
      "Carbon measurement and reporting for small and mid-size businesses.",
    problem:
      "SMBs need simple compliance and sustainability reporting without heavy consulting costs.",
    solution:
      "Automated footprint dashboards and downloadable compliance summaries.",
    competition:
      "Current tools are expensive and optimized mainly for large enterprises.",
  },
];

const docsData = [
  "Pitch Deck",
  "Financial Model",
  "Term Sheet",
  "Growth Plan",
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");

  const totals = useMemo(
    () => ({
      startups: startupsData.length,
      team: startupsData.reduce((acc, s) => acc + s.team.length, 0),
      docs: docsData.length,
    }),
    []
  );

  return (
    <section className="min-h-screen w-full md:w-[80%] -z-10 bg-slate-50 p-3 sm:p-4 lg:p-6 ">
      <div className="mx-auto max-w-7xl">
        {/* Top Profile Card */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 p-4 sm:p-5">
            <div className="flex min-w-0 items-start gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80&auto=format&fit=crop"
                alt={profile.name}
                className="h-14 w-14 rounded-full object-cover ring-1 ring-slate-200"
              />
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold text-slate-900 sm:text-2xl">
                  {profile.name}
                </h1>
                <p className="text-sm text-slate-500">{profile.role}</p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              Contact
            </button>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 p-3 sm:p-4">
            {["overview", "startups", "documents"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition ${
                  activeTab === tab
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Layout */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left Content */}
          <main className="space-y-4 lg:col-span-8">
            {activeTab !== "documents" && (
              <>
                {/* About */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                  <h2 className="text-base font-semibold text-slate-900">About</h2>
                  <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2">
                    <p className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      {profile.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={16} className="text-slate-400" />
                      {profile.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={16} className="text-slate-400" />
                      {profile.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Globe size={16} className="text-slate-400" />
                      {profile.website}
                    </p>
                  </div>
                </div>

                {/* Startup Cards */}
                {(activeTab === "overview" || activeTab === "startups") &&
                  startupsData.map((startup) => (
                    <article
                      key={startup.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {startup.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Founded {startup.founded} • {startup.stage}
                          </p>
                        </div>
                        <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          {startup.status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-3 text-sm">
                        <Block title="Problem Statement" text={startup.problem} />
                        <Block title="Solution" text={startup.solution} />
                        <Block title="Competition Advantage" text={startup.competition} />
                      </div>

                      <div className="mt-4">
                        <h4 className="mb-2 text-sm font-semibold text-slate-800">Team</h4>
                        <div className="flex flex-wrap gap-2">
                          {startup.team.map((member) => (
                            <span
                              key={member}
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                            >
                              {member}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
              </>
            )}

            {/* Documents Tab Content (left side for mobile-friendly UX) */}
            {activeTab === "documents" && (
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-base font-semibold text-slate-900">Documents</h2>
                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {docsData.map((doc) => (
                    <button
                      key={doc}
                      className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <span className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        {doc}
                      </span>
                      <span className="text-xs text-slate-400">PDF</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h3 className="text-base font-semibold text-slate-900">Funding</h3>
              <div className="mt-3 space-y-3 text-sm">
                <InfoRow label="Valuation" value="$8.5M" />
                <InfoRow label="Revenue" value="$1.2M" />
                <InfoRow label="Stage" value="Series A" />
                <InfoRow label="Founded" value="2021" />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h3 className="text-base font-semibold text-slate-900">Quick Stats</h3>
              <div className="mt-3 space-y-2">
                <StatCard
                  icon={<CircleDollarSign size={16} />}
                  label="Active Startups"
                  value={totals.startups}
                />
                <StatCard icon={<Users size={16} />} label="Team Members" value={totals.team} />
                <StatCard icon={<FileText size={16} />} label="Documents" value={totals.docs} />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <h3 className="text-base font-semibold text-slate-900">Documents</h3>
              <div className="mt-3 space-y-2">
                {docsData.map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
                  >
                    <span className="flex items-center gap-2 text-sm text-slate-700">
                      <FileText size={15} className="text-blue-600" />
                      {doc}
                    </span>
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                      View
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Block({ title, text }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
      <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span className="text-slate-400">{icon}</span>
        {label}
      </div>
      <span className="font-semibold text-slate-900">{value}</span>
    </div>
  );
}