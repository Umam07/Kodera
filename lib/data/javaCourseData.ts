import { Course } from "../types";

export const JAVA_COURSE_DATA: Course = {
  id: "course-java-fundamentals",
  slug: "java",
  title: "Pemrograman Java: Dari Nol Sampai OOP",
  tagline: "Era baru belajar Java dengan pendekatan runtut, latihan drag & drop alur kode, dan auto-grading instan.",
  language: "Java",
  description:
    "Kurikulum terstruktur yang dirancang khusus untuk mengulang dan memperkuat pondasi Java. Disertai latihan interaktif menyusun potongan kode dan eksekusi coding otomatis tanpa boilerplate.",
  totalModules: 14,
  totalLessons: 24,
  modules: [
    // LEVEL 1: Fundamental
    {
      id: "mod-1",
      slug: "variabel-dan-tipe-data",
      title: "Variabel & Tipe Data",
      shortDescription: "Mengenal tipe data primitif, non-primitif, deklarasi variabel, dan aturan penamaan di Java.",
      levelGroup: 1,
      levelName: "Level 1 — Fundamental",
      order: 1,
      iconName: "Binary",
      accentColor: "mint",
      lessons: [
        {
          id: "les-var-1",
          moduleSlug: "variabel-dan-tipe-data",
          slug: "pengenalan-variabel",
          title: "Deklarasi & Inisialisasi Variabel",
          description: "Pahami cara menyimpan data dalam memori dengan tipe data yang tepat dan strongly-typed.",
          order: 1,
          keyConcepts: [
            "Java adalah bahasa statically-typed: tipe variabel ditentukan saat kompilasi",
            "8 tipe data primitif (disimpan di Stack): byte, short, int, long, float, double, char, boolean",
            "Tipe data referensi (disimpan di Heap): String dan objek non-primitif",
            "Gunakan 'int' untuk angka bulat default dan 'double' untuk angka desimal default",
            "Keyword 'final' digunakan untuk membuat konstanta yang nilainya tidak dapat diubah",
          ],
          contentMarkdown: `Variabel adalah wadah penyimpanan bernama di dalam memori komputer (RAM) untuk menampung nilai selama program berjalan. Karena Java bersifat **statically-typed** dan **strongly-typed**, setiap variabel wajib ditentukan tipe datanya secara eksplisit saat deklarasi, dan compiler akan menolak kompilasi apabila terjadi ketidakcocokan tipe tanpa konversi eksplisit.

### Deklarasi vs Inisialisasi: Apa Bedanya?

Banyak pemula mencampuradukkan kedua istilah ini, padahal keduanya adalah fase yang berbeda:

1. **Deklarasi**: Memesan alokasi memori dan memberi nama (*identifier*) pada variabel beserta tipe datanya. Pada tahap ini, variabel belum memiliki nilai pasti. Contoh: \`int umur;\`
2. **Inisialisasi**: Proses memasukkan nilai perdana (*initial value*) ke dalam variabel yang sudah dideklarasikan. Contoh: \`umur = 21;\`
3. **Deklarasi Sekaligus Inisialisasi**: Cara paling lazim di mana variabel langsung diberi nilai awal pada baris yang sama. Contoh: \`int umur = 21;\`

> **Peringatan Compiler Java:** Variabel lokal di dalam method Java **tidak memiliki nilai default**. Jika kamu mencoba membaca atau mencetak variabel sebelum diinisialisasi, compiler akan langsung mengeluarkan error: \`variable might not have been initialized\`.

### Ringkasan Cepat: Tabel Perbandingan Tipe Data Java

Gunakan tabel referensi cepat ini untuk membandingkan kapasitas memori dan skenario terbaik untuk masing-masing tipe data:

| Tipe Data | Kategori | Memori | Rentang Nilai | Rekomendasi Penggunaan Utama (Best Use Case) |
|---|---|---|---|---|
| \`byte\` | Integer | 8-bit (1 B) | -128 s.d. 127 | File I/O biner mentah, buffer jaringan, RAM hemat / IoT |
| \`short\` | Integer | 16-bit (2 B) | -32.768 s.d. 32.767 | Array jutaan data angka kecil (menghemat 50% RAM dibanding int) |
| \`int\` | Integer | 32-bit (4 B) | ±2,14 Miliar | **Default pilihan utama** untuk counter loop, indeks array, hitungan umum |
| \`long\` | Integer | 64-bit (8 B) | ±9 Triliun Miliar | ID database (*bigint*), timestamp milidetik, transaksi finansial masif |
| \`float\` | Decimal | 32-bit (4 B) | 6-7 digit desimal | Grafis game 3D, vektor posisi x/y/z, tensor machine learning (akhiran \`f\`) |
| \`double\` | Decimal | 64-bit (8 B) | 15-16 digit desimal | **Default pilihan utama** untuk desimal: rumus sains, IPK, koordinat GPS |
| \`char\` | Karakter | 16-bit (2 B) | 0 s.d. 65.535 (UTF-16) | 1 karakter tunggal: inisial, grade ujian (\`'A'\`), delimiter tanda baca |
| \`boolean\` | Logika | 1-bit | \`true\` / \`false\` | Percabangan \`if-else\`, status saklar (*flag* validasi, login, aktif) |
| \`String\` | Referensi | Heap Object | Teks tak terbatas | Nama pengguna, email, pesan notifikasi, representasi teks manusia |

### 📦 Keluarga 1: Bilangan Bulat (Integer Family)

#### \`byte\` (8-bit / 1 byte) • Rentang: -128 s.d. 127
- **Karakteristik**: Tipe data integer terkecil di Java.
- **Use Case Terbaik**: Pengolahan berkas biner mentah (*raw file I/O* seperti membaca file gambar, audio, atau PDF byte demi byte), komunikasi jaringan (*network socket buffer*), dan pemrograman mikroprosesor / embedded system yang memiliki keterbatasan memori RAM.
- **Contoh**: \`byte levelKecerahan = 100;\`

#### \`short\` (16-bit / 2 byte) • Rentang: -32.768 s.d. 32.767
- **Karakteristik**: Dua kali ukuran \`byte\`, tapi separuh dari \`int\`.
- **Use Case Terbaik**: Array data numerik masif (jutaan elemen) di mana nilai angka dijamin kecil (misalnya koordinat piksel 2D layer grafis atau rekaman sensor suhu), menghemat RAM 50% dibandingkan \`int\`.
- **Contoh**: \`short tahunAngkatan = 2024;\`

#### \`int\` (32-bit / 4 byte) • Rentang: -2,14 Miliar s.d. 2,14 Miliar
- **Karakteristik**: Tipe bilangan bulat **standar dan default** di Java. CPU modern 32-bit dan 64-bit dioptimalkan untuk memproses data 32-bit secara instan.
- **Use Case Terbaik**: Pilihan utama untuk penghitung perulangan (*counter loop*), indeks array, umur orang, jumlah stok barang di toko, dan perhitungan aritmatika umum. Selalu gunakan \`int\` kecuali ada alasan teknis khusus.
- **Contoh**: \`int saldoPoin = 15000;\`

#### \`long\` (64-bit / 8 byte) • Rentang: ±9 Triliun Miliar
- **Karakteristik**: Bilangan bulat kapasitas raksasa. Wajib diakhiri literal \`L\` (disarankan kapital agar tidak tertukar dengan angka 1).
- **Use Case Terbaik**: ID unik database (*primary key bigint*), penanda waktu epoch milidetik (\`System.currentTimeMillis()\`), transaksi perbankan internasional, jarak astronomi antar planet, dan data populasi dunia.
- **Contoh**: \`long idPengguna = 9876543210123L;\`

### 🎯 Keluarga 2: Bilangan Desimal (Floating-Point Family)

#### \`float\` (32-bit / 4 byte) • Presisi: 6-7 Digit Desimal
- **Karakteristik**: Bilangan desimal presisi tunggal. Wajib diakhiri huruf \`f\` atau \`F\`.
- **Use Case Terbaik**: Grafika 3D, mesin game (*game engine* untuk vektor posisi koordinat x, y, z karakter), komputasi audio, dan tensor machine learning di mana efisiensi memori GPU lebih diutamakan daripada presisi koma ekstrem.
- **Contoh**: \`float kecepatanKarakter = 8.5f;\`

#### \`double\` (64-bit / 8 byte) • Presisi: 15-16 Digit Desimal
- **Karakteristik**: Tipe bilangan pecahan **standar dan default** di Java.
- **Use Case Terbaik**: Pilihan utama untuk perhitungan matematika sains, fisika, IPK mahasiswa, rumus finansial, dan data koordinat GPS (*latitude/longitude*) yang menuntut akurasi desimal tinggi.
- **Contoh**: \`double ipkKumulatif = 3.94;\`

### 🔤 Keluarga 3: Karakter & Nilai Logika

#### \`char\` (16-bit / 2 byte) • Rentang: 0 s.d. 65.535 (Unicode UTF-16)
- **Karakteristik**: Menyimpan tepat **satu karakter tunggal** dengan tanda petik tunggal (\`' '\`). Mendukung seluruh karakter alfabet dunia termasuk huruf Arab, Jepang, dan simbol Unicode.
- **Use Case Terbaik**: Inisial nama, predikat nilai ujian (\`'A'\`, \`'B'\`), opsi pilihan ganda kuis (\`'C'\`), atau karakter pemisah teks (*delimiter* CSV).
- **Contoh**: \`char golonganDarah = 'O';\`

#### \`boolean\` (1-bit Informasi Logika)
- **Karakteristik**: Hanya memiliki dua kemungkinan nilai: \`true\` (benar) atau \`false\` (salah).
- **Use Case Terbaik**: Status kondisi / *flag* saklar (misal: status aktif, verifikasi akun, ketersediaan stok), dan menjadi fondasi utama percabangan logika \`if-else\` serta perulangan \`while\`/\`for\`.
- **Contoh**: \`boolean isAkunTerverifikasi = true;\`
### Tipe Data Referensi (Non-Primitif): Mengapa String Berbeda?

Selain 8 tipe primitif di atas, Java memiliki **Tipe Data Referensi** (*Reference Types*). Contoh paling penting dan sering digunakan adalah \`String\`.

1. **Primitive vs Reference**:
- **Tipe Primitif**: Menyimpan nilainya langsung di dalam memori **Stack**.
- **Tipe Referensi**: Variabel di **Stack** hanya menyimpan alamat pointer / referensi ke objek asli yang dialokasikan di dalam memori **Heap**.

2. **Ciri Khas Objek String**:
- Dibuat menggunakan tanda petik ganda (\`" "\`).
- \`String\` di Java bersifat **Immutable** (kekal): isi teks di dalam objek String tidak dapat diubah setelah dibuat. Operasi penggabungan teks (\`+\`) sebenarnya menciptakan objek String baru di memori Heap.
- Memiliki banyak method bawaan siap pakai, seperti \`.length()\`, \`.toUpperCase()\`, \`.substring()\`, dan \`.equals()\`.
- **Use Case Terbaik**: Nama pengguna, alamat email, kata sandi, kalimat pesan notifikasi, dan segala jenis representasi teks manusia.

### Kata Kunci final: Membuat Konstanta yang Tidak Boleh Berubah

Jika kamu ingin mendeklarasikan nilai yang **tidak boleh diubah sama sekali** setelah inisialisasi perdana, gunakan kata kunci \`final\`.

- Jika ada baris kode yang mencoba mengubah nilai variabel \`final\`, compiler Java akan langsung mengeluarkan error: \`cannot assign a value to final variable\`.
- **Konvensi Penamaan**: Konstanta \`final\` biasanya ditulis menggunakan format huruf besar semua dengan pemisah garis bawah (**UPPER_SNAKE_CASE**).
- **Contoh**: \`final double PAJAK_PPN = 0.11;\` atau \`final int MAKSIMAL_PERCOBAAN_LOGIN = 3;\`

### Aturan & Konvensi Penamaan Variabel (Identifier) di Java

Agar kodemu profesional dan mudah dibaca oleh programmer lain, ikuti aturan standar industri Java berikut:

1. **Gaya Penulisan lowerCamelCase**: Awali dengan huruf kecil, dan setiap kata berikutnya diawali huruf kapital tanpa spasi (misal: \`namaLengkapMahasiswa\`, \`totalSkorUjian\`).
2. **Karakter yang Diperbolehkan**: Nama variabel harus diawali dengan huruf alfabet (\`a-z\`, \`A-Z\`), tanda garis bawah (\`_\`), atau simbol dolar (\`$\`). Variabel **tidak boleh diawali angka**.
3. **Bersifat Case-Sensitive**: Huruf besar dan huruf kecil dibedakan secara tegas. Variabel \`skor\`, \`Skor\`, dan \`SKOR\` adalah 3 variabel yang sepenuhnya berbeda di memori.
4. **Tidak Boleh Memakai Kata Kunci Java**: Jangan gunakan kata kunci khusus yang sudah dipesan oleh Java (*reserved keywords*), seperti \`class\`, \`public\`, \`int\`, \`return\`, \`static\`, \`if\`, atau \`void\`.`,
          codeExamples: [
            {
              title: "Demonstrasi Lengkap 8 Tipe Primitif, String, dan Konstanta final",
              code: `public class DemonstrasiVariabelJava {
    public static void main(String[] args) {
        // 1. Tipe bilangan bulat (Integer family)
        byte levelBaterai = 95;
        short tahunMasuk = 2024;
        int jumlahMahasiswa = 120;
        long totalPustakaBuku = 1500000000L;

        // 2. Tipe desimal / pecahan (Floating-point family)
        float gravitasiBumi = 9.8f;
        double ipkSemester = 3.95;

        // 3. Karakter tunggal dan nilai logika
        char inisialNama = 'U';
        boolean statusAktif = true;

        // 4. Tipe Referensi: String (kumpulan karakter)
        String namaLengkap = "Muhammad Syafi'ul Umam";
        // 5. Konstanta final (nilainya terkunci)
        final String NAMA_KAMPUS = "Teknik Informatika Kodera";
        final double STANDAR_KELULUSAN = 3.00;

        // Output demonstrasi ke layar konsol
        System.out.println("=== DATA AKADEMIK KODERA ===");
        System.out.println("Nama Mahasiswa: " + namaLengkap + " (" + inisialNama + ")");
        System.out.println("Tahun Angkatan: " + tahunMasuk + " | Daya Tampung: " + jumlahMahasiswa + " orang");
        System.out.println("IPK Kumulatif : " + ipkSemester + " | Status Aktif: " + statusAktif);
        System.out.println("Batas Kelulusan: " + STANDAR_KELULUSAN + " | Kampus: " + NAMA_KAMPUS);
    }
}`,
              explanation: "Kode ini mendemonstrasikan sintaks deklarasi untuk setiap keluarga tipe data di Java: integer (byte, short, int, long), floating point (float, double), karakter tunggal (char), logika boolean, objek teks String, serta konstanta terkunci dengan keyword final.",
            },
          ],
          dragDropExercises: [
            {
              id: "dnd-var-1",
              lessonId: "les-var-1",
              title: "Susun Deklarasi Biodata Mahasiswa",
              instruction: "Susun baris kode Java berikut agar mendeklarasikan nama, usia, membentuk kalimat perkenalan, dan mencetaknya secara benar.",
              type: "code_order",
              difficulty: "easy",
              xpReward: 15,
              solutionExplanation: "Di Java yang bersifat statically-typed, setiap variabel wajib dideklarasikan dan diinisialisasi sebelum dapat dirujuk dalam ekspresi lain. Variabel 'nama' dan 'usia' dideklarasikan pertama kali agar nilainya tersedia untuk digabung ke dalam variabel 'pesan', lalu perintah System.out.println mencetak hasil akhir ke konsol.",
              items: [
                {
                  id: "i1",
                  codeFragment: 'String nama = "Budi";',
                  correctPosition: 1,
                  explanation: "Deklarasi dan inisialisasi variabel string nama harus di awal sebelum nilainya digabung ke kalimat pesan.",
                },
                {
                  id: "i2",
                  codeFragment: "int usia = 20;",
                  correctPosition: 2,
                  explanation: "Deklarasi variabel integer usia untuk menampung angka umur sebelum dicetak.",
                },
                {
                  id: "i3",
                  codeFragment: 'String pesan = "Halo, nama saya " + nama;',
                  correctPosition: 3,
                  explanation: "Membentuk kalimat perkenalan dengan menggabungkan string literal dan variabel nama yang sudah dideklarasikan.",
                },
                {
                  id: "i4",
                  codeFragment: 'System.out.println(pesan + " berumur " + usia + " tahun.");',
                  correctPosition: 4,
                  explanation: "Mencetak hasil gabungan variabel pesan dan usia ke output konsol di baris paling akhir.",
                },
              ],
            },
            {
              id: "dnd-var-2",
              lessonId: "les-var-1",
              title: "Klasifikasi Kapasitas Memori Integer Primitif",
              instruction: "Urutkan tipe data bilangan bulat primitif di Java dari kapasitas memori terkecil (bit terendah) hingga terbesar.",
              type: "concept_order",
              difficulty: "easy",
              xpReward: 15,
              solutionExplanation: "Java mengalokasikan ukuran memori pasti untuk setiap tipe data primitif secara universal: byte (8-bit / 1 byte) -> short (16-bit / 2 byte) -> int (32-bit / 4 byte) -> long (64-bit / 8 byte). Pemilihan tipe data yang tepat menghemat alokasi memori dan mencegah bug integer overflow.",
              items: [
                {
                  id: "mem1",
                  codeFragment: "byte (8-bit / 1 byte, rentang -128 s.d 127)",
                  correctPosition: 1,
                  explanation: "byte adalah tipe data integer terkecil di Java, hanya membutuhkan 1 byte (8 bit) memori.",
                },
                {
                  id: "mem2",
                  codeFragment: "short (16-bit / 2 byte, rentang -32.768 s.d 32.767)",
                  correctPosition: 2,
                  explanation: "short berukuran 16-bit (2 byte), dua kali lebih besar dari tipe byte.",
                },
                {
                  id: "mem3",
                  codeFragment: "int (32-bit / 4 byte, tipe default integer di Java)",
                  correctPosition: 3,
                  explanation: "int adalah tipe bilangan bulat standar di Java dengan ukuran 32-bit (4 byte).",
                },
                {
                  id: "mem4",
                  codeFragment: "long (64-bit / 8 byte, untuk nilai angka sangat besar)",
                  correctPosition: 4,
                  explanation: "long adalah tipe integer terbesar berukuran 64-bit (8 byte) dengan akhiran huruf L.",
                },
              ],
            },
            {
              id: "dnd-var-3",
              lessonId: "les-var-1",
              title: "Susun Kalkulasi Total Tagihan dan Diskon Belanja",
              instruction: "Susun penggalan kode Java berikut untuk mendeklarasikan harga awal, persentase diskon, menghitung nominal potongan, dan mencetak total akhir.",
              type: "code_order",
              difficulty: "easy",
              xpReward: 20,
              solutionExplanation: "Komputasi program selalu mengikuti alur Input/Deklarasi -> Perhitungan Perantara -> Hasil Akhir -> Output. Nilai harga awal dan faktor pengali diskon harus ada terlebih dahulu agar rumus potongan dapat dieksekusi sebelum total bayar dihitung dan dicetak.",
              items: [
                {
                  id: "calc1",
                  codeFragment: "double hargaAwal = 250000.0;",
                  correctPosition: 1,
                  explanation: "Harga dasar produk dideklarasikan sebagai tipe desimal (double) sebelum dikenakan diskon.",
                },
                {
                  id: "calc2",
                  codeFragment: "double persentaseDiskon = 0.10; // 10%",
                  correctPosition: 2,
                  explanation: "Tingkat diskon disimpan sebagai angka desimal pecahan sebelum dikalikan.",
                },
                {
                  id: "calc3",
                  codeFragment: "double potongan = hargaAwal * persentaseDiskon;",
                  correctPosition: 3,
                  explanation: "Nominal potongan harga dihitung dari harga awal dikali persentase diskon.",
                },
                {
                  id: "calc4",
                  codeFragment: "double totalBayar = hargaAwal - potongan;",
                  correctPosition: 4,
                  explanation: "Total pembayaran final dihitung dengan mengurangkan harga awal dengan nominal potongan.",
                },
                {
                  id: "calc5",
                  codeFragment: 'System.out.println("Total Bayar: Rp " + totalBayar);',
                  correctPosition: 5,
                  explanation: "Mencetak hasil perhitungan akhir ke layar konsol di baris penutup.",
                },
              ],
            },
          ],
          codingProblem: {
            id: "code-var-1",
            lessonId: "les-var-1",
            title: "Format Salam Mahasiswa",
            problemStatement:
              "Buat method `formatSalam(String nama, int angkatan)` yang mengembalikan teks dengan format persis: `\"Mahasiswa [nama] angkatan [angkatan] siap belajar Java!\"`.",
            methodSignature: "public String formatSalam(String nama, int angkatan)",
            starterCode: `class Solution {
    public String formatSalam(String nama, int angkatan) {
        // Tulis kode jawabanmu di sini
        return "";
    }
}`,
            solutionCode: `class Solution {
    public String formatSalam(String nama, int angkatan) {
        return "Mahasiswa " + nama + " angkatan " + angkatan + " siap belajar Java!";
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              {
                id: "tc-1",
                input: 'formatSalam("Umam", 2022)',
                expectedOutput: '"Mahasiswa Umam angkatan 2022 siap belajar Java!"',
                isHidden: false,
              },
              {
                id: "tc-2",
                input: 'formatSalam("Rian", 2024)',
                expectedOutput: '"Mahasiswa Rian angkatan 2024 siap belajar Java!"',
                isHidden: false,
              },
              {
                id: "tc-3",
                input: 'formatSalam("Siti", 2021)',
                expectedOutput: '"Mahasiswa Siti angkatan 2021 siap belajar Java!"',
                isHidden: true,
              },
            ],
          },
        },
      ],
    },
    {
      id: "mod-2",
      slug: "operator",
      title: "Operator",
      shortDescription: "Menguasai operator aritmatika, perbandingan, logika, dan operator ternary dalam ekspresi Java.",
      levelGroup: 1,
      levelName: "Level 1 — Fundamental",
      order: 2,
      iconName: "Calculator",
      accentColor: "yellow",
      lessons: [
        {
          id: "les-op-1",
          moduleSlug: "operator",
          slug: "operator-aritmatika-dan-logika",
          title: "Operator Logika & Perbandingan",
          description: "Pelajari evaluasi kondisi menggunakan boolean operator AND (&&), OR (||), dan negasi (!).",
          order: 1,
          keyConcepts: [
            "Operator perbandingan: ==, !=, >, <, >=, <=",
            "Operator logika short-circuit: && (keduanya harus true), || (salah satu cukup true)",
            "Ternary operator: condition ? valueIfTrue : valueIfFalse",
          ],
          contentMarkdown: `Operator memungkinkan kita memanipulasi nilai variabel dan membangun ekspresi logika.
Short-circuit evaluation pada Java menjamin jika sisi kiri dari \`&&\` bernilai \`false\`, sisi kanan tidak akan dievaluasi.`,
          codeExamples: [
            {
              title: "Evaluasi Kelulusan dengan Operator",
              code: `public class CekKelulusan {
    public static void main(String[] args) {
        double nilaiUjian = 85.0;
        int kehadiranPersen = 80;

        boolean lulus = (nilaiUjian >= 75.0) && (kehadiranPersen >= 75);
        String predikat = lulus ? "Lulus Bersyarat" : "Wajib Remidi";

        System.out.println("Status: " + predikat);
    }
}`,
              explanation: "Kombinasi operator perbandingan dan logika && menghasilkan boolean yang dievaluasi ternary operator.",
            },
          ],
          dragDropExercises: [
            {
              id: "dnd-op-1",
              lessonId: "les-op-1",
              title: "Urutkan Logika Diskon Belanja",
              instruction: "Susun baris perhitungan diskon belanja: jika total belanja >= 100.000 dan member = true, dapat diskon 10%.",
              type: "code_order",
              difficulty: "easy",
              xpReward: 15,
              solutionExplanation: "Variabel 'totalBelanja' dan status 'isMember' wajib dideklarasikan terlebih dahulu sebelum dievaluasi dalam ekspresi logika '&&'. Hasil boolean 'dapatDiskon' kemudian dipakai oleh ternary operator untuk menentukan nominal bayar akhir.",
              items: [
                {
                  id: "o1",
                  codeFragment: "double totalBelanja = 120000.0;",
                  correctPosition: 1,
                  explanation: "Mendeklarasikan total nominal belanja sebelum dievaluasi dalam kondisi diskon.",
                },
                {
                  id: "o2",
                  codeFragment: "boolean isMember = true;",
                  correctPosition: 2,
                  explanation: "Mendeklarasikan status keanggotaan pembeli sebagai nilai boolean.",
                },
                {
                  id: "o3",
                  codeFragment: "boolean dapatDiskon = (totalBelanja >= 100000) && isMember;",
                  correctPosition: 3,
                  explanation: "Mengevaluasi operator logika &&: kedua syarat (belanja >= 100rb dan status member) harus terpenuhi.",
                },
                {
                  id: "o4",
                  codeFragment: "double bayar = dapatDiskon ? (totalBelanja * 0.9) : totalBelanja;",
                  correctPosition: 4,
                  explanation: "Menggunakan ternary operator untuk memotong 10% jika dapatDiskon bernilai true.",
                },
              ],
            },
            {
              id: "dnd-op-2",
              lessonId: "les-op-1",
              title: "Prioritas Evaluasi Operator Java (Precedence)",
              instruction: "Urutkan kelompok operator di Java dari prioritas evaluasi tertinggi (paling pertama dieksekusi) hingga terendah.",
              type: "concept_order",
              difficulty: "medium",
              xpReward: 20,
              solutionExplanation: "Java mengevaluasi ekspresi berdasarkan tabel operator precedence: Tanda kurung () selalu diprioritaskan pertama kali, disusul aritmatika perkalian/pembagian (* / %), kemudian penjumlahan/pengurangan (+ -), disusul perbandingan relasional (> <), dan terakhir logika boolean (&& lalu ||).",
              items: [
                {
                  id: "p1",
                  codeFragment: "1. Tanda Kurung: ( )",
                  correctPosition: 1,
                  explanation: "Ekspresi di dalam tanda kurung selalu dievaluasi paling awal oleh compiler.",
                },
                {
                  id: "p2",
                  codeFragment: "2. Aritmatika Perkalian & Pembagian: * / %",
                  correctPosition: 2,
                  explanation: "Perkalian, pembagian, dan modulus memiliki presedensi lebih tinggi daripada penjumlahan.",
                },
                {
                  id: "p3",
                  codeFragment: "3. Aritmatika Penjumlahan & Pengurangan: + -",
                  correctPosition: 3,
                  explanation: "Penjumlahan dan pengurangan dievaluasi setelah operasi perkalian/pembagian selesai.",
                },
                {
                  id: "p4",
                  codeFragment: "4. Perbandingan Relasional: > < >= <=",
                  correctPosition: 4,
                  explanation: "Operator relasional membandingkan dua nilai angka menghasilkan boolean.",
                },
                {
                  id: "p5",
                  codeFragment: "5. Logika Boolean: && (AND) lalu || (OR)",
                  correctPosition: 5,
                  explanation: "Operator logika dievaluasi paling akhir, dengan operator && mendahului operator ||.",
                },
              ],
            },
          ],
          codingProblem: {
            id: "code-op-1",
            lessonId: "les-op-1",
            title: "Cek Kelayakan Beasiswa",
            problemStatement:
              "Implementasikan method `isEligibleScholarship(double ipk, int penghasilanOrtu)` yang mengembalikan `true` jika IPK >= 3.50 DAN penghasilan orang tua <= 5000000.",
            methodSignature: "public boolean isEligibleScholarship(double ipk, int penghasilanOrtu)",
            starterCode: `class Solution {
    public boolean isEligibleScholarship(double ipk, int penghasilanOrtu) {
        // Tulis logika pengecekan
        return false;
    }
}`,
            solutionCode: `class Solution {
    public boolean isEligibleScholarship(double ipk, int penghasilanOrtu) {
        return ipk >= 3.50 && penghasilanOrtu <= 5000000;
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              {
                id: "tc-op-1",
                input: "isEligibleScholarship(3.75, 4000000)",
                expectedOutput: "true",
                isHidden: false,
              },
              {
                id: "tc-op-2",
                input: "isEligibleScholarship(3.40, 3000000)",
                expectedOutput: "false",
                isHidden: false,
              },
              {
                id: "tc-op-3",
                input: "isEligibleScholarship(3.80, 8000000)",
                expectedOutput: "false",
                isHidden: true,
              },
            ],
          },
        },
      ],
    },
    // LEVEL 2: Control & Data
    {
      id: "mod-3",
      slug: "kontrol-alur",
      title: "Kontrol Alur (If & Loop)",
      shortDescription: "Percabangan kondisi if-else, switch-case, serta perulangan for, while, dan do-while.",
      levelGroup: 2,
      levelName: "Level 2 — Control & Data",
      order: 3,
      iconName: "GitBranch",
      accentColor: "teal",
      lessons: [
        {
          id: "les-flow-1",
          moduleSlug: "kontrol-alur",
          slug: "percabangan-dan-perulangan",
          title: "Percabangan If-Else & Loop For",
          description: "Mengarahkan alur eksekusi program berdasarkan kondisi serta iterasi berulang.",
          order: 1,
          keyConcepts: [
            "Struktur if-else if-else mengevaluasi kondisi dari atas ke bawah",
            "Loop for standar: for (init; condition; increment)",
            "Penggunaan break dan continue untuk mengendalikan iterasi",
          ],
          contentMarkdown: `Kontrol alur menentukan urutan instruksi dijalankan. Dalam Java, perulangan for paling sering digunakan ketika jumlah iterasi telah diketahui sebelumnya.`,
          codeExamples: [
            {
              title: "Menghitung Total Bilangan Genap",
              code: `public class HitungGenap {
    public static void main(String[] args) {
        int total = 0;
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                total += i;
            }
        }
        System.out.println("Total genap 1-10: " + total);
    }
}`,
              explanation: "Iterasi dari 1 sampai 10 dengan pengecekan sisa bagi (modulus) untuk menyaring bilangan genap.",
            },
          ],
          dragDropExercises: [
            {
              id: "dnd-flow-1",
              lessonId: "les-flow-1",
              title: "Susun Perulangan Faktorial",
              instruction: "Susun urutan baris kode berikut untuk menghitung faktorial dari bilangan n = 5 menggunakan loop for.",
              type: "code_order",
              difficulty: "easy",
              xpReward: 20,
              solutionExplanation: "Variabel n dan variabel akumulator hasil = 1 wajib diinisialisasi di luar loop. Loop for kemudian mengalikan hasil dengan nilai i dari 1 sampai n, dan kurung kurawal penutup '}' menandai selesainya blok perulangan.",
              items: [
                {
                  id: "f1",
                  codeFragment: "int n = 5;",
                  correctPosition: 1,
                  explanation: "Batas angka faktorial yang ingin dihitung dideklarasikan pertama kali.",
                },
                {
                  id: "f2",
                  codeFragment: "long hasil = 1;",
                  correctPosition: 2,
                  explanation: "Variabel akumulator bertipe long diinisialisasi 1 sebagai identitas perkalian.",
                },
                {
                  id: "f3",
                  codeFragment: "for (int i = 1; i <= n; i++) {",
                  correctPosition: 3,
                  explanation: "Header loop for: mulai dari i = 1 sampai i <= n dengan kenaikan 1 tiap iterasi.",
                },
                {
                  id: "f4",
                  codeFragment: "    hasil *= i;",
                  correctPosition: 4,
                  explanation: "Badan loop: mengalikan akumulator dengan nilai counter saat ini (hasil = hasil * i).",
                },
                {
                  id: "f5",
                  codeFragment: "}",
                  correctPosition: 5,
                  explanation: "Kurung kurawal penutup untuk mengakhiri lingkup blok loop for.",
                },
              ],
            },
            {
              id: "dnd-flow-2",
              lessonId: "les-flow-1",
              title: "Siklus Eksekusi Loop For di Java",
              instruction: "Urutkan urutan fase eksekusi siklus loop for: for (init; kondisi; update) di Java.",
              type: "concept_order",
              difficulty: "medium",
              xpReward: 20,
              solutionExplanation: "Loop for di Java memiliki urutan fase yang sangat teratur: inisialisasi counter (1x saja di awal) -> evaluasi kondisi boolean -> eksekusi statement dalam kurung kurawal -> update/increment counter -> kembali menguji kondisi sampai bernilai false.",
              items: [
                {
                  id: "cyc1",
                  codeFragment: "1. Inisialisasi Counter (dievaluasi hanya 1 kali di awal loop)",
                  correctPosition: 1,
                  explanation: "Langkah perdana: mendeklarasikan dan menetapkan nilai awal variabel penghitung.",
                },
                {
                  id: "cyc2",
                  codeFragment: "2. Evaluasi Kondisi Boolean (jika true lanjut, jika false loop berhenti)",
                  correctPosition: 2,
                  explanation: "Uji kelayakan: loop hanya berjalan jika kondisi perbandingan bernilai true.",
                },
                {
                  id: "cyc3",
                  codeFragment: "3. Eksekusi Badan Loop (menjalankan baris perintah di dalam { })",
                  correctPosition: 3,
                  explanation: "Kode logika bisnis di dalam badan loop diproses.",
                },
                {
                  id: "cyc4",
                  codeFragment: "4. Eksekusi Update / Increment (misal i++), lalu kembali ke langkah 2",
                  correctPosition: 4,
                  explanation: "Counter dinaikkan atau diturunkan sebelum kondisi diuji kembali untuk iterasi berikutnya.",
                },
              ],
            },
          ],
          codingProblem: {
            id: "code-flow-1",
            lessonId: "les-flow-1",
            title: "Hitung Jumlah Angka Ganjil",
            problemStatement:
              "Buat method `hitungGanjil(int n)` yang menjumlahkan semua bilangan ganjil positif dari 1 hingga `n` (inklusif). Jika n <= 0, kembalikan 0.",
            methodSignature: "public int hitungGanjil(int n)",
            starterCode: `class Solution {
    public int hitungGanjil(int n) {
        // Tulis loop dan kondisi
        return 0;
    }
}`,
            solutionCode: `class Solution {
    public int hitungGanjil(int n) {
        if (n <= 0) return 0;
        int sum = 0;
        for (int i = 1; i <= n; i += 2) {
            sum += i;
        }
        return sum;
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              { id: "tc-fl-1", input: "hitungGanjil(5)", expectedOutput: "9", isHidden: false },
              { id: "tc-fl-2", input: "hitungGanjil(10)", expectedOutput: "25", isHidden: false },
              { id: "tc-fl-3", input: "hitungGanjil(1)", expectedOutput: "1", isHidden: true },
            ],
          },
        },
      ],
    },
    {
      id: "mod-4",
      slug: "array",
      title: "Array",
      shortDescription: "Struktur data satu dimensi dan multi-dimensi, traversal array, dan operasi dasar.",
      levelGroup: 2,
      levelName: "Level 2 — Control & Data",
      order: 4,
      iconName: "Layers",
      accentColor: "blush",
      lessons: [
        {
          id: "les-arr-1",
          moduleSlug: "array",
          slug: "dasar-array-satu-dimensi",
          title: "Array 1 Dimensi & Iterasi",
          description: "Deklarasi array berukuran tetap, akses indeks 0-based, dan perulangan for-each.",
          order: 1,
          keyConcepts: [
            "Ukuran array di Java bersifat tetap (fixed size) setelah diinisialisasi",
            "Indeks dimulai dari 0 sampai array.length - 1",
            "Enhanced for-loop (for-each): for (Tipe elem : array)",
          ],
          contentMarkdown: `Array menyimpan beberapa elemen dengan tipe data sejenis dalam blok memori berurutan.`,
          codeExamples: [
            {
              title: "Mencari Nilai Maksimum pada Array",
              code: `public class CariMax {
    public static void main(String[] args) {
        int[] skor = {78, 92, 85, 99, 64};
        int max = skor[0];

        for (int nilai : skor) {
            if (nilai > max) {
                max = nilai;
            }
        }
        System.out.println("Skor tertinggi: " + max);
    }
}`,
              explanation: "Menggunakan for-each untuk menelusuri tiap elemen dan membandingkannya.",
            },
          ],
          dragDropExercise: {
            id: "dnd-arr-1",
            lessonId: "les-arr-1",
            title: "Urutkan Penjumlahan Elemen Array",
            instruction: "Susun baris inisialisasi array dan akumulasi total seluruh isinya.",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "a1", codeFragment: "int[] angka = {10, 20, 30, 40};", correctPosition: 1 },
              { id: "a2", codeFragment: "int total = 0;", correctPosition: 2 },
              { id: "a3", codeFragment: "for (int item : angka) {", correctPosition: 3 },
              { id: "a4", codeFragment: "    total += item;", correctPosition: 4 },
              { id: "a5", codeFragment: "}", correctPosition: 5 },
            ],
          },
          codingProblem: {
            id: "code-arr-1",
            lessonId: "les-arr-1",
            title: "Rata-Rata Elemen Array Positif",
            problemStatement:
              "Buat method `hitungRataRata(int[] nums)` yang mengembalikan nilai rata-rata (double) dari semua angka dalam array. Jika array kosong, kembalikan `0.0`.",
            methodSignature: "public double hitungRataRata(int[] nums)",
            starterCode: `class Solution {
    public double hitungRataRata(int[] nums) {
        // Tulis kode iterasi array
        return 0.0;
    }
}`,
            solutionCode: `class Solution {
    public double hitungRataRata(int[] nums) {
        if (nums == null || nums.length == 0) return 0.0;
        double sum = 0;
        for (int num : nums) {
            sum += num;
        }
        return sum / nums.length;
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              { id: "tc-ar-1", input: "hitungRataRata(new int[]{10, 20, 30})", expectedOutput: "20.0", isHidden: false },
              { id: "tc-ar-2", input: "hitungRataRata(new int[]{5, 15})", expectedOutput: "10.0", isHidden: false },
              { id: "tc-ar-3", input: "hitungRataRata(new int[]{100})", expectedOutput: "100.0", isHidden: true },
            ],
          },
        },
      ],
    },
    // LEVEL 3: Method
    {
      id: "mod-5",
      slug: "method",
      title: "Method",
      shortDescription: "Fungsi/method: parameter, return value, scope variabel, dan method overloading.",
      levelGroup: 3,
      levelName: "Level 3 — Method",
      order: 5,
      iconName: "Code2",
      accentColor: "mint",
      lessons: [
        {
          id: "les-met-1",
          moduleSlug: "method",
          slug: "definisi-dan-overloading-method",
          title: "Parameter, Return Value & Overloading",
          description: "Membagi kode menjadi fungsi modular yang dapat dipakai ulang dan overloading nama method.",
          order: 1,
          keyConcepts: [
            "Method signature terdiri dari nama method dan tipe parameternya",
            "Return value mengembalikan data ke pemanggil, atau void jika tanpa return",
            "Method overloading: nama method sama, namun daftar parameter berbeda",
          ],
          contentMarkdown: `Method adalah blok kode yang hanya berjalan saat dipanggil. Method membantu mengorganisir program agar DRY (Don't Repeat Yourself).`,
          codeExamples: [
            {
              title: "Overloading Method Penjumlahan",
              code: `public class Kalkulator {
    public static int tambah(int a, int b) {
        return a + b;
    }

    public static double tambah(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(tambah(5, 7));       // panggil versi int
        System.out.println(tambah(3.5, 2.1));   // panggil versi double
    }
}`,
              explanation: "Compiler Java otomatis memilih versi method berdasarkan tipe argumen yang diberikan.",
            },
          ],
          dragDropExercise: {
            id: "dnd-met-1",
            lessonId: "les-met-1",
            title: "Susun Method Konversi Suhu Celsius ke Fahrenheit",
            instruction: "Susun method Java untuk mengonversi temperatur Celsius ke Fahrenheit: (C * 9/5) + 32.",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "m1", codeFragment: "public double celsiusKeFahrenheit(double c) {", correctPosition: 1 },
              { id: "m2", codeFragment: "    double f = (c * 9.0 / 5.0) + 32.0;", correctPosition: 2 },
              { id: "m3", codeFragment: "    return f;", correctPosition: 3 },
              { id: "m4", codeFragment: "}", correctPosition: 4 },
            ],
          },
          codingProblem: {
            id: "code-met-1",
            lessonId: "les-met-1",
            title: "Pemeriksa Bilangan Prima",
            problemStatement:
              "Buat method `isPrime(int n)` yang mengembalikan `true` jika `n` adalah bilangan prima (lebih besar dari 1 dan hanya habis dibagi 1 dan dirinya sendiri), atau `false` sebaliknya.",
            methodSignature: "public boolean isPrime(int n)",
            starterCode: `class Solution {
    public boolean isPrime(int n) {
        // Tulis pengecekan bilangan prima
        return false;
    }
}`,
            solutionCode: `class Solution {
    public boolean isPrime(int n) {
        if (n <= 1) return false;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) return false;
        }
        return true;
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "medium",
            xpReward: 25,
            testCases: [
              { id: "tc-pr-1", input: "isPrime(7)", expectedOutput: "true", isHidden: false },
              { id: "tc-pr-2", input: "isPrime(4)", expectedOutput: "false", isHidden: false },
              { id: "tc-pr-3", input: "isPrime(1)", expectedOutput: "false", isHidden: true },
              { id: "tc-pr-4", input: "isPrime(29)", expectedOutput: "true", isHidden: true },
            ],
          },
        },
      ],
    },
    // LEVEL 4: OOP Dasar
    {
      id: "mod-6",
      slug: "class-dan-object",
      title: "Class & Object",
      shortDescription: "Blueprint kelas, instansiasi objek dengan keyword new, atribut (field), dan state.",
      levelGroup: 4,
      levelName: "Level 4 — OOP Dasar",
      order: 6,
      iconName: "Box",
      accentColor: "yellow",
      lessons: [
        {
          id: "les-cls-1",
          moduleSlug: "class-dan-object",
          slug: "konsep-class-dan-instansiasi",
          title: "Membangun Class & Menciptakan Object",
          description: "Mendefinisikan atribut, method anggota, dan membuat instance objek di Java.",
          order: 1,
          keyConcepts: [
            "Class adalah cetak biru (blueprint) data dan perilaku",
            "Object adalah realisasi/instansi nyata dari sebuah class di memori heap",
            "Keyword 'new' mengalokasikan memori baru untuk objek",
          ],
          contentMarkdown: `Pemrograman Berorientasi Objek (OOP) memodelkan sistem dunia nyata menjadi entitas yang memiliki status (atribut) dan perilaku (method).`,
          codeExamples: [
            {
              title: "Class Mahasiswa Sederhana",
              code: `class Mahasiswa {
    String nama;
    int semester;

    void sapa() {
        System.out.println("Halo, saya " + nama + " di semester " + semester);
    }
}

public class Main {
    public static void main(String[] args) {
        Mahasiswa mhs1 = new Mahasiswa();
        mhs1.nama = "Umam";
        mhs1.semester = 6;
        mhs1.sapa();
    }
}`,
              explanation: "mhs1 adalah instance objek konkret dari class Mahasiswa.",
            },
          ],
          dragDropExercise: {
            id: "dnd-cls-1",
            lessonId: "les-cls-1",
            title: "Susun Instansiasi Objek Kendaraan",
            instruction: "Urutkan proses pembuatan objek Mobil dan pemanggilan method jalankan().",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "c1", codeFragment: "Mobil avanza = new Mobil();", correctPosition: 1 },
              { id: "c2", codeFragment: 'avanza.merk = "Toyota";', correctPosition: 2 },
              { id: "c3", codeFragment: "avanza.kecepatan = 60;", correctPosition: 3 },
              { id: "c4", codeFragment: "avanza.jalankan();", correctPosition: 4 },
            ],
          },
          codingProblem: {
            id: "code-cls-1",
            lessonId: "les-cls-1",
            title: "Hitung Keliling Persegi Panjang",
            problemStatement:
              "Buat method `hitungKeliling(int panjang, int lebar)` yang menghitung keliling sebuah persegi panjang: `2 * (panjang + lebar)`.",
            methodSignature: "public int hitungKeliling(int panjang, int lebar)",
            starterCode: `class Solution {
    public int hitungKeliling(int panjang, int lebar) {
        // Tulis rumus keliling
        return 0;
    }
}`,
            solutionCode: `class Solution {
    public int hitungKeliling(int panjang, int lebar) {
        return 2 * (panjang + lebar);
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              { id: "tc-cl-1", input: "hitungKeliling(10, 5)", expectedOutput: "30", isHidden: false },
              { id: "tc-cl-2", input: "hitungKeliling(7, 3)", expectedOutput: "20", isHidden: false },
            ],
          },
        },
      ],
    },
    {
      id: "mod-7",
      slug: "constructor",
      title: "Constructor",
      shortDescription: "Inisialisasi objek, constructor default vs parameterized, dan kata kunci this.",
      levelGroup: 4,
      levelName: "Level 4 — OOP Dasar",
      order: 7,
      iconName: "Hammer",
      accentColor: "teal",
      lessons: [
        {
          id: "les-con-1",
          moduleSlug: "constructor",
          slug: "parameterized-constructor-dan-this",
          title: "Constructor Parameter & Keyword 'this'",
          description: "Menginisialisasi state awal objek secara langsung saat instansiasi.",
          order: 1,
          keyConcepts: [
            "Nama constructor persis sama dengan nama class dan tidak memiliki return type",
            "Keyword 'this' merujuk ke instance objek saat ini untuk membedakan nama variabel",
            "Constructor overloading memungkinkan pembuatan objek dengan kombinasi parameter beragam",
          ],
          contentMarkdown: `Constructor dieksekusi otomatis ketika keyword \`new\` dipanggil untuk memastikan objek selalu dalam kondisi valid sejak awal.`,
          codeExamples: [
            {
              title: "Constructor dengan Parameter",
              code: `public class Buku {
    String judul;
    int tahunTerbit;

    public Buku(String judul, int tahunTerbit) {
        this.judul = judul;
        this.tahunTerbit = tahunTerbit;
    }
}`,
              explanation: "Keyword this membedakan field objek dari parameter constructor yang bernama sama.",
            },
          ],
          dragDropExercise: {
            id: "dnd-con-1",
            lessonId: "les-con-1",
            title: "Susun Deklarasi Constructor Mahasiswa",
            instruction: "Susun baris constructor yang menerima parameter nama dan nim, lalu menyimpannya ke field class.",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "cn1", codeFragment: "public Mahasiswa(String nama, String nim) {", correctPosition: 1 },
              { id: "cn2", codeFragment: "    this.nama = nama;", correctPosition: 2 },
              { id: "cn3", codeFragment: "    this.nim = nim;", correctPosition: 3 },
              { id: "cn4", codeFragment: "}", correctPosition: 4 },
            ],
          },
        },
      ],
    },
    {
      id: "mod-8",
      slug: "encapsulation",
      title: "Encapsulation",
      shortDescription: "Information hiding, access modifiers (private, public, protected), dan method Getter/Setter.",
      levelGroup: 4,
      levelName: "Level 4 — OOP Dasar",
      order: 8,
      iconName: "ShieldCheck",
      accentColor: "mint",
      lessons: [
        {
          id: "les-enc-1",
          moduleSlug: "encapsulation",
          slug: "getter-setter-dan-access-modifier",
          title: "Prinsip Data Hiding & Validasi Setter",
          description: "Melindungi data internal class dari modifikasi sembarangan lewat encapsulation.",
          order: 1,
          keyConcepts: [
            "Private fields tidak dapat diakses langsung dari luar class",
            "Getter menyediakan akses baca terkontrol",
            "Setter menyediakan validasi sebelum mengubah nilai field",
          ],
          contentMarkdown: `Encapsulation adalah pilar OOP untuk membungkus data dan method yang beroperasi pada data tersebut, sekaligus menyembunyikan detail implementasi internal.`,
          codeExamples: [
            {
              title: "Rekening Bank dengan Validasi Saldo",
              code: `public class RekeningBank {
    private double saldo;

    public double getSaldo() {
        return saldo;
    }

    public void setor(double nominal) {
        if (nominal > 0) {
            this.saldo += nominal;
        }
    }
}`,
              explanation: "Saldo tidak dapat diubah sembarangan tanpa melalui method setor().",
            },
          ],
          dragDropExercise: {
            id: "dnd-enc-1",
            lessonId: "les-enc-1",
            title: "Susun Setter dengan Validasi Umur",
            instruction: "Susun method setUmur() yang memvalidasi bahwa umur harus bernilai positif (> 0).",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "e1", codeFragment: "public void setUmur(int umur) {", correctPosition: 1 },
              { id: "e2", codeFragment: "    if (umur > 0) {", correctPosition: 2 },
              { id: "e3", codeFragment: "        this.umur = umur;", correctPosition: 3 },
              { id: "e4", codeFragment: "    }", correctPosition: 4 },
              { id: "e5", codeFragment: "}", correctPosition: 5 },
            ],
          },
          codingProblem: {
            id: "code-enc-1",
            lessonId: "les-enc-1",
            title: "Validasi Nilai Mahasiswa",
            problemStatement:
              "Buat method `validasiNilai(int nilai)` yang mengembalikan nilai tersebut jika berada di antara 0 sampai 100. Jika kurang dari 0 kembalikan 0, dan jika lebih dari 100 kembalikan 100.",
            methodSignature: "public int validasiNilai(int nilai)",
            starterCode: `class Solution {
    public int validasiNilai(int nilai) {
        // Tulis logika validasi batas nilai
        return 0;
    }
}`,
            solutionCode: `class Solution {
    public int validasiNilai(int nilai) {
        if (nilai < 0) return 0;
        if (nilai > 100) return 100;
        return nilai;
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              { id: "tc-en-1", input: "validasiNilai(85)", expectedOutput: "85", isHidden: false },
              { id: "tc-en-2", input: "validasiNilai(-10)", expectedOutput: "0", isHidden: false },
              { id: "tc-en-3", input: "validasiNilai(125)", expectedOutput: "100", isHidden: true },
            ],
          },
        },
      ],
    },
    // LEVEL 5: OOP Lanjutan
    {
      id: "mod-9",
      slug: "inheritance",
      title: "Inheritance",
      shortDescription: "Pewarisan sifat class dengan keyword extends, hierarki parent-child, dan kata kunci super.",
      levelGroup: 5,
      levelName: "Level 5 — OOP Lanjutan",
      order: 9,
      iconName: "Network",
      accentColor: "terracotta",
      lessons: [
        {
          id: "les-inh-1",
          moduleSlug: "inheritance",
          slug: "pewarisan-dan-keyword-super",
          title: "Mewarisi Class & Memanggil Super Constructor",
          description: "Menggunakan keyword extends untuk mewarisi perilaku dan memanggil super().",
          order: 1,
          keyConcepts: [
            "Child class mewarisi semua public & protected member dari parent class",
            "Keyword 'super(...)' memanggil constructor parent class dan harus berada di baris pertama constructor child",
            "Java tidak mendukung multiple inheritance antar class (hanya single inheritance)",
          ],
          contentMarkdown: `Inheritance memungkinkan child class memakai kembali atribut dan method dari superclass tanpa menulis ulang.`,
          codeExamples: [
            {
              title: "Hierarki Karyawan dan Dosen",
              code: `class Karyawan {
    String nama;
    public Karyawan(String nama) {
        this.nama = nama;
    }
}

class Dosen extends Karyawan {
    String nidn;
    public Dosen(String nama, String nidn) {
        super(nama); // memanggil constructor Karyawan
        this.nidn = nidn;
    }
}`,
              explanation: "super(nama) mengalirkan inisialisasi ke superclass Karyawan.",
            },
          ],
          dragDropExercise: {
            id: "dnd-inh-1",
            lessonId: "les-inh-1",
            title: "Susun Pewarisan Dosen dari Karyawan",
            instruction: "Susun baris inheritance class Dosen yang memanggil constructor parent Karyawan.",
            difficulty: "medium",
            xpReward: 25,
            items: [
              { id: "in1", codeFragment: "public class Dosen extends Karyawan {", correctPosition: 1 },
              { id: "in2", codeFragment: "    public Dosen(String nama, String nidn) {", correctPosition: 2 },
              { id: "in3", codeFragment: "        super(nama);", correctPosition: 3 },
              { id: "in4", codeFragment: "        this.nidn = nidn;", correctPosition: 4 },
              { id: "in5", codeFragment: "    }", correctPosition: 5 },
              { id: "in6", codeFragment: "}", correctPosition: 6 },
            ],
          },
        },
      ],
    },
    {
      id: "mod-10",
      slug: "override-dan-overloading",
      title: "Override & Overloading",
      shortDescription: "Anotasi @Override, perbedaan runtime polymorphism vs compile-time polymorphism.",
      levelGroup: 5,
      levelName: "Level 5 — OOP Lanjutan",
      order: 10,
      iconName: "RefreshCw",
      accentColor: "mint",
      lessons: [
        {
          id: "les-ovr-1",
          moduleSlug: "override-dan-overloading",
          slug: "method-overriding-dan-anotasi",
          title: "Menimpa Method dengan @Override",
          description: "Mengganti implementasi method superclass di subclass secara spesifik.",
          order: 1,
          keyConcepts: [
            "Method overriding menggantikan perilaku method parent dengan signature yang identik",
            "Anotasi @Override membantu compiler memvalidasi bahwa method benar-benar menimpa method superclass",
            "Tipe return harus sama atau subtype (covariant return type)",
          ],
          contentMarkdown: `Method overriding memungkinkan subclass memberikan definisi perilaku yang lebih spesifik daripada definisi umum yang disediakan parent.`,
          codeExamples: [
            {
              title: "Overriding Suara Hewan",
              code: `class Hewan {
    void bersuara() {
        System.out.println("Suara hewan...");
    }
}

class Kucing extends Hewan {
    @Override
    void bersuara() {
        System.out.println("Meow meow!");
    }
}`,
              explanation: "Kucing memberikan perilaku spesifik menggantikan suara generik Hewan.",
            },
          ],
          dragDropExercise: {
            id: "dnd-ovr-1",
            lessonId: "les-ovr-1",
            title: "Susun Method Override Hitung Gaji",
            instruction: "Susun method hitungGaji() di child class Manager dengan anotasi @Override.",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "ov1", codeFragment: "@Override", correctPosition: 1 },
              { id: "ov2", codeFragment: "public double hitungGaji() {", correctPosition: 2 },
              { id: "ov3", codeFragment: "    double gajiPokok = super.hitungGaji();", correctPosition: 3 },
              { id: "ov4", codeFragment: "    return gajiPokok + this.tunjangan;", correctPosition: 4 },
              { id: "ov5", codeFragment: "}", correctPosition: 5 },
            ],
          },
          codingProblem: {
            id: "code-ovr-1",
            lessonId: "les-ovr-1",
            title: "Format Tampilan Akun Bank",
            problemStatement:
              "Buat method `formatAkun(String nomorRekening, double saldo)` yang mengembalikan string berformat: `\"REK:[nomorRekening] | Rp.[saldo bulat]\"`. Contoh: `formatAkun(\"123\", 50000.0)` -> `\"REK:123 | Rp.50000\"`.",
            methodSignature: "public String formatAkun(String nomorRekening, double saldo)",
            starterCode: `class Solution {
    public String formatAkun(String nomorRekening, double saldo) {
        // Tulis format string akun
        return "";
    }
}`,
            solutionCode: `class Solution {
    public String formatAkun(String nomorRekening, double saldo) {
        return "REK:" + nomorRekening + " | Rp." + (long) saldo;
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              { id: "tc-ov-1", input: 'formatAkun("987654", 150000.0)', expectedOutput: '"REK:987654 | Rp.150000"', isHidden: false },
              { id: "tc-ov-2", input: 'formatAkun("111", 0.0)', expectedOutput: '"REK:111 | Rp.0"', isHidden: false },
            ],
          },
        },
      ],
    },
    {
      id: "mod-11",
      slug: "polymorphism",
      title: "Polymorphism",
      shortDescription: "Banyak bentuk: upcasting, downcasting, dynamic method dispatch, dan instanceof.",
      levelGroup: 5,
      levelName: "Level 5 — OOP Lanjutan",
      order: 11,
      iconName: "Shuffle",
      accentColor: "yellow",
      lessons: [
        {
          id: "les-poly-1",
          moduleSlug: "polymorphism",
          slug: "upcasting-dan-dynamic-dispatch",
          title: "Polimorfisme Dinamis & Upcasting",
          description: "Memperlakukan beragam objek turunan melalui tipe referensi parent seragam.",
          order: 1,
          keyConcepts: [
            "Upcasting terjadi saat child instance ditampung dalam variabel bertipe parent",
            "Dynamic method dispatch menentukan method mana yang dijalankan berdasarkan objek riil saat runtime",
            "Operator instanceof memeriksa apakah objek merupakan instansi dari tipe tertentu",
          ],
          contentMarkdown: `Polimorfisme memungkinkan kita menulis kode yang fleksibel dan mudah diperluas tanpa harus mengubah kode yang sudah ada.`,
          codeExamples: [
            {
              title: "Polimorfisme Bangun Datar",
              code: `class BangunDatar {
    double hitungLuas() { return 0; }
}

class Lingkaran extends BangunDatar {
    double r;
    Lingkaran(double r) { this.r = r; }
    @Override double hitungLuas() { return Math.PI * r * r; }
}`,
              explanation: "Array BangunDatar[] dapat menampung Lingkaran, Persegi, dan Segitiga secara serentak.",
            },
          ],
          dragDropExercise: {
            id: "dnd-poly-1",
            lessonId: "les-poly-1",
            title: "Susun Polimorfisme List Hewan",
            instruction: "Susun baris instansiasi polymorphic di mana variabel tipe parent Hewan menampung objek Kucing.",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "p1", codeFragment: "Hewan peliharaan = new Kucing();", correctPosition: 1 },
              { id: "p2", codeFragment: "peliharaan.bersuara();", correctPosition: 2 },
              { id: "p3", codeFragment: "if (peliharaan instanceof Kucing) {", correctPosition: 3 },
              { id: "p4", codeFragment: '    System.out.println("Benar ini kucing!");', correctPosition: 4 },
              { id: "p5", codeFragment: "}", correctPosition: 5 },
            ],
          },
        },
      ],
    },
    // LEVEL 6: Abstraction
    {
      id: "mod-12",
      slug: "interface-dan-abstract-class",
      title: "Interface & Abstract Class",
      shortDescription: "Membuat kontrak fungsionalitas dengan interface, default method, dan abstract method.",
      levelGroup: 6,
      levelName: "Level 6 — Abstraction",
      order: 12,
      iconName: "FileCode",
      accentColor: "teal",
      lessons: [
        {
          id: "les-abs-1",
          moduleSlug: "interface-dan-abstract-class",
          slug: "kontrak-interface-dan-abstract-class",
          title: "Mendefinisikan Interface & Abstract Method",
          description: "Mewajibkan class pengimplementasi untuk memenuhi kontrak method tertentu.",
          order: 1,
          keyConcepts: [
            "Abstract class tidak bisa di-instansiasi langsung menggunakan new",
            "Interface adalah kontrak murni: semua method secara default public abstract",
            "Sebuah class Java bisa mengimplementasikan banyak interface sekaligus (implements A, B)",
          ],
          contentMarkdown: `Abstraksi menyembunyikan detail kompleksitas implementasi dan hanya mengekspos fitur esensial melalui kontrak antarmuka (interface).`,
          codeExamples: [
            {
              title: "Interface Pembayaran",
              code: `interface MetodePembayaran {
    void prosesBayar(double jumlah);
}

class Qris implements MetodePembayaran {
    @Override
    public void prosesBayar(double jumlah) {
        System.out.println("Bayar QRIS: Rp." + jumlah);
    }
}`,
              explanation: "Class Qris wajib mengimplementasikan method prosesBayar sesuai kontrak interface.",
            },
          ],
          dragDropExercise: {
            id: "dnd-abs-1",
            lessonId: "les-abs-1",
            title: "Susun Implementasi Interface",
            instruction: "Susun class MobilListrik yang mengimplementasikan interface KendaraanRamahLingkungan.",
            difficulty: "medium",
            xpReward: 25,
            items: [
              { id: "ab1", codeFragment: "public class MobilListrik implements KendaraanRamahLingkungan {", correctPosition: 1 },
              { id: "ab2", codeFragment: "    @Override", correctPosition: 2 },
              { id: "ab3", codeFragment: "    public void isiDaya(int kwh) {", correctPosition: 3 },
              { id: "ab4", codeFragment: '        System.out.println("Mengisi " + kwh + " kWh");', correctPosition: 4 },
              { id: "ab5", codeFragment: "    }", correctPosition: 5 },
              { id: "ab6", codeFragment: "}", correctPosition: 6 },
            ],
          },
        },
      ],
    },
    // LEVEL 7: Error & Collections
    {
      id: "mod-13",
      slug: "exception-handling",
      title: "Exception Handling",
      shortDescription: "Menangani runtime error dengan blok try-catch-finally, throw, dan custom exception.",
      levelGroup: 7,
      levelName: "Level 7 — Error & Collections",
      order: 13,
      iconName: "AlertTriangle",
      accentColor: "terracotta",
      lessons: [
        {
          id: "les-exc-1",
          moduleSlug: "exception-handling",
          slug: "try-catch-finally",
          title: "Penanganan Error Try-Catch-Finally",
          description: "Mencegah aplikasi crash saat terjadi error tak terduga seperti pembagian nol atau null pointer.",
          order: 1,
          keyConcepts: [
            "Blok try menampung kode yang berpotensi menghasilkan exception",
            "Blok catch menangkap dan mengolah tipe error spesifik",
            "Blok finally selalu dijalankan terlepas dari apakah exception terjadi atau tidak",
          ],
          contentMarkdown: `Exception handling menjaga stabilitas aplikasi dengan menangani kesalahan secara elegan (graceful degradation).`,
          codeExamples: [
            {
              title: "Menangani Pembagian dengan Nol",
              code: `public class ContohException {
    public static void main(String[] args) {
        try {
            int hasil = 10 / 0;
        } catch (ArithmeticException e) {
            System.err.println("Gagal hitung: " + e.getMessage());
        } finally {
            System.out.println("Proses selesai.");
        }
    }
}`,
              explanation: "ArithmeticException tertangkap oleh blok catch sehingga program tidak crash.",
            },
          ],
          dragDropExercise: {
            id: "dnd-exc-1",
            lessonId: "les-exc-1",
            title: "Susun Blok Try-Catch Pembacaan Angka",
            instruction: "Susun blok try-catch untuk parsing integer dari string dengan penanganan NumberFormatException.",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "ex1", codeFragment: "try {", correctPosition: 1 },
              { id: "ex2", codeFragment: '    int angka = Integer.parseInt("abc");', correctPosition: 2 },
              { id: "ex3", codeFragment: "} catch (NumberFormatException e) {", correctPosition: 3 },
              { id: "ex4", codeFragment: '    System.out.println("Bukan angka valid!");', correctPosition: 4 },
              { id: "ex5", codeFragment: "}", correctPosition: 5 },
            ],
          },
          codingProblem: {
            id: "code-exc-1",
            lessonId: "les-exc-1",
            title: "Pembagian Aman (Safe Division)",
            problemStatement:
              "Buat method `bagiAman(int pembilang, int penyebut)` yang mengembalikan hasil bagi integer `pembilang / penyebut`. Jika `penyebut == 0`, kembalikan `0`.",
            methodSignature: "public int bagiAman(int pembilang, int penyebut)",
            starterCode: `class Solution {
    public int bagiAman(int pembilang, int penyebut) {
        // Tangani kemungkinan penyebut bernilai 0
        return 0;
    }
}`,
            solutionCode: `class Solution {
    public int bagiAman(int pembilang, int penyebut) {
        if (penyebut == 0) return 0;
        return pembilang / penyebut;
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              { id: "tc-ex-1", input: "bagiAman(10, 2)", expectedOutput: "5", isHidden: false },
              { id: "tc-ex-2", input: "bagiAman(7, 0)", expectedOutput: "0", isHidden: false },
              { id: "tc-ex-3", input: "bagiAman(100, 4)", expectedOutput: "25", isHidden: true },
            ],
          },
        },
      ],
    },
    {
      id: "mod-14",
      slug: "collections-dasar",
      title: "Collections Dasar (ArrayList & HashMap)",
      shortDescription: "Daftar dinamis ArrayList, kamus key-value HashMap, dan operasi pencarian data.",
      levelGroup: 7,
      levelName: "Level 7 — Error & Collections",
      order: 14,
      iconName: "FolderKanban",
      accentColor: "mint",
      lessons: [
        {
          id: "les-col-1",
          moduleSlug: "collections-dasar",
          slug: "arraylist-dan-hashmap",
          title: "Bekerja dengan ArrayList & HashMap",
          description: "Menyimpan kumpulan objek dinamis tanpa batas ukuran kaku seperti array.",
          order: 1,
          keyConcepts: [
            "ArrayList<T> adalah list berukuran dinamis dengan akses indeks cepat",
            "HashMap<K, V> menyimpan pasangan key-value dengan pencarian O(1) rata-rata",
            "Generic type parameter (<String>, <Integer>) menjamin type safety",
          ],
          contentMarkdown: `Java Collections Framework menyediakan struktur data canggih siap pakai untuk mengelola data dinamis.`,
          codeExamples: [
            {
              title: "Penggunaan ArrayList & HashMap",
              code: `import java.util.ArrayList;
import java.util.HashMap;

public class ContohKoleksi {
    public static void main(String[] args) {
        ArrayList<String> daftarMhs = new ArrayList<>();
        daftarMhs.add("Umam");
        daftarMhs.add("Budi");

        HashMap<String, Integer> nilaiMhs = new HashMap<>();
        nilaiMhs.put("Umam", 95);
        nilaiMhs.put("Budi", 88);

        System.out.println("Nilai Umam: " + nilaiMhs.get("Umam"));
    }
}`,
              explanation: "ArrayList mengelola daftar terurut, sedangkan HashMap mengaitkan nama dengan nilai ujian.",
            },
          ],
          dragDropExercise: {
            id: "dnd-col-1",
            lessonId: "les-col-1",
            title: "Susun Pengisian Data HashMap",
            instruction: "Susun baris instansiasi HashMap dan penambahan key-value nomor kontak.",
            difficulty: "easy",
            xpReward: 20,
            items: [
              { id: "co1", codeFragment: "HashMap<String, String> kontak = new HashMap<>();", correctPosition: 1 },
              { id: "co2", codeFragment: 'kontak.put("Umam", "08123456789");', correctPosition: 2 },
              { id: "co3", codeFragment: 'kontak.put("Dosen PA", "08987654321");', correctPosition: 3 },
              { id: "co4", codeFragment: 'System.out.println(kontak.get("Umam"));', correctPosition: 4 },
            ],
          },
          codingProblem: {
            id: "code-col-1",
            lessonId: "les-col-1",
            title: "Cari Elemen Terbanyak (Majority)",
            problemStatement:
              "Buat method `hitungKemunculan(String[] daftar, String target)` yang menghitung berapa kali teks `target` muncul dalam array `daftar`.",
            methodSignature: "public int hitungKemunculan(String[] daftar, String target)",
            starterCode: `class Solution {
    public int hitungKemunculan(String[] daftar, String target) {
        // Hitung frekuensi kemunculan string target
        return 0;
    }
}`,
            solutionCode: `class Solution {
    public int hitungKemunculan(String[] daftar, String target) {
        if (daftar == null || target == null) return 0;
        int count = 0;
        for (String item : daftar) {
            if (target.equals(item)) count++;
        }
        return count;
    }
}`,
            timeLimitMs: 2000,
            memoryLimitKb: 64000,
            difficulty: "easy",
            xpReward: 20,
            testCases: [
              { id: "tc-co-1", input: 'hitungKemunculan(new String[]{"java", "python", "java"}, "java")', expectedOutput: "2", isHidden: false },
              { id: "tc-co-2", input: 'hitungKemunculan(new String[]{"a", "b", "c"}, "z")', expectedOutput: "0", isHidden: false },
            ],
          },
        },
      ],
    },
  ],
};
