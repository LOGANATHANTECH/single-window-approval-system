// ========== GLOBAL VARIABLES ==========

let approvalRequests = [
    {
        id: 1,
        applicantName: "John Doe",
        appId: "APP001",
        department: "Health",
        date: "2025-04-01",
        status: "Pending",
        docLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
        id: 2,
        applicantName: "Jane Smith",
        appId: "APP002",
        department: "Finance",
        date: "2025-04-03",
        status: "Approved",
        docLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
        id: 3,
        applicantName: "Robert Brown",
        appId: "APP003",
        department: "Education",
        date: "2025-04-05",
        status: "Rejected",
        docLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
        id: 4,
        applicantName: "Emily White",
        appId: "APP004",
        department: "Transport",
        date: "2025-04-06",
        status: "Pending"
    }
];

const notificationContainer = createNotificationContainer();

// ========== ON LOAD ==========

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initCharts();
    loadApprovalRequests();
    fetchApplications();
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
            button.addEventListener("click", e => {
                e.preventDefault();
                showSection(sectionId);
                if (btnId === "dashboard-btn") loadChart();
                if (btnId === "approval-requests-btn") loadApprovalRequests();
                if (btnId === "rejected-btn") loadRejectedRequests();
            });
        }
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll(".section-content").forEach(sec => {
        sec.style.display = "none";
    });

    // Show the requested section only
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block";
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
    setTimeout(() => notificationContainer.style.display = "none", 1000);
}

// ========== CHARTS ==========

function loadChart() {
    const ctx = document.getElementById("approvalChart");
    if (!ctx) return;
    const context = ctx.getContext("2d");

    if (window.myPieChart) window.myPieChart.destroy();

    window.myPieChart = new Chart(context, {
        type: "pie",
        data: {
            labels: ["Pending", "Approved", "Rejected"],
            datasets: [{
                data: [
                    approvalRequests.filter(r => r.status === "Pending").length,
                    approvalRequests.filter(r => r.status === "Approved").length,
                    approvalRequests.filter(r => r.status === "Rejected").length
                ],
                backgroundColor: ["#FFA500", "#28A745", "#DC3545"]
            }]
        }
    });

    showNotification("Dashboard Updated with Approval Status!");
}

function initCharts() {
    const chartData = [
        { id: "pendingChart", labels: ["Under Review", "Awaiting Documents"], data: [70, 30], colors: ["#00ACC1", "#FFEB3B"] },
        { id: "rejectedChart", labels: ["Incomplete", "Invalid Data", "Other"], data: [50, 30, 20], colors: ["#D32F2F", "#C2185B", "#7B1FA2"] },
        { id: "departmentChart", labels: ["Finance", "Health", "Education", "Transport"], data: [25, 30, 20, 25], colors: ["#8E24AA", "#1976D2", "#388E3C", "#F57C00"] },
        { id: "monthlyChart", labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], data: [10, 15, 20, 30, 25, 35], colors: ["#1E88E5", "#D81B60", "#43A047", "#FB8C00", "#8E24AA", "#FDD835"] }
    ];

    chartData.forEach(({ id, labels, data, colors }) => {
        const el = document.getElementById(id);
        if (!el) return;

        new Chart(el.getContext("2d"), {
            type: "pie",
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: colors
                }]
            }
        });
    });
}

// ========== APPROVAL REQUESTS ==========

