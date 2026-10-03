import { useParams } from "react-router-dom";
import useApplications from "../hooks/useApplication";

function ApplicationDetails() {
  const { id } = useParams();
  const { getApplicationById } = useApplications();
  const application = getApplicationById(id);

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
          <span className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Details
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Application Details
          </h1>
        </div>
      </header>

      {application ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Company", application.company],
              ["Role", application.role],
              ["Location", application.location],
              [
                "Status",
                <span
                  key="status"
                  className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle[application.status] || "bg-slate-200 text-slate-700"}`}
                >
                  {application.status}
                </span>,
              ],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {label}
                </div>
                <div className="mt-2 text-lg font-semibold text-slate-900">{value}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
          Application not found.
        </div>
      )}
    </section>
  );
}

export default ApplicationDetails;
