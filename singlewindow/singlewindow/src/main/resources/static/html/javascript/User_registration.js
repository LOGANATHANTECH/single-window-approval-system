
/* script for profile button */
function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Close profile menu when clicking outside
document.addEventListener("click", function (event) {
    var menu = document.getElementById("dropdownMenu");
    var profileBtn = document.querySelector(".profile-btn");

    if (!profileBtn.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = "none";
    }
});


    /* script for Notification */

    function toggleDropdown() {
        var dropdown = document.getElementById("dropdown");
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    }
    
    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
        var dropdown = document.getElementById("dropdown");
        var icon = document.querySelector(".notification-icon");
    
        if (!icon.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });


/* script for notification count */

function notification_count(params) {


}
/* script for user dashboard*/

document.querySelectorAll('.user_faq-item').forEach(item => {
    item.addEventListener('click', () => {
        let answer = item.querySelector('p');
        answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
    });
});

function toggleChat() {
    let chatPopup = document.getElementById('chatPopup');
    chatPopup.style.display = (chatPopup.style.display === 'block') ? 'none' : 'block';
}

document.addEventListener('click', function(event) {
    let chatPopup = document.getElementById('chatPopup');
    let chatbotIcon = document.querySelector('.user_chatbot');
    if (event.target !== chatPopup && event.target !== chatbotIcon) {
        chatPopup.style.display = 'none';
    }
});
/* script for  forms for registring business*/
        function showForm() {
    var selectedValue = document.getElementById("search").value;
    var forms = document.getElementsByClassName("business-form");

    /*Hide all forms*/
    for (var i = 0; i < forms.length; i++) {
        forms[i].style.display = "none";
    }

    /* Get the form based on user selection*/
    var formId = selectedValue.replace(/\s+/g, '');
    var selectedForm = document.getElementById(formId);

    /* Show the selected form if it exists*/
    if (selectedForm) {
        selectedForm.style.display = "block";
    } else {
        console.warn("No matching form found for:", selectedValue);
    }
}



/* Enable "Enter" key to move to the next input field*/
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