function loadApprovalRequests() {
    const tbody = document.getElementById("approvalTableBody");
    if (!tbody) return;
    tbody.innerHTML = "";

    approvalRequests.forEach((request, index) => {
        const row = document.createElement("tr");
        row.style.backgroundColor = "#2a5298";
        row.style.color = "white";

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${request.applicantName}</td>
            <td>${request.appId}</td>
            <td>${request.department}</td>
            <td>${request.date}</td>
            <td><span class="badge bg-${getStatusBadgeClass(request.status)}">${request.status}</span></td>
            <td><a href="${request.docLink || "#"}" class="btn btn-sm btn-info" target="_blank">View</a></td>
            <td>
                <button class="btn btn-success btn-sm approve-btn" data-id="${request.id}" ${request.status !== "Pending" ? "disabled" : ""}>Approve</button>
                <button class="btn btn-danger btn-sm reject-btn" data-id="${request.id}" ${request.status !== "Pending" ? "disabled" : ""}>Reject</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    addActionListeners();
    showNotification("Loaded Pending Approvals");
}

function getStatusBadgeClass(status) {
    return status === "Approved" ? "success" : status === "Rejected" ? "danger" : "warning";
}

function addActionListeners() {
    document.querySelectorAll(".approve-btn").forEach(btn =>
        btn.addEventListener("click", () => updateStatus(+btn.dataset.id, "Approved"))
    );
    document.querySelectorAll(".reject-btn").forEach(btn =>
        btn.addEventListener("click", () => updateStatus(+btn.dataset.id, "Rejected"))
    );
}

function updateStatus(id, newStatus) {
    const request = approvalRequests.find(r => r.id === id);
    if (request) {
        request.status = newStatus;
        loadApprovalRequests();
        loadApprovedRequests();
        function loadApprovedRequests() {
            const tbody = document.getElementById("approvedTableBody");
            tbody.innerHTML = "";
        
            const approved = approvalRequests.filter(r => r.status === "Approved");
        
            approved.forEach((request, index) => {
                const row = document.createElement("tr");
                row.style.backgroundColor = "#28a745";
                row.style.color = "white";
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${request.applicantName}</td>
                    <td>${request.appId}</td>
                    <td>${request.department}</td>
                    <td>${request.date}</td>
                    <td><a href="${request.docLink}" class="btn btn-sm btn-info" target="_blank">View</a></td>
                `;
                tbody.appendChild(row);
            });
        }
        
        loadRejectedRequests();
        function loadRejectedRequests() {
            const tbody = document.getElementById("rejectedTableBody");
            tbody.innerHTML = "";
        
            const rejected = approvalRequests.filter(r => r.status === "Rejected");
        
            rejected.forEach((request, index) => {
                const row = document.createElement("tr");
                row.style.backgroundColor = "#dc3545";
                row.style.color = "white";
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${request.applicantName}</td>
                    <td>${request.appId}</td>
                    <td>${request.department}</td>
                    <td>${request.date}</td>
                    <td><a href="${request.docLink}" class="btn btn-sm btn-info" target="_blank">View</a></td>
                `;
                tbody.appendChild(row);
            });
        
            showNotification("Loaded Rejected Requests");
        }

        
        alert(`Application ${request.appId} has been ${newStatus}`);
    }
}

// ========== REJECTED REQUESTS ==========

function loadRejectedRequests() {
    const rejectedDocuments = document.getElementById("rejected-documents");
    if (!rejectedDocuments) return;

    rejectedDocuments.innerHTML = "<h3>Rejected Requests</h3>";

    // const rejected = [
    //     { id: 6, name: "Environmental Clearance", applicant: "Steve Rogers" },
    //     { id: 7, name: "Construction Permit", applicant: "Natasha Romanoff" }
    // ];

    rejected.forEach(doc => {
        const div = document.createElement("div");
        div.className = "document-item rejected";
        div.innerHTML = `<strong>${doc.name}</strong> - ${doc.applicant}`;
        rejectedDocuments.appendChild(div);
    });

    showNotification("Loaded Rejected Requests");
}

// ========== FETCH APPLICATION DATA ==========

function fetchApplications() {
    const container = document.getElementById("applicationContainer");
    if (!container) return;

    fetch('http://localhost:8080/application')
        .then(res => res.ok ? res.json() : Promise.reject("Failed to fetch"))
        .then(data => {
            if (data.status === 200) renderApplications(data.data);
            else alert(data.message);
        })
        .catch(err => {
            console.error(err);
            alert("Error fetching application data.");
        });
}

function renderApplications(applications) {
    const container = document.getElementById("applicationContainer");
    if (!container) return;
    container.innerHTML = "";

    applications.forEach(app => {
        const card = document.createElement("div");
        card.className = "card mb-3";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Application ID: ${app.id}</h5>
                <p><strong>Business Name:</strong> ${app.businessname}</p>
                <p><strong>Company Name:</strong> ${app.companyname}</p>
                <p><strong>Company Address:</strong> ${app.companyaddress}</p>
                <p><strong>Business Type:</strong> ${app.businesstype}</p>
                <p><strong>Phone Number:</strong> ${app.phonenumber}</p>
                <p><strong>Email:</strong> ${app.email}</p>
                <p><strong>Description:</strong> ${app.descriptionaboutbusiness}</p>
                <p><strong>Status:</strong> ${app.status}</p>
                <p><strong>Submitted At:</strong> ${new Date(app.submittedAt).toLocaleString()}</p>
            </div>`;
        container.appendChild(card);
    });
}

// ========== PROFILE FORM ==========

function initProfileForm() {
    const form = document.getElementById("profileForm");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Profile updated successfully!");
    });

    const upload = document.getElementById("imageUpload");
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
