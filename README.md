# JobTracker

JobTracker is a full-stack job application management platform that helps users organize applications, track their progress, manage professional skills, and use AI to understand job descriptions and identify skill gaps.

## Live Demo

- **Frontend:** [Open JobTracker](https://job-tracker-e74zdmtsv-romil-patel.vercel.app/)
- **Source code:** [GitHub repository](https://github.com/romilpatel740-hue/Job_Tracker)

> The live application may depend on hosted backend and database services being available. Do not use real or sensitive personal information when testing a demo.

## Features

### Job application management
- Register and log in to an account.
- Create, view, update, and delete job applications.
- Track application progress from the dashboard.
- Open individual application details and manage application records.

### Profile and AI career tools
- Save and manage skills in your profile.
- Analyze a job description with Google Gemini.
- Extract relevant skills, keywords, experience requirements, and preparation topics.
- Compare saved skills with a job description to identify potential skill gaps.

### User experience
- Responsive React interface.
- Client-side routing for application pages.
- Centralized application state management with Redux Toolkit.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite |
| UI and styling | Tailwind CSS, shadcn/ui, Lucide |
| State management | Redux Toolkit, React Redux |
| Routing and HTTP | React Router, Axios |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Tokens, bcrypt |
| Validation | Zod |
| AI integration | Google Gemini |
| Deployment / serving | Vercel, Docker Compose, Nginx |

## Project Architecture

The project is organized into a React frontend and an Express backend:

- `frontend-react/` contains the React application, UI, routing, and client-side state.
- `backend/` contains the Express API, authentication, database configuration, models, middleware, validators, and AI endpoints.
- `docker-compose.yml` defines the backend and frontend services for a Docker-based local setup.

The frontend communicates with the backend through the `/api` routes. The backend currently mounts these route groups:

| Route | Purpose |
|---|---|
| `/api/auth` | Authentication |
| `/api/applications` | Job application operations |
| `/api/ai` | AI-powered job description analysis |

## Run Locally with Docker Compose

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- A MongoDB connection string
- A Google Gemini API key

### 1. Configure environment variables

From the repository root, create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 2. Build and start the application

```bash
docker compose up --build
```

Open [http://localhost](http://localhost) in your browser. Docker Compose serves the frontend through Nginx on port 80 and publishes the backend on port 5000. The frontend's `/api` requests are proxied to the backend.

### 3. Stop the application

```bash
docker compose down
```

## Run Locally Without Docker

### Prerequisites

- Node.js 22.12 or newer
- A MongoDB database
- A Google Gemini API key

### 1. Configure the backend

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5001
```

Install dependencies and start the backend:

```bash
cd backend
npm ci
npm run dev
```

### 2. Configure and start the frontend

Create `frontend-react/.env.local`:

```env
VITE_API_URL=http://localhost:5001/api
```

In a separate terminal:

```bash
cd frontend-react
npm ci
npm run dev
```

Open the local URL printed by Vite.

### 3. Useful frontend checks

Run these commands from `frontend-react/`:

```bash
npm run build
npm run lint
```

## Screenshots

### Dashboard
![JobTracker dashboard](Screenshot%20%28181%29.png)

### Job applications
![Job applications list](Screenshot%20%28182%29.png)

### AI job description analyzer
![AI job description analyzer](Screenshot%20%28185%29.png)

### AI analysis results
![AI analysis results](Screenshot%20%28186%29.png)

## Security Notes

- Keep environment files and API keys private. Never commit real credentials.
- Do not expose secrets through frontend environment variables; frontend build variables are visible to users.
- Use your own credentials when running the project locally.
- If a credential is accidentally published, rotate it with its provider. Removing it from a file or commit does not invalidate the exposed credential.

## Future Improvements

Potential areas for future development include automated tests, more detailed API documentation, and additional deployment and monitoring guidance.
