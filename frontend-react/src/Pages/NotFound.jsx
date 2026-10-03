import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="text-5xl font-black text-indigo-600 sm:text-7xl">404</div>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">Page not found</h2>
        <p className="mt-3 text-slate-600">
          The page you are looking for does not exist.
        </p>

        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:opacity-95"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;