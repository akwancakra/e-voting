import Image from "next/image";
import BgFaq from "public/static/images/faq.svg";
import Head from "next/head";
import { useState } from "react";

type CategoryType = "petunjuk" | "pemilihan" | "akun" | "kebijakan" | "kontak";

export default function HelpPage() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryType>("petunjuk");

  const handleCategoryClick = (category: CategoryType) => {
    setActiveCategory(category);
    // Scroll ke section yang sesuai
    const element = document.getElementById(`${category}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleItemClick = (itemId: string) => {
    // Toggle collapse item
    const checkbox = document.getElementById(itemId) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = !checkbox.checked;
    }
  };

  return (
    <>
      <Head>
        <title>Bantuan | E-Voting</title>
      </Head>
      <div className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
        <div>
          <div className="text-center mb-10">
            <p className="tracking-tighter font-semibold text-2xl md:text-4xl">
              Bantuan
            </p>
            <p className="mt-2">
              Temukan jawaban untuk pertanyaan umum dan panduan penggunaan
              E-Voting
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side - Categories */}
            <div className="lg:col-span-4">
              <div className="bg-gray-100 p-6 rounded-xl">
                <h2 className="font-semibold text-xl mb-4">Kategori</h2>

                <div className="flex flex-col gap-2">
                  <button
                    className={`btn text-left justify-start ${
                      activeCategory === "petunjuk"
                        ? "btn-primary text-white"
                        : "btn-ghost hover:bg-gray-200"
                    }`}
                    onClick={() => handleCategoryClick("petunjuk")}
                  >
                    Petunjuk Penggunaan
                  </button>
                  <button
                    className={`btn text-left justify-start ${
                      activeCategory === "pemilihan"
                        ? "btn-primary text-white"
                        : "btn-ghost hover:bg-gray-200"
                    }`}
                    onClick={() => handleCategoryClick("pemilihan")}
                  >
                    Pemilihan & Voting
                  </button>
                  <button
                    className={`btn text-left justify-start ${
                      activeCategory === "akun"
                        ? "btn-primary text-white"
                        : "btn-ghost hover:bg-gray-200"
                    }`}
                    onClick={() => handleCategoryClick("akun")}
                  >
                    Akun & Keamanan
                  </button>
                  <button
                    className={`btn text-left justify-start ${
                      activeCategory === "kebijakan"
                        ? "btn-primary text-white"
                        : "btn-ghost hover:bg-gray-200"
                    }`}
                    onClick={() => handleCategoryClick("kebijakan")}
                  >
                    Kebijakan & Privasi
                  </button>
                  <button
                    className={`btn text-left justify-start ${
                      activeCategory === "kontak"
                        ? "btn-primary text-white"
                        : "btn-ghost hover:bg-gray-200"
                    }`}
                    onClick={() => handleCategoryClick("kontak")}
                  >
                    Kontak & Dukungan
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-8">
              {/* Petunjuk Penggunaan Section */}
              <div
                id="petunjuk-section"
                className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                  activeCategory === "petunjuk" ? "block" : "hidden"
                }`}
              >
                <h2 className="font-semibold text-xl mb-4">
                  Petunjuk Penggunaan
                </h2>
                <div className="space-y-4">
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-1"
                      aria-labelledby="help-title-1"
                      defaultChecked={true}
                    />
                    <div
                      className="collapse-title font-medium"
                      id="help-title-1"
                    >
                      Bagaimana cara memulai menggunakan E-Voting?
                    </div>
                    <div className="collapse-content">
                      <p>Untuk memulai menggunakan E-Voting, Anda perlu:</p>
                      <ol className="list-decimal ml-5 mt-2 space-y-2">
                        <li>Mendaftar akun menggunakan email yang valid</li>
                        <li>
                          Masuk ke akun Anda dengan kredensial yang telah dibuat
                        </li>
                        <li>Pilih campaign pemilihan yang sedang aktif</li>
                        <li>Baca informasi kandidat dengan seksama</li>
                        <li>Berikan suara Anda pada kandidat pilihan</li>
                      </ol>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-2"
                      aria-labelledby="help-title-2"
                    />
                    <div
                      className="collapse-title font-medium"
                      id="help-title-2"
                    >
                      Bagaimana cara menggunakan fitur pencarian campaign?
                    </div>
                    <div className="collapse-content">
                      <p>Untuk mencari campaign tertentu, Anda dapat:</p>
                      <ol className="list-decimal ml-5 mt-2 space-y-2">
                        <li>
                          Pergi ke halaman &quot;Campaigns&quot; melalui menu
                          navigasi
                        </li>
                        <li>Gunakan kotak pencarian di bagian atas halaman</li>
                        <li>
                          Masukkan kata kunci yang relevan (nama campaign,
                          organisasi, dll.)
                        </li>
                        <li>
                          Sistem akan menampilkan hasil yang sesuai dengan
                          pencarian Anda
                        </li>
                        <li>
                          Anda juga dapat menggunakan filter untuk mempersempit
                          hasil pencarian
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-10">
                  <Image
                    src={BgFaq}
                    alt="Help illustration"
                    className="max-w-xs"
                    width={300}
                    height={300}
                  />
                </div>
              </div>

              {/* Pemilihan & Voting Section */}
              <div
                id="pemilihan-section"
                className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                  activeCategory === "pemilihan" ? "block" : "hidden"
                }`}
              >
                <h2 className="font-semibold text-xl mb-4">
                  Pemilihan & Voting
                </h2>
                <div className="space-y-4">
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-3"
                      aria-labelledby="help-title-3"
                    />
                    <div
                      className="collapse-title font-medium"
                      id="help-title-3"
                    >
                      Apakah saya bisa melihat hasil pemilihan secara real-time?
                    </div>
                    <div className="collapse-content">
                      <p>
                        Ya, E-Voting menyediakan fitur untuk melihat hasil
                        pemilihan secara real-time. Setelah pemilihan dibuka dan
                        beberapa suara masuk, Anda dapat melihat grafik dan
                        statistik hasil pemilihan yang diperbarui secara
                        otomatis. Perlu diingat bahwa beberapa campaign mungkin
                        mengatur agar hasil hanya ditampilkan setelah periode
                        pemilihan berakhir.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-4"
                      aria-label="Toggle voting change question"
                    />
                    <div className="collapse-title font-medium">
                      Apakah saya dapat mengubah pilihan setelah melakukan
                      voting?
                    </div>
                    <div className="collapse-content">
                      <p>
                        Tidak, setelah Anda memberikan suara dalam campaign
                        pemilihan, pilihan tersebut tidak dapat diubah. Hal ini
                        untuk menjaga integritas proses pemilihan. Pastikan Anda
                        sudah yakin dengan pilihan Anda sebelum melakukan
                        konfirmasi voting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Akun & Keamanan Section */}
              <div
                id="akun-section"
                className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                  activeCategory === "akun" ? "block" : "hidden"
                }`}
              >
                <h2 className="font-semibold text-xl mb-4">Akun & Keamanan</h2>
                <div className="space-y-4">
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-5"
                      aria-label="Toggle voting history question"
                    />
                    <div className="collapse-title font-medium">
                      Bagaimana cara melihat riwayat voting saya?
                    </div>
                    <div className="collapse-content">
                      <p>Untuk melihat riwayat voting Anda:</p>
                      <ol className="list-decimal ml-5 mt-2 space-y-2">
                        <li>Masuk ke akun E-Voting Anda</li>
                        <li>Klik pada profil Anda di pojok kanan atas</li>
                        <li>Pilih menu &quot;Profile&quot;</li>
                        <li>
                          Pada halaman profil, Anda akan melihat tab
                          &quot;Voting History&quot;
                        </li>
                        <li>
                          Di sana akan tercantum semua campaign yang telah Anda
                          ikuti
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-6"
                      aria-label="Toggle account security question"
                    />
                    <div className="collapse-title font-medium">
                      Bagaimana cara mengamankan akun saya?
                    </div>
                    <div className="collapse-content">
                      <p>Untuk mengamankan akun E-Voting Anda:</p>
                      <ol className="list-decimal ml-5 mt-2 space-y-2">
                        <li>Gunakan password yang kuat dan unik</li>
                        <li>
                          Jangan bagikan kredensial login dengan orang lain
                        </li>
                        <li>
                          Selalu logout setelah selesai menggunakan sistem
                        </li>
                        <li>Perbarui password secara berkala</li>
                        <li>Waspadai email atau link mencurigakan</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kebijakan & Privasi Section */}
              <div
                id="kebijakan-section"
                className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                  activeCategory === "kebijakan" ? "block" : "hidden"
                }`}
              >
                <h2 className="font-semibold text-xl mb-4">
                  Kebijakan & Privasi
                </h2>
                <div className="space-y-4">
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-7"
                      aria-label="Toggle data protection question"
                    />
                    <div className="collapse-title font-medium">
                      Bagaimana data pribadi saya dilindungi?
                    </div>
                    <div className="collapse-content">
                      <p>
                        E-Voting mengikuti standar keamanan data yang ketat.
                        Data pribadi Anda dienkripsi dan hanya digunakan untuk
                        keperluan pemilihan. Kami tidak membagikan informasi
                        pribadi kepada pihak ketiga tanpa izin Anda, kecuali
                        diwajibkan oleh hukum.
                      </p>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-8"
                      aria-label="Toggle anonymity question"
                    />
                    <div className="collapse-title font-medium">
                      Apakah voting saya bersifat anonim?
                    </div>
                    <div className="collapse-content">
                      <p>
                        Ya, sistem E-Voting dirancang untuk menjaga kerahasiaan
                        pilihan Anda. Meskipun sistem mencatat bahwa Anda telah
                        melakukan voting, pilihan spesifik Anda tetap anonim dan
                        tidak dapat dilacak kembali ke identitas Anda.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kontak & Dukungan Section */}
              <div
                id="kontak-section"
                className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${
                  activeCategory === "kontak" ? "block" : "hidden"
                }`}
              >
                <h2 className="font-semibold text-xl mb-4">
                  Kontak & Dukungan
                </h2>
                <div className="space-y-4">
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-9"
                      aria-label="Toggle contact support question"
                    />
                    <div className="collapse-title font-medium">
                      Bagaimana cara menghubungi tim dukungan?
                    </div>
                    <div className="collapse-content">
                      <p>Anda dapat menghubungi tim dukungan kami melalui:</p>
                      <ul className="list-disc ml-5 mt-2 space-y-2">
                        <li>Email: support@e-voting.com</li>
                        <li>Telepon: +62 812 3456 7890</li>
                        <li>Live chat: Tersedia di halaman utama</li>
                        <li>Formulir kontak: Di halaman ini</li>
                      </ul>
                    </div>
                  </div>
                  <div className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-lg">
                    <input
                      type="checkbox"
                      id="help-10"
                      aria-label="Toggle response time question"
                    />
                    <div className="collapse-title font-medium">
                      Berapa lama waktu respons tim dukungan?
                    </div>
                    <div className="collapse-content">
                      <p>
                        Tim dukungan kami berusaha merespons dalam waktu 24 jam
                        kerja. Untuk masalah mendesak, Anda dapat menghubungi
                        kami melalui telepon pada jam kerja (Senin-Jumat,
                        09:00-17:00 WIB).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-pimary-dpurple text-white p-8 rounded-xl">
            <div className="text-center mb-6">
              <h2 className="font-semibold text-2xl">Masih Ada Pertanyaan?</h2>
              <p className="mt-2">
                Jika Anda memiliki pertanyaan lain yang belum terjawab, jangan
                ragu untuk menghubungi tim dukungan kami
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <button className="btn bg-white text-pimary-dpurple hover:bg-gray-100">
                <span className="material-symbols-outlined">mail</span>
                support@e-voting.com
              </button>
              <button className="btn bg-white text-pimary-dpurple hover:bg-gray-100">
                <span className="material-symbols-outlined">call</span>
                +62 812 3456 7890
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
