import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

const investorsData = [
  {
    id: 1,
    name: "Michael Rodriguez",
    role: "Investor",
    investments: 12,
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&auto=format&fit=crop&q=80",
    stage: ["Seed", "Series A"],
    interests: ["FinTech", "SaaS", "AI/ML"],
    location: "San Francisco, CA",
    bio: "Early-stage investor with focus on B2B SaaS and fintech. Previously founded and exited two startups.",
    range: "$250K - $1.5M",
    online: true,
  },
  {
    id: 2,
    name: "Jennifer Lee",
    role: "Investor",
    investments: 18,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    stage: ["Seed", "Series A", "Series B"],
    interests: ["CleanTech", "AgTech", "Sustainability"],
    location: "New York, NY",
    bio: "Impact investor focused on climate tech, sustainable agriculture, and clean energy.",
    range: "$500K - $3M",
    online: false,
  },
  {
    id: 3,
    name: "Robert Torres",
    role: "Investor",
    investments: 9,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    stage: ["Series A", "Series B"],
    interests: ["HealthTech", "BioTech", "Medical Devices"],
    location: "Boston, MA",
    bio: "Healthcare-focused investor with medical background. Looking for innovations in patient care and biotech.",
    range: "$1M - $5M",
    online: true,
  },
];

const stageFilters = ["Seed", "Series A", "Series B"];
const interestFilters = [
  "FinTech",
  "SaaS",
  "AI/ML",
  "CleanTech",
  "AgTech",
  "Sustainability",
  "HealthTech",
  "BioTech",
  "Medical Devices",
];
const locationFilters = ["San Francisco, CA", "New York, NY", "Boston, MA"];

export default function FindInvestor() {
  const [search, setSearch] = useState("");
  const [selectedStages, setSelectedStages] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const toggleValue = (value, list, setList) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredInvestors = useMemo(() => {
    const term = search.trim().toLowerCase();

    return investorsData.filter((inv) => {
      const matchesSearch =
        !term ||
        inv.name.toLowerCase().includes(term) ||
        inv.bio.toLowerCase().includes(term) ||
        inv.interests.some((i) => i.toLowerCase().includes(term));

      const matchesStage =
        selectedStages.length === 0 ||
        selectedStages.some((stage) => inv.stage.includes(stage));

      const matchesInterest =
        selectedInterests.length === 0 ||
        selectedInterests.some((interest) => inv.interests.includes(interest));

      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(inv.location);

      return matchesSearch && matchesStage && matchesInterest && matchesLocation;
    });
  }, [search, selectedStages, selectedInterests, selectedLocations]);

  const clearAll = () => {
    setSearch("");
    setSelectedStages([]);
    setSelectedInterests([]);
    setSelectedLocations([]);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
    
        <h1 className="text-3xl font-bold text-slate-900">Find Investors</h1>
        <p className="mt-1 text-slate-600">
          Connect with investors who match your startup's needs
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Filters */}
          <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-3 h-fit">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
              <button
                onClick={clearAll}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Clear all
              </button>
            </div>

            <FilterSection title="Investment Stage">
              <div className="space-y-2">
                {stageFilters.map((stage) => (
                  <FilterCheck
                    key={stage}
                    label={stage}
                    checked={selectedStages.includes(stage)}
                    onChange={() =>
                      toggleValue(stage, selectedStages, setSelectedStages)
                    }
                  />
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Investment Interests">
              <div className="flex flex-wrap gap-2">
                {interestFilters.map((interest) => {
                  const active = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      onClick={() =>
                        toggleValue(
                          interest,
                          selectedInterests,
                          setSelectedInterests
                        )
                      }
                      className={`rounded-md border px-2.5 py-1 text-sm transition ${
                        active
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </FilterSection>

            <FilterSection title="Location">
              <div className="space-y-2">
                {locationFilters.map((location) => (
                  <label
                    key={location}
                    className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedLocations.includes(location)}
                      onChange={() =>
                        toggleValue(
                          location,
                          selectedLocations,
                          setSelectedLocations
                        )
                      }
                    />
                    <MapPin size={14} className="text-slate-400" />
                    {location}
                  </label>
                ))}
              </div>
            </FilterSection>
          </aside>

          {/* Right Content */}
          <section className="lg:col-span-9">
            {/* Search + results */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="relative min-w-60 flex-1">
                <Search
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search investors by name, interests, or keywords..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none ring-blue-200 placeholder:text-slate-400 focus:ring-2"
                />
              </div>

              <div className="flex items-center gap-2 text-slate-600">
                <SlidersHorizontal size={16} />
                <span className="text-sm">
                  <strong>{filteredInvestors.length}</strong> results
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {filteredInvestors.map((inv) => (
                <article
                  key={inv.id}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img
                          src={inv.avatar}
                          alt={inv.name}
                          className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        {inv.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-2xl font-semibold text-slate-900">
                          {inv.name}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {inv.role} • {inv.investments} investments
                        </p>

                        <div className="mt-2 flex flex-wrap gap-2">
                          {inv.stage.map((tag) => (
                            <Tag key={tag} text={tag} color="green" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-slate-900">
                        Investment Interests
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {inv.interests.map((interest) => (
                          <Tag key={interest} text={interest} color="blue" />
                        ))}
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-600">{inv.bio}</p>

                    <div className="mt-4">
                      <p className="text-sm text-slate-500">Investment Range</p>
                      <p className="text-2xl font-bold text-slate-900">{inv.range}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 p-3">
                    <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                      <MessageCircle size={15} />
                      Message
                    </button>

                    <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                      View Profile
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredInvestors.length === 0 && (
              <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
                <p className="text-slate-700">No investors found.</p>
                <p className="mt-1 text-sm text-slate-500">
                  Try changing filters or search keywords.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div className="mb-6">
      <h3 className="mb-2 text-base font-semibold text-slate-900">{title}</h3>
      {children}
    </div>
  );
}

function FilterCheck({ label, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
      {label}
    </label>
  );
}

function Tag({ text, color = "blue" }) {
  const styles =
    color === "green"
      ? "bg-emerald-50 text-emerald-700"
      : "bg-blue-50 text-blue-700";

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-medium ${styles}`}>
      {text}
    </span>
  );
}