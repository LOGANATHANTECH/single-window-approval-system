//import { sharedUserData } from './user_script.js';
/* Script for profile button */

// Import the globalUserData variable
//import { globalUserData } from './user_script.js';
//console.log('Accessing Global User Data from Another File:', globalUserData);
//alert(globalUserData)


function toggleMenu() {
    let menu = document.getElementById("dropdownMenu");
    if (menu) {
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    }
}

/* Script for logout */
document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector('a[href="#logout"]');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Clear any user session data if needed
            localStorage.clear();
            sessionStorage.clear();
            // Redirect to login page
            window.location.href = './user_login.html';
        });
    }
});

// Close profile menu when clicking outside
document.addEventListener("click", function (event) {
    let menu = document.getElementById("dropdownMenu");
    let profileBtn = document.querySelector(".profile-btn");

    if (menu && profileBtn && !profileBtn.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = "none";
    }
});

/* Script for Notification */
function toggleDropdown() {
    let dropdown = document.getElementById("dropdown");
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    let dropdown = document.getElementById("dropdown");
    let icon = document.querySelector(".notification-icon");

    if (dropdown && icon && !icon.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

/* Script for notification count */
function updateNotificationCount(count) {
    let badge = document.getElementById("notificationCount");
    if (badge) {
        badge.textContent = count > 0 ? count : "";
        badge.style.display = count > 0 ? "inline-block" : "none";
    }
}

/* Script for user dashboard - FAQ toggle */
document.querySelectorAll('.user_faq-item').forEach(item => {
    item.addEventListener('click', () => {
        let answer = item.querySelector('p');
        if (answer) {
            answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
        }
    });
});

/* Script for Chat Popup */
function toggleChat() {
    let chatPopup = document.getElementById('chatPopup');
    if (chatPopup) {
        chatPopup.style.display = (chatPopup.style.display === 'block') ? 'none' : 'block';
    }
}

document.addEventListener('click', function(event) {
    let chatPopup = document.getElementById('chatPopup');
    let chatbotIcon = document.querySelector('.user_chatbot');

    if (chatPopup && chatbotIcon && !chatPopup.contains(event.target) && event.target !== chatbotIcon) {
        chatPopup.style.display = 'none';
    }
});



// JavaScript Code for Form Submission with shareduserdata and Redirection
// JavaScript Code for Form Submission with Hardcoded User Object
document.getElementById("business-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission
alert("hi logu");
// Retrieve userdata from sessionStorage
debugger;
    const userdataJSON = sessionStorage.getItem("userdata");
    console.log("Raw userdata from session:", userdataJSON);
	
	// Parse userdata
	    let userdata = null;
	    if (userdataJSON) {
	        try {
	            userdata = JSON.parse(userdataJSON);
	            console.log("Parsed user object:", userdata);
	        } catch (err) {
	            console.error("Failed to parse userdata:", err);
	            alert("Invalid userdata found. Please login again.");
	            return;
	        }
	    } else {
	        alert("No user data found. Please login first.");
	        return;
	    }

	
	console.log(userdataJSON);
    const formData = {
        businessname: document.getElementById("businessname").value,
        companyname: document.getElementById("companyname").value,
        companyaddress: document.getElementById("companyaddress").value,
        businesstype: document.getElementById("businesstype").value,
        phonenumber: parseInt(document.getElementById("phonenumber").value), // Convert to number
        email: document.getElementById("email").value,
        descriptionaboutbusiness: document.getElementById("descriptionaboutbusiness").value,
        user: userdata // Hardcoded user object
    };

    console.log("Payload Sent to API:", formData);

    // Send data to API
    fetch("http://localhost:8080/application", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData) // Convert formData to JSON string
    })
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse JSON response
            } else {
                throw new Error("Failed to submit form. Please try again.");
            }
        })
        .then(data => {
            // Handle API response
            if (data.status === 200) {
                alert(data.message); // Show success message
                console.log("API Response:", data);

                // Redirect to track_status.html
                window.location.href = "track_status.html";
            } else {
                alert("Unexpected response status: " + data.status);
            }
        })
        .catch(error => {
            alert("Error: " + error.message);
            console.error("Error:", error);
        });
});





  document.addEventListener("DOMContentLoaded", function () {
    // Get the 'Your Applications' link from the dropdown menu
    const applicationsLink = document.querySelector('a[href="#applications"]');
    const section = document.getElementById("application-status-section");

    // Hide the section by default
    section.style.display = "none";

    applicationsLink.addEventListener("click", function (e) {
      e.preventDefault();  // Prevent default link behavior

      // Show the Application Status section
      section.style.display = "block";
    });
  });
