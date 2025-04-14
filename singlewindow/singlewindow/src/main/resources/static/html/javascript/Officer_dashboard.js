// ========== GLOBAL VARIABLES ==========

const notificationContainer = createNotificationContainer();

// ========== ON LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  loadApprovalRequests();
  initProfileForm();
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
    targetSection.style.display = "block"; // Show the requested section
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
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("approvalTableBody");
      if (data.data && data.data.length > 0) {
        data.data.forEach((application, index) => {
          const row = document.createElement("tr");

          // Apply a different color for even and odd rows
          row.style.backgroundColor = index % 2 === 0 ? "blue": "#0000FF80";

          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${application.user.name}</td>
            <td>${application.id}</td>
            <td>${application.businesstype}</td>
            <td>${new Date(application.submittedAt).toLocaleDateString()}</td>
            <td>${application.status}</td>
            <td><button class="btn btn-info btn-sm">View</button></td>
            <td>
              <button class="btn btn-success btn-sm">Approve</button>
              <button class="btn btn-danger btn-sm">Reject</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.warn("No pending applications found.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// ========== APPROVED REQUESTS ==========
document.addEventListener("DOMContentLoaded", () => {
   document.getElementById("approved-section").style.display = "block";
   loadApprovedRequests();
 });

function loadApprovedRequests() {
  fetch("http://localhost:8080/application/getApproved")
  
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("approvedTableBody");
      
      // Clear existing rows to prevent duplication
      tableBody.innerHTML = "";
      
      if (data.data && data.data.length > 0) {
        data.data.forEach((application, index) => {
          const row = document.createElement("tr");

          // Apply a different color for even and odd rows:
          if (index % 2 === 0) {
            // Even rows: solid blue background with white text.
            row.style.backgroundColor = "blue";
            row.style.color = "white";
          } else {
            // Odd rows: translucent blue background with black text.
            row.style.backgroundColor = "#0000FF80";
            row.style.color = "black";
          }

          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${application.user.name}</td>
            <td>${application.id}</td>
            <td>${application.businesstype}</td>
            <td>${new Date(application.submittedAt).toLocaleDateString()}</td>
            <td>${application.status}</td>
            <td><button class="btn btn-info btn-sm">View</button></td>
            <td>
              <button class="btn btn-success btn-sm" data-id="${application.id}">Approve</button>
              <button class="btn btn-danger btn-sm" data-id="${application.id}">Reject</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        console.warn("No approved applications found.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}



// ========== PROFILE FORM ==========
function initProfileForm() {
  const form = document.getElementById("profileForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Profile updated successfully!");
  });

  const upload = document.getElementById("uploadPic");
  if (upload) {
    upload.addEventListener("change", previewImage);
  }
}

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById("profileImage").src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

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

// pie chart section
  document.addEventListener("DOMContentLoaded", function () {

    // Chart 1: Approval Status
    new Chart(document.getElementById('approvalChart'), {
      type: 'pie',
      data: {
        labels: ['Approved', 'Rejected', 'Pending'],
        datasets: [{
          label: 'Approvals',
          data: [50, 20, 30],
          backgroundColor: ['#4caf50', '#f44336', '#ff9800']
        }]
      }
    });

    // Chart 2: Pending Requests
    new Chart(document.getElementById('pendingChart'), {
      type: 'pie',
      data: {
        labels: ['Dept A', 'Dept B', 'Dept C'],
        datasets: [{
          label: 'Pending',
          data: [10, 15, 5],
          backgroundColor: ['#03a9f4', '#00bcd4', '#009688']
        }]
      }
    });

    // Chart 3: Rejection Reasons
    new Chart(document.getElementById('rejectedChart'), {
      type: 'pie',
      data: {
        labels: ['Incomplete Docs', 'Invalid Info', 'Policy Issue'],
        datasets: [{
          label: 'Rejections',
          data: [12, 8, 10],
          backgroundColor: ['#e91e63', '#9c27b0', '#673ab7']
        }]
      }
    });

    // Chart 4: Department-Wise Approvals
    new Chart(document.getElementById('departmentChart'), {
      type: 'pie',
      data: {
        labels: ['Health', 'Education', 'Transport', 'Housing'],
        datasets: [{
          label: 'By Dept',
          data: [20, 25, 15, 10],
          backgroundColor: ['#ff5722', '#ffc107', '#8bc34a', '#00bcd4']
        }]
      }
    });

    // Chart 5: Monthly Approval Trends
    new Chart(document.getElementById('monthlyChart'), {
      type: 'pie',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Monthly',
          data: [10, 15, 12, 8],
          backgroundColor: ['#cddc39', '#607d8b', '#9e9e9e', '#795548']
        }]
      }
    });

  });


