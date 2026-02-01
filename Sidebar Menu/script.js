document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle');

    // --- 1. Load Saved Theme ---
    // Check local storage for a saved preference or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    // --- 2. Initial Button Text Setup ---
    // Set the button's initial text/icon based on the loaded theme
    updateThemeToggleUI(body.classList.contains('dark-mode'));

    // --- 3. Event Listener for Toggle Button ---
    themeToggleBtn.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body
        body.classList.toggle('dark-mode');

        const isDarkMode = body.classList.contains('dark-mode');

        // Save the new preference to local storage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        // Update the button's appearance
        updateThemeToggleUI(isDarkMode);
    });

    /**
     * Updates the text and icon of the theme toggle button.
     * @param {boolean} isDarkMode - True if dark mode is currently active.
     */
    function updateThemeToggleUI(isDarkMode) {
        const icon = themeToggleBtn.querySelector('i');
        const text = themeToggleBtn.querySelector('.theme-text');

        if (isDarkMode) {
            icon.className = 'fas fa-moon'; // Moon icon for dark mode
            text.textContent = 'Light Mode'; // Button text prompts switch to light
            themeToggleBtn.title = 'Switch to Light Mode';
        } else {
            icon.className = 'fas fa-sun'; // Sun icon for light mode
            text.textContent = 'Dark Mode'; // Button text prompts switch to dark
            themeToggleBtn.title = 'Switch to Dark Mode';
        }
    }
});