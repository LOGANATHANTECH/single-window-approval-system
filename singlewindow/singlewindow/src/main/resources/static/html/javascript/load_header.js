// Function to load and inject the shared header
async function loadSharedHeader() {
    try {
        const response = await fetch('./shared_header.html');
        const html = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Extract the header content
        const headerContent = temp.querySelector('header');
        
        // Get required stylesheets and scripts from shared header
        const stylesheets = Array.from(temp.querySelectorAll('link[rel="stylesheet"]'));
        const scripts = Array.from(temp.querySelectorAll('script'));
        
        // Inject stylesheets if they don't already exist
        stylesheets.forEach(stylesheet => {
            if (!document.querySelector(`link[href="${stylesheet.href}"]`)) {
                document.head.appendChild(stylesheet.cloneNode(true));
            }
        });
        
        // Inject scripts if they don't already exist
        scripts.forEach(script => {
            if (!document.querySelector(`script[src="${script.src}"]`)) {
                document.body.appendChild(script.cloneNode(true));
            }
        });
        
        // Insert the header at the start of the body
        document.body.insertBefore(headerContent, document.body.firstChild);
        
        // Update the active navigation link
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.getAttribute('href')?.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    } catch (error) {
        console.error('Error loading shared header:', error);
    }
}

// Load the shared header when the DOM is ready
document.addEventListener('DOMContentLoaded', loadSharedHeader);