/* =====================================================================
   DATA MODUL PELATIHAN — Perencanaan Zonasi Spasial Kabupaten Luwu
   Independen. Konten lengkap siap pakai.
   Struktur tiap modul: { id, kode, judul, ikon, ringkas, durasi, sections[], quiz[] }
   section: { id, judul, html }
   ===================================================================== */

let INDIKATOR = [
  { kode:'X1', nama:'Kerentanan Fisik', w:'0.136', ikon:'fa-mountain', warna:'#b45309',
    items:[
      ['X1.1','Kemiringan Lereng','0.001'],['X1.2','Curah Hujan','0.037'],
      ['X1.3','Rawan Bencana','0.051'],['X1.4','Kenaikan Muka Laut','0.052']
    ]},
  { kode:'X2', nama:'Kerentanan Sosial-Ekonomi', w:'0.080', ikon:'fa-people-group', warna:'#0e7490',
    items:[
      ['X2.1','Kepadatan Penduduk','0.011'],['X2.2','Penduduk Miskin','0.005'],
      ['X2.3','Rasio Ketergantungan','0.027'],['X2.4','Akses Kesehatan','0.034'],
      ['X2.5','Diversifikasi Mata Pencaharian','0.008']
    ]},
  { kode:'X3', nama:'Daya Dukung Lingkungan Hidup', w:'0.258', ikon:'fa-tree', warna:'#15803d',
    items:[
      ['X3.1','Tutupan Vegetasi','0.080'],['X3.2','Ketersediaan Air','0.103'],
      ['X3.3','Daya Tampung Lahan','0.022'],['X3.4','Ruang Terbuka Hijau','0.017'],
      ['X3.5','Kualitas Air Sungai','0.074']
    ]},
  { kode:'X4', nama:'Kesesuaian Lahan', w:'0.138', ikon:'fa-vector-square', warna:'#4d7c0f',
    items:[
      ['X4.1','Kemampuan Lahan','0.020'],['X4.2','Penggunaan Lahan Eksisting','0.005'],
      ['X4.3','Kedalaman Tanah','0.039'],['X4.4','Infrastruktur & Aksesibilitas','0.083'],
      ['X4.5','Jarak Pusat Kegiatan','0.005']
    ]},
  { kode:'X5', nama:'Kapasitas Adaptasi', w:'0.167', ikon:'fa-people-carry-box', warna:'#1d4ed8',
    items:[
      ['X5.1','Tingkat Pendidikan','0.028'],['X5.2','Akses Informasi Spasial','0.027'],
      ['X5.3','Kelembagaan Lokal','0.076'],['X5.4','Kapasitas Fiskal','0.002'],
      ['X5.5','Infrastruktur Mitigasi','0.065']
    ]},
  { kode:'X6', nama:'Kesesuaian Komoditas FOLUR', w:'0.120', ikon:'fa-seedling', warna:'#a16207',
    items:[
      ['X6.1','Kesesuaian Lahan Kakao','0.031'],['X6.2','Kesesuaian Lahan Padi','0.008'],
      ['X6.3','Soil Fertility Index','0.025'],['X6.4','Status Daya Dukung Lahan','0.047'],
      ['X6.5','Status Daya Dukung Air','0.011'],['X6.6','Status NKT/SKT','0.008']
    ]}
];

let KELAS5 = [
  ['1','Sangat Rendah','#d73027','Zona dengan nilai gabungan terendah — prioritas perlindungan / pembatasan pemanfaatan'],
  ['2','Rendah','#fc8d59','Pemanfaatan terbatas dengan syarat ketat'],
  ['3','Sedang','#fee08b','Zona penyangga / transisi, perlu kajian tambahan'],
  ['4','Tinggi','#91cf60','Sesuai untuk pengembangan terkendali'],
  ['5','Sangat Tinggi','#1a9850','Paling sesuai untuk intervensi / budidaya prioritas']
];

let MODULES = [
  /* ============ MODUL 0 — PENGANTAR ============ */
  {
    id:0, kode:'Modul 1', judul:'Konsep Dasar Perencanaan Zonasi Spasial & FOLUR', pin:'4827',
    ikon:'fa-book-open', durasi:'15 menit', ringkas:'Fondasi: apa itu zonasi spasial, mengapa penting, dan bagaimana FOLUR menjadi kerangkanya.',
    sections:[
      { id:'s1', judul:'Apa itu zonasi spasial?', html:`
        <p>Zonasi spasial adalah pembagian suatu wilayah menjadi <strong>zona-zona dengan arahan pemanfaatan yang berbeda</strong>, berdasarkan karakteristik fisik, lingkungan, sosial, dan ekonomi yang melekat pada ruang tersebut. Tujuannya memastikan setiap petak lahan digunakan sesuai daya dukung dan kerentanannya — bukan sekadar berdasarkan permintaan sesaat.</p>
        <p>Di Kabupaten Luwu, zonasi disusun untuk menjawab satu pertanyaan praktis: <em>"Di mana sebaiknya kegiatan pertanian, restorasi, atau perlindungan dilakukan, dan dengan syarat apa?"</em> Jawabannya tidak ditebak, melainkan dihitung dari data spasial yang dapat ditelusuri.</p>
      `},
      { id:'s2', judul:'Mengapa zonasi penting bagi pemerintah daerah', html:`
        <p>Zonasi yang baik menjadi dasar bagi:</p>
        <ul>
          <li><strong>Perizinan berusaha (KKPR)</strong> — menilai apakah lokasi yang diajukan sesuai peruntukan.</li>
          <li><strong>Revisi RTRW</strong> — memberi basis teknis untuk penetapan pola ruang.</li>
          <li><strong>Perlindungan lahan pangan (LP2B)</strong> — menjaga sawah produktif dari alih fungsi.</li>
          <li><strong>Mitigasi bencana</strong> — mengarahkan pembangunan menjauh dari kawasan rawan.</li>
        </ul>
        <div class="callout"><i class="fas fa-lightbulb"></i> Tanpa zonasi berbasis data, keputusan ruang cenderung reaktif dan sulit dipertanggungjawabkan. Zonasi mengubahnya menjadi proses yang transparan dan dapat diaudit.</div>
      `},
      { id:'s3', judul:'Kerangka FOLUR', html:`
        <p><strong>FOLUR</strong> (Food Systems, Land Use, and Restoration — Sistem Pangan, Tata Guna Lahan, dan Restorasi) adalah pendekatan yang menyeimbangkan tiga kepentingan yang sering bertabrakan: <strong>produksi pangan</strong>, <strong>kelestarian lingkungan</strong>, dan <strong>pemulihan lahan terdegradasi</strong>.</p>
        <p>Dalam konteks Luwu, FOLUR memfokuskan zonasi pada lima komoditas prioritas — <strong>kakao, padi sawah, jagung, sagu, dan cengkeh</strong> — sambil memastikan pengembangannya tidak mengorbankan kawasan bernilai konservasi tinggi maupun memperparah risiko bencana.</p>
      `},
      { id:'s4', judul:'Dasar hukum dan kebijakan', html:`
        <p>Zonasi spasial berpijak pada sejumlah landasan, antara lain:</p>
        <ul class="list-disc ml-4">
          <li>Undang-Undang Penataan Ruang dan turunannya (RTRW, RDTR, KKPR);</li>
          <li>Ketentuan Daya Dukung & Daya Tampung Lingkungan Hidup (DDDTLH);</li>
          <li>Pedoman kesesuaian lahan pertanian (mis. Permentan terkait);</li>
          <li>Kerangka kerentanan iklim (IPCC AR5) dan kebijakan kebencanaan (BNPB/InaRISK).</li>
        </ul>
        <p>Modul-modul berikutnya akan menerjemahkan landasan ini menjadi langkah analisis dan pembacaan peta yang konkret.</p>
      `}
    ],
    quiz:[
      { q:'Apa tujuan utama zonasi spasial?', opts:[
        'Membagi wilayah secara administratif',
        'Mengarahkan pemanfaatan ruang sesuai daya dukung dan kerentanannya',
        'Menentukan batas desa',
        'Menghitung jumlah penduduk'], a:1 },
      { q:'Lima komoditas prioritas FOLUR di Luwu adalah?', opts:[
        'Kakao, padi sawah, jagung, sagu, cengkeh',
        'Padi, jagung, kedelai, tebu, kopi',
        'Sawit, karet, kakao, lada, vanili',
        'Sagu, sukun, pisang, kelapa, nilam'], a:0 }
    ]
  },

  /* ============ MODUL 1 — METODOLOGI ============ */
  {
    id:1, kode:'Modul 2', judul:'Metodologi Analisis Spasial (MCE-GIS)', pin:'7391',
    ikon:'fa-diagram-project', durasi:'15 menit', ringkas:'Bagaimana banyak indikator digabung menjadi satu peta zonasi melalui evaluasi multi-kriteria.',
    sections:[
      { id:'s1', judul:'Gambaran umum alur analisis', html:`
        <p>Inti penyusunan zonasi Luwu adalah <strong>MCE-GIS</strong> (Multi-Criteria Evaluation berbasis SIG): metode yang menggabungkan banyak lapisan indikator — masing-masing dengan bobot kepentingannya — menjadi satu peta keputusan.</p>
        <p>Alurnya secara ringkas:</p>
        <ol>
          <li><strong>Identifikasi indikator</strong> — memilih variabel yang relevan (lereng, curah hujan, ketersediaan air, dll).</li>
          <li><strong>Standardisasi</strong> — menyeragamkan setiap indikator ke skala kelas yang sebanding (1–5).</li>
          <li><strong>Pembobotan</strong> — menetapkan bobot tiap indikator berdasarkan kepentingan relatifnya.</li>
          <li><strong>Agregasi</strong> — menjumlahkan nilai berbobot menjadi indeks gabungan per lokasi.</li>
          <li><strong>Klasifikasi</strong> — membagi indeks menjadi 5 kelas zonasi.</li>
        </ol>
      `},
      { id:'s2', judul:'Standardisasi: dari beragam satuan ke kelas 1–5', html:`
        <p>Indikator datang dalam satuan berbeda — derajat kemiringan, milimeter hujan, jumlah jiwa. Agar bisa dijumlahkan, semuanya diterjemahkan ke <strong>kelas numerik 1–5</strong> yang sebanding.</p>
        <p>Contoh untuk <strong>kemiringan lereng</strong>:</p>
        <table>
          <thead><tr><th>Kelas</th><th>Lereng</th><th>Kategori</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>0–2%</td><td>Datar</td></tr>
            <tr><td>2</td><td>2–5%</td><td>Landai</td></tr>
            <tr><td>3</td><td>5–15%</td><td>Bergelombang</td></tr>
            <tr><td>4</td><td>15–40%</td><td>Curam</td></tr>
            <tr><td>5</td><td>&gt;40%</td><td>Sangat Curam</td></tr>
          </tbody>
        </table>
        <p class="text-sm text-gray-500">Inilah atribut <code>kelas_numeric</code> dan <code>kategori</code> yang akan Anda temui saat mengklik fitur pada peta interaktif.</p>
      `},
      { id:'s3', judul:'Pembobotan dan agregasi', html:`
        <p>Tidak semua indikator sama pentingnya. <strong>Bobot</strong> (weight) menyatakan seberapa besar pengaruh sebuah indikator terhadap hasil akhir. Bobot ini diperoleh melalui kombinasi penilaian pakar dan pemodelan statistik (PLS-SEM), lalu dinormalisasi.</p>
        <p>Nilai akhir tiap lokasi dihitung sebagai <strong>jumlah berbobot</strong>:</p>
        <div class="formula">Indeks = Σ ( kelas_indikator<sub>i</sub> × bobot<sub>i</sub> )</div>
        <p>Semakin tinggi bobot sebuah indikator, semakin besar kontribusinya menggeser zona ke kelas tertentu. Di Modul 3 Anda akan melihat bobot setiap indikator secara rinci.</p>
        <div class="callout"><i class="fas fa-circle-info"></i> Jumlah seluruh bobot konstruk pada model ini adalah <strong>0,967</strong> — tidak tepat 1,000 karena pembulatan. Ini wajar dan tidak menandakan kesalahan.</div>
      `},
      { id:'s4', judul:'Hukum minimum (limiting factor)', html:`
        <p>Khusus untuk penilaian <strong>kesesuaian lahan</strong>, berlaku <strong>hukum minimum</strong>: kelas kesesuaian sebuah satuan lahan ditentukan oleh <em>faktor pembatas terberat</em>, bukan rata-rata.</p>
        <p>Analoginya seperti rantai — kekuatannya ditentukan mata rantai terlemah. Lahan dengan tanah subur namun lereng sangat curam tetap dinilai rendah, karena lereng menjadi pembatas dominan.</p>
      `},
      { id:'s5', judul:'Anatomi Penilaian Zonasi (MCE-GIS)', html:`
        <p>Untuk menyatukan seluruh indikator spasial menjadi satu peta keputusan, kita menggunakan metode <strong>Anatomi Penilaian Zonasi</strong> berbasis <em>MCE-GIS</em>. Terdapat 29 indikator yang terbagi ke dalam 6 kelompok konstruk utama (X1 hingga X6), masing-masing dengan kontribusi pembobotan yang berbeda:</p>
        
        <div class="my-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-4">
            <h4 class="font-semibold text-gray-800 text-sm flex items-center gap-2">
              <i class="fas fa-layer-group text-green-600"></i> Anatomi Penilaian Zonasi
            </h4>
            <span class="text-[11px] text-gray-400 font-medium">MCE-GIS</span>
          </div>
          <div class="space-y-4">
            <!-- X1 -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-orange-850">X1 · Kerentanan Fisik</span>
                <span class="font-mono text-gray-500">0.136</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-amber-700 rounded-full" style="width: 46%;"></div>
              </div>
            </div>
            <!-- X2 -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-teal-850">X2 · Kerentanan Sosial-Ekonomi</span>
                <span class="font-mono text-gray-500">0.080</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-cyan-700 rounded-full" style="width: 27%;"></div>
              </div>
            </div>
            <!-- X3 -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-green-850">X3 · Daya Dukung Lingkungan Hidup</span>
                <span class="font-mono text-gray-500">0.258</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-green-700 rounded-full" style="width: 87%;"></div>
              </div>
            </div>
            <!-- X4 -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-lime-850">X4 · Kesesuaian Lahan</span>
                <span class="font-mono text-gray-500">0.138</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-lime-700 rounded-full" style="width: 47%;"></div>
              </div>
            </div>
            <!-- X5 -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-blue-850">X5 · Kapasitas Adaptasi</span>
                <span class="font-mono text-gray-500">0.167</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 rounded-full" style="width: 56%;"></div>
              </div>
            </div>
            <!-- X6 -->
            <div>
              <div class="flex items-center justify-between text-xs font-semibold mb-1">
                <span class="text-yellow-900">X6 · Kesesuaian Komoditas FOLUR</span>
                <span class="font-mono text-gray-500">0.120</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-stone-600 rounded-full" style="width: 41%;"></div>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
            <span class="text-gray-500">Hasil akhir</span>
            <span class="font-semibold text-green-800 flex items-center gap-1.5">
              <i class="fas fa-vector-square"></i> Peta Zonasi 5 Kelas
            </span>
          </div>
        </div>
        
        <p>Setiap kelompok konstruk berkontribusi secara proporsional. Struktur dan bobot ini mengontrol bagaimana kriteria digabungkan dan bagaimana satu faktor dapat bertindak sebagai pembatas utama kesesuaian wilayah.</p>
      `}
    ],
    quiz:[
      { q:'Mengapa setiap indikator distandardisasi ke kelas 1–5?', opts:[
        'Agar terlihat rapi',
        'Agar indikator dengan satuan berbeda dapat dijumlahkan secara sebanding',
        'Untuk mengurangi jumlah data',
        'Karena diwajibkan undang-undang'], a:1 },
      { q:'Menurut hukum minimum, kelas kesesuaian lahan ditentukan oleh?', opts:[
        'Rata-rata semua faktor',
        'Faktor dengan nilai tertinggi',
        'Faktor pembatas terberat',
        'Luas lahan'], a:2 }
    ]
  },

  /* ============ MODUL 2 — ENAM KELOMPOK INDIKATOR ============ */
  {
    id:2, kode:'Modul 3', judul:'Enam Kelompok Indikator Spasial (X1–X6)', pin:'1563',
    ikon:'fa-layer-group', durasi:'15 menit', ringkas:'Mengenal 29 indikator dalam 6 kelompok beserta bobotnya — fondasi seluruh peta zonasi.',
    sections:[
      { id:'s1', judul:'Struktur penilaian', html:`
        <p>Seluruh penilaian zonasi Luwu dibangun dari <strong>29 indikator</strong> yang dikelompokkan menjadi <strong>6 konstruk</strong> (X1–X6). Tiap konstruk mewakili satu dimensi penilaian, dan tiap indikator membawa bobotnya sendiri.</p>
        <p>Gunakan peta interaktif untuk melihat wujud spasial tiap indikator. Di bawah ini, jelajahi keenam kelompoknya — klik untuk membuka rincian indikator dan bobot.</p>
        <div id="indikatorAccordion" class="indik-acc"></div>
      `},
      { id:'s2', judul:'Membaca bobot', html:`
        <p>Bobot menunjukkan <strong>seberapa kuat sebuah indikator menggeser hasil</strong>. Perhatikan beberapa yang menonjol:</p>
        <ul>
          <li><strong>Ketersediaan Air (X3.2 — 0,103)</strong>: bobot indikator tunggal tertinggi. Air adalah penentu utama kesesuaian di Luwu.</li>
          <li><strong>Infrastruktur & Aksesibilitas (X4.4 — 0,083)</strong>: keterjangkauan lokasi sangat menentukan kelayakan pengembangan.</li>
          <li><strong>Tutupan Vegetasi (X3.1 — 0,080)</strong> dan <strong>Kelembagaan Lokal (X5.3 — 0,076)</strong>: lingkungan dan tata kelola berbobot besar.</li>
        </ul>
        <p>Di tingkat konstruk, <strong>Daya Dukung Lingkungan Hidup (X3 — 0,258)</strong> adalah yang paling berpengaruh, diikuti <strong>Kapasitas Adaptasi (X5 — 0,167)</strong>.</p>
      `},
      { id:'s3', judul:'Kerangka kerentanan iklim (IPCC AR5)', html:`
        <p>Pengelompokan X1–X5 selaras dengan kerangka kerentanan iklim <strong>IPCC AR5</strong>, yang memandang risiko sebagai interaksi antara:</p>
        <ul>
          <li><strong>Keterpaparan & sensitivitas</strong> — diwakili Kerentanan Fisik (X1) dan Sosial-Ekonomi (X2);</li>
          <li><strong>Kondisi lingkungan pendukung</strong> — Daya Dukung LH (X3) dan Kesesuaian Lahan (X4);</li>
          <li><strong>Kapasitas adaptasi</strong> — kemampuan masyarakat & kelembagaan merespons (X5).</li>
        </ul>
        <p>Konstruk X6 menambahkan lapisan khusus FOLUR: kesesuaian komoditas dan status daya dukung lahan/air serta nilai konservasi (NKT/SKT).</p>
      `}
    ],
    quiz:[
      { q:'Konstruk mana yang memiliki bobot tertinggi di tingkat kelompok?', opts:[
        'X1 Kerentanan Fisik',
        'X3 Daya Dukung Lingkungan Hidup',
        'X2 Kerentanan Sosial-Ekonomi',
        'X6 Kesesuaian Komoditas FOLUR'], a:1 },
      { q:'Indikator tunggal dengan bobot tertinggi adalah?', opts:[
        'Kemiringan Lereng',
        'Kepadatan Penduduk',
        'Ketersediaan Air',
        'Kapasitas Fiskal'], a:2 }
    ]
  },

  /* ============ MODUL 3 — MEMBACA PETA ============ */
  {
    id:3, kode:'Modul 4', judul:'Membaca & Menggunakan Peta Zonasi', pin:'9045',
    ikon:'fa-map-location-dot', durasi:'15 menit', ringkas:'Praktik: simbologi, legenda, klasifikasi 5 kelas, dan interpretasi zona pada peta interaktif.',
    sections:[
      { id:'s1', judul:'Anatomi peta zonasi', html:`
        <p>Peta zonasi terdiri dari beberapa komponen yang perlu dibaca bersama: <strong>layer indikator</strong>, <strong>legenda</strong> (skema warna tiap kelas), <strong>peta dasar</strong>, dan <strong>info atribut</strong> yang muncul saat sebuah fitur diklik.</p>
        <p>Setiap poligon pada peta membawa atribut seperti <code>kategori</code>, <code>kelas_numeric</code>, <code>bobot</code>, dan <code>luas</code> (dalam hektar). Inilah data yang menjelaskan "mengapa" sebuah lokasi masuk kelas tertentu.</p>
      `},
      { id:'s2', judul:'Klasifikasi lima kelas', html:`
        <p>Hasil akhir zonasi dibagi menjadi <strong>5 kelas</strong>, dari nilai gabungan terendah hingga tertinggi:</p>
        <div id="kelasLegend" class="kelas-grid"></div>
        <p class="text-sm text-gray-500 mt-3">Perhatikan: makna "tinggi" bergantung pada konteks layer. Pada layer kesesuaian, kelas 5 berarti paling sesuai; pada layer kerentanan/rawan bencana, nilai tinggi justru menandakan risiko yang perlu diwaspadai. Selalu baca judul layer dan legendanya.</p>
      `},
      { id:'s3', judul:'Langkah praktik membaca peta', html:`
        <ol>
          <li><strong>Aktifkan layer</strong> yang ingin ditelaah dari panel Layer.</li>
          <li><strong>Buka legenda</strong> untuk memahami arti tiap warna.</li>
          <li><strong>Klik sebuah fitur</strong> (mode Info Atribut) untuk melihat kelas dan nilainya.</li>
          <li><strong>Bandingkan beberapa layer</strong> — misalnya kesesuaian kakao vs rawan bencana — untuk menilai trade-off.</li>
          <li><strong>Catat zona prioritas</strong> berdasarkan tujuan: budidaya, penyangga, atau perlindungan.</li>
        </ol>
        <div class="callout"><i class="fas fa-triangle-exclamation"></i> Selisih luas antara total klasifikasi 5 kelas dan total bab zonasi dapat terjadi karena adanya sub-zona (sempadan, cagar budaya) yang tumpang tindih secara spasial dengan zona penyangga. Ini bukan kesalahan perhitungan.</div>
      `},
      { id:'s4', judul:'Desa prioritas intervensi', html:`
        <p>Fokus intervensi FOLUR diarahkan pada <strong>12 desa prioritas</strong>. Saat membaca peta, perhatikan bagaimana kelas zonasi pada desa-desa ini menentukan jenis kegiatan yang dianjurkan — apakah pengembangan komoditas, restorasi, atau pembatasan karena risiko.</p>
        <p>Dua kecamatan dengan perhatian khusus pada kawasan rawan bencana (KRB) adalah <strong>Walenrang Barat</strong> dan <strong>Latimojong</strong>, dengan luas gabungan sekitar 26.470 ha.</p>
      `}
    ],
    quiz:[
      { q:'Saat mengklik fitur peta, atribut mana yang menjelaskan kelas suatu lokasi?', opts:[
        'Hanya nama desa',
        'kelas_numeric dan kategori',
        'Koordinat saja',
        'Tanggal pembuatan'], a:1 },
      { q:'Selisih luas antara klasifikasi 5 kelas dan total zonasi terutama disebabkan oleh?', opts:[
        'Kesalahan input data',
        'Sub-zona yang tumpang tindih dengan zona penyangga',
        'Perbedaan proyeksi peta',
        'Pembulatan luas'], a:1 }
    ]
  },

  /* ============ MODUL 4 — PENERAPAN REGULASI ============ */
  {
    id:4, kode:'Modul 5', judul:'Penerapan Zonasi dalam Peraturan & Perizinan', pin:'6182',
    ikon:'fa-gavel', durasi:'15 menit', ringkas:'Menerjemahkan zona menjadi ketentuan kegiatan, dan kaitannya dengan KKPR serta revisi RTRW.',
    sections:[
      { id:'s1', judul:'Dari peta ke aturan', html:`
        <p>Peta zonasi hanya bermakna jika diterjemahkan menjadi <strong>ketentuan yang mengikat</strong>. Setiap zona memerlukan rumusan: kegiatan apa yang <strong>diperbolehkan</strong>, <strong>diperbolehkan bersyarat/terbatas</strong>, dan <strong>dilarang</strong>.</p>
        <table>
          <thead><tr><th>Arahan zona</th><th>Contoh ketentuan kegiatan</th></tr></thead>
          <tbody>
            <tr><td>Zona budidaya prioritas</td><td>Pengembangan komoditas FOLUR diperbolehkan dengan praktik berkelanjutan</td></tr>
            <tr><td>Zona penyangga</td><td>Kegiatan terbatas; wajib kajian dampak lingkungan</td></tr>
            <tr><td>Zona perlindungan</td><td>Pembangunan dilarang; diarahkan untuk konservasi/restorasi</td></tr>
            <tr><td>Sempadan / cagar budaya</td><td>Mengikuti ketentuan khusus yang berlaku</td></tr>
          </tbody>
        </table>
      `},
      { id:'s2', judul:'Kaitan dengan KKPR', html:`
        <p><strong>KKPR</strong> (Kesesuaian Kegiatan Pemanfaatan Ruang) adalah gerbang perizinan berusaha. Zonasi memberi dasar teknis untuk menilai permohonan: jika lokasi yang diajukan berada pada zona yang tidak sesuai peruntukan, permohonan dapat ditolak atau diberi syarat.</p>
        <p>Alur sederhananya: <em>permohonan → cek lokasi terhadap peta zonasi → tentukan kesesuaian → terbitkan rekomendasi (sesuai / bersyarat / tidak sesuai)</em>.</p>
      `},
      { id:'s3', judul:'Mendukung revisi RTRW', html:`
        <p>Hasil zonasi menjadi masukan teknis bagi <strong>revisi RTRW</strong>, khususnya dalam penetapan pola ruang. Karena disusun dari data yang dapat ditelusuri, zonasi memperkuat argumentasi penetapan kawasan lindung, kawasan budidaya, dan lahan pangan berkelanjutan (LP2B).</p>
        <div class="callout"><i class="fas fa-scale-balanced"></i> Catatan: angka luas zona yang rinci hanya dirujuk dari bagian penetapan resmi (Bab 5 laporan), sementara bagian lain berfungsi sebagai pratinjau spasial. Konsistensi rujukan ini penting saat dokumen masuk proses legal.</div>
      `}
    ],
    quiz:[
      { q:'Apa fungsi KKPR dalam kaitannya dengan zonasi?', opts:[
        'Menghitung pajak lahan',
        'Menilai kesesuaian lokasi kegiatan terhadap peruntukan ruang',
        'Menetapkan harga tanah',
        'Membuat peta dasar'], a:1 },
      { q:'Tiga kategori ketentuan kegiatan dalam zonasi adalah?', opts:[
        'Murah, sedang, mahal',
        'Diperbolehkan, terbatas/bersyarat, dilarang',
        'Pagi, siang, malam',
        'Desa, kecamatan, kabupaten'], a:1 }
    ]
  },

  /* ============ MODUL 5 — MONITORING & EVALUASI ============ */
  {
    id:5, kode:'Modul 6', judul:'Pemantauan & Evaluasi Zonasi', pin:'2750',
    ikon:'fa-chart-line', durasi:'15 menit', ringkas:'Konsep alat bantu keputusan, indikator kepatuhan, dan pemutakhiran data berbasis InaRISK/BPBD.',
    sections:[
      { id:'s1', judul:'Mengapa pemantauan diperlukan', html:`
        <p>Zonasi bukan dokumen sekali jadi. Kondisi lapangan berubah — tutupan lahan bergeser, infrastruktur bertambah, risiko bencana berevolusi. <strong>Pemantauan dan evaluasi (M&E)</strong> menjaga agar zonasi tetap relevan dan ditaati.</p>
      `},
      { id:'s2', judul:'Konsep alat bantu pengambilan keputusan', html:`
        <p>Alat bantu (decision support tool) yang dirancang berfungsi memantau:</p>
        <ul>
          <li><strong>Kepatuhan zonasi</strong> — apakah pemanfaatan ruang sesuai arahan zona;</li>
          <li><strong>Perubahan tutupan/penggunaan lahan</strong> dari waktu ke waktu;</li>
          <li><strong>Perkembangan risiko bencana</strong> dengan merujuk data <strong>InaRISK/BPBD</strong>.</li>
        </ul>
        <p>Secara konseptual, alat ini menyajikan indikator kunci dalam bentuk ringkas (dashboard) sehingga pengambil keputusan dapat menindaklanjuti penyimpangan secara cepat.</p>
      `},
      { id:'s3', judul:'Pemutakhiran data dan siklus evaluasi', html:`
        <p>Indikator kebencanaan (E3) kini merujuk pada <strong>peta rawan bencana BPBD/InaRISK</strong>, bukan sekadar frekuensi kejadian. Layer ini perlu diperbarui berkala agar penilaian tetap mencerminkan kondisi terkini.</p>
        <p>Siklus evaluasi yang sehat: <em>kumpulkan data terbaru → bandingkan dengan zonasi → identifikasi penyimpangan → rekomendasi tindak lanjut → perbarui zonasi bila perlu</em>.</p>
        <div class="callout"><i class="fas fa-rotate"></i> Luwu tergolong risiko tinggi untuk banjir, banjir bandang, cuaca ekstrem, dan tanah longsor. Karena itu, pemutakhiran layer kebencanaan menjadi bagian rutin yang tidak bisa diabaikan.</div>
      `}
    ],
    quiz:[
      { q:'Indikator kebencanaan (E3) kini merujuk pada?', opts:[
        'Frekuensi kejadian saja',
        'Peta rawan bencana BPBD/InaRISK',
        'Perkiraan warga',
        'Data curah hujan tahunan'], a:1 },
      { q:'Mengapa zonasi perlu dipantau dan dievaluasi berkala?', opts:[
        'Agar dokumen terlihat baru',
        'Karena kondisi lapangan dan risiko berubah dari waktu ke waktu',
        'Untuk menambah jumlah halaman laporan',
        'Karena diminta vendor'], a:1 }
    ]
  }
];
