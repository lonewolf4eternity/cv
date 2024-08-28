// copyright js
function updateCopyright() {
    const copyrightElement = document.getElementById('copyright');

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().toLocaleString(
        "en-US", {
            month: "long"
        }
    );

    copyrightElement.innerHTML = `&copy; January 2024 &nbsp- &nbsp${
        currentMonth
    } ${
        currentYear
    } | myResume | All Rights Reserved | self-designed By : Revardy D. Chester`;
}