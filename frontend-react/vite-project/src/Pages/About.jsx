function About() {
  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div>
          <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
            About
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            About JobTrack
          </h1>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <p className="text-lg leading-8 text-slate-600">
          JobTrack helps developers stay organized, focused, and confident through every step of the job search process.
        </p>
      </div>
    </section>
  );
}

export default About;