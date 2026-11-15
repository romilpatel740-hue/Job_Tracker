# JobTracker

JobTracker is a full-stack application for organizing job applications, tracking their progress, and using AI to analyze job descriptions and compare required skills with your own.

## Features

- Register and log in to your account
- Create, view, update, and delete job applications
- Review applications from the dashboard and browse application details
- Save skills to your profile
- Use AI to extract skills, keywords, experience requirements, and preparation topics from a job description
- Compare your saved skills against a job description

## Tech stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Axios
- **Backend:** Node.js, Express
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens
- **AI:** Google Gemini
- **Deployment:** Docker Compose, Nginx

## Run with Docker Compose

Install and start [Docker Desktop](https://www.docker.com/products/docker-desktop/) first. From the repository root, create a `.env` file containing your own credentials:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
```

Then build and start the services:

```bash
docker compose up --build
```

Open [http://localhost](http://localhost) in your browser. The frontend is served by Nginx on port 80, and `/api` requests are proxied to the backend. The backend is also published on port 5000.

To stop the services, press `Ctrl+C`, then run:

```bash
docker compose down
```

Keep `.env` private. Do not commit credentials or put them in frontend variables; frontend build variables are visible to users.

## Run locally without Docker

Use Node.js 22.12 or newer and have a MongoDB database available. In `backend/.env`, set:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=5001
```

Start the backend in one terminal:

```bash
cd backend
npm ci
npm run dev
```

In another terminal, create `frontend-react/.env.local` so the Vite development server sends requests to your local backend:

```env
VITE_API_URL=http://localhost:5001/api
```

Then start the frontend:

```bash
cd frontend-react
npm ci
npm run dev
```

Open the local URL printed by Vite. For a production frontend build, run `npm run build` from `frontend-react`; run `npm run lint` there to check the frontend.

## Project structure

```text
backend/          Express API, authentication, MongoDB models, and AI endpoints
frontend-react/   React application and Nginx configuration
frontend-vanilla/ Additional frontend source
docker-compose.yml
```

## Screenshots

![alt text](<Screenshot (181).png>)
![alt text](<Screenshot (182).png>)
![alt text](<Screenshot (186).png>) 
![alt text](<Screenshot (185).png>)

## Security

Store secrets in untracked environment files or a deployment secret manager. If a credential has been shared publicly or committed to Git, rotate it with its provider; deleting it from the current file alone does not invalidate it.
