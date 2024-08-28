//translation js
document.addEventListener (
    "DOMContentLoaded", function () {
        const contentElement = document.getElementById (
            'content-id'
        );
        const translateButton = document.getElementById (
            'translate-btn'
        );

        translateButton.addEventListener (
            'click', function () {
                if (
                    contentElement.classList.contains (
                        'translated'
                    )
                ) {
                    // toggle back to the original content (Bahasa Indonesia)
                    contentElement.innerHTML = `
                        <p>Halo, saya ARDY</p>
                        <p>Saya berdedikasi, cepat belajar, pekerja keras dan karyawan yang dapat diandalkan, berkomitmen untuk memberikan yang terbaik dalam Entri Data, Administrasi, dan analis. Terampil dalam manipulasi dan eksplorasi data menggunakan berbagai alat termasuk Excel, Google Sheets, SQL, Power BI, Power Query, Python. Memiliki pengalaman kerja sebagai Operator Warnet, Teknisi NDT dan Pegawai Notaris telah mempersiapkan saya dengan baik dalam pengelolaan data dan dokumen. Saya juga terbuka untuk melayani dalam kapasitas lain sesuai kebutuhan..</p>
                    `;
                    translateButton.textContent = 'English';
                    contentElement.classList.remove (
                        'translated'
                    );
                } else {
                    // toggle to translated content (Bahasa Inggris)
                    contentElement.innerHTML = `
                        <p>Hello, I am ARDY</p>
                        <p>I am dedicated, fast learner, hardworking and reliable employee, committed to deliver my best in Data Entry, Administration and analyst. Skilled in data manipulation and exploration using various tools including Excel, Google Sheets, SQL, Power BI, Power Query, Python. Having some working experience as an Internet Cafe Operator, NDT Technician and Notary Employee has prepared me well in data and document management. I am equally open to serve in other capacities as needed..</p>
                    `;
                    translateButton.textContent = 'Bahasa Indonesia'
                    contentElement.classList.add (
                        'translated'
                    );
                }
            }
        );
    }
);