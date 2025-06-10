
	// profile data 
	const raw = sessionStorage.getItem("userdata");

	if (raw) {
	  const user = JSON.parse(raw);

	  // Fill HTML elements with user data
	  document.getElementById("name").textContent = user.name;
	  document.getElementById("email").textContent = user.email;
	  document.getElementById("role").textContent = user.role;

	  // Optional: format date
	  const date = new Date(user.createdAt);
	  document.getElementById("createdAt").textContent = date.toDateString();

	} else {
	  console.error("No user data found in sessionStorage.");
	}



	
	
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
      size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
      line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
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
        // Function to show a specific section and hide others
        function showSection(sectionId) {
            const sections = ['home-section', 'apply-section', 'applications-section', 'profile-section'];
            sections.forEach(id => {
                document.getElementById(id).classList.add('hidden');
            });
            document.getElementById(sectionId).classList.remove('hidden');
        }

        // Show the home section on page load
        document.addEventListener('DOMContentLoaded', () => {
            showSection('home-section');
        });

  function logout() {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "user_login.html";
    }
  }

  // Handle Apply form submission
  document.getElementById('business-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    let formdata = Object.fromEntries(formData.entries());
    formdata.user = sharedUserData || {}; // Make sure sharedUserData is defined globally
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



  document.addEventListener('DOMContentLoaded', function () {
  // Simulate step completion with some delay
  setTimeout(() => updateStep(1, 'completed'), 1000); // Simulate step 1 completion after 1 second
  setTimeout(() => updateStep(2, 'in-progress'), 20000); // Simulate step 2 in-progress after 2 seconds
  setTimeout(() => updateStep(3, 'completed'), 40000); // Simulate step 3 completion after 4 seconds
  setTimeout(() => updateStep(4, 'pending'), 60000); // Simulate step 4 still pending after 6 seconds
  setTimeout(() => updateStep(5, 'pending'), 80000); // Simulate step 5 pending after 8 seconds
});

// Function to update a specific step
function updateStep(stepNumber, status) {
  const step = document.getElementById('step' + stepNumber);
  const badge = step.querySelector('.badge');

  // Update badge text and class based on status
  if (status === 'completed') {
    badge.textContent = 'Completed';
    badge.classList.remove('bg-secondary', 'bg-warning', 'bg-danger');
    badge.classList.add('bg-success');
    step.classList.add('completed');
  } else if (status === 'in-progress') {
    badge.textContent = 'In Progress';
    badge.classList.remove('bg-secondary', 'bg-success', 'bg-danger');
    badge.classList.add('bg-warning');
    step.classList.add('in-progress');
  } else {
    badge.textContent = 'Pending';
    badge.classList.remove('bg-success', 'bg-warning', 'bg-danger');
    badge.classList.add('bg-danger');
    step.classList.add('pending');
  }
}


function toggleProfile() {
  const section = document.getElementById("profile-section");
  section.classList.toggle("hidden");
}

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
    // Optionally, make API call here to save
  }

  isEditing = !isEditing;
}
