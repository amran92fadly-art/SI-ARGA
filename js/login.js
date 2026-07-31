function login() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Daftar akun yang diizinkan (Anda tetap bisa pakai akun Anda, plus tambah akun lain)
    let daftarUser = JSON.parse(localStorage.getItem("users")) || [
        { email: "amran92fadly@gmail.com", password: "022818Ara" }, // Akun utama Anda
        { email: "anitaladewa@gmail.com", password: "admin123" }   // Contoh akun orang lain
    ];

    // Cek apakah email dan password cocok dengan salah satu data di daftar
    let userValid = daftarUser.find(u => u.email === email && u.password === password);

    if (userValid) {
        alert("Login Berhasil!");
        window.location.href = "dashboard.html";
    } else {
        alert("Email atau Password Salah!");
    }
}
