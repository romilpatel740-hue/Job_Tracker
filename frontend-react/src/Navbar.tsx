import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BriefcaseBusiness,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";

type NavbarProps = {
  title: string;
  onLogout: () => void;
};

const navItems: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/applications", label: "Applications", icon: BriefcaseBusiness },
  { to: "/addApplications", label: "Add application", icon: Plus },
  { to: "/ai-analyzer", label: "AI analyzer", icon: Sparkles },
  { to: "/skill-match", label: "Skill match", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: UserRound },
  { to: "/about", label: "About", icon: Info },
];

function Navbar({ title, onLogout }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderLinks = (mobile = false) =>
    navItems.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        end={to === "/"}
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `group flex items-center gap-2 rounded-xl text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 ${
            mobile ? "w-full px-4 py-3" : "px-3 py-2.5"
          } ${
            isActive
              ? "bg-gradient-to-r from-rose-500/20 via-fuchsia-500/10 to-cyan-400/10 text-white ring-1 ring-rose-300/20 shadow-lg shadow-rose-950/20"
              : "text-slate-300 hover:bg-white/[0.07] hover:text-white"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              aria-hidden="true"
              className={`h-4 w-4 shrink-0 transition-colors ${
                isActive
                  ? "text-rose-200"
                  : "text-slate-400 group-hover:text-cyan-200"
              }`}
            />
            <span>{label}</span>
          </>
        )}
      </NavLink>
    ));

  const logoutButton = (mobile = false) => (
    <button
      type="button"
      onClick={() => {
        setMenuOpen(false);
        onLogout();
      }}
      className={`flex items-center gap-2 rounded-xl text-sm font-medium text-slate-300 transition hover:bg-rose-500/10 hover:text-rose-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 ${
        mobile ? "w-full px-4 py-3" : "px-3 py-2.5"
      }`}
    >
      <LogOut aria-hidden="true" className="h-4 w-4" />
      <span>Log out</span>
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1117]/85 shadow-lg shadow-black/10 backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-400/70 to-transparent" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="group flex shrink-0 items-center gap-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-cyan-400 text-sm font-black text-white shadow-lg shadow-rose-500/20 transition duration-300 group-hover:rotate-[-4deg] group-hover:scale-105">
            <span className="relative z-10">JT</span>
            <span className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-br from-rose-500/40 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="hidden leading-tight sm:block">
            <div className="text-base font-bold tracking-tight">{title}</div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Job tracker
            </div>
          </div>
        </NavLink>

        <div className="hidden items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.035] p-1 shadow-inner shadow-black/20 xl:flex">
          {renderLinks()}
          <span className="mx-1 h-6 w-px bg-white/10" />
          {logoutButton()}
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-rose-300/30 hover:bg-rose-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 xl:hidden"
        >
          {menuOpen ? (
            <X aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Menu aria-hidden="true" className="h-5 w-5" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-white/10 bg-[#0d1117]/95 px-4 pb-4 pt-3 backdrop-blur-2xl sm:px-6 xl:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
            {renderLinks(true)}
            <div className="sm:col-span-2 sm:border-t sm:border-white/10 sm:pt-2">
              {logoutButton(true)}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
