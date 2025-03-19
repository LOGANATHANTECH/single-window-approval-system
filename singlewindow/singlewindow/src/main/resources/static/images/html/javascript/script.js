
function toggleServiceItem(event, id) {
    event.preventDefault();
    var item = document.getElementById(id);
    var items = document.querySelectorAll('.service-item');
    items.forEach(function (el) {
        if (el !== item) {
            el.style.display = 'none';
        }
    });
    if (item.style.display === 'none') {
        item.style.display = 'block';
    } else {
        item.style.display = 'none';
    }
}

function toggleCommentBox() {
    const commentBox = document.getElementById('commentBox');
    commentBox.classList.toggle('hidden');
}

function submitComment() {
    const commentBox = document.getElementById('commentBox');
    const responseMessage = document.getElementById('responseMessage');
    commentBox.classList.add('hidden');
    responseMessage.classList.remove('hidden');
}

function toggleShareOptions(event) {
    event.stopPropagation();
    const shareOptions = document.getElementById('shareOptions');
    shareOptions.classList.toggle('hidden');
}

function hideShareOptions() {
    const shareOptions = document.getElementById('shareOptions');
    shareOptions.classList.add('hidden');
}

function rateStar(star) {
    const stars = document.querySelectorAll('.rate-star');
    stars.forEach((s, index) => {
        if (index < star) {
            s.classList.remove('text-gray-400');
            s.classList.add('text-yellow-500');
        } else {
            s.classList.remove('text-yellow-500');
            s.classList.add('text-gray-400');
        }
    });
    const rateMessage = document.getElementById('rateMessage');
    rateMessage.classList.remove('hidden');
}

document.addEventListener('click', function(event) {
    const shareOptions = document.getElementById('shareOptions');
    const shareButton = document.getElementById('shareButton');
    if (!shareOptions.contains(event.target) && !shareButton.contains(event.target)) {
        hideShareOptions();
    }
});



// JavaScript
    // Smooth Scrolling
    document.querySelectorAll('.footer-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Image Slider
    let index = 0;
    function slideImages() {
        const slides = document.querySelectorAll('.slide');
        slides.forEach((slide, i) => {
            slide.style.transform = `translateX(-${index * 100}%)`;
        });
        index = (index + 1) % slides.length;
    }
    setInterval(slideImages, 3000);



    // script for chat bot


    const chatbotResponses = {
        "hii": "Hello! How can I assist you today?",
        "hello": "Hello! How can I assist you today?",
        "how to register": "You can register by clicking on the 'Sign Up' button and filling in the required details.",
        "how to apply": "After registering, go to the 'Apply' section, fill out the necessary details, and submit your application.",
        "track application": "To track your application, log in and check the 'Dashboard' for real-time updates.",
        "contact support": "You can contact support via the 'Contact' section or email us at support@example.com.",
        "services offered": "We provide a single-window platform for government approvals, making the process faster and more efficient.",
        "what can you assist": "I can help with the following questions: "
    };

    function toggleChat(event) {
        event.stopPropagation(); // Prevent closing when clicking inside chatbot
        const chatPopup = document.getElementById('chatPopup');
        chatPopup.style.display = chatPopup.style.display === 'block' ? 'none' : 'block';
        populateQuestions();
    }

    function closeChat(event) {
        const chatPopup = document.getElementById('chatPopup');
        const chatbotButton = document.getElementById('chatbotButton');
        
        if (!chatPopup.contains(event.target) && !chatbotButton.contains(event.target)) {
            chatPopup.style.display = 'none';
        }
    }

    function addMessage(text) {
        const chatBody = document.getElementById('chatBody');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message';
        messageDiv.textContent = text;
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function populateQuestions() {
        const questionList = document.getElementById('questionList');
        questionList.innerHTML = "";
        Object.keys(chatbotResponses).forEach(question => {
            if (question !== "what can you assist") {
                const li = document.createElement('li');
                li.textContent = question;
                li.onclick = (event) => {
                    event.stopPropagation(); // Prevent closing on click
                    addMessage(chatbotResponses[question]);
                };
                questionList.appendChild(li);
            }
        });
    }