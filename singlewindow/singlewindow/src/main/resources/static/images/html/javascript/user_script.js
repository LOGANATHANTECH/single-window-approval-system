
/* script for profile button */

    function toggleMenu() {
        var menu = document.getElementById("dropdownMenu");
        if (menu.style.display === "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
        }
    }
    
    window.onclick = function(event) {
        if (!event.target.matches('.profile-btn')) {
            var dropdowns = document.getElementsByClassName("dropdown-menu");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.style.display === "block") {
                    openDropdown.style.display = "none";
                }
            }
        }
    }


    /* script for Notification */

    function toggleDropdown() {
    var dropdown = document.getElementById('dropdown');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}


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

