// JavaScript code can go here if needed in the future.
console.log('Website Layout with Sidebar Loaded');

//  date and time function
function updateDateTime () {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const now = new Date();
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    const dateString = `${dayName} | ${day} ${month} ${year}`;
    const timeString = `${hours} - ${minutes} - ${seconds} / ${milliseconds}`;

    document.getElementById('date').textContent = dateString;
    document.getElementById('time').textContent = timeString;
}

// update date and time every second
setInterval (updateDateTime, 1);

//  ---
// Function to open the modal and display the clicked image
function openModal(imgElement) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    
    modal.style.display = 'flex';  // Set modal to flex to center content
    modalImg.src = imgElement.querySelector('img').src;  // Get the image src
    modalImg.classList.add('normal');  // Set initial zoom level to normal

    // Reset previous zoom listeners to avoid adding multiple event listeners
    modalImg.removeEventListener('click', toggleZoom);
    modalImg.addEventListener('click', toggleZoom);
}

// Function to toggle between zoom-in and zoom-out
function toggleZoom(event) {
    const modalImg = document.getElementById('modalImage');

    if (modalImg.classList.contains('normal')) {
        zoomIn(event);  // Perform zoom in at the clicked position
    } else {
        zoomOut();  // Reset to normal zoom
    }
}

// Zoom-in function
function zoomIn(event) {
    const modalImg = document.getElementById('modalImage');
    const rect = modalImg.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;  // Get X position relative to image
    const offsetY = event.clientY - rect.top;   // Get Y position relative to image
    
    const percentX = (offsetX / rect.width) * 100;  // Calculate the percentage of click position
    const percentY = (offsetY / rect.height) * 100;
    
    modalImg.style.transformOrigin = `${percentX}% ${percentY}%`;  // Set zoom origin based on click position
    modalImg.classList.remove('normal');
    modalImg.classList.add('zoomed');
    modalImg.style.transform = 'scale(5)';  // Zoom in (adjust scale as needed)
}

// Zoom-out function
function zoomOut() {
    const modalImg = document.getElementById('modalImage');
    modalImg.classList.remove('zoomed');
    modalImg.classList.add('normal');
    modalImg.style.transform = 'scale(1)';  // Reset to original size
    modalImg.style.transformOrigin = 'center center';  // Reset origin to center
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    modal.style.display = 'none';

    // Reset the zoom level and position when closing the modal
    modalImg.classList.remove('zoomed');
    modalImg.classList.add('normal');
    modalImg.style.transform = 'scale(1)';
    modalImg.style.transformOrigin = 'center center';  // Reset to center
}

//  menutup halaman web
document.addEventListener('DOMContentLoaded', function () {
    // Tombol penutup
    const closeDashboardBtn = document.getElementById('close-dashboard-btn');
    if (closeDashboardBtn) {
        closeDashboardBtn.addEventListener('click', function () {
            // Redirect kembali ke halaman project.html
            window.location.href = '../../project/index.html';
        });
    }
});

//  membuat tooltip
document.addEventListener('DOMContentLoaded', function() {
    // Temukan semua elemen dengan class tooltip
    const tooltips = document.querySelectorAll('.tooltip');
    const tooltipContainer = document.createElement('div');
    
    // Buat elemen container tooltip
    tooltipContainer.classList.add('tooltip-container');
    tooltipContainer.innerHTML = `
        <div class="tooltip-title"></div>
        <div class="tooltip-description"></div>
    `;
    
    // Tambahkan container ke dalam body
    document.body.appendChild(tooltipContainer);
    
    // Tambahkan event listener untuk mouseover dan mouseout pada elemen tooltip
    tooltips.forEach(function(tooltip) {
        tooltip.addEventListener('mouseover', function() {
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            
            // Isi judul dan deskripsi tooltip
            tooltipContainer.querySelector('.tooltip-title').textContent = title;
            tooltipContainer.querySelector('.tooltip-description').textContent = description;
            
            // Tampilkan tooltip
            tooltipContainer.classList.add('show');
        });
        
        tooltip.addEventListener('mouseout', function() {
            // Sembunyikan tooltip
            tooltipContainer.classList.remove('show');
        });
    });
});

