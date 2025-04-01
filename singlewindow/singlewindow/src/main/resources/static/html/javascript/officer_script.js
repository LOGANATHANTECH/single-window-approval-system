// ========== Panel Toggling for Sign Up/Sign In ==========
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Handle Sign Up button click
signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

// Handle Sign In button click
signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// ========== Forgot Password Functionality ==========
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const closeModal = document.querySelector(".close");
const sendOtpBtn = document.getElementById("sendOtp");
const verifyOtpBtn = document.getElementById("verifyOtp");
const otpSection = document.getElementById("otpSection");
const emailInput = document.getElementById("forgotEmail");
const otpInput = document.getElementById("otpInput");
let generatedOtp = null;

// Open Forgot Password Modal
forgotPasswordBtn.addEventListener("click", (e) => {
  e.preventDefault();
  forgotPasswordModal.style.display = "block";
});

// Close Modal and Reset Fields
closeModal.addEventListener("click", () => {
  forgotPasswordModal.style.display = "none";
  otpSection.style.display = "none";
  emailInput.value = "";
  otpInput.value = "";
});

// Generate and Send OTP
sendOtpBtn.addEventListener("click", () => {
  const email = emailInput.value;
  if (!email) {
    alert("Please enter a valid email!");
    return;
  }
  generatedOtp = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit OTP
  console.log("Generated OTP:", generatedOtp); // Debugging: Log OTP for testing
  alert(`OTP sent to ${email}`); // Simulate sending OTP
  otpSection.style.display = "block"; // Show the OTP section
});

// Verify OTP
verifyOtpBtn.addEventListener("click", () => {
  const enteredOtp = otpInput.value;
  if (enteredOtp == generatedOtp) {
    alert("OTP Verified! You can now reset your password.");
    forgotPasswordModal.style.display = "none"; // Close modal after verification
  } else {
    alert("Invalid OTP. Try again.");
  }
});

// ========== Sign In Form Submission ==========
const form = document.getElementById("iamofficer");

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Collect form data
  const formData = new FormData(form);
  const jsonData = {}; // Create an object to store JSON data
  formData.forEach((value, key) => {
    jsonData[key] = value;
  });

  // Debugging: Check JSON data in console
  console.log("Form Data as JSON:", jsonData);

  // Fetch request to backend
  fetch("http://localhost:8080/user/iamofficer", {
    method: "POST", // Use POST method
    headers: {
      "Content-Type": "application/json", // Specify JSON content type
    },
    body: JSON.stringify(jsonData), // Send JSON data
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Parse the JSON response
    })
    .then((data) => {
      console.log("Server Response:", data); // Log server response for debugging

      // Handle successful login
      if (data.status === 200) {
        alert(data.message); // Notify user of success
        window.location.href = "Officer_dashboard.html"; // Redirect to dashboard
      } else {
        alert(data.message); // Notify user of failure (e.g., incorrect credentials)
      }
    })
    .catch((error) => {
      console.error("Error occurred:", error); // Log errors for debugging
      alert("An error occurred. Please try again later."); // Show generic error message
    });
});
