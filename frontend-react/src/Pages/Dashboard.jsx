import useApplications from "../hooks/useApplication";

function Dashboard() {
  const { applications } = useApplications();

  const total = applications.length;
  const applied = applications.filter((app) => app.status === "applied").length;
  const interview = applications.filter((app) => app.status === "interview").length;
  const offer = applications.filter((app) => app.status === "offer").length;

  const statusStyle = {
    applied: "bg-sky-100 text-sky-700",
    interview: "bg-amber-100 text-amber-700",
    offer: "bg-emerald-100 text-emerald-700",
    rejected: "bg-rose-100 text-rose-700",
  };

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
              Overview
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              JobTrack Dashboard
            </h1>
          </div>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Total", value: total, meta: "All tracked roles" },
          { label: "Applied", value: applied, meta: "Awaiting response" },
          { label: "Interview", value: interview, meta: "Active conversations" },
          { label: "Offer", value: offer, meta: "Strong momentum" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {card.label}
            </div>
            <div className="mt-4 text-3xl font-bold text-slate-900">{card.value}</div>
            <div className="mt-2 text-sm text-slate-600">{card.meta}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">Recent activity</h2>
        </div>

        {applications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            No applications yet. Add your first role to get started.
          </div>
        ) : (
          <ul className="space-y-3">
            {applications.slice(0, 4).map((app) => (
              <li
                key={app.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div>
                  <div className="font-semibold text-slate-900">{app.company}</div>
                  <div className="text-sm text-slate-600">{app.role}</div>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle[app.status] || "bg-slate-200 text-slate-700"}`}
                >
                  {app.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default Dashboard;