import { sharedUserData } from './user_script.js';
/* Script for profile button */
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

/* Script for business registration forms */

function showForm() {
    const form = document.getElementById('business-form');
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
    } else {
        form.style.display = 'none';
    }
}
document.getElementById('business-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(event.target);
    let formdata = Object.fromEntries(formData.entries());
    formdata.user=sharedUserData;
	const data=formdata;
    try {
        const response = await fetch('http://localhost:8080/application', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = 'track_status.html';
        } else {
            alert('Failed to submit the form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});