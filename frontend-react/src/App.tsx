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
import Auth, { type UserData } from "./components/auth";

// Vanta Background Component Wrapper
function VantaBackground({ children }: { children: React.ReactNode }) {
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error(`Failed to load script ${src}`));
        document.body.appendChild(script);
      });
    };

    let isMounted = true;

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js")
      .then(() => loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js"))
      .then(() => {
        if (isMounted && !vantaEffect && (window as any).VANTA) {
          setVantaEffect(
            (window as any).VANTA.GLOBE({
              el: "#vanta-globe-container",
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0xff0055,       // Globe line color
              color2: 0x2a2b42,      // Secondary accent color
              backgroundColor: 0x0d1117 // Background color of the container
            })
          );
        }
      })
      .catch((err) => console.error("Error loading Vanta scripts:", err));

    return () => {
      isMounted = false;
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div id="vanta-globe-container" style={{ width: "100%", minHeight: "100vh", position: "relative" }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState<UserData | null>(null);

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

  // If user is not logged in, show the Auth screen wrapped in the Vanta background
  if (!user) {
    return (
      <VantaBackground>
        <Auth onLoginSuccess={(userData) => setUser(userData)} />
      </VantaBackground>
    );
  }

  return (
    <VantaBackground>
      <div className="min-h-screen text-slate-100">
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
    </VantaBackground>
  );
}

export default App;