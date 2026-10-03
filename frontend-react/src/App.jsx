import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Applications from "./Pages/Applications";
import AddApplication from "./Pages/AddApplication";
import About from "./Pages/About";
import ApplicationDetails from "./Pages/ApplicationDetails";
import NotFound from "./Pages/NotFound";
import Navbar from "./Navbar";
import EditApplication from "./Pages/EditApplication";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <BrowserRouter>
        <Navbar title="JobTrack" />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/applications" element={<Applications />}>
              <Route path=":id" element={<ApplicationDetails />} />
            </Route>
            <Route path="/addApplications" element={<AddApplication />} />
            <Route path="/applications/:id/edit" element={<EditApplication />}/>
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
