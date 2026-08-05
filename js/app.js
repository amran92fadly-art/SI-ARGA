// URL API SheetDB Database SI-ARGA
const SHEET_API_URL = 'https://sheetdb.io/api/v1/8iv115zyf9df7';

// ==========================================
// 1. FUNGSI UTAMA (KONEKSI DATABASE)
// ==========================================

// Mengambil Semua Data Arsip
async function ambilDataArsip() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        return [];
    }
}

// Menambah Arsip Baru (Digunakan di upload.html)
async function tambahArsip(dataArsip) {
    try {
        const response = await fetch(SHEET_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: dataArsip })
        });
        const result = await response.json();
        alert('Berhasil menyimpan arsip ke Google Sheets!');
        window.location.href = 'data_arsip.html';
        return result;
    } catch (error) {
        console.error('Gagal menyimpan:', error);
        alert('Terjadi kesalahan saat menyimpan data.');
    }
}

// Trigger Form Upload Dokumen
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


// ==========================================
// 2. FUNGSI UNTUK HALAMAN DASHBOARD & STATISTIK
// ==========================================
async function muatDashboard() {
    let dataArsip = await ambilDataArsip();
    
    // Hitung total arsip
    let totalArsip = dataArsip.length;
    let elTotal = document.getElementById("totalArsip");
    if (elTotal) elTotal.innerText = totalArsip;

    // Hitung berdasarkan tahun jika elemennya ada di dashboard
    let t2024 = dataArsip.filter(item => item.tahunArsip == "2024").length;
    let t2025 = dataArsip.filter(item => item.tahunArsip == "2025").length;
    let t2026 = dataArsip.filter(item => item.tahunArsip == "2026").length;

    if (document.getElementById("jml2024")) document.getElementById("jml2024").innerText = t2024;
    if (document.getElementById("jml2025")) document.getElementById("jml2025").innerText = t2025;
    if (document.getElementById("jml2026")) document.getElementById("jml2026").innerText = t2026;
}


// ==========================================
// 3. FUNGSI UNTUK HALAMAN PENCARIAN
// ==========================================
async function cariArsip() {
    let keyword = document.getElementById("inputPencarian").value.toLowerCase();
    let tabelCari = document.getElementById("tabelPencarian");
    
    if (!tabelCari) return;

    let dataArsip = await ambilDataArsip();
    tabelCari.innerHTML = "";
    let nomor = 1;

    let hasil = dataArsip.filter(item => 
        (item.namaDokumen && item.namaDokumen.toLowerCase().includes(keyword)) ||
        (item.jenisArsip && item.jenisArsip.toLowerCase().includes(keyword)) ||
        (item.tahunArsip && item.tahunArsip.toLowerCase().includes(keyword)) ||
        (item.keterangan && item.keterangan.toLowerCase().includes(keyword))
    );

    if (hasil.length === 0) {
        tabelCari.innerHTML = `<tr><td colspan="5" class="text-center">Data tidak ditemukan</td></tr>`;
        return;
    }

    hasil.forEach(function(item) {
        let link = '#';
        let ketAsli = item.keterangan || '';
        if (ketAsli.includes('Link Drive: ')) {
            let splitData = ketAsli.split('Link Drive: ');
            ketAsli = splitData[0];
            link = splitData[1];
        }

        tabelCari.innerHTML += `
        <tr>
            <td>${nomor++}</td>
            <td>${item.namaDokumen || '-'}</td>
            <td>${item.jenisArsip || '-'}</td>
            <td>${item.tahunArsip || '-'}</td>
            <td>
                <a href="${link}" target="_blank" class="btn btn-success btn-sm">👁️ Lihat</a>
            </td>
        </tr>
        `;
    });
}


// Otomatis jalankan fungsi dashboard jika berada di halaman dashboard
window.addEventListener("DOMContentLoaded", () => {
    muatDashboard();
});
