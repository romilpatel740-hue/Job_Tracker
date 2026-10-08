export async function testAI(req, res) {
  try {
    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:3b",
          prompt:
            "Explain what a REST API is in one simple sentence.",
          stream: false,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ollama request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    res.status(200).json({
      message: data.response,
    });
  } catch (error) {
    console.error("Ollama API error:", error);

    res.status(500).json({
      message: "AI request failed",
      error: error.message,
    });
  }
}

export async function analyzeJobDescription(req, res) {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const prompt = `
You are a job description analyzer.

Analyze the following job description.

Return ONLY valid JSON.
Do not include markdown.
Do not include code fences.
Do not include any explanation before or after the JSON.

Use exactly this structure:

{
  "skills": [],
  "keywords": [],
  "experience": "",
  "aiSkills": [],
  "preparationTopics": []
}

Rules:
- "skills" should contain important technical skills.
- "keywords" should contain important job-related keywords.
- "experience" should contain the experience requirement.
- "aiSkills" should contain AI, GenAI, LLM, or AI-related skills mentioned in the job description.
- "preparationTopics" should contain topics the candidate should prepare based on the job description.
- If a category has no relevant information, return an empty array or empty string.
- Do not invent requirements that are not reasonably supported by the job description.

Job Description:
${jobDescription}
`;

    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:3b",
          prompt,
          stream: false,
          format: "json",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ollama request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    let analysis;

    try {
      analysis = JSON.parse(data.response);
    } catch (error) {
      console.error(
        "AI returned invalid JSON:",
        data.response
      );

      return res.status(500).json({
        message: "AI returned an invalid JSON response",
        rawResponse: data.response,
      });
    }

    res.status(200).json({
      analysis,
    });
  } catch (error) {
    console.error(
      "Job description analysis error:",
      error
    );

    res.status(500).json({
      message: "Failed to analyze job description",
      error: error.message,
    });
  }
}

export async function matchSkills(req, res) {
  try {
    const {
      jobDescription,
      userSkills,
    } = req.body;

    if (
      !jobDescription ||
      !jobDescription.trim()
    ) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    if (
      !Array.isArray(userSkills) ||
      userSkills.length === 0
    ) {
      return res.status(400).json({
        message: "User skills are required",
      });
    }

    const prompt = `
You are an AI skill extraction assistant.

Analyze the job description and identify the important
technical skills explicitly required or preferred.

Return ONLY valid JSON.

Do not include markdown.
Do not include code fences.
Do not include explanations.

Use exactly this structure:

{
  "jobSkills": [],
  "preparationTopics": []
}

Rules:

- "jobSkills" must contain important technical skills
  mentioned in the job description.
- Use concise and standard skill names.
- Examples:
  "React.js" should be "React"
  "Node.js" should be "Node.js"
  "RESTful APIs" should be "REST API"
  "Amazon Web Services" should be "AWS"
- Do not include soft skills.
- Do not include unrelated requirements.
- Do not include skills that are not supported by the
  job description.
- "preparationTopics" should contain useful preparation
  topics based on the job description.
- Do not calculate a match percentage.
- Do not determine which candidate skills match.
- The backend will perform the matching and calculation.

Job Description:
${jobDescription}
`;

    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2:3b",
          prompt,
          stream: false,
          format: "json",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Ollama request failed with status ${response.status}`
      );
    }

    const data = await response.json();

    let aiResult;

    try {
      aiResult = JSON.parse(data.response);
    } catch (error) {
      console.error(
        "AI returned invalid JSON:",
        data.response
      );

      return res.status(500).json({
        message:
          "AI returned an invalid JSON response",
        rawResponse: data.response,
      });
    }

    const jobSkills = Array.isArray(
      aiResult.jobSkills
    )
      ? aiResult.jobSkills
      : [];

    const normalizedUserSkills =
      userSkills.map((skill) =>
        skill.trim().toLowerCase()
      );

    const matchedSkills = jobSkills.filter(
      (jobSkill) =>
        normalizedUserSkills.includes(
          jobSkill.trim().toLowerCase()
        )
    );

    const missingSkills = jobSkills.filter(
      (jobSkill) =>
        !normalizedUserSkills.includes(
          jobSkill.trim().toLowerCase()
        )
    );

    const matchPercentage =
      jobSkills.length === 0
        ? 0
        : Math.round(
            (matchedSkills.length /
              jobSkills.length) *
              100
          );

    const preparationMap = {
      docker: [
        "Docker fundamentals",
        "Docker images and containers",
      ],

      aws: [
        "AWS fundamentals",
        "Basic AWS services",
      ],

      "rest api": [
        "REST API design",
        "HTTP methods and status codes",
      ],

      "ci/cd": [
        "CI/CD pipelines",
        "Continuous integration and deployment",
      ],

      javascript: [
        "JavaScript fundamentals",
        "Modern JavaScript ES6+",
      ],

      react: [
        "React fundamentals",
        "React components and hooks",
      ],

      "node.js": [
        "Node.js fundamentals",
        "Node.js backend development",
      ],

      express: [
        "Express.js fundamentals",
        "Express REST APIs",
      ],

      mongodb: [
        "MongoDB fundamentals",
        "MongoDB CRUD operations",
      ],
    };

    const preparationTopics = [];

    missingSkills.forEach((skill) => {
      const key = skill.trim().toLowerCase();

      const topics = preparationMap[key];

      if (topics) {
        topics.forEach((topic) => {
          if (!preparationTopics.includes(topic)) {
            preparationTopics.push(topic);
          }
        });
      } else {
        const topic = `${skill} fundamentals`;

        if (!preparationTopics.includes(topic)) {
          preparationTopics.push(topic);
        }
      }
    });

    res.status(200).json({
      matchResult: {
        jobSkills,
        matchedSkills,
        missingSkills,
        preparationTopics,
        matchPercentage,
      },
    });
  } catch (error) {
    console.error(
      "Skill matching error:",
      error
    );

    res.status(500).json({
      message: "Failed to match skills",
      error: error.message,
    });
  }
}