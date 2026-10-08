import { useState } from "react";

function AIAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setAnalysis(null);

      const response = await fetch(
        "http://localhost:5001/api/ai/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jobDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to analyze job description"
        );
      }

      setAnalysis(data.analysis);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          AI Job Description Analyzer
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Paste a job description and let AI identify the
          important skills, keywords, AI requirements, and
          preparation topics.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

        <label
          htmlFor="jobDescription"
          className="mb-2 block text-sm font-semibold text-slate-800"
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
          rows={10}
          className="w-full resize-y rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            AI will analyze the job requirements and return
            structured results.
          </p>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Analyzing..."
              : "Analyze with AI"}
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
            AI is analyzing the job description...
          </p>

          <p className="mt-1 text-xs text-blue-600">
            This may take a few seconds because the AI model
            is running locally.
          </p>
        </div>
      )}

      {/* Results */}
      {analysis && (
        <div className="space-y-6">

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              AI Analysis
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Important information extracted from the job
              description.
            </p>
          </div>

          {/* Skills + Keywords */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Skills */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Required Skills
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Important Keywords
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {analysis.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Experience + AI Skills */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Experience */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                Experience Requirement
              </h3>

              <p className="mt-4 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {analysis.experience}
              </p>
            </div>

            {/* AI Skills */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                AI / GenAI Skills
              </h3>

              {analysis.aiSkills.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {analysis.aiSkills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-sm text-slate-500">
                  No AI-related skills were identified.
                </p>
              )}
            </div>

          </div>

          {/* Preparation Topics */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <h3 className="text-lg font-semibold text-slate-900">
              Preparation Topics
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {analysis.preparationTopics.map(
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
              )}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AIAnalyzer;