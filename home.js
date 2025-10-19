document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-theme');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            toggleButton.textContent = '☀️ Light Mode';
        } else {
            toggleButton.textContent = '🌙 Dark Mode';
        }
    });
});