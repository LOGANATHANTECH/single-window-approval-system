// Load profile data from sessionStorage
const raw = sessionStorage.getItem("userdata");

if (raw) {
  const user = JSON.parse(raw);
  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("role").textContent = user.role;
  const date = new Date(user.createdAt);
  document.getElementById("createdAt").textContent = date.toDateString();
} else {
  console.error("No user data found in sessionStorage.");
}

// Initialize particles.js
particlesJS("particles-js", {
  particles: {
    number: { value: 50, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1 }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.1 }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 3, direction: "none", out_mode: "out" }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" }
    }
  },
  retina_detect: true
});

// Section control
function showSection(sectionId) {
  const sections = ['home-section', 'apply-section', 'applications-section', 'profile-section'];
  sections.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
  document.getElementById(sectionId).classList.remove('hidden');
}

// Show default section on load
document.addEventListener('DOMContentLoaded', () => {
  showSection('home-section');

  setTimeout(() => updateStep(1, 'completed'), 1000);
  setTimeout(() => updateStep(2, 'in-progress'), 2000);
  setTimeout(() => updateStep(3, 'completed'), 4000);
  setTimeout(() => updateStep(4, 'pending'), 6000);
  setTimeout(() => updateStep(5, 'pending'), 8000);
});

// Logout function
function logout() {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "user_login.html";
  }
}

// Form submission handler
document.getElementById('business-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const formdata = Object.fromEntries(formData.entries());

  const raw = sessionStorage.getItem("userdata");
  if (raw) {
    formdata.user = JSON.parse(raw);
  }

  try {
    const response = await fetch('http://localhost:8080/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata)
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

// Step update function
function updateStep(stepNumber, status) {
  const step = document.getElementById('step' + stepNumber);
  if (!step) return;

  const badge = step.querySelector('.badge');
  if (!badge) return;

  badge.classList.remove('bg-secondary', 'bg-success', 'bg-warning', 'bg-danger');

  if (status === 'completed') {
    badge.textContent = 'Completed';
    badge.classList.add('bg-success');
    step.classList.add('completed');
  } else if (status === 'in-progress') {
    badge.textContent = 'In Progress';
    badge.classList.add('bg-warning');
    step.classList.add('in-progress');
  } else {
    badge.textContent = 'Pending';
    badge.classList.add('bg-danger');
    step.classList.add('pending');
  }
}

// Profile editing toggle
let isEditing = false;

function editProfile() {
  const name = document.getElementById("name");
  const email = document.getElementById("email");

  if (!isEditing) {
    name.removeAttribute("disabled");
    email.removeAttribute("disabled");
    name.focus();
  } else {
    name.setAttribute("disabled", true);
    email.setAttribute("disabled", true);
    alert("Changes saved successfully!");
    // Add API call here to save changes if needed
  }

  isEditing = !isEditing;
}
