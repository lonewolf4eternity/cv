document.addEventListener('DOMContentLoaded', function () {
    // Tombol penutup
    const closeDashboardBtn = document.getElementById('close-dashboard-btn');
    if (closeDashboardBtn) {
        closeDashboardBtn.addEventListener('click', function () {
            // Redirect kembali ke halaman project.html
            window.location.href = '../../sub_page/project.html';
        });
    }
});
