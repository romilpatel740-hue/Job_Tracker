import { useState } from "react";

function Profile() {
  const [skillInput, setSkillInput] = useState("");

  const [skills, setSkills] = useState(() => {
    const savedSkills = localStorage.getItem("jobTrackSkills");

    return savedSkills
      ? JSON.parse(savedSkills)
      : [];
  });

  function handleAddSkill() {
    const skill = skillInput.trim();

    if (!skill) {
      return;
    }

    if (
      skills.some(
        (existingSkill) =>
          existingSkill.toLowerCase() ===
          skill.toLowerCase()
      )
    ) {
      return;
    }

    const updatedSkills = [...skills, skill];

    setSkills(updatedSkills);

    localStorage.setItem(
      "jobTrackSkills",
      JSON.stringify(updatedSkills)
    );

    setSkillInput("");
  }

  function handleRemoveSkill(skillToRemove) {
    const updatedSkills = skills.filter(
      (skill) => skill !== skillToRemove
    );

    setSkills(updatedSkills);

    localStorage.setItem(
      "jobTrackSkills",
      JSON.stringify(updatedSkills)
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Manage your skills for AI-powered job matching.
        </p>
      </div>

      {/* Skills Section */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-900">
          My Skills
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add the technologies and skills you currently know.
        </p>

        {/* Add Skill */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <input
            type="text"
            value={skillInput}
            onChange={(event) =>
              setSkillInput(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddSkill();
              }
            }}
            placeholder="Enter a skill e.g. React"
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

          <button
            onClick={handleAddSkill}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            Add Skill
          </button>

        </div>

        {/* Skills */}
        <div className="mt-6">

          {skills.length === 0 ? (
            <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
              No skills added yet.
            </p>
          ) : (
            <div className="flex flex-wrap gap-3">

              {skills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                >
                  <span>{skill}</span>

                  <button
                    onClick={() =>
                      handleRemoveSkill(skill)
                    }
                    className="font-bold text-blue-500 transition hover:text-red-600"
                    aria-label={`Remove ${skill}`}
                  >
                    ×
                  </button>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* AI Matching Info */}
      <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6">

        <h2 className="text-lg font-semibold text-purple-900">
          AI Skill Matching
        </h2>

        <p className="mt-2 text-sm leading-6 text-purple-800">
          These saved skills will later be compared with job
          descriptions using AI to identify your matching
          skills and skills you should improve.
        </p>

      </div>

    </div>
  );
}

export default Profile;