import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApplication from "../hooks/useApplication";

function AddApplication() {
  const navigate = useNavigate();
  const { addApplication } = useApplication();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("applied");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !company.trim() ||
      !role.trim() ||
      !location.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    addApplication({
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      status,
    });

    navigate("/applications");
  }

  return (
    <section className="space-y-7">
      {/* Header */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] !text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            New opportunity
          </span>

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight !text-white sm:text-4xl">
              Add Application
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 !text-slate-300 sm:text-base">
              Add a new job opportunity to your application
              pipeline and keep your job search organized.
            </p>
          </div>
        </div>
      </header>

      {/* Form Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="border-b border-slate-100 pb-5">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] !text-indigo-600">
            Application details
          </span>

          <h2 className="mt-1 text-xl font-bold tracking-tight !text-slate-950">
            Tell us about the opportunity
          </h2>

          <p className="mt-1 text-sm !text-slate-500">
            Fill in the details below to add this application.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
            <span className="mt-0.5 !text-rose-600">⚠</span>

            <p className="text-sm font-medium !text-rose-700">
              {error}
            </p>
          </div>
        )}

        <form
          className="mt-6 grid gap-5 md:grid-cols-2"
          onSubmit={handleSubmit}
        >
          {/* Company */}
          <div className="space-y-2">
            <label
              htmlFor="company"
              className="block text-sm font-semibold !text-slate-700"
            >
              Company
              <span className="ml-1 !text-rose-500">*</span>
            </label>

            <input
              id="company"
              type="text"
              value={company}
              onChange={(event) => {
                setCompany(event.target.value);
                setError("");
              }}
              placeholder="e.g. Google"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-sm font-semibold !text-slate-700"
            >
              Job Role
              <span className="ml-1 !text-rose-500">*</span>
            </label>

            <input
              id="role"
              type="text"
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
                setError("");
              }}
              placeholder="e.g. Full Stack Developer"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Location */}
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="location"
              className="block text-sm font-semibold !text-slate-700"
            >
              Location
              <span className="ml-1 !text-rose-500">*</span>
            </label>

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm !text-slate-400">
                📍
              </span>

              <input
                id="location"
                type="text"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setError("");
                }}
                placeholder="e.g. Ahmedabad, Gujarat"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-11 text-sm !text-slate-900 outline-none transition placeholder:!text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2 md:col-span-2">
            <label
              htmlFor="status"
              className="block text-sm font-semibold !text-slate-700"
            >
              Application Status
            </label>

            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium !text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold !text-white shadow-lg shadow-slate-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              + Add Application
            </button>

            <button
              type="button"
              onClick={() => navigate("/applications")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold !text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddApplication;