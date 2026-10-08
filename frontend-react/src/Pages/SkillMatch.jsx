import { useState } from "react";

function SkillMatch() {
  const [jobDescription, setJobDescription] =
    useState("");

  const [skills] = useState(() => {
    const savedSkills =
      localStorage.getItem("jobTrackSkills");

    return savedSkills
      ? JSON.parse(savedSkills)
      : [];
  });

  const [matchResult, setMatchResult] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleMatch() {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    if (skills.length === 0) {
      setError(
        "Please add your skills in your profile first."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMatchResult(null);

      const response = await fetch(
        "https://jobtracker-backend-eiaz.onrender.com/api/ai/match-skills",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            jobDescription,
            userSkills: skills,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to match skills"
        );
      }

      setMatchResult(data.matchResult);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Header */}
      <div className="text-center">

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          AI Skill Match
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Compare your skills with a job description and
          discover how well you match the role.
        </p>

      </div>

      {/* Your Skills */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-900">
          Your Skills
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">

          {skills.length > 0 ? (
            skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No skills found. Add skills from your
              Profile first.
            </p>
          )}

        </div>

      </div>

      {/* Job Description */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <label
          htmlFor="jobDescription"
          className="block text-sm font-semibold text-slate-800"
        >
          Job Description
        </label>

        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(event) =>
            setJobDescription(event.target.value)
          }
          placeholder="Paste the job description here..."
          rows={12}
          className="mt-3 w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            AI will compare your saved skills with the
            requirements in this job description.
          </p>

          <button
            onClick={handleMatch}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Analyzing..."
              : "Check My Match"}
          </button>

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 text-center">

          <p className="text-sm font-medium text-blue-700">
            AI is comparing your skills...
          </p>

          <p className="mt-1 text-xs text-blue-600">
            This may take a few seconds because the AI
            model is running locally.
          </p>

        </div>
      )}

      {/* Results */}
      {matchResult && (
        <div className="space-y-6">

          {/* Match Percentage */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Your Match
            </p>

            <p className="mt-3 text-6xl font-bold text-blue-600">
              {matchResult.matchPercentage}%
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Based on your saved skills and the job
              requirements.
            </p>

          </div>

          {/* Matched + Missing */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Matched Skills */}
            <div className="rounded-2xl border border-green-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold text-slate-900">
                Matched Skills
              </h2>

              <div className="mt-4 space-y-2">

                {matchResult.matchedSkills.length > 0 ? (
                  matchResult.matchedSkills.map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 rounded-xl bg-green-50 p-3"
                      >
                        <span className="font-bold text-green-600">
                          ✓
                        </span>

                        <span className="text-sm font-medium text-green-800">
                          {skill}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-sm text-slate-500">
                    No matching skills found.
                  </p>
                )}

              </div>

            </div>

            {/* Missing Skills */}
            <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">

              <h2 className="text-lg font-semibold text-slate-900">
                Skills to Improve
              </h2>

              <div className="mt-4 space-y-2">

                {matchResult.missingSkills.length > 0 ? (
                  matchResult.missingSkills.map(
                    (skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-3 rounded-xl bg-red-50 p-3"
                      >
                        <span className="font-bold text-red-600">
                          ✗
                        </span>

                        <span className="text-sm font-medium text-red-800">
                          {skill}
                        </span>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-sm text-green-600">
                    Great! No major missing skills
                    identified.
                  </p>
                )}

              </div>

            </div>

          </div>

          {/* Preparation Topics */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Preparation Topics
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {matchResult.preparationTopics.length > 0 ? (
                matchResult.preparationTopics.map(
                  (topic, index) => (
                    <div
                      key={topic}
                      className="flex items-start gap-3 rounded-xl bg-slate-50 p-4"
                    >

                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                        {index + 1}
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {topic}
                      </span>

                    </div>
                  )
                )
              ) : (
                <p className="text-sm text-slate-500">
                  No additional preparation topics
                  identified.
                </p>
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default SkillMatch;