import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useApplications from "../hooks/useApplication";

function Applications() {
  const { applications, deleteApplication } = useApplications();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortOption, setSortOption] = useState("default");

  const statusStyle = {
    applied: "bg-sky-100 text-sky-700",
    interview: "bg-amber-100 text-amber-700",
    offer: "bg-emerald-100 text-emerald-700",
    rejected: "bg-rose-100 text-rose-700",
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
    sortedApplications.sort((a, b) => b.id - a.id);
  }

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-700">
            Pipeline
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Applications
          </h1>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        <input
          type="text"
          placeholder="Search company or role..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
        />

        <select
          value={filterStatus}
          onChange={(event) => setFilterStatus(event.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="all">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-indigo-500"
        >
          <option value="default">Default Order</option>
          <option value="company-asc">Company A-Z</option>
          <option value="company-desc">Company Z-A</option>
          <option value="newest">Newest First</option>
        </select>
      </div>

      {sortedApplications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
          No matching applications found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedApplications.map((app) => (
            <article
              key={app.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="space-y-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle[app.status] || "bg-slate-200 text-slate-700"}`}
                >
                  {app.status}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {app.company}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{app.role}</p>
                  <p className="mt-1 text-sm text-slate-500">{app.location}</p>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <Link
                  to={`/applications/${app.id}`}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                >
                  View
                </Link>
                <Link
                  to={`/applications/${app.id}/edit`}
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                >
                  Edit
                </Link>
                <button
                  className="inline-flex items-center justify-center rounded-lg bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                  onClick={() => deleteApplication(app.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <Outlet />
    </section>
  );
}

export default Applications;
