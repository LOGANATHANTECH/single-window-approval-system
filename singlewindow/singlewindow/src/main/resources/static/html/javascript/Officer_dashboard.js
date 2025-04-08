document.addEventListener("DOMContentLoaded", () => {
    const homeBtn = document.getElementById("home-btn");
    const dashboardBtn = document.getElementById("dashboard-btn");
    const approvalRequestsBtn = document.getElementById("approval-requests-btn");
    const approvedBtn = document.getElementById("approved-btn");
    const rejectedBtn = document.getElementById("rejected-btn");
    const profileBtn = document.getElementById("profile-btn");

    const homeSection = document.getElementById("home-section");
    const dashboardSection = document.getElementById("dashboard-section");
    const approvalSection = document.getElementById("approval-section");
    const approvedSection = document.getElementById("approved-section");
    const rejectedSection = document.getElementById("rejected-section");
    const profileSection = document.getElementById("profile-section");

    const approvalDocuments = document.getElementById("approval-documents");
    const approvedDocuments = document.getElementById("approved-documents");
    const rejectedDocuments = document.getElementById("rejected-documents");

    const notificationContainer = document.createElement("div");
    notificationContainer.id = "notification-container";
    notificationContainer.style.position = "fixed";
    notificationContainer.style.top = "10px";
    notificationContainer.style.right = "10px";
    notificationContainer.style.backgroundColor = "#333";
    notificationContainer.style.color = "white";
    notificationContainer.style.padding = "10px 15px";
    notificationContainer.style.display = "none";
    document.body.appendChild(notificationContainer);

    function showNotification(message) {
        notificationContainer.textContent = message;
        notificationContainer.style.display = "block";
        setTimeout(() => {
            notificationContainer.style.display = "none";
        }, 1000);
    }

    function showSection(section) {
        document.querySelectorAll(".section-content").forEach(sec => sec.style.display = "none");
        section.style.display = "block";
    }

    homeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(homeSection);
    });

    dashboardBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(dashboardSection);
        loadChart();
    });

    approvalRequestsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(approvalSection);
        loadApprovalRequests();
    });

    approvedBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(approvedSection);
        loadApprovedRequests();
    });

    rejectedBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(rejectedSection);
        loadRejectedRequests();
    });

    profileBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showSection(profileSection);
    });

    const pendingApprovals = [
        { id: 1, name: "Business License", applicant: "John Doe" },
        { id: 2, name: "Startup Registration", applicant: "Alice Smith" },
        { id: 3, name: "FSSAI Certification", applicant: "David Brown" }
    ];

    const approvedRequests = [
        { id: 4, name: "GST Registration", applicant: "Michael Scott" },
        { id: 5, name: "Trade License", applicant: "Angela White" }
    ];

    const rejectedRequests = [
        { id: 6, name: "Environmental Clearance", applicant: "Steve Rogers" },
        { id: 7, name: "Construction Permit", applicant: "Natasha Romanoff" }
    ];

    function loadApprovalRequests() {
        approvalDocuments.innerHTML = "<h3>Pending Approvals</h3>";
        //
        showNotification("Loaded Pending Approvals");
    }

    function loadApprovedRequests() {
        approvedDocuments.innerHTML = "<h3>Approved Requests</h3>";
        approvedRequests.forEach(doc => {
            const div = document.createElement("div");
            div.classList.add("document-item approved");
            div.innerHTML = `<strong>${doc.name}</strong> - ${doc.applicant}`;
            approvedDocuments.appendChild(div);
        });
        showNotification("Loaded Approved Requests");
    }

    function loadRejectedRequests() {
        rejectedDocuments.innerHTML = "<h3>Rejected Requests</h3>";
        rejectedRequests.forEach(doc => {
            const div = document.createElement("div");
            div.classList.add("document-item rejected");
            div.innerHTML = `<strong>${doc.name}</strong> - ${doc.applicant}`;
            rejectedDocuments.appendChild(div);
        });
        showNotification("Loaded Rejected Requests");
    }

    function loadChart() {
        const ctx = document.getElementById("approvalChart").getContext("2d");

        if (window.myPieChart) {
            window.myPieChart.destroy(); 
        }

        window.myPieChart = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Pending", "Approved", "Rejected"],
                datasets: [{
                    data: [pendingApprovals.length, approvedRequests.length, rejectedRequests.length],
                    backgroundColor: ["#ffcc00", "#4CAF50", "#ff5252"],
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    }
                }
            }
        });

        showNotification("Dashboard Updated with Approval Status!");
    }

    showSection(homeSection);
});
document.addEventListener("DOMContentLoaded", function () {
    const ctx1 = document.getElementById('approvalChart').getContext('2d');
    const ctx2 = document.getElementById('pendingChart').getContext('2d');
    const ctx3 = document.getElementById('rejectedChart').getContext('2d');
    const ctx4 = document.getElementById('departmentChart').getContext('2d');
    const ctx5 = document.getElementById('monthlyChart').getContext('2d');

    new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['Approved', 'Pending', 'Rejected'],
            datasets: [{
                data: [60, 30, 10], 
                backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
            }]
        }
    });

    new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['Under Review', 'Awaiting Documents'],
            datasets: [{
                data: [70, 30], 
                backgroundColor: ['#00ACC1', '#FFEB3B']
            }]
        }
    });

    new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Incomplete', 'Invalid Data', 'Other'],
            datasets: [{
                data: [50, 30, 20], 
                backgroundColor: ['#D32F2F', '#C2185B', '#7B1FA2']
            }]
        }
    });

    new Chart(ctx4, {
        type: 'pie',
        data: {
            labels: ['Finance', 'Health', 'Education', 'Transport'],
            datasets: [{
                data: [25, 30, 20, 25], 
                backgroundColor: ['#8E24AA', '#1976D2', '#388E3C', '#F57C00']
            }]
        }
    });

    new Chart(ctx5, {
        type: 'pie',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                data: [10, 15, 20, 30, 25, 35], 
                backgroundColor: ['#1E88E5', '#D81B60', '#43A047', '#FB8C00', '#8E24AA', '#FDD835']
            }]
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("approvalChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Pending", "Approved", "Rejected"],
            datasets: [{
                data: [10, 25, 5],
                backgroundColor: ["#FFA500", "#28A745", "#DC3545"]
            }]
        }
    });
});
// Function to Preview Profile Image
function previewImage(event) {
    var reader = new FileReader();
    reader.onload = function () {
        var output = document.getElementById("profileImage");
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// Form Submission Event
document.getElementById("profileForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Fetch input values
    var fullName = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Password validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Simulate saving data (Replace this with an actual backend request)
    alert("Profile updated successfully!");
});
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");

    // Logout functionality
    logoutBtn.addEventListener("click", () => {
        // Clear any stored session data
        localStorage.removeItem("userSession");  
        
        // Redirect to login page (or home if no login page exists)
        window.location.href = "Officer_Login.html";  

        // Optional: Show logout message before redirecting
        alert("You have been logged out successfully!");
    });
});


