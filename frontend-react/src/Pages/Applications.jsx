import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useApplications from "../hooks/useApplication";

function Applications() {
  const { applications, deleteApplication, loading, error } = useApplications();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  const statusStyle = {
    applied: {
      badge: "bg-sky-50 !text-sky-700 ring-sky-200",
      dot: "bg-sky-500",
    },
    interview: {
      badge: "bg-amber-50 !text-amber-700 ring-amber-200",
      dot: "bg-amber-500",
    },
    offer: {
      badge: "bg-emerald-50 !text-emerald-700 ring-emerald-200",
      dot: "bg-emerald-500",
    },
    rejected: {
      badge: "bg-rose-50 !text-rose-700 ring-rose-200",
      dot: "bg-rose-500",
    },
  };

  const filteredApplications = applications.filter((app) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      app.company.toLowerCase().includes(searchText) ||
      app.role.toLowerCase().includes(searchText);

    const matchesStatus =
      filterStatus === "all" ||
      app.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications];

  if (sortOption === "company-asc") {
    sortedApplications.sort((a, b) => a.company.localeCompare(b.company));
  }

  if (sortOption === "company-desc") {
    sortedApplications.sort((a, b) => b.company.localeCompare(a.company));
  }

  if (sortOption === "newest") {
    sortedApplications.sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
    );
  }

  if (loading) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <p className="text-lg text-slate-500">
        Loading applications...
      </p>
    </div>
  );
}

if (error) {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <p className="text-lg text-red-500">
        {error}
      </p>
    </div>
  );
}

  return (
    <section className="space-y-7">
      {/* Page Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
        {/* Background Effects */}
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] !text-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Application pipeline
          </span>

          <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight !text-white sm:text-4xl">
                Applications
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 !text-slate-300 sm:text-base">
                Manage, search, filter, and organize all your job applications
                from one place.
              </p>
            </div>

            <Link
              to="/addApplications"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold !text-slate-950 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              + Add Application
            </Link>
          </div>
        </div>
      </header>

      {/* Search / Filter / Sort */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] !text-indigo-600">
            Manage pipeline
          </span>

          <h2 className="mt-1 text-lg font-bold tracking-tight !text-slate-950">
            Find an application
          </h2>

          <p className="mt-1 text-sm !text-slate-500">
            Search, filter, or sort your tracked opportunities.
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1.5fr_1fr_1fr]">
          {/* Search */}
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 !text-slate-400">
              🔍
            </span>

            <input
              type="text"
              placeholder="Search company or role..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(event) => setFilterStatus(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium !text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="all">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>

          {/* Sort */}
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium !text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
          >
            <option value="default">Default Order</option>
            <option value="company-asc">Company A-Z</option>
            <option value="company-desc">Company Z-A</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        {/* Result Count */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <p className="text-xs font-medium !text-slate-500">
            Showing{" "}
            <span className="font-bold !text-slate-900">
              {sortedApplications.length}
            </span>{" "}
            {sortedApplications.length === 1 ? "application" : "applications"}
          </p>

          {(search || filterStatus !== "all" || sortOption !== "default") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilterStatus("all");
                setSortOption("default");
              }}
              className="text-xs font-semibold !text-indigo-600 transition hover:!text-indigo-700"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Applications */}
      {sortedApplications.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm sm:p-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-xl font-bold !text-indigo-600">
            +
          </div>

          <h2 className="mt-5 text-xl font-bold !text-slate-900">
            No matching applications
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 !text-slate-500">
            We couldn't find any applications matching your current search or
            filter. Try changing your filters or add a new application.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilterStatus("all");
                setSortOption("default");
              }}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold !text-slate-700 transition hover:bg-slate-50"
            >
              Clear filters
            </button>

            <Link
              to="/addApplications"
              className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold !text-white transition hover:bg-slate-800"
            >
              + Add Application
            </Link>
          </div>
        </div>
      ) : (
        /* Application Cards */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sortedApplications.map((app) => {
            const currentStatus = statusStyle[app.status] || {
              badge: "bg-slate-100 !text-slate-700 ring-slate-200",
              dot: "bg-slate-500",
            };

            return (
              <article
                key={app._id}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5"
              >
                {/* Top Accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-500 to-violet-500 opacity-0 transition group-hover:opacity-100" />

                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Company Initial */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-base font-black !text-white shadow-lg shadow-indigo-500/20">
                      {app.company?.charAt(0)?.toUpperCase() || "J"}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-extrabold tracking-tight !text-slate-900">
                        {app.company}
                      </h3>

                      <p className="mt-0.5 truncate text-sm !text-slate-500">
                        {app.role}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold capitalize ring-1 ${currentStatus.badge}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${currentStatus.dot}`}
                    />
                    {app.status}
                  </span>
                </div>

                {/* Location */}
                <div className="mt-5 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5">
                  <span className="text-sm !text-slate-400">📍</span>

                  <span className="truncate text-sm font-medium !text-slate-600">
                    {app.location}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-5 h-px bg-slate-100" />

                {/* Actions */}
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to={`/applications/${app._id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-3 py-2.5 text-xs font-bold !text-slate-700 transition hover:bg-slate-200"
                  >
                    View
                  </Link>

                  <Link
                    to={`/applications/${app._id}/edit`}
                    className="inline-flex items-center justify-center rounded-xl bg-indigo-50 px-3 py-2.5 text-xs font-bold !text-indigo-700 transition hover:bg-indigo-100"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-rose-50 px-3 py-2.5 text-xs font-bold !text-rose-700 transition hover:bg-rose-100"
                    onClick={() => deleteApplication(app._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <Outlet />
    </section>
  );
}

export default Applications;
