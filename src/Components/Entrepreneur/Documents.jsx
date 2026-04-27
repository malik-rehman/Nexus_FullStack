import React, { useMemo, useRef, useState } from "react";
import {
  Upload,
  FileText,
  Download,
  Share2,
  Trash2,
  Search,
  ArrowUpDown,
  Filter,
} from "lucide-react";


const initialDocs = [
  {
    id: 1,
    name: "Pitch Deck 2024.pdf",
    type: "PDF",
    sizeMB: 2.4,
    modified: "2024-02-15",
    shared: true,
    starred: true,
    trashed: false,
  },
  {
    id: 2,
    name: "Financial Projections.xlsx",
    type: "Spreadsheet",
    sizeMB: 1.8,
    modified: "2024-02-10",
    shared: false,
    starred: false,
    trashed: false,
  },
  {
    id: 3,
    name: "Business Plan.docx",
    type: "Document",
    sizeMB: 3.2,
    modified: "2024-02-05",
    shared: true,
    starred: false,
    trashed: false,
  },
  {
    id: 4,
    name: "Market Research.pdf",
    type: "PDF",
    sizeMB: 5.1,
    modified: "2024-01-28",
    shared: false,
    starred: true,
    trashed: false,
  },
];

const TOTAL_STORAGE_GB = 20;

