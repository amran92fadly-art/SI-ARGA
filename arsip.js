function simpanArsip(){

    let dataArsip = JSON.parse(localStorage.getItem("arsip")) || [];

    let arsip = {

        nama: document.getElementById("namaDokumen").value,

        jenis: document.getElementById("jenisArsip").value,

        tahun: document.getElementById("tahunArsip").value,

        keterangan: document.getElementById("keterangan").value,

        link: document.getElementById("linkDrive").value
    };


    dataArsip.push(arsip);


    localStorage.setItem("arsip", JSON.stringify(dataArsip));


    alert("Arsip berhasil disimpan");

}
let dataArsip = JSON.parse(localStorage.getItem("arsip")) || [];

let tabel = document.getElementById("tabelArsip");
let judul = document.getElementById("judul");

function tampilSemua(tahun){

    judul.innerHTML = "Daftar Arsip Tahun " + tahun;

    tabel.innerHTML = "";

    let nomor = 1;

    dataArsip.forEach(function(item,index){

        if(item.tahun == tahun){

            tabel.innerHTML += `
            <tr>

                <td>${nomor++}</td>

                <td>${item.nama}</td>

                <td>${item.jenis}</td>

                <td>${item.tahun}</td>

                <td>${item.keterangan}</td>

                <td>

                    <a href="${item.link || '#'}"
                    target="_blank"
                    class="btn btn-success btn-sm">
                    👁️ Lihat
                    </a>

                    <button
                    class="btn btn-warning btn-sm"
                    onclick="editArsip(${index})">
                    ✏️ Edit
                    </button>

                    <button
                    class="btn btn-danger btn-sm"
                    onclick="hapusArsip(${index})">
                    🗑️ Hapus
                    </button>

                </td>

            </tr>
            `;

        }

    });

    if(nomor==1){

        tabel.innerHTML=`
        <tr>
            <td colspan="6" class="text-center">
                Belum ada arsip tahun ${tahun}
            </td>
        </tr>
        `;

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
function hapusArsip(index){

    let yakin = confirm("Yakin ingin menghapus arsip ini?");

    if(yakin){

        dataArsip.splice(index,1);

        localStorage.setItem("arsip", JSON.stringify(dataArsip));

        alert("Arsip berhasil dihapus.");

        tampil2025();

    }

}