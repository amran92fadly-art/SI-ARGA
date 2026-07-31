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

    let id = 'ARGA-' + Date.now();
    let keteranganLengkap = `${keterangan} | Link Drive: ${linkDrive}`;

    let dataBaru = {
        id: id,
        namaDokumen: namaDokumen,
        jenisArsip: jenisArsip,
        tahunArsip: tahunArsip,
        keterangan: keteranganLengkap
    };

    await tambahArsip(dataBaru);
    document.querySelector("form").reset();
}

// 2. Fungsi untuk Menampilkan Data di Tabel Berdasarkan Tahun
async function tampilSemua(tahun) {
    let tabel = document.getElementById("tabelArsip");
    let judul = document.getElementById("judul");
    
    if (judul) {
        if (tahun === 'SEMUA') {
            judul.innerHTML = "Semua Daftar Arsip Tersimpan";
        } else {
            judul.innerHTML = "Daftar Arsip Tahun " + tahun;
        }
    }
    
    if (tabel) {
        tabel.innerHTML = `<tr><td colspan="6" class="text-center">Memuat data dari Google Sheets...</td></tr>`;
    }

    // Tunggu sampai data dari Google Sheets selesai diambil (pakai await)
    let dataArsip = await ambilDataArsip();

    if (tabel) {
        tabel.innerHTML = "";
        let nomor = 1;

        if (Array.isArray(dataArsip)) {
            dataArsip.forEach(function(item) {
                // Ambil link drive dari dalam teks keterangan jika ada
                let link = '#';
                let ketAsli = item.keterangan || '';
                if (ketAsli.includes('Link Drive: ')) {
                    let splitData = ketAsli.split('Link Drive: ');
                    ketAsli = splitData[0];
                    link = splitData[1];
                }

                if (tahun === 'SEMUA' || item.tahunArsip == tahun) {
                    tabel.innerHTML += `
                    <tr>
                        <td>${nomor++}</td>
                        <td>${item.namaDokumen || '-'}</td>
                        <td>${item.jenisArsip || '-'}</td>
                        <td>${item.tahunArsip || '-'}</td>
                        <td>${ketAsli}</td>
                        <td>
                            <a href="${link}" target="_blank" class="btn btn-success btn-sm">
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
                    Belum ada arsip ${tahun === 'SEMUA' ? '' : 'tahun ' + tahun}
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
