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

// 2. Fungsi untuk Menampilkan Data di Tabel Berdasarkan Tahun (Lengkap dengan Aksi)
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

    let dataArsip = await ambilDataArsip();

    if (tabel) {
        tabel.innerHTML = "";
        let nomor = 1;

        if (Array.isArray(dataArsip)) {
            dataArsip.forEach(function(item) {
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
                            <a href="${link}" target="_blank" class="btn btn-success btn-sm mb-1">
                            👁️ Lihat
                            </a>
                            <button class="btn btn-warning btn-sm mb-1" onclick="editArsipOnline('${item.id}')">
                            ✏️ Edit
                            </button>
                            <button class="btn btn-danger btn-sm mb-1" onclick="hapusArsipOnline('${item.id}')">
                            🗑️ Hapus
                            </button>
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

// Fungsi Hapus Data dari Google Sheets via SheetDB (dengan jeda waktu)
async function hapusArsipOnline(id) {
    let konfirmasi = confirm("Yakin ingin menghapus arsip ini dari database online?");
    if (!konfirmasi) return;

    try {
        let response = await fetch(`https://sheetdb.io/api/v1/71r2n3r73w571/id/${id}`, {
            method: 'DELETE',
        });
        let result = await response.json();
        
        alert("Arsip berhasil dihapus dari Google Sheets!");
        
        // Beri jeda 1 detik agar server sempat memproses
        setTimeout(() => {
            location.reload();
        }, 1000);

    } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Terjadi kesalahan saat menghapus data.");
    }
}

// Fungsi Edit Data di Google Sheets via SheetDB (dengan jeda waktu)
async function editArsipOnline(id) {
    let namaBaru = prompt("Masukkan Nama Dokumen Baru:");
    if (!namaBaru) return;

    let tahunBaru = prompt("Masukkan Tahun Arsip Baru:");
    if (!tahunBaru) return;

    let ketBaru = prompt("Masukkan Keterangan Baru:");
    if (ketBaru === null) return;

    let dataUpdate = {
        data: {
            namaDokumen: namaBaru,
            tahunArsip: tahunBaru,
            keterangan: ketBaru
        }
    };

    try {
        let response = await fetch(`https://sheetdb.io/api/v1/71r2n3r73w571/id/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUpdate)
        });
        let result = await response.json();
        
        alert("Arsip berhasil diperbarui di Google Sheets!");
        
        // Beri jeda 1 detik agar server selesai menyimpan perubahan
        setTimeout(() => {
            location.reload();
        }, 1000);

    } catch (error) {
        console.error("Gagal memperbarui:", error);
        alert("Terjadi kesalahan saat mengedit data.");
    }
}

function tampil2024(){ tampilSemua("2024"); }
function tampil2025(){ tampilSemua("2025"); }
function tampil2026(){ tampilSemua("2026"); }
