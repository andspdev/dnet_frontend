<h1>Paketanly : Situs Paket Data Internet All Operator</h1>
<p>Isi ulang dengan mudah, nggak pakai ribet dan paling murah. Ayo beli paket data kamu disini!</p>

<br/>

* Dibuat pada: 13 Maret 2024
* Selesai pada: -

<br/>

<b>Untuk Backend (Mock Server -> json-server) - Port 3001</b>
* cd ./backend/
* npm install -g json-server
* npx json-server db.json -p 3001

<b>Untuk Frontend (ReactJS) - Default port 3000</b>
* cd ./frontend/
* npm install
* npm start

<br/>

<b>API Dummy (Endpoints)</b>
* http://localhost:3001/pengguna
* http://localhost:3001/paket_data
* http://localhost:3001/transaksi_user

<br/>

<b>Halaman Pada Frontend</b>
* Beranda
* Masuk
* Daftar
* Beli Paket Data
* Kelola Transaksi
* Detail Transaksi + Status Pembayaran
* Profil Saya
* Logout


--------------------------------

<h3>Tambah Pengguna</h3>
<p>Pengguna dapat ditambah manual ataupun melalui halaman pendaftaran akun. Jika ingin ditambahkan secara manual, sebagai berikut:</p>

<br/>

<b>Tambah manual</b><br/>
* Tambahkan pada field array pengguna di db.json

Dengan data field (sebagai contoh):
<pre>
{
    "id": "98d8",
    "nama": "Pengguna 1",
    "email": "pengguna1@gmail.com",
    "password": "12345678",
    "bergabung_pada": 1710429958794
}
</pre>

<br/>

Maka db.json akan seperti:
<pre>
{
  "pengguna": [
    {
      "id": "98d8",
      "nama": "Pengguna 1",
      "email": "pengguna1@gmail.com",
      "password": "12345678",
      "bergabung_pada": 1710429958794
    }
  ],
  ...
}  
</pre>
</pre>
