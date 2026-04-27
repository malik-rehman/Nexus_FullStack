import React, { useMemo, useState } from "react";
import {
  User,
  Lock,
  Bell,
  Languages,
  Palette,
  CreditCard,
  Globe,
} from "lucide-react";

/**
 * Responsive + functional + dynamic Settings Page
 * Tailwind CSS + React only
 */

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "language", label: "Language", icon: Languages },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile state
  const [profileForm, setProfileForm] = useState({
    fullName: "Sarah Johnson",
    email: "sarah@techwave.io",
    role: "entrepreneur",
    location: "San Francisco, CA",
    bio: "Serial entrepreneur with 10+ years of experience in SaaS and fintech.",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140&q=80&auto=format&fit=crop",
  });

  // Security state
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Other tab state
  const [language, setLanguage] = useState("English");
  const [appearance, setAppearance] = useState("System");
  const [emailAlerts, setEmailAlerts] = useState(true);

  // UI helpers
  const [status, setStatus] = useState({ type: "", message: "" });

  const passwordValid = useMemo(() => {
    return (
      passwordForm.newPassword.length >= 6 &&
      passwordForm.newPassword === passwordForm.confirmPassword &&
      passwordForm.currentPassword.length > 0
    );
  }, [passwordForm]);

  const showToast = (type, message) => {
    setStatus({ type, message });
    setTimeout(() => setStatus({ type: "", message: "" }), 2500);
  };

  const onProfileChange = (key, value) => {
    setProfileForm((prev) => ({ ...prev, [key]: value }));
  };

  const onPasswordChange = (key, value) => {
    setPasswordForm((prev) => ({ ...prev, [key]: value }));
  };

  const onPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const valid = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 800 * 1024; // 800KB

    if (!valid.includes(file.type)) {
      showToast("error", "Only JPG, PNG, GIF allowed.");
      return;
    }
    if (file.size > maxSize) {
      showToast("error", "Max file size is 800KB.");
      return;
    }

    const photoUrl = URL.createObjectURL(file);
    setProfileForm((prev) => ({ ...prev, photo: photoUrl }));
    showToast("success", "Photo updated.");
  };

  const saveProfile = (e) => {
    e.preventDefault();
    // API call here
    showToast("success", "Profile settings saved.");
  };

  const cancelProfile = () => {
    setProfileForm({
      fullName: "Sarah Johnson",
      email: "sarah@techwave.io",
      role: "entrepreneur",
      location: "San Francisco, CA",
      bio: "Serial entrepreneur with 10+ years of experience in SaaS and fintech.",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140&q=80&auto=format&fit=crop",
    });
    showToast("success", "Changes discarded.");
  };

  const updatePassword = (e) => {
    e.preventDefault();
    if (!passwordValid) {
      showToast("error", "Check password fields and try again.");
      return;
    }
    // API call here
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    showToast("success", "Password updated.");
  };

  return (
    <section className="min-h-screen bg-slate-100 p-3 sm:p-4 lg:p-6 w-full">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Manage your account preferences and settings
        </p>

        {/* Toast */}
        {status.message && (
          <div
            className={`mt-4 rounded-lg border px-4 py-2 text-sm ${
              status.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {status.message}
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Sidebar tabs */}
          <aside className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm lg:col-span-3 h-fit">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main content */}
          <main className="space-y-4 lg:col-span-9">
            {/* Profile Settings */}
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-4 sm:p-5">
                <h2 className="text-lg font-semibold text-slate-900">Profile Settings</h2>
              </div>

              <form onSubmit={saveProfile} className="p-4 sm:p-5">
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <img
                    src={profileForm.photo}
                    alt="profile"
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-slate-200"
                  />
                  <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    Change Photo
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/gif"
                      onChange={onPhotoUpload}
                      className="hidden"
                    />
                  </label>
                  <p className="text-xs text-slate-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Full Name"
                    value={profileForm.fullName}
                    onChange={(v) => onProfileChange("fullName", v)}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileForm.email}
                    onChange={(v) => onProfileChange("email", v)}
                  />
                  <Input
                    label="Role"
                    value={profileForm.role}
                    onChange={(v) => onProfileChange("role", v)}
                  />
                  <Input
                    label="Location"
                    value={profileForm.location}
                    onChange={(v) => onProfileChange("location", v)}
                  />
                </div>

                <div className="mt-4">
                  <label className="mb-1 block text-sm font-medium text-slate-700">Bio</label>
                  <textarea
                    rows={4}
                    value={profileForm.bio}
                    onChange={(e) => onProfileChange("bio", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-blue-200 focus:ring-2"
                  />
                </div>

                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={cancelProfile}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </section>

            {/* Security Settings */}
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-200 p-4 sm:p-5">
                <h2 className="text-lg font-semibold text-slate-900">Security Settings</h2>
              </div>

              <div className="space-y-5 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">Two-Factor Authentication</h3>
                    <p className="text-sm text-slate-600">
                      Add an extra layer of security to your account
                    </p>
                    <p
                      className={`mt-1 text-sm font-medium ${
                        twoFAEnabled ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {twoFAEnabled ? "Enabled" : "Not Enabled"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setTwoFAEnabled((v) => !v);
                      showToast("success", `2FA ${twoFAEnabled ? "disabled" : "enabled"}.`);
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    {twoFAEnabled ? "Disable" : "Enable"}
                  </button>
                </div>

                <form onSubmit={updatePassword} className="space-y-3">
                  <h3 className="font-semibold text-slate-900">Change Password</h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Input
                      label="Current Password"
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(v) => onPasswordChange("currentPassword", v)}
                    />
                    <div />
                    <Input
                      label="New Password"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(v) => onPasswordChange("newPassword", v)}
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(v) => onPasswordChange("confirmPassword", v)}
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!passwordValid}
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            </section>

            {/* Simple dynamic panels for other tabs */}
            {activeTab !== "profile" && activeTab !== "security" && (
              <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-lg font-semibold text-slate-900 capitalize">
                  {activeTab} Settings
                </h2>

                {activeTab === "notifications" && (
                  <div className="mt-3">
                    <label className="flex items-center gap-3 text-sm text-slate-700">
                      <input
                        type="checkbox"
                        checked={emailAlerts}
                        onChange={(e) => setEmailAlerts(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600"
                      />
                      Enable email alerts
                    </label>
                  </div>
                )}

                {activeTab === "language" && (
                  <div className="mt-3 max-w-xs">
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Preferred Language
                    </label>
                    <div className="relative">
                      <Globe
                        size={15}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 py-2 pl-8 pr-3 text-sm outline-none ring-blue-200 focus:ring-2"
                      >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === "appearance" && (
                  <div className="mt-3 max-w-xs">
                    <label className="mb-1 block text-sm font-medium text-slate-700">Theme</label>
                    <select
                      value={appearance}
                      onChange={(e) => setAppearance(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-blue-200 focus:ring-2"
                    >
                      <option>System</option>
                      <option>Light</option>
                      <option>Dark</option>
                    </select>
                  </div>
                )}

                {activeTab === "billing" && (
                  <p className="mt-3 text-sm text-slate-600">
                    Billing integration area (plan, invoices, payment methods).
                  </p>
                )}
              </section>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none ring-blue-200 focus:ring-2"
      />
    </div>
  );
}