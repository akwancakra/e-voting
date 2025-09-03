import Link from "next/link";
import Image from "next/image";
import BgBanner from "public/static/images/landingpage.jpg";
import BgFaq from "public/static/images/faq.svg";
import Head from "next/head";
import LandingPageImageOne from "public/static/images/landing-page (1).png";
import LandingPageImageTwo from "public/static/images/landing-page (2).png";
import LandingPageImageThree from "public/static/images/landing-page (3).png";
import LandingPageImageFour from "public/static/images/landing-page (4).png";

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
              src={BgBanner}
              alt="Landing page banner"
              className="h-full w-full max-w-[2000px] object-cover"
              width={2000}
              height={600}
            />
          </div>
          <div className="text-center absolute inset-0 flex flex-col justify-end items-center mb-6">
            <div className="mb-2">
              <p className="text-white font-monument text-2xl md:text-4xl">
                Time To Vote
              </p>
            </div>
            <p className="text-white mb-3">
              E-Voting adalah platform pemilihan digital yang aman, transparan,
              dan mudah digunakan untuk berbagai kebutuhan pemilihan seperti
              OSIS, BEM, organisasi, dan lainnya. Dukung demokrasi digital
              bersama kami!
            </p>
            <div className="flex justify-center items-center gap-2">
              <Link
                href={"/campaigns"}
                className="btn btn-primary text-white py-2 px-3 text-sm h-fit min-h-fit"
              >
                View Campaign
              </Link>
            </div>
          </div>
        </section>
        <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
          <div className="bg-pimary-dpurple rounded-3xl px-10 py-14 sm:py-20">
            <p className="font-monument text-center text-white text-3xl sm:text-5xl md:text-7xl">
              &quot;Suaramu hakmu&quot;
            </p>
          </div>
        </section>
        <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
          <div className="sm:flex gap-4">
            <div className="relative min-h-[500px] w-full rounded-3xl mb-4 sm:mb-0 sm:min-w-[390px]">
              <Image
                src={LandingPageImageOne}
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
                  About Us
                </p>
                <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
              </div>
              <p>
                E-Voting adalah aplikasi voting online yang dikembangkan untuk
                memudahkan proses pemilihan secara digital. Kami berkomitmen
                menghadirkan sistem yang transparan, aman, dan mudah digunakan
                oleh siapa saja, baik untuk organisasi, sekolah, maupun
                komunitas.
              </p>
            </div>
          </div>
        </section>
        <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
          <div className="text-center mb-8">
            <p className="tracking-tighter font-semibold text-xl md:text-3xl">
              How To Use
            </p>
            <p>Ikuti langkah berikut untuk mulai menggunakan E-Voting:</p>
          </div>
          <div className="mb-10 max-w-5xl mx-auto">
            {/* CONTENT 1 */}
            <div className="sm:flex sm:items-center gap-4">
              <div className="relative min-h-[500px] w-full rounded-3xl mb-3 sm:mb-0 sm:min-w-[390px]">
                <Image
                  src={LandingPageImageTwo}
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
                <p className="tracking-tighter font-semibold text-lg md:text-2xl">
                  Step 1:
                </p>
                <p>
                  Step 1: Daftar akun dan login ke aplikasi E-Voting menggunakan
                  email yang valid.
                </p>
              </div>
            </div>
            {/* CONTENT 2 */}
            <div className="sm:flex sm:items-center gap-4 my-4">
              {/* Mobile Image Step 2 */}
              <div className="relative min-h-[500px] w-full rounded-3xl block mb-3 sm:mb-0 sm:min-w-[390px] sm:hidden">
                <Image
                  src={LandingPageImageThree}
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
                <p className="tracking-tighter font-semibold text-lg md:text-2xl">
                  Step 2:
                </p>
                <p>
                  Step 2: Pilih campaign yang sedang berlangsung, baca detail
                  kandidat, dan pahami visi misi mereka.
                </p>
              </div>
              {/* Desktop Image Step 2 */}
              <div className="relative min-h-[500px] w-full rounded-3xl hidden sm:min-w-[390px] sm:block">
                <Image
                  src={LandingPageImageThree}
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
                  src={LandingPageImageFour}
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
                <p className="tracking-tighter font-semibold text-lg md:text-2xl">
                  Step 3:
                </p>
                <p>
                  Step 3: Lakukan voting pada kandidat pilihanmu. Hasil voting
                  dapat dipantau secara real-time!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
          <div>
            <div className="text-center mb-10">
              <p className="tracking-tighter font-semibold text-xl md:text-3xl">
                FAQ
              </p>
              <p>Berikut beberapa pertanyaan yang sering ditanyakan:</p>
            </div>
            <div className="sm:grid grid-cols-2 items-center">
              <div className="max-w-xl w-full lg:min-w-[500px] mx-auto">
                <div className="collapse collapse-arrow">
                  <label htmlFor="faq-1" className="hidden">
                    FAQ 1
                  </label>
                  <input
                    type="checkbox"
                    name="faq-1"
                    id="faq-1"
                    defaultChecked={true}
                  />
                  <div className="collapse-title font-semibold">
                    <p>Apa itu E-Voting?</p>
                  </div>
                  <div className="collapse-content !pb-1">
                    <p>
                      E-Voting adalah aplikasi voting online yang memudahkan
                      proses pemilihan secara digital dan transparan.
                    </p>
                  </div>
                  <div className="divider my-0" />
                </div>
                <div className="collapse collapse-arrow">
                  <label htmlFor="faq-2" className="hidden">
                    FAQ 2
                  </label>
                  <input type="checkbox" name="faq-2" id="faq-2" />
                  <div className="collapse-title font-semibold">
                    <p>Bagaimana cara mengikuti voting?</p>
                  </div>
                  <div className="collapse-content !pb-1">
                    <p>
                      Daftar akun, login, pilih campaign, dan lakukan voting
                      pada kandidat pilihanmu.
                    </p>
                  </div>
                  <div className="divider my-0" />
                </div>
                <div className="collapse collapse-arrow">
                  <label htmlFor="faq-3" className="hidden">
                    FAQ 3
                  </label>
                  <input type="checkbox" name="faq-3" id="faq-3" />
                  <div className="collapse-title font-semibold">
                    <p>Apakah data saya aman?</p>
                  </div>
                  <div className="collapse-content !pb-1">
                    <p>
                      Ya, data pengguna dan hasil voting dijamin keamanannya
                      dengan sistem enkripsi dan audit log.
                    </p>
                  </div>
                  <div className="divider my-0" />
                </div>
              </div>
              {/* IMAGE FAQ */}
              <div className="flex justify-center">
                <Image
                  src={BgFaq}
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
