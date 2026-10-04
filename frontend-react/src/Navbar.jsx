import { NavLink } from "react-router-dom";

function Navbar({ title }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950 shadow-lg shadow-slate-950/5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink
          to="/"
          className="group flex shrink-0 items-center gap-3 !text-white"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-600 text-sm font-black !text-white shadow-lg shadow-indigo-500/30 transition duration-300 group-hover:scale-105">
            <span className="relative z-10 !text-white">JT</span>

            <div className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />
          </div>

          <div className="hidden leading-tight sm:block">
            <div className="text-base font-bold tracking-tight !text-white">
              {title}
            </div>

            <div className="text-[11px] font-medium uppercase tracking-[0.16em] !text-slate-400">
              Job tracker
            </div>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.04] p-1 shadow-inner">
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
                `whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 sm:px-4 sm:text-sm ${
                  isActive
                    ? "!bg-white !text-slate-950 shadow-md shadow-black/10"
                    : "!bg-transparent !text-slate-300 hover:!bg-white/10 hover:!text-white"
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