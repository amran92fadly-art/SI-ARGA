// URL API SheetDB Database SI-ARGA yang benar
const SHEET_API_URL = 'https://sheetdb.io/api/v1/0pphfgdm3f59v';

// 1. Fungsi untuk Mengambil Data Arsip dari Google Sheets
async function ambilDataArsip() {
    try {
        let response = await fetch(SHEET_API_URL);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Gagal mengambil data:", error);
        return [];
    }
}

// 2. Fungsi untuk Menambah Arsip ke Google Sheets
async function tambahArsip(dataBaru) {
    try {
        let response = await fetch(SHEET_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: dataBaru })
        });
        let result = await response.json();
        alert("Arsip berhasil diupload ke Google Sheets!");
        setTimeout(() => {
            location.reload();
        }, 1000);
    } catch (error) {
        console.error("Gagal menyimpan:", error);
        alert("Terjadi kesalahan saat mengupload data.");
    }
}

// Fungsi Trigger saat tombol Simpan di form upload diklik
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
}

// 3. Fungsi untuk Menampilkan Data di Tabel Berdasarkan Tahun
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
                            <button class="btn btn-warning btn-sm mb-1" onclick="editArsipOnline('${item.id}', '${item.namaDokumen}', '${item.tahunArsip}', '${item.keterangan}')">
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

// 4. Fungsi Hapus Data via SheetDB berdasarkan ID
async function hapusArsipOnline(id) {
    let konfirmasi = confirm("Yakin ingin menghapus arsip ini dari database online?");
    if (!konfirmasi) return;

    try {
        let response = await fetch(`${SHEET_API_URL}/id/${id}`, {
            method: 'DELETE',
        });
        let result = await response.json();
        
        alert("Arsip berhasil dihapus dari Google Sheets!");
        setTimeout(() => {
            location.reload();
        }, 2000);

    } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Terjadi kesalahan saat menghapus data.");
    }
}

// 5. Fungsi Edit Data via SheetDB berdasarkan ID
async function editArsipOnline(id, namaLama, tahunLama, ketLama) {
    let namaBaru = prompt("Masukkan Nama Dokumen Baru:", namaLama);
    if (!namaBaru) return;

    let tahunBaru = prompt("Masukkan Tahun Arsip Baru:", tahunLama);
    if (!tahunBaru) return;

    let ketBaru = prompt("Masukkan Keterangan Baru:", ketLama);
    if (ketBaru === null) return;

    let dataUpdate = {
        data: {
            namaDokumen: namaBaru,
            tahunArsip: tahunBaru,
            keterangan: ketBaru
        }
    };

    try {
        let response = await fetch(`${SHEET_API_URL}/id/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUpdate)
        });
        let result = await response.json();
        
        alert("Arsip berhasil diperbarui di Google Sheets!");
        setTimeout(() => {
            location.reload();
        }, 2000);

    } catch (error) {
        console.error("Gagal memperbarui:", error);
        alert("Terjadi kesalahan saat mengedit data.");
    }
}

function tampil2024(){ tampilSemua("2024"); }
function tampil2025(){ tampilSemua("2025"); }
function tampil2026(){ tampilSemua("2026"); }
