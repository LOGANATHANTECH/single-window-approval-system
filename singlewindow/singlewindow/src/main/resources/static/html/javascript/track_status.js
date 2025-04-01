document.addEventListener("DOMContentLoaded", function () {
    const steps = document.querySelectorAll(".step");
    const progressLine = document.querySelector(".progress-line");

    let currentStep = 2; // Dynamically update based on actual status

    function updateProgress() {
        steps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add("active");
            } else {
                step.classList.remove("active");
            }
        });

        let progressPercent = ((currentStep - 1) / (steps.length - 1)) * 100;
        progressLine.style.width = `${progressPercent}%`;
    }

    updateProgress();

    // Simulated real-time updates
    let simulatedStep = currentStep;
    setInterval(() => {
        if (simulatedStep < steps.length) {
            simulatedStep++;
            currentStep = simulatedStep;
            updateProgress();
        }
    }, 10000); // Update every 4 seconds
});