// Fetch data from the API and render it on the page
fetch('http://localhost:8080/application', {
    method: 'GET', // Assuming it's a GET request; update if it's different
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        if (response.ok) {
            return response.json(); // Parse the JSON response
        } else {
            throw new Error('Failed to retrieve data from the API');
        }
    })
    .then(data => {
        if (data.status === 200) {
            // Call the function to render data
            renderApplications(data.data);
        } else {
            alert(`Error: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert('An error occurred. Please try again later.');
    });

// Function to render applications on the HTML page
function renderApplications(applications) {
    const applicationContainer = document.getElementById('applicationContainer'); // Ensure this ID exists in your HTML

    applications.forEach(application => {
        const applicationCard = document.createElement('div');
        applicationCard.classList.add('card', 'mb-3'); // Bootstrap card component

        applicationCard.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">Application ID: ${application.id}</h5>
                <p class="card-text"><strong>Business Name:</strong> ${application.businessname}</p>
                <p class="card-text"><strong>Company Name:</strong> ${application.companyname}</p>
                <p class="card-text"><strong>Company Address:</strong> ${application.companyaddress}</p>
                <p class="card-text"><strong>Business Type:</strong> ${application.businesstype}</p>
                <p class="card-text"><strong>Phone Number:</strong> ${application.phonenumber}</p>
                <p class="card-text"><strong>Email:</strong> ${application.email}</p>
                <p class="card-text"><strong>Description:</strong> ${application.descriptionaboutbusiness}</p>
                <p class="card-text"><strong>Status:</strong> ${application.status}</p>
                <p class="card-text"><strong>Submitted At:</strong> ${new Date(application.submittedAt).toLocaleString()}</p>
            </div>
        `;

        applicationContainer.appendChild(applicationCard);
    });
}
