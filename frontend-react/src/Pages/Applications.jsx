import { Link, Outlet } from "react-router-dom";
import useApplications from "../hooks/useApplication";

function Applications() {
  const { applications, deleteApplication } = useApplications();

  const statusStyle = {
    applied: "bg-sky-100 text-sky-700",
    interview: "bg-amber-100 text-amber-700",
    offer: "bg-emerald-100 text-emerald-700",
    rejected: "bg-rose-100 text-rose-700",
  };

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

      {applications.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
          No applications yet. Start by adding your first opportunity.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {applications.map((app) => (
            <article key={app.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="space-y-3">
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle[app.status] || "bg-slate-200 text-slate-700"}`}
                >
                  {app.status}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{app.company}</h3>
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
