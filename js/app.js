// URL API SheetDB Database SI-ARGA
const SHEET_API_URL = 'https://sheetdb.io/api/v1/0pphfgdm3f59v';

// 1. Fungsi untuk Menambah Arsip (Digunakan di halaman upload.html)
async function tambahArsip(dataArsip) {
    try {
        const response = await fetch(SHEET_API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [dataArsip] })
        });
        const result = await response.json();
        alert('Berhasil menyimpan arsip ke Google Sheets!');
        return result;
    } catch (error) {
        console.error('Gagal menyimpan:', error);
        alert('Terjadi kesalahan saat menyimpan data.');
    }
}

// 2. Fungsi untuk Mengambil Semua Data Arsip (Digunakan di data_arsip.html / pencarian.html)
async function ambilDataArsip() {
    try {
        const response = await fetch(SHEET_API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Gagal mengambil data:', error);
        return [];
    }
}
