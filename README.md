# LokaJamu

Proyek ini adalah API sederhana yang mencakup fitur:
- **Artikel**: CRUD untuk data artikel.
- **Bahan**: CRUD untuk data bahan.
- **Bookmark**: CRUD untuk data bookmark.
- **Login**: Autentikasi login menggunakan JWT.

API ini dibangun dengan Node.js dan Express, menggunakan JSON sebagai media penyimpanan data.

---

Install Dependensi
Jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:

npm install

---

Jalankan Server
Jalankan server dengan perintah:

npm run start

---

Server akan berjalan pada port 9000. Akses melalui browser atau API client (seperti Postman) di URL berikut:

http://localhost:9000

---

Daftar Endpoint API
1. Artikel
GET /api/articles: Mendapatkan semua artikel.
GET /api/articles/
: Mendapatkan artikel berdasarkan ID.
POST /api/articles: Menambahkan artikel baru.
Body:
json
{
    "title": "Judul Artikel",
    "content": "Isi artikel"
}

PUT /api/articles/
: Mengupdate artikel berdasarkan ID.
Body:
json
{
    "title": "Judul Baru",
    "content": "Isi Baru"
}

DELETE /api/articles/
: Menghapus artikel berdasarkan ID.

2. Bahan
GET /api/bahan: Mendapatkan semua bahan.
GET /api/bahan/
: Mendapatkan bahan berdasarkan ID.
POST /api/bahan: Menambahkan bahan baru.
Body:
json
{
    "nama": "Gula",
    "jenis": "Bahan Makanan",
    "deskripsi": "Digunakan sebagai pemanis."
}

DELETE /api/bahan/
: Menghapus bahan berdasarkan ID.

3. Bookmark
GET /api/bookmarks: Mendapatkan semua bookmark.
POST /api/bookmarks: Menambahkan bookmark baru.
Body:
json
{
    "title": "Google",
    "url": "https://www.google.com"
}
DELETE /api/bookmarks/
: Menghapus bookmark berdasarkan ID.

4. Login
POST /api/login: Melakukan login dan mendapatkan token JWT.
Body:
json
{
    "username": "user1",
    "password": "password1"
}

GET /api/protected: Mengakses data yang dilindungi menggunakan token JWT.
Header:
Authorization: Bearer <token>