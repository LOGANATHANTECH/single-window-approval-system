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
    let searchInput = document.getElementById("search");
    let selectedValue = searchInput.value.trim();
    let forms = document.getElementsByClassName("business-form");

    // Validate input
    if (!selectedValue) {
        alert("Please select a category from the list");
        return;
    }

    // Hide all forms with smooth transition
    Array.from(forms).forEach(form => {
        form.style.opacity = "0";
        setTimeout(() => {
            form.style.display = "none";
        }, 200);
    });

    // Show selected form with animation
    let formId = selectedValue.replace(/\s+/g, '');
    let selectedForm = document.getElementById(formId);
    
    if (selectedForm) {
        setTimeout(() => {
            selectedForm.style.display = "block";
            setTimeout(() => {
                selectedForm.style.opacity = "1";
            }, 50);
        }, 250);
    } else {
        console.warn("No matching form found for:", selectedValue);
        alert("Please select a valid category from the list");
    }
}

/* Enable "Enter" key to move to the next input field */
document.addEventListener("DOMContentLoaded", function () {
    let inputs = document.querySelectorAll("input, select, textarea");

    inputs.forEach((input, index) => {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                let nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
});
