import { Link } from "react-router-dom";

function About() {
  return (
    <section className="space-y-7">
      {/* Hero */}
      <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8 lg:p-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] !text-indigo-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            About JobTrack
          </span>

          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Organize your job search.
            <span className="block text-indigo-300">
              One application at a time.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            JobTrack is a simple job application management
            system designed to help you keep track of the
            opportunities you apply for, monitor their progress,
            and stay organized throughout your job search.
          </p>
        </div>
      </header>

      {/* What is JobTrack */}
      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">
            The idea
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            What is JobTrack?
          </h2>

          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              Job searching can quickly become difficult to
              manage when applications are spread across
              different websites, notes, spreadsheets, and
              messages.
            </p>

            <p>
              JobTrack brings those applications together in
              one place. You can record an opportunity, track
              its current status, search through applications,
              and update information whenever something
              changes.
            </p>

            <p>
              The goal is simple: spend less time remembering
              where you applied and more time preparing for the
              opportunities that matter.
            </p>
          </div>
        </div>

        {/* Purpose */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-black text-white shadow-lg shadow-indigo-500/20">
            J
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-950">
            Built for focused job searching
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Keep your opportunities organized and maintain a
            clear view of your application pipeline.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">
            What you can do
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Everything in one place
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            JobTrack provides the core tools needed to manage
            your application pipeline.
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon="＋"
            title="Add"
            description="Create a new application with company, role, location, and status."
          />

          <FeatureCard
            icon="⌕"
            title="Search"
            description="Quickly find applications by company or job role."
          />

          <FeatureCard
            icon="↻"
            title="Update"
            description="Edit application information whenever your progress changes."
          />

          <FeatureCard
            icon="▣"
            title="Track"
            description="Monitor applications across applied, interview, offer, and rejected stages."
          />
        </div>
      </div>

      {/* How it works */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-600">
            Simple workflow
          </span>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            How JobTrack works
          </h2>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <StepCard
            number="01"
            title="Add an application"
            description="Enter the company, role, location, and current application status."
          />

          <StepCard
            number="02"
            title="Track progress"
            description="Use statuses to understand where each opportunity currently stands."
          />

          <StepCard
            number="03"
            title="Stay organized"
            description="Search, filter, sort, edit, and manage your applications from one dashboard."
          />
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl border border-indigo-100 bg-indigo-50 p-6 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Ready to manage your applications?
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Start building your application pipeline with
              JobTrack.
            </p>
          </div>

          <Link
            to="/applications"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            View Applications →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg font-bold text-indigo-600 shadow-sm ring-1 ring-slate-200">
        {icon}
      </div>

      <h3 className="mt-4 text-base font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function StepCard({ number, title, description }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 p-5">
      <span className="text-xs font-black tracking-[0.15em] text-indigo-500">
        {number}
      </span>

      <h3 className="mt-3 text-base font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default About;