export default function Documents() {
  const [docs, setDocs] = useState(initialDocs);
  const [activeFolder, setActiveFolder] = useState("all"); // all | recent | shared | starred | trash
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortBy, setSortBy] = useState("modified-desc");
  const fileInputRef = useRef(null);

  const usedStorageGB = useMemo(() => {
    const usedMB = docs.filter((d) => !d.trashed).reduce((sum, d) => sum + d.sizeMB, 0);
    return +(usedMB / 1024).toFixed(2);
  }, [docs]);

  const availableStorageGB = +(TOTAL_STORAGE_GB - usedStorageGB).toFixed(2);
  const usedPercent = Math.min((usedStorageGB / TOTAL_STORAGE_GB) * 100, 100);

  const visibleDocs = useMemo(() => {
    let list = [...docs];

    // folder filter
    if (activeFolder === "recent") {
      list = list.filter((d) => !d.trashed).sort((a, b) => (a.modified < b.modified ? 1 : -1));
    } else if (activeFolder === "shared") {
      list = list.filter((d) => d.shared && !d.trashed);
    } else if (activeFolder === "starred") {
      list = list.filter((d) => d.starred && !d.trashed);
    } else if (activeFolder === "trash") {
      list = list.filter((d) => d.trashed);
    } else {
      list = list.filter((d) => !d.trashed);
    }

    // search
    const term = search.toLowerCase().trim();
    if (term) {
      list = list.filter((d) => d.name.toLowerCase().includes(term));
    }

    // type filter
    if (typeFilter !== "All") {
      list = list.filter((d) => d.type === typeFilter);
    }

    // sort
    if (sortBy === "name-asc") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "name-desc") list.sort((a, b) => b.name.localeCompare(a.name));
    if (sortBy === "size-asc") list.sort((a, b) => a.sizeMB - b.sizeMB);
    if (sortBy === "size-desc") list.sort((a, b) => b.sizeMB - a.sizeMB);
    if (sortBy === "modified-asc") list.sort((a, b) => a.modified.localeCompare(b.modified));
    if (sortBy === "modified-desc") list.sort((a, b) => b.modified.localeCompare(a.modified));

    return list;
  }, [docs, activeFolder, search, typeFilter, sortBy]);

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems = files.map((file, idx) => {
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      let type = "Document";
      if (["pdf"].includes(ext)) type = "PDF";
      if (["xlsx", "xls", "csv"].includes(ext)) type = "Spreadsheet";

      return {
        id: Date.now() + idx,
        name: file.name,
        type,
        sizeMB: +(file.size / (1024 * 1024)).toFixed(1),
        modified: new Date().toISOString().slice(0, 10),
        shared: false,
        starred: false,
        trashed: false,
      };
    });

    setDocs((prev) => [...newItems, ...prev]);
    e.target.value = "";
  };

  const softDeleteDoc = (id) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, trashed: true } : d)));
  };

  const downloadDoc = (doc) => {
    // demo action; replace with real download URL in production
    alert(`Downloading: ${doc.name}`);
  };

  const shareDoc = (doc) => {
    navigator.clipboard?.writeText(`https://yourapp.com/docs/${doc.id}`);
    setDocs((prev) => prev.map((d) => (d.id === doc.id ? { ...d, shared: true } : d)));
    alert(`${doc.name} link copied!`);
  };

  const folders = [
    { id: "all", label: "All Documents" },
    { id: "recent", label: "Recent Files" },
    { id: "shared", label: "Shared with Me" },
    { id: "starred", label: "Starred" },
    { id: "trash", label: "Trash" },
  ];

  return (
    <section className="min-h-screen bg-slate-100 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Documents</h1>
            <p className="mt-1 text-sm text-slate-600 sm:text-base">
              Manage your startup&apos;s important files
            </p>
          </div>

          <button
            onClick={handleUploadClick}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Upload size={16} />
            Upload Document
          </button>
          <input ref={fileInputRef} onChange={handleUpload} type="file" multiple className="hidden" />
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left panel */}
          <aside className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-3 h-fit">
            <h2 className="text-2xl font-semibold text-slate-900">Storage</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-700">
                <span>Used</span>
                <span className="font-semibold">{usedStorageGB} GB</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-blue-600" style={{ width: `${usedPercent}%` }} />
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Available</span>
                <span className="font-semibold">{availableStorageGB} GB</span>
              </div>
            </div>

            <hr className="my-5 border-slate-200" />

            <h3 className="text-lg font-semibold text-slate-900">Quick Access</h3>
            <nav className="mt-3 space-y-1.5">
              {folders.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFolder(f.id)}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    activeFolder === f.id
                      ? "bg-blue-50 font-medium text-blue-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right panel */}
          <main className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:col-span-9">
            <div className="border-b border-slate-200 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold text-slate-900">All Documents</h2>

                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search
                      size={16}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search files..."
                      className="w-44 rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none ring-blue-200 focus:ring-2 sm:w-56"
                    />
                  </div>

                  <div className="relative">
                    <ArrowUpDown
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm text-slate-700 outline-none"
                    >
                      <option value="modified-desc">Newest</option>
                      <option value="modified-asc">Oldest</option>
                      <option value="name-asc">Name A-Z</option>
                      <option value="name-desc">Name Z-A</option>
                      <option value="size-desc">Size High-Low</option>
                      <option value="size-asc">Size Low-High</option>
                    </select>
                  </div>

                  <div className="relative">
                    <Filter
                      size={15}
                      className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      value={typeFilter}
                      onChange={(e) => setTypeFilter(e.target.value)}
                      className="appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm text-slate-700 outline-none"
                    >
                      <option>All</option>
                      <option>PDF</option>
                      <option>Spreadsheet</option>
                      <option>Document</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {visibleDocs.length === 0 ? (
                <div className="p-8 text-center text-slate-500">No documents found.</div>
              ) : (
                visibleDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                        <FileText size={18} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                            {doc.name}
                          </p>
                          {doc.shared && (
                            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                              Shared
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                          {doc.type} &nbsp; {doc.sizeMB} MB &nbsp; Modified {doc.modified}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 self-end sm:self-auto">
                      <IconBtn label="Download" onClick={() => downloadDoc(doc)}>
                        <Download size={16} />
                      </IconBtn>
                      <IconBtn label="Share" onClick={() => shareDoc(doc)}>
                        <Share2 size={16} />
                      </IconBtn>
                      <IconBtn label="Delete" onClick={() => softDeleteDoc(doc.id)} danger>
                        <Trash2 size={16} />
                      </IconBtn>
                    </div>
                  </div>
                ))
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

function IconBtn({ children, label, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`rounded-md p-2 transition ${
        danger
          ? "text-slate-500 hover:bg-rose-50 hover:text-rose-600"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}