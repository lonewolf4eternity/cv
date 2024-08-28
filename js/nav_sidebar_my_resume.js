// navigasi untuk menu sidebar
document.addEventListener('DOMContentLoaded', function () {
    const sidebarLinks = document.querySelectorAll('.sidebar a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetID = this.getAttribute('href').substring(1);

            loadContent(targetID);
        });
    });
});

// memanggil halaman ke main content
function loadContent(targetID) {
    const targetContent = document.querySelector('.main-content');
    if (targetContent) {
        targetContent.innerHTML = `<iframe src="${targetID}" width="100%" height="100%" frameborder="0"></iframe>`;
    }
}
