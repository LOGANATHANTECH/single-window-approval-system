




// DOM Elements for Sign-Up/Sign-In
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

//signUpButton.addEventListener('click', () => {
  //  container.classList.add("right-panel-active");
//});

//signInButton.addEventListener('click', () => {
  //  container.classList.remove("right-panel-active");
//});

// Forgot Password Functionality
const forgotPasswordBtn = document.getElementById("forgotPasswordBtn");
const forgotPasswordModal = document.getElementById("forgotPasswordModal");
const closeModal = document.querySelector(".close");
const sendOtpBtn = document.getElementById("sendOtp");
const verifyOtpBtn = document.getElementById("verifyOtp");
const otpSection = document.getElementById("otpSection");
const emailInput = document.getElementById("forgotEmail");
const otpInput = document.getElementById("otpInput");
let generatedOtp = null;


// Export the globalUserData variable
//export let globalUserData = null;

// Export a function to update globalUserData
//function setGlobalUserData(data) {
  //  globalUserData = data;
   // console.log('Global User Data Updated:', globalUserData);
//}



forgotPasswordBtn.addEventListener("click", (e) => {
    e.preventDefault();
    forgotPasswordModal.style.display = "block";
});

closeModal.addEventListener("click", () => {
    clearForgotPasswordInputs();
    forgotPasswordModal.style.display = "none";
});

sendOtpBtn.addEventListener("click", () => {
    const email = emailInput.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !email.match(emailPattern)) {
        alert("Please enter a valid email address!");
        return;
    }

    generatedOtp = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", generatedOtp);
    alert(`OTP sent to ${email}`);
    otpSection.style.display = "block";
});

verifyOtpBtn.addEventListener("click", () => {
    const enteredOtp = otpInput.value;

    if (enteredOtp == generatedOtp) {
        alert("OTP Verified! You can now reset your password.");
        clearForgotPasswordInputs();
        forgotPasswordModal.style.display = "none";
    } else {
        alert("Invalid OTP. Try again.");
    }
});

function clearForgotPasswordInputs() {
    otpSection.style.display = "none";
    emailInput.value = "";
    otpInput.value = "";
    generatedOtp = null;
}

// Sign-In Form Submission
// Define a global variable





document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Prepare the JSON data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please fill in both email and password.");
        return;
    }

    const jsonData = { email, password };

    // Send the JSON data to the Spring Boot API
    fetch('http://localhost:8080/user/iamentrepreneur', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
    .then(response => response.json()) // Convert the response to JSON
    .then(data => {
        if (data.status === 202) {
			
			// Local variable
			   const user = data.data;
       			
			   // ✅ Store only this one variable to sessionStorage
		
			   sessionStorage.setItem("userdata", JSON.stringify(user));
				alert("hi");
			   			   console.log(user);


            alert(`Success: ${data.message}\nRedirecting to registration page...`);
            window.location.href = 'user-dashboard2.html';
        } else {
            console.error('Error:', data.message);
            alert(`Error: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});
