function redirectToLogin() {
    window.location.href = "login";
}

// Highlight active navigation link
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");
    const currentPath = window.location.pathname;

    links.forEach(link => {
        if (currentPath.includes(link.getAttribute("href"))) {
            link.style.color = "#ff6600";
        }
    });
});
