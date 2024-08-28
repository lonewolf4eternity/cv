/*
const toggleButton = document.querySelector (
    '#theme-toggle'
);
const body = document.querySelector (
    'body'
);

if (toggleButton && body) {
    toggleButton.addEventListener (
        'click' , () => {
            body.classList.toggle (
                'dark'
            );
            body.classList.toggle (
                'light'
            );
        }
    );
}
*/

document.addEventListener (
    "DOMContentLoaded", function () {
        const body = document.querySelector (
            'body'
        );
        const themeToggle = document.getElementById (
            'theme-toggle'
        );

        themeToggle.addEventListener (
            'click', function () {
                body.classList.toggle (
                    'dark'
                );
                body.classList.toggle (
                    'light'
                );

                // update theme toggle button
                const currentTheme = body.classList.contains (
                    'dark'
                ) ? 'Light Theme' : 'Dark Theme';
                themeToggle.textContent = currentTheme;
            }
        );
    }
);