// import { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import DashboardCard from "./DashboardCard";
// import ApiTest from "./ApiTest";

// function App() {
//   // Load applications from localStorage
//   const [applications, setApplications] = useState(() => {
//     const savedApplications = localStorage.getItem("jobApplication");

//     return savedApplications ? JSON.parse(savedApplications) : [];
//   });

//   // Form states
//   const [company, setCompany] = useState("");
//   const [role, setRole] = useState("");
//   const [location, setLocation] = useState("");
//   const [status, setStatus] = useState("applied");

//   // Filter and sort states
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [sortOption, setSortOption] = useState("default");

//   // Edit state
//   const [editingId, setEditingId] = useState(null);

//   // Search state
//   const [search, setSearch] = useState("");

//   // Save applications to localStorage whenever applications change
//   useEffect(() => {
//     localStorage.setItem(
//       "jobApplication",
//       JSON.stringify(applications)
//     );
//   }, [applications]);

//   // Add / Update application
//   function handleSubmit(event) {
//     event.preventDefault();

//     if (editingId === null) {
//       // Add new application
//       const newApplication = {
//         id: Date.now(),
//         company,
//         role,
//         location,
//         status,
//       };

//       setApplications([...applications, newApplication]);
//     } else {
//       // Update existing application
//       setApplications(
//         applications.map((app) =>
//           app.id === editingId
//             ? {
//                 ...app,
//                 company,
//                 role,
//                 location,
//                 status,
//               }
//             : app
//         )
//       );

//       setEditingId(null);
//     }

//     // Reset form
//     setCompany("");
//     setRole("");
//     setLocation("");
//     setStatus("applied");
//   }

//   // Delete application
//   function deleteApplication(id) {
//     setApplications(
//       applications.filter((app) => app.id !== id)
//     );
//   }

//   // Edit application
//   function editApplication(id) {
//     const appToEdit = applications.find(
//       (app) => app.id === id
//     );

//     if (!appToEdit) return;

//     setEditingId(id);

//     setCompany(appToEdit.company);
//     setRole(appToEdit.role);
//     setLocation(appToEdit.location);
//     setStatus(appToEdit.status.toLowerCase());
//   }

//   // Search + Status Filter
//   const filteredApplications = applications.filter((app) => {
//     const matchesSearch = app.company
//       .toLowerCase()
//       .includes(search.toLowerCase());

//     const matchesStatus =
//       filterStatus === "all" ||
//       app.status.toLowerCase() === filterStatus.toLowerCase();

//     return matchesSearch && matchesStatus;
//   });

//   // Create a copy before sorting
//   const sortedApplications = [...filteredApplications];

//   // Company A → Z
//   if (sortOption === "company-asc") {
//     sortedApplications.sort((a, b) =>
//       a.company.localeCompare(b.company)
//     );
//   }

//   // Company Z → A
//   if (sortOption === "company-desc") {
//     sortedApplications.sort((a, b) =>
//       b.company.localeCompare(a.company)
//     );
//   }

//   // Newest → Oldest
//   if (sortOption === "newest") {
//     sortedApplications.sort((a, b) => b.id - a.id);
//   }

//   return (
//     <div>
//       <Navbar title="JobTrack" />

//       <h2>Job Application Dashboard</h2>

//       {/* Dashboard Cards */}

//       <DashboardCard
//         title="Total Applications"
//         count={applications.length}
//       />

//       <DashboardCard
//         title="Applied"
//         count={
//           applications.filter(
//             (app) =>
//               app.status.toLowerCase() === "applied"
//           ).length
//         }
//       />

//       <DashboardCard
//         title="Interview"
//         count={
//           applications.filter(
//             (app) =>
//               app.status.toLowerCase() === "interview"
//           ).length
//         }
//       />

//       <DashboardCard
//         title="Offer"
//         count={
//           applications.filter(
//             (app) =>
//               app.status.toLowerCase() === "offer"
//           ).length
//         }
//       />

//       {/* Application Form */}

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Company"
//           value={company}
//           onChange={(event) =>
//             setCompany(event.target.value)
//           }
//         />

//         <input
//           type="text"
//           placeholder="Role"
//           value={role}
//           onChange={(event) =>
//             setRole(event.target.value)
//           }
//         />

//         <input
//           type="text"
//           placeholder="Location"
//           value={location}
//           onChange={(event) =>
//             setLocation(event.target.value)
//           }
//         />

//         <select
//           value={status}
//           onChange={(event) =>
//             setStatus(event.target.value)
//           }
//         >
//           <option value="applied">Applied</option>
//           <option value="interview">Interview</option>
//           <option value="offer">Offer</option>
//           <option value="rejected">Rejected</option>
//         </select>

//         <button type="submit">
//           {editingId === null
//             ? "Add Application"
//             : "Update Application"}
//         </button>
//       </form>

//       {/* Search, Filter and Sort */}

//       <h2>Applications</h2>

//       <input
//         type="text"
//         placeholder="Search applications..."
//         value={search}
//         onChange={(event) =>
//           setSearch(event.target.value)
//         }
//       />

//       {/* Status Filter */}

//       <select
//         value={filterStatus}
//         onChange={(event) =>
//           setFilterStatus(event.target.value)
//         }
//       >
//         <option value="all">All Status</option>
//         <option value="applied">Applied</option>
//         <option value="interview">Interview</option>
//         <option value="offer">Offer</option>
//         <option value="rejected">Rejected</option>
//       </select>

//       {/* Sort */}

//       <select
//         value={sortOption}
//         onChange={(event) =>
//           setSortOption(event.target.value)
//         }
//       >
//         <option value="default">Default</option>
//         <option value="company-asc">
//           Company A → Z
//         </option>
//         <option value="company-desc">
//           Company Z → A
//         </option>
//         <option value="newest">
//           Newest → Oldest
//         </option>
//       </select>

//       {/* Application List */}

//       {sortedApplications.length === 0 ? (
//         <p>No applications found.</p>
//       ) : (
//         sortedApplications.map((app) => (
//           <div key={app.id}>
//             <h3>{app.company}</h3>

//             <p>Role: {app.role}</p>

//             <p>Location: {app.location}</p>

//             <p>Status: {app.status}</p>

//             <button
//               onClick={() => editApplication(app.id)}
//             >
//               Edit
//             </button>

//             <button
//               onClick={() => deleteApplication(app.id)}
//             >
//               Delete
//             </button>
//           </div>
//         ))
//       )}
//      <ApiTest/>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Applications from "./Pages/Applications";
import AddApplication from "./Pages/AddApplication";
import About from "./Pages/About";
import ApplicationDetails from "./Pages/ApplicationDetails";
import NotFound from "./Pages/NotFound";
import Navbar from "./Navbar";

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
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