//  preview image
// Ambil elemen preview
const previewImg = document.getElementById('preview-img');

// Ambil semua gambar di dalam ndt-project-item-gallery
const galleryImgs = document.querySelectorAll('.ndt-project-item-gallery img');

// Iterasi melalui setiap gambar di galeri
galleryImgs.forEach(img => {
    // Ketika mouse berada di atas gambar
    img.addEventListener('mouseover', function() {
        // Ubah src dari gambar preview dengan src dari gambar yang di-hover
        previewImg.src = this.src;
    });

    // Ketika mouse meninggalkan gambar, kembali ke gambar default
    img.addEventListener('mouseout', function() {
        previewImg.src = '../../../image/project/ndt/ndt-01.jpg'; // Gambar default
    });
});

//  tab-container
function showTab(event, tabId) {
    // Hapus kelas 'active' dari semua tombol tab
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Sembunyikan semua konten tab
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }

    // Tampilkan konten tab yang dipilih
    document.getElementById(tabId).style.display = "block";

    // Tambahkan kelas 'active' ke tombol tab yang dipilih
    event.currentTarget.classList.add("active");

    // Update nomor urut secara otomatis di tabel
    updateTableNumbering(tabId);
}

// Fungsi untuk memberikan nomor urut otomatis pada tabel
function updateTableNumbering(tabId) {
    var table = document.querySelector(`#${tabId} table tbody`);
    var rows = table.getElementsByTagName('tr');

    for (var i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName('td')[0].innerText = i + 1;  // Set nomor urut
    }
}

// Tampilkan tab pertama secara default dan nomor otomatis
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("pt").style.display = "block";
    document.querySelector(".tab-button").classList.add("active");
    updateTableNumbering('pt');  // Set nomor otomatis untuk tab pertama
});

//  pencarian isi tabel
function searchTable() {
    // Ambil input pencarian
    var input = document.getElementById("searchInput");
    var filter = input.value.toLowerCase();
    
    // Ambil semua tabel dari tab yang sedang aktif
    var tabContent = document.querySelector('.tab-content[style="display: block;"]');
    var table = tabContent.getElementsByTagName("table")[0];
    var tr = table.getElementsByTagName("tr");

    // Loop melalui semua baris di dalam tabel
    for (var i = 1; i < tr.length; i++) {  // Mulai dari 1 untuk melewati header
        var tdArray = tr[i].getElementsByTagName("td");
        var match = false;

        // Loop melalui semua kolom dalam baris
        for (var j = 0; j < tdArray.length; j++) {
            if (tdArray[j]) {
                var txtValue = tdArray[j].textContent || tdArray[j].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    match = true; // Jika ada kolom yang cocok, baris akan tampil
                }
            }
        }
        
        // Tampilkan atau sembunyikan baris sesuai hasil pencarian
        tr[i].style.display = match ? "" : "none";
    }
}

// Fungsi untuk menghapus isi kotak pencarian
function clearSearch() {
    document.getElementById('searchInput').value = ''; // Kosongkan input
    searchTable(); // Refresh hasil pencarian
    document.querySelector('.clear-icon').style.display = 'none'; // Sembunyikan ikon xmark
}

// Fungsi untuk menampilkan/menyembunyikan ikon xmark saat ada teks
document.getElementById('searchInput').addEventListener('input', function() {
    if (this.value.length > 0) {
        document.querySelector('.clear-icon').style.display = 'block'; // Tampilkan ikon xmark
    } else {
        document.querySelector('.clear-icon').style.display = 'none'; // Sembunyikan ikon xmark
    }
});

//  maven market project
function openMavenTab(evt, tabName) {
    // Hapus display semua tab content
    const tabContent = document.getElementsByClassName("maven-tabcontent");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // Hapus kelas 'maven-active-tab' dari semua tombol tab
    const tabLinks = document.getElementsByClassName("maven-tablink");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("maven-active-tab");
    }

    // Tampilkan tab yang dipilih dan tambahkan kelas 'maven-active-tab'
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("maven-active-tab");
}

// Buka tab pertama sebagai default saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".maven-tablink").click();
});
