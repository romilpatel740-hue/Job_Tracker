import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApplication from "../hooks/useApplication";

function EditApplication() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    getApplicationById,
    updateApplication,
  } = useApplication();

  const application = getApplicationById(id);

  const [company, setCompany] = useState(
    application?.company || ""
  );
  const [role, setRole] = useState(
    application?.role || ""
  );
  const [location, setLocation] = useState(
    application?.location || ""
  );
  const [status, setStatus] = useState(
    application?.status || "applied"
  );

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

  updateApplication(Number(id), {
  company: company.trim(),
  role: role.trim(),
  location: location.trim(),
  status,
});

  navigate("/applications");
}

  if (!application) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
        Application not found.
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
            Update
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Edit Application
          </h1>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        {error && (
          <p className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        )}
        <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Company</label>
          <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            type="text"
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
          />
        </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">Role</label>
          <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            type="text"
            value={role}
            onChange={(event) =>
              setRole(event.target.value)
            }
          />
        </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Location</label>
          <input
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            type="text"
            value={location}
            onChange={(event) =>
              setLocation(event.target.value)
            }
          />
        </div>

          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-slate-700">Status</label>

          <select
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >
            <option value="applied">Applied</option>
            <option value="interview">Interview</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

          <div className="flex flex-col gap-3 sm:flex-row md:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-95"
            >
              Update Application
            </button>
            <button
              type="button"
              onClick={() => navigate("/applications")}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditApplication;