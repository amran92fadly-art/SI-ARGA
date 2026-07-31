// Fungsi Hapus Data dari Google Sheets via SheetDB berdasarkan Nama Dokumen
async function hapusArsipOnline(namaDokumen) {
    let konfirmasi = confirm("Yakin ingin menghapus arsip ini dari database online?");
    if (!konfirmasi) return;

    try {
        let response = await fetch(`https://sheetdb.io/api/v1/71r2n3r73w571/namaDokumen/${encodeURIComponent(namaDokumen)}`, {
            method: 'DELETE',
        });
        let result = await response.json();
        
        alert("Arsip berhasil dihapus dari Google Sheets!");
        
        setTimeout(() => {
            location.reload();
        }, 1000);

    } catch (error) {
        console.error("Gagal menghapus:", error);
        alert("Terjadi kesalahan saat menghapus data.");
    }
}

// Fungsi Edit Data di Google Sheets via SheetDB berdasarkan Nama Dokumen Lama
async function editArsipOnline(namaLama) {
    let namaBaru = prompt("Masukkan Nama Dokumen Baru:", namaLama);
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
        let response = await fetch(`https://sheetdb.io/api/v1/71r2n3r73w571/namaDokumen/${encodeURIComponent(namaLama)}`, {
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
        }, 1000);

    } catch (error) {
        console.error("Gagal memperbarui:", error);
        alert("Terjadi kesalahan saat mengedit data.");
    }
}
