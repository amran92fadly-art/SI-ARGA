// 1. Fungsi untuk Menyimpan Arsip ke Google Sheets melalui app.js
async function simpanArsip() {
    let namaDokumen = document.getElementById("namaDokumen").value;
    let jenisArsip = document.getElementById("jenisArsip").value;
    let tahunArsip = document.getElementById("tahunArsip").value;
    let keterangan = document.getElementById("keterangan").value;
    let linkDrive = document.getElementById("linkDrive").value;

    if (!namaDokumen) {
        alert("Nama dokumen wajib diisi!");
        return;
    }

    // Buat ID unik berdasarkan waktu
    let id = 'ARGA-' + Date.now();

    // Gabungkan keterangan dan link Google Drive
    let keteranganLengkap = `${keterangan} | Link Drive: ${linkDrive}`;

    let dataBaru = {
        id: id,
        namaDokumen: namaDokumen,
        jenisArsip: jenisArsip,
        tahunArsip: tahunArsip,
        keterangan: keteranganLengkap
    };

    // Panggil fungsi dari app.js untuk kirim ke Google Sheets
    await tambahArsip(dataBaru);

    // Reset form setelah berhasil
    document.querySelector("form").reset();
}

// 2. Fungsi untuk Menampilkan Data di Tabel Berdasarkan Tahun
async function tampilSemua(tahun) {
    let tabel = document.getElementById("tabelArsip");
    let judul = document.getElementById("judul");
    
    if (judul) judul.innerHTML = "Daftar Arsip Tahun " + tahun;
    if (tabel) tabel.innerHTML = `<tr><td colspan="6" class="text-center">Memuat data dari Google Sheets...</td></tr>`;

    // Ambil data dari Google Sheets via app.js
    let dataArsip = await ambilDataArsip();

    if (tabel) {
        tabel.innerHTML = "";
        let nomor = 1;

        // Pastikan dataArsip berupa array
        if (Array.isArray(dataArsip)) {
            dataArsip.forEach(function(item) {
                // Sesuaikan penamaan kolom dari Google Sheets (namaDokumen, jenisArsip, dll)
                if (item.tahunArsip == tahun) {
                    tabel.innerHTML += `
                    <tr>
                        <td>${nomor++}</td>
                        <td>${item.namaDokumen || '-'}</td>
                        <td>${item.jenisArsip || '-'}</td>
                        <td>${item.tahunArsip || '-'}</td>
                        <td>${item.keterangan || '-'}</td>
                        <td>
                            <a href="${item.keterangan && item.keterangan.includes('Link Drive: ') ? item.keterangan.split('Link Drive: ')[1] : '#'}" 
                               target="_blank" 
                               class="btn btn-success btn-sm">
                            👁️ Lihat
                            </a>
                        </td>
                    </tr>
                    `;
                }
            });
        }

        if (nomor === 1) {
            tabel.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">
                    Belum ada arsip tahun ${tahun}
                </td>
            </tr>
            `;
        }
    }
}

function tampil2024(){
    tampilSemua("2024");
}

function tampil2025(){
    tampilSemua("2025");
}

function tampil2026(){
    tampilSemua("2026");
}
