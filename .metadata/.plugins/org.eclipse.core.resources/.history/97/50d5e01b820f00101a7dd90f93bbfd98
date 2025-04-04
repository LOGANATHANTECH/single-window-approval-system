const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});
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

 forgotPasswordBtn.addEventListener("click", (e) => {
	 e.preventDefault();
	 forgotPasswordModal.style.display = "block";
 });

 closeModal.addEventListener("click", () => {
	 forgotPasswordModal.style.display = "none";
	 otpSection.style.display = "none";
	 emailInput.value = "";
	 otpInput.value = "";
 });

 sendOtpBtn.addEventListener("click", () => {
	 const email = emailInput.value;
	 if (!email) {
		 alert("Please enter a valid email!");
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
		 forgotPasswordModal.style.display = "none";
	 } else {
		 alert("Invalid OTP. Try again.");
	 }
 });
