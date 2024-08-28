function updateDateTime() {
    var dateElement = document.getElementById("date");
    var clockElement = document.getElementById("clock");

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var currentDate = new Date().toLocaleDateString('id-ID', options);
    var currentTime = new Date().toLocaleTimeString('id-ID');

    dateElement.innerHTML = currentDate;
    clockElement.innerHTML = currentTime;
}

// Panggil fungsi untuk pertama kali
updateDateTime();

// Update setiap detik (1000 milidetik)
setInterval(updateDateTime, 1000);
