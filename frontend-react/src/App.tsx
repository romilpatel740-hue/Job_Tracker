import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Applications from "./Pages/Applications";
import AddApplication from "./Pages/AddApplication";
import About from "./Pages/About";
import ApplicationDetails from "./Pages/ApplicationDetails";
import NotFound from "./Pages/NotFound";
import Navbar from "./Navbar";
import AIAnalyzer from "./Pages/AIAnalyzer";
import EditApplication from "./Pages/EditApplication";
import Profile from "./Pages/Profile";
import SkillMatch from "./Pages/SkillMatch";
import Auth from "./components/auth";

function App() {
  const [user, setUser] = useState(null);

  // Check if user is already logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // If user is not logged in, show the Auth screen across all routes
  if (!user) {
    return <Auth onLoginSuccess={(userData) => setUser(userData)} />;
  }

  return (
    <div className="min-h-screen text-slate-900 bg-slate-50">
      <BrowserRouter>
        <Navbar title="JobTrack" onLogout={handleLogout} />

        <main className="mx-auto min-h-[calc(100vh-73px)] max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/applications" element={<Applications />}>
              <Route path=":id" element={<ApplicationDetails />} />
            </Route>

            <Route path="/addApplications" element={<AddApplication />} />

            <Route
              path="/applications/:id/edit"
              element={<EditApplication />}
            />

            <Route path="/ai-analyzer" element={<AIAnalyzer />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/skill-match" element={<SkillMatch />} />

            <Route path="/about" element={<About />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;