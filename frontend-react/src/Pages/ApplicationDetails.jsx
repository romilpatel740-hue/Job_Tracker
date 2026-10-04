import { useParams } from "react-router-dom";
import useApplications from "../hooks/useApplication";
import { Timeline } from "@/components/ui/timeline";

function ApplicationDetails() {
  const { id } = useParams();
  const { getApplicationById } = useApplications();
  const application = getApplicationById(id);

  const statusStyle = {
    applied: {
      wrapper: "border-sky-200 bg-sky-50",
      badge: "bg-sky-100 text-sky-700 border-sky-200",
      dot: "bg-sky-500",
    },

    interview: {
      wrapper: "border-amber-200 bg-amber-50",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },

    offer: {
      wrapper: "border-emerald-200 bg-emerald-50",
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },

    rejected: {
      wrapper: "border-rose-200 bg-rose-50",
      badge: "bg-rose-100 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
    },
  };

  const currentStatus =
    statusStyle[application?.status] || {
      wrapper: "border-slate-200 bg-slate-50",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
      dot: "bg-slate-500",
    };

  const timelineData = application
    ? [
        {
          title: "Company",
          content: (
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-lg font-bold text-indigo-600">
                  C
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Company
                  </p>

                  <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    {application.company}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Company associated with this job opportunity.
                  </p>
                </div>
              </div>
            </div>
          ),
        },

        {
          title: "Role",
          content: (
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg hover:shadow-cyan-100/50 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-lg font-bold text-cyan-600">
                  R
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Position
                  </p>

                  <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    {application.role}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Position associated with this application.
                  </p>
                </div>
              </div>
            </div>
          ),
        },

        {
          title: "Location",
          content: (
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-lg font-bold text-violet-600">
                  L
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Job Location
                  </p>

                  <p className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                    {application.location}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Location associated with this opportunity.
                  </p>
                </div>
              </div>
            </div>
          ),
        },

        {
          title: "Status",
          content: (
            <div
              className={`rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6 ${currentStatus.wrapper}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg font-bold shadow-sm`}
                >
                  <span
                    className={`h-3 w-3 rounded-full ${currentStatus.dot}`}
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    Current Status
                  </p>

                  <div className="mt-2">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-bold capitalize ${currentStatus.badge}`}
                    >
                      {application.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Current status of this job application.
                  </p>
                </div>
              </div>
            </div>
          ),
        },
      ]
    : [];

  return (
    <section className="space-y-6">
      {/* Page Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-indigo-50/50 to-cyan-50/50 p-6 shadow-sm sm:p-8">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-40 w-40 rounded-full bg-cyan-200/30 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
            Details
          </span>

          <h1 className="mt-4 bg-gradient-to-r from-slate-900 via-indigo-700 to-cyan-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
            Application Details
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            View a structured overview of your job application and its
            current status.
          </p>
        </div>
      </header>

      {/* Timeline */}
      {application ? (
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <Timeline
            title="Application Overview"
            description={`A structured overview of your application for the ${application.role} position at ${application.company}.`}
            data={timelineData}
          />
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            ?
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Application not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The application you're looking for doesn't exist.
          </p>
        </div>
      )}
    </section>
  );
}

export default ApplicationDetails;