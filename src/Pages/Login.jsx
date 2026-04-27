import React, { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("entrepreneur");
  const [remember, setRemember] = useState(false);
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const Navigate=useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3 sm:px-4 py-6 sm:py-10">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        {/* Header */}
        <div className="text-center mb-5 sm:mb-7">
          <div className="mx-auto mb-4 sm:mb-6 h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
            <BriefcaseBusiness className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            Sign in to Business Nexus
          </h1>
          <p className="mt-2 sm:mt-3 text-slate-600 text-sm sm:text-base">
            Connect with investors and entrepreneurs
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 md:p-7 w-full">
          {/* Role */}
          <p className="text-base sm:text-lg font-semibold text-slate-900 mb-3">
            I am a
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            <button
              onClick={() => setRole("entrepreneur")}
              className={`h-12 sm:h-14 px-3 rounded-xl border text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition ${
                role === "entrepreneur"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-slate-300 text-slate-700 bg-white"
              }`}
            >
              <Building2 size={18} />
              Entrepreneur
            </button>

            <button
              onClick={() => setRole("investor")}
              className={`h-12 sm:h-14 px-3 rounded-xl border text-sm sm:text-base font-medium flex items-center justify-center gap-2 transition ${
                role === "investor"
                  ? "border-blue-600 text-blue-600 bg-blue-50"
                  : "border-slate-300 text-slate-700 bg-white"
              }`}
            >
              <CircleDollarSign size={18} />
              Investor
            </button>
          </div>

          {/* Email */}
          <label className="block text-sm sm:text-base font-semibold text-slate-900 mb-2">
            Email address
          </label>
          <div className="relative mb-4 sm:mb-5">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
            value={Email}
              type="email"
              placeholder="Enter your email"
              className="w-full h-11 sm:h-12 rounded-xl border border-slate-300 pl-10 pr-3 text-sm sm:text-base outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <label className="block text-sm sm:text-base font-semibold text-slate-900 mb-2">
            Password
          </label>
          <div className="relative mb-4 sm:mb-5">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
            value={Password}
              type="password"
              placeholder="Enter your password"
              className="w-full h-11 sm:h-12 rounded-xl border border-slate-300 pl-10 pr-3 text-sm sm:text-base outline-none focus:border-blue-500"
            />
          </div>

          {/* Row */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-5">
            <label className="inline-flex items-center gap-2 text-slate-800 text-sm sm:text-base">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 sm:h-5 sm:w-5 rounded border-slate-300 accent-blue-600"
              />
              Remember me
            </label>

            <button className="text-blue-600 text-sm sm:text-base font-medium hover:underline text-left sm:text-right">
              Forgot your password?
            </button>
          </div>

          {/* Sign in */}
          <button onClick={()=>{Navigate("/Dashboard")}} className="w-full h-11 sm:h-12 rounded-xl bg-blue-600 text-white text-base sm:text-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
            <LogIn size={18} />
            
            Sign in
          </button>

          {/* Divider */}
          <div className="my-6 sm:my-7 flex items-center gap-3">
            <div className="h-px bg-slate-300 flex-1" />
            <span className="text-slate-500 text-sm sm:text-base">Demo Accounts</span>
            <div className="h-px bg-slate-300 flex-1" />
          </div>

          {/* Demo buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button onClick={()=>{setEmail("Entrepreneur@gmail.com");
              setPassword("enterpreneur")
            }} className="cursor-pointer h-12 sm:h-14 rounded-xl border border-slate-300 text-slate-700 text-sm sm:text-base font-medium flex items-center justify-center gap-2 hover:bg-slate-50">
              <Building2 size={18} />
              Entrepreneur Demo
            </button>
            <button onClick={()=>{setEmail("Investor@gmail.com");
              setPassword("investor")
            }} className="h-12 sm:h-14 rounded-xl border border-slate-300 text-slate-700 text-sm sm:text-base font-medium flex items-center justify-center gap-2 hover:bg-slate-50">
              <CircleDollarSign size={18} />
              
              Investor Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}