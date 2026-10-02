const storageKey = "jobApplication";
let applications = JSON.parse(localStorage.getItem(storageKey)) || [];
const form = document.getElementById("FormData");
const tableBody = document.getElementById("TableBody");
const statusFilter = document.getElementById("StatusFilter");
const searchInput = document.getElementById("SearchInput");
const sortFilter = document.getElementById("SortFilter");
const totalCount = document.getElementById("totalCount");
const appliedCount = document.getElementById("appliedCount");
const interviewCount = document.getElementById("interviewCount");
const offerCount = document.getElementById("offerCount");
let editingId = null;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const company = document.getElementById("Company").value.trim();
  const role = document.getElementById("Role").value.trim();
  const location = document.getElementById("Location").value.trim();
  const date = document.getElementById("Date").value;

  if (!company || !role || !location || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const appDetails = {
    id: editingId ?? Date.now(),
    company: company,
    role: role,
    location: location,
    date: date,
    status: document.getElementById("Status").value,
  };

  if (editingId == null) {
    applications = [...applications, appDetails];
  } else {
    const index = applications.findIndex((app) => editingId === app.id);
    applications[index] = {
      ...applications[index],
      ...appDetails,
    };
  }
  saveApplications();
  renderData();
  updateDashboardCounts();
  form.reset();
});

function updateDashboardCounts() {
  totalCount.textContent = applications.length;
  appliedCount.textContent = applications.filter(
    (app) => app.status === "Applied",
  ).length;
  interviewCount.textContent = applications.filter(
    (app) => app.status === "Interview",
  ).length;
  offerCount.textContent = applications.filter(
    (app) => app.status === "Offer",
  ).length;
}

function saveApplications() {
  localStorage.setItem(storageKey, JSON.stringify(applications));
}

tableBody.addEventListener("click", (event) => {
  // DELETE
  if (event.target.classList.contains("delete-btn")) {
    const id = Number(event.target.dataset.id);

    const confirmDelete = confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmDelete) {
      return;
    }

    applications = applications.filter((app) => app.id !== id);

    saveApplications();
    renderData();
    updateDashboardCounts();

    return;
  }

  // EDIT
  if (event.target.classList.contains("edit-btn")) {
    const id = Number(event.target.dataset.id);

    const appToEdit = applications.find((app) => app.id === id);

    if (!appToEdit) {
      return;
    }

    editingId = id;

    document.getElementById("Company").value = appToEdit.company;
    document.getElementById("Role").value = appToEdit.role;
    document.getElementById("Location").value = appToEdit.location;
    document.getElementById("Date").value = appToEdit.date;
    document.getElementById("Status").value = appToEdit.status;
  }
});

function renderData() {
  tableBody.innerHTML = "";

  const selectedVal = statusFilter.value;
  const searchVal = searchInput.value.trim().toLowerCase();

  const FilteredVal = applications.filter((app) => {
    const matchStatus = selectedVal === "All" || app.status === selectedVal;
    const matchSearch =
      app.company.toLowerCase().includes(searchVal) ||
      app.role.toLowerCase().includes(searchVal);

    return matchSearch && matchStatus;
  });

  const selectedSort = sortFilter.value;

  if (selectedSort === "newest") {
    FilteredVal.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }

  if (selectedSort === "oldest") {
    FilteredVal.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  }

  if (selectedSort === "companyAsc") {
    FilteredVal.sort((a, b) => {
      return a.company.localeCompare(b.company);
    });
  }

  if (selectedSort === "companyDesc") {
    FilteredVal.sort((a, b) => {
      return b.company.localeCompare(a.company);
    });
  }

  FilteredVal.forEach((app) => {
    const { company, role, location, date, status, id } = app;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${company}</td>
      <td>${role}</td>
      <td>${location}</td>
      <td>${date}</td>
      <td>${status}</td>
      <td>
      <button class="delete-btn" data-id="${id}">Delete</button>
      <button class="edit-btn" data-id="${id}">Edit</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", renderData);
statusFilter.addEventListener("change", renderData);
sortFilter.addEventListener("change", () => {
  renderData();
});
renderData();
updateDashboardCounts();
