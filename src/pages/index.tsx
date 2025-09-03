import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Beranda | E-Voting</title>
      </Head>
      <div>
        <section className="relative h-screen max-h-[600px]">
          <div className="flex justify-center absolute inset-0 -z-10">
            <Image
              src="/static/images/landingpage.jpg"
              alt="Landing page banner"
              className="h-full w-full max-w-[2000px] object-cover"
              width={2000}
              height={600}
            />
          </div>
          <div className="text-center absolute inset-0 flex flex-col justify-end items-center mb-6">
            <div className="mb-2">
              <p className="text-white font-monument text-2xl md:text-4xl">
                Suara Anda, Masa Depan Kita
              </p>
            </div>
            <p className="text-white mb-3 max-w-2xl mx-auto px-4">
              Platform E-Voting terdepan yang menghadirkan pengalaman pemilihan
              digital yang aman, transparan, dan mudah diakses. Dari pemilihan
              OSIS hingga BEM, kami mendukung demokrasi digital yang inklusif
              dan terpercaya.
            </p>
            <div className="flex justify-center items-center gap-2">
              <Link
                href={"/campaigns"}
                className="btn btn-primary text-white py-2 px-6 text-sm h-fit min-h-fit hover:scale-105 transition-transform"
              >
                Jelajahi Kampanye
              </Link>
            </div>
          </div>
        </section>
        <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
          <div className="bg-pimary-dpurple rounded-3xl px-10 py-14 sm:py-20">
            <p className="font-monument text-center text-white text-3xl sm:text-5xl md:text-7xl">
              &quot;Setiap Suara Berarti&quot;
            </p>
            <p className="text-center text-white/80 mt-4 text-lg">
              Membangun masa depan demokratis, satu suara pada satu waktu
            </p>
          </div>
        </section>
        <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
          <div className="sm:flex gap-4">
            <div className="relative min-h-[500px] w-full rounded-3xl mb-4 sm:mb-0 sm:min-w-[390px]">
              <Image
                src="/static/images/landing-page (1).png"
                alt="About E-Voting"
                className="object-cover w-full h-full rounded-3xl"
                fill
                sizes="(max-width: 768px) 100vw, 390px"
                priority
              />
            </div>
            <div>
              <div className="w-fit mb-4">
                <p className="tracking-tighter font-semibold text-xl md:text-3xl">
                  Tentang Kami
                </p>
                <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
              </div>
              <p className="text-gray-700 leading-relaxed">
                E-Voting adalah platform pemilihan digital revolusioner yang
                dirancang untuk mengubah cara kita berpartisipasi dalam proses
                demokrasi. Dengan teknologi blockchain dan enkripsi tingkat
                tinggi, kami menjamin keamanan dan transparansi setiap suara
                yang diberikan. Platform kami cocok untuk berbagai skala
                pemilihan, dari organisasi kecil hingga institusi besar.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="font-bold text-2xl text-violet-600">100%</p>
                  <p className="text-sm text-gray-600">Aman & Terpercaya</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-2xl text-violet-600">24/7</p>
                  <p className="text-sm text-gray-600">Dukungan Tersedia</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
          <div className="text-center mb-8">
            <p className="tracking-tighter font-semibold text-xl md:text-3xl">
              Cara Menggunakan
            </p>
            <p className="text-gray-600">
              Proses sederhana untuk memulai perjalanan demokrasi digital Anda
            </p>
          </div>
          <div className="mb-10 max-w-5xl mx-auto">
            {/* CONTENT 1 */}
            <div className="sm:flex sm:items-center gap-4">
              <div className="relative min-h-[500px] w-full rounded-3xl mb-3 sm:mb-0 sm:min-w-[390px]">
                <Image
                  src="/static/images/landing-page (2).png"
                  alt="Step 1: Registration"
                  className="object-cover w-full h-full rounded-3xl"
                  fill
                  sizes="(max-width: 768px) 100vw, 390px"
                  priority
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-pimary-dpurple rounded-xl justify-center items-center hidden sm:flex">
                  <p className="font-semibold text-xl text-white">1</p>
                </div>
              </div>
              <div>
                <p className="tracking-tighter font-semibold text-lg md:text-2xl text-violet-600">
                  Langkah 1: Registrasi & Verifikasi
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Buat akun dengan email yang valid dan verifikasi identitas
                  Anda. Proses ini memastikan keamanan dan mencegah duplikasi
                  suara. Data pribadi Anda dilindungi dengan standar keamanan
                  tertinggi.
                </p>
              </div>
            </div>
            {/* CONTENT 2 */}
            <div className="sm:flex sm:items-center gap-4 my-4">
              {/* Mobile Image Step 2 */}
              <div className="relative min-h-[500px] w-full rounded-3xl block mb-3 sm:mb-0 sm:min-w-[390px] sm:hidden">
                <Image
                  src="/static/images/landing-page (3).png"
                  alt="Step 2: Choose Campaign"
                  className="object-cover w-full h-full rounded-3xl"
                  fill
                  sizes="(max-width: 768px) 100vw, 390px"
                  priority
                />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-pimary-dpurple rounded-xl justify-center items-center hidden sm:flex">
                  <p className="font-semibold text-xl text-white">2</p>
                </div>
              </div>
              <div className="text-right">
                <p className="tracking-tighter font-semibold text-lg md:text-2xl text-violet-600">
                  Langkah 2: Pilih Kampanye
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Jelajahi berbagai kampanye yang sedang berlangsung. Pelajari
                  visi, misi, dan program kerja setiap kandidat. Kami
                  menyediakan informasi lengkap untuk membantu Anda membuat
                  keputusan yang tepat.
                </p>
              </div>
              {/* Desktop Image Step 2 */}
              <div className="relative min-h-[500px] w-full rounded-3xl hidden sm:min-w-[390px] sm:block">
                <Image
                  src="/static/images/landing-page (3).png"
                  alt="Step 2: Choose Campaign"
                  className="object-cover w-full h-full rounded-3xl"
                  fill
                  sizes="(max-width: 768px) 100vw, 390px"
                  priority
                />
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-pimary-dpurple rounded-xl justify-center items-center hidden sm:flex">
                  <p className="font-semibold text-xl text-white">2</p>
                </div>
              </div>
            </div>
            {/* CONTENT 3 */}
            <div className="sm:flex sm:items-center gap-4">
              <div className="relative min-h-[500px] w-full rounded-3xl mb-3 sm:mb-0 sm:min-w-[390px]">
                <Image
                  src="/static/images/landing-page (4).png"
                  alt="Step 3: Vote"
                  className="object-cover w-full h-full rounded-3xl"
                  fill
                  sizes="(max-width: 768px) 100vw, 390px"
                  priority
                />
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-pimary-dpurple rounded-xl justify-center items-center hidden sm:flex">
                  <p className="font-semibold text-xl text-white">3</p>
                </div>
              </div>
              <div>
                <p className="tracking-tighter font-semibold text-lg md:text-2xl text-violet-600">
                  Langkah 3: Berikan Suara Anda
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Lakukan voting dengan mudah dan aman. Setiap suara Anda
                  terenkripsi dan tersimpan dengan aman. Pantau hasil pemilihan
                  secara real-time dan saksikan demokrasi digital dalam aksi!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
          <div>
            <div className="text-center mb-10">
              <p className="tracking-tighter font-semibold text-xl md:text-3xl">
                Pertanyaan Umum
              </p>
              <p className="text-gray-600">
                Temukan jawaban untuk pertanyaan yang sering diajukan
              </p>
            </div>
            <div className="sm:grid grid-cols-2 items-center">
              <div className="max-w-xl w-full lg:min-w-[500px] mx-auto">
                <div className="collapse collapse-arrow bg-white shadow-sm border border-gray-100 rounded-lg mb-4">
                  <label htmlFor="faq-1" className="hidden">
                    FAQ 1
                  </label>
                  <input
                    type="checkbox"
                    name="faq-1"
                    id="faq-1"
                    defaultChecked={true}
                  />
                  <div className="collapse-title font-semibold text-gray-800">
                    <p>Apa itu E-Voting dan mengapa harus menggunakannya?</p>
                  </div>
                  <div className="collapse-content !pb-1">
                    <p className="text-gray-600 leading-relaxed">
                      E-Voting adalah platform pemilihan digital yang
                      menghadirkan kemudahan, keamanan, dan transparansi dalam
                      proses voting. Dengan teknologi terkini, kami memastikan
                      setiap suara terhitung dengan akurat dan aman dari
                      manipulasi.
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-white shadow-sm border border-gray-100 rounded-lg mb-4">
                  <label htmlFor="faq-2" className="hidden">
                    FAQ 2
                  </label>
                  <input type="checkbox" name="faq-2" id="faq-2" />
                  <div className="collapse-title font-semibold text-gray-800">
                    <p>Bagaimana proses keamanan data pengguna?</p>
                  </div>
                  <div className="collapse-content !pb-1">
                    <p className="text-gray-600 leading-relaxed">
                      Kami menggunakan enkripsi end-to-end dan teknologi
                      blockchain untuk melindungi data pengguna. Setiap
                      transaksi voting tercatat secara permanen dan tidak dapat
                      diubah, menjamin integritas hasil pemilihan.
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-white shadow-sm border border-gray-100 rounded-lg mb-4">
                  <label htmlFor="faq-3" className="hidden">
                    FAQ 3
                  </label>
                  <input type="checkbox" name="faq-3" id="faq-3" />
                  <div className="collapse-title font-semibold text-gray-800">
                    <p>
                      Apakah saya bisa melihat hasil voting secara real-time?
                    </p>
                  </div>
                  <div className="collapse-content !pb-1">
                    <p className="text-gray-600 leading-relaxed">
                      Ya! Platform kami menyediakan dashboard real-time yang
                      menampilkan hasil voting secara langsung. Anda dapat
                      memantau perkembangan pemilihan kapan saja dan di mana
                      saja.
                    </p>
                  </div>
                </div>
                <div className="collapse collapse-arrow bg-white shadow-sm border border-gray-100 rounded-lg mb-4">
                  <label htmlFor="faq-4" className="hidden">
                    FAQ 4
                  </label>
                  <input type="checkbox" name="faq-4" id="faq-4" />
                  <div className="collapse-title font-semibold text-gray-800">
                    <p>Bagaimana jika terjadi masalah teknis saat voting?</p>
                  </div>
                  <div className="collapse-content !pb-1">
                    <p className="text-gray-600 leading-relaxed">
                      Tim dukungan kami siap membantu 24/7. Jika terjadi masalah
                      teknis, voting Anda akan disimpan secara otomatis dan
                      dapat dilanjutkan setelah masalah teratasi.
                    </p>
                  </div>
                </div>
              </div>
              {/* IMAGE FAQ */}
              <div className="flex justify-center">
                <Image
                  src="/static/images/faq.svg"
                  alt="FAQ"
                  className="max-w-80"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
