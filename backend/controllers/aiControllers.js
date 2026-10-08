import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAI(req, res) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents:
        "Explain what a REST API is in one simple sentence.",
    });

    res.status(200).json({
      message: response.text,
    });
  } catch (error) {
    console.error("Gemini test error:", error);

    res.status(500).json({
      message: "Gemini AI request failed",
      error: error.message,
    });
  }
}

export async function analyzeJobDescription(
  req,
  res
) {
  try {
    const { jobDescription } = req.body;

    if (
      !jobDescription ||
      !jobDescription.trim()
    ) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const prompt = `
You are an AI job description analyzer.

Analyze the following job description.

Return ONLY valid JSON.

Do not include markdown.
Do not include code fences.
Do not include explanations.

Use exactly this structure:

{
  "skills": [],
  "keywords": [],
  "experience": "",
  "aiSkills": [],
  "preparationTopics": []
}

Rules:

- "skills" should contain important technical skills
  mentioned in the job description.
- "keywords" should contain important technical
  keywords useful for ATS matching.
- "experience" should describe the required experience
  level if mentioned.
- "aiSkills" should contain AI, GenAI, LLM, prompt
  engineering, automation, or AI-related technologies
  mentioned in the job description.
- "preparationTopics" should contain useful topics
  the candidate should prepare based on the job description.
- Do not include soft skills unless they are directly
  related to a technical requirement.
- Do not invent requirements.

Job Description:

${jobDescription}
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

    let aiResult;

    try {
      aiResult = JSON.parse(response.text);
    } catch (error) {
      console.error(
        "Gemini returned invalid JSON:",
        response.text
      );

      return res.status(500).json({
        message:
          "AI returned an invalid JSON response",
      });
    }

    res.status(200).json(aiResult);
  } catch (error) {
    console.error(
      "Job description analysis error:",
      error
    );

    res.status(500).json({
      message:
        "Failed to analyze job description",
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

    const response =
      await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

    let aiResult;

    try {
      aiResult = JSON.parse(response.text);
    } catch (error) {
      console.error(
        "Gemini returned invalid JSON:",
        response.text
      );

      return res.status(500).json({
        message:
          "AI returned an invalid JSON response",
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