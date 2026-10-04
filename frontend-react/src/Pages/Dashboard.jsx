import { Link } from "react-router-dom";
import useApplications from "../hooks/useApplication";

function Dashboard() {
  const { applications } = useApplications();

  const total = applications.length;

  const applied = applications.filter(
    (app) => app.status === "applied"
  ).length;

  const interview = applications.filter(
    (app) => app.status === "interview"
  ).length;

  const offer = applications.filter(
    (app) => app.status === "offer"
  ).length;

  const cards = [
    {
      label: "Total Applications",
      value: total,
      description: "All tracked opportunities",
      icon: "01",
      gradient: "from-indigo-500 to-violet-600",
      shadow: "shadow-indigo-500/20",
    },
    {
      label: "Applied",
      value: applied,
      description: "Applications awaiting response",
      icon: "02",
      gradient: "from-sky-500 to-cyan-500",
      shadow: "shadow-cyan-500/20",
    },
    {
      label: "Interviews",
      value: interview,
      description: "Active interview opportunities",
      icon: "03",
      gradient: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/20",
    },
    {
      label: "Offers",
      value: offer,
      description: "Successful opportunities",
      icon: "04",
      gradient: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20",
    },
  ];

  const statusStyle = {
    applied: "bg-sky-50 text-sky-700 ring-sky-200",
    interview: "bg-amber-50 text-amber-700 ring-amber-200",
    offer: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  return (
    <section className="space-y-8">

      {/* Hero Section */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8 lg:p-10">

        {/* Background effects */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">

          {/* Small Label */}
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] !text-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            Career command center
          </span>

          {/* Heading */}
          <h1 className="mt-5 text-3xl font-extrabold tracking-tight !text-white sm:text-4xl lg:text-5xl">
            Your job search,
            <span className="block bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
              organized.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-sm leading-7 !text-slate-300 sm:text-base">
            Track applications, monitor your progress, and keep every
            opportunity organized in one place.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            {/* Add Application */}
            <Link
              to="/addApplications"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold !text-slate-950 shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              + Add Application
            </Link>

            {/* View Applications */}
            <Link
              to="/applications"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold !text-white transition duration-200 hover:bg-white/10"
            >
              View Applications
            </Link>

          </div>
        </div>
      </header>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => (
          <div
            key={card.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            {/* Card Background Effect */}
            <div
              className={`absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl transition group-hover:opacity-20`}
            />

            <div className="relative">

              {/* Card Header */}
              <div className="flex items-center justify-between">

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] !text-slate-400">
                  {card.label}
                </span>

                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${card.gradient} text-[10px] font-black !text-white shadow-lg ${card.shadow}`}
                >
                  {card.icon}
                </span>

              </div>

              {/* Count */}
              <div className="mt-6 text-4xl font-extrabold tracking-tight !text-slate-950">
                {card.value}
              </div>

              {/* Description */}
              <p className="mt-2 text-sm !text-slate-500">
                {card.description}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* Recent Applications */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        {/* Section Header */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] !text-indigo-600">
              Activity
            </span>

            <h2 className="mt-1 text-xl font-bold tracking-tight !text-slate-950">
              Recent applications
            </h2>
          </div>

          <Link
            to="/applications"
            className="text-sm font-semibold !text-indigo-600 transition hover:!text-indigo-700"
          >
            View all →
          </Link>

        </div>

        {/* Applications Content */}
        <div className="p-5 sm:p-6">

          {/* Empty State */}
          {applications.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/70 p-10 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold !text-indigo-600">
                +
              </div>

              <h3 className="mt-4 font-bold !text-slate-900">
                No applications yet
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 !text-slate-500">
                Add your first job application and start building your
                pipeline.
              </p>

              <Link
                to="/addApplications"
                className="mt-5 inline-flex rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-slate-800"
              >
                Add your first application
              </Link>

            </div>

          ) : (

            /* Applications List */
            <ul className="space-y-3">

              {applications.slice(0, 4).map((app) => (

                <li
                  key={app.id}
                  className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition duration-200 hover:border-indigo-200 hover:bg-indigo-50/30 sm:flex-row sm:items-center sm:justify-between"
                >

                  {/* Company + Role */}
                  <div className="flex items-center gap-3">

                    {/* Company Initial */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sm font-black !text-indigo-600 shadow-sm ring-1 ring-slate-200">
                      {app.company?.charAt(0)?.toUpperCase() || "J"}
                    </div>

                    {/* Application Information */}
                    <div>
                      <div className="font-bold !text-slate-900">
                        {app.company}
                      </div>

                      <div className="mt-0.5 text-sm !text-slate-500">
                        {app.role}
                      </div>
                    </div>

                  </div>

                  {/* Status */}
                  <span
                    className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-bold capitalize ring-1 ${
                      statusStyle[app.status] ||
                      "bg-slate-100 text-slate-700 ring-slate-200"
                    }`}
                  >
                    {app.status}
                  </span>

                </li>

              ))}

            </ul>

          )}

        </div>
      </div>

    </section>
  );
}

export default Dashboard;