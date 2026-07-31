// 3. Fungsi Hapus Data dari Google Sheets via SheetDB berdasarkan ID
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

// 4. Fungsi Edit Data di Google Sheets via SheetDB berdasarkan ID
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
