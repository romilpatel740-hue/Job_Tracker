import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ title }) {
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-200 bg-slate-900/95 text-slate-100 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-400 via-indigo-500 to-violet-500 text-sm font-black text-white shadow-lg shadow-indigo-500/25">
            JT
          </div>
          <div className="leading-tight text-white">
            <div className="text-lg font-semibold tracking-tight">{title}</div>
            <div className="text-xs text-slate-300">Job tracker</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {[
            ["/", "Dashboard"],
            ["/applications", "Applications"],
            ["/addApplications", "Add Application"],
            ["/about", "About"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
