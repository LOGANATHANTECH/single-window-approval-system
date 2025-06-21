// ========== GLOBAL VARIABLES ==========
const notificationContainer = createNotificationContainer();

// ========== ON LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  loadApprovalRequests();
  initLogout();
  showSection("home-section");
});

// ========== SECTION NAVIGATION ==========
function initNavigation() {
  const buttons = {
    "home-btn": "home-section",
    "dashboard-btn": "dashboard-section",
    "approval-requests-btn": "approval-section",
    "approved-btn": "approved-section",
    "rejected-btn": "rejected-section",
    "profile-btn": "profile-section"
  };

  Object.entries(buttons).forEach(([btnId, sectionId]) => {
    const button = document.getElementById(btnId);
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(sectionId);
        if (sectionId === "profile-section") {
          loadProfile();
        }
      });
    }
  });
}

function showSection(sectionId) {
  document.querySelectorAll(".section-content").forEach((sec) => {
    sec.style.display = "none"; // Hide all sections
  });

  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block"; // Show selected section
  }
}

// ========== NOTIFICATION ==========
function createNotificationContainer() {
  const container = document.createElement("div");
  container.id = "notification-container";
  Object.assign(container.style, {
    position: "fixed",
    top: "10px",
    right: "10px",
    backgroundColor: "#333",
    color: "white",
    padding: "10px 15px",
    display: "none",
    zIndex: 9999
  });
  document.body.appendChild(container);
  return container;
}

function showNotification(message) {
  notificationContainer.textContent = message;
  notificationContainer.style.display = "block";
  setTimeout(() => (notificationContainer.style.display = "none"), 3000);
}

// ========== APPROVAL REQUESTS ==========
function loadApprovalRequests() {
  fetch("http://localhost:8080/application")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("approvalTableBody");
      tableBody.innerHTML = '';

      if (data.data && data.data.length > 0) {
        data.data.forEach((application, index) => {
          const row = document.createElement("tr");
          row.style.backgroundColor = index % 2 === 0 ? "blue" : "#0000FF80";

          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${application.user.name}</td>
            <td>${application.id}</td>
            <td>${application.businesstype}</td>
            <td>${new Date(application.submittedAt).toLocaleDateString()}</td>
            <td>${application.status}</td>
            <td><button class="btn btn-info btn-sm">View</button></td>
            <td>
              <button class="btn btn-success btn-sm approve-btn" data-id="${application.id}">Approve</button>
              <button class="btn btn-danger btn-sm reject-btn" data-id="${application.id}">Reject</button>
            </td>
          `;
          tableBody.appendChild(row);
        });

        document.querySelectorAll('.approve-btn').forEach(button => {
          button.addEventListener('click', function () {
            const appId = this.getAttribute('data-id');
            approveApplication(appId, this);
          });
        });

        document.querySelectorAll('.reject-btn').forEach(button => {
          button.addEventListener('click', function () {
            const appId = this.getAttribute('data-id');
            rejectApplication(appId, this);
          });
        });

      } else {
        console.warn("No pending applications found.");
      }
    })
    .catch(error => console.error("Error fetching data:", error));
}

function approveApplication(appId, buttonElement) {
  fetch('http://localhost:8080/application', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Number(appId),
      status: "APPROVED"
    })
  })
    .then(response => {
      if (response.ok) {
        const row = buttonElement.closest('tr');
        row.remove();
        alert("Application approved successfully.");
      } else {
        alert("Failed to approve application.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Error approving application.");
    });
}

function rejectApplication(appId, buttonElement) {
  fetch('http://localhost:8080/application', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: Number(appId),
      status: "REJECTED"
    })
  })
    .then(response => {
      if (response.ok) {
        const row = buttonElement.closest('tr');
        row.remove();
        alert("Application rejected successfully.");
      } else {
        alert("Failed to reject application.");
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert("Error rejecting application.");
    });
}

// ========== APPROVED REQUESTS ==========
// ========== APPROVED REQUESTS ==========
document.getElementById("approved-btn").addEventListener("click", function (event) {
  event.preventDefault();
  showSection("approved-section");

  const tableBody = document.getElementById("approvedTableBody");
  tableBody.innerHTML = `<tr><td colspan="7">Loading...</td></tr>`;

  fetch("http://localhost:8080/application/getApproved")
    .then((response) => response.json())
    .then((data) => {
      tableBody.innerHTML = ""; // Clear loading

      if (data.data && data.data.length > 0) {
        data.data.forEach((application, index) => {
          const row = document.createElement("tr");
          row.style.backgroundColor = index % 2 === 0 ? "blue" : "#0000FF80";; // Light gray rows

          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${application.user?.name || "N/A"}</td>
            <td>${application.id}</td>
            <td>${application.businesstype}</td>
            <td>${new Date(application.submittedAt).toLocaleDateString()}</td>
            <td><span class="badge bg-success">${application.status}</span></td>
            <td><button class="btn btn-info btn-sm">View</button></td>
          `;

          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = `<tr><td colspan="7">No approved applications found.</td></tr>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching approved applications:", error);
      tableBody.innerHTML = `<tr><td colspan="7">Error loading data.</td></tr>`;
      alert("Failed to load approved applications.");
    });
});


// ========== REJECTED REQUESTS ==========
document.getElementById('rejected-btn').addEventListener('click', function (event) {
  event.preventDefault();
  showSection("rejected-section");

  const tableBody = document.getElementById('rejectedTableBody');
  tableBody.innerHTML = '';

  fetch('http://localhost:8080/application/notaccepted')
    .then(response => response.json())
    .then(data => {
      if (data.data && data.data.length > 0) {
        data.data.forEach((application, index) => {
          const row = document.createElement('tr');
          row.style.backgroundColor = index % 2 === 0 ? "blue" : "#0000FF80";

          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${application.user.name}</td>
            <td>${application.id}</td>
            <td>${application.businesstype}</td>
            <td>${new Date(application.submittedAt).toLocaleDateString()}</td>
            <td>${application.status}</td>
          `;

          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = '<tr><td colspan="6">No rejected applications found.</td></tr>';
      }
    })
    .catch(error => {
      console.error('Error fetching rejected applications:', error);
      tableBody.innerHTML = '<tr><td colspan="6">Error loading data.</td></tr>';
    });
});

if (sectionId === "profile-section") {
  loadProfile();
}



// ========== PROFILE FORM ==========


document.getElementById("profile-link").addEventListener("click", function (e) {
  e.preventDefault();
  hideAllSections();
  document.getElementById("profile-section").style.display = "flex";

  fetch("/api/users/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Add Authorization header if needed
      // "Authorization": "Bearer " + token
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("profile-name").textContent = data.name;
      document.getElementById("profile-email").textContent = data.email;
      document.getElementById("profile-role").textContent = data.role;
      document.getElementById("profile-created").textContent = new Date(data.createdAt).toLocaleString();
    })
    .catch((error) => {
      console.error("Profile fetch error:", error);
    });
});


// ========== LOGOUT ==========
function initLogout() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userSession");
      alert("You have been logged out successfully!");
      window.location.href = "Officer_Login.html";
    });
  }
}
