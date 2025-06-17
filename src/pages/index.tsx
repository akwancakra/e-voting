import Link from "next/link";
import Image from "next/image";
import BgBanner from "public/static/images/landingpage.jpg";
import BgFaq from "public/static/images/faq.svg";
// import BgAbout from "public/static/images/faq.svg";

export default function Home() {
    return (
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ad asperiores debitis nemo est. Aperiam, nobis?
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
                    <div className="bg-gray-400 min-h-[500px] w-full rounded-3xl mb-4 sm:mb-0 sm:min-w-[390px]" />
                    <div>
                        <div className="w-fit mb-4">
                            <p className="tracking-tighter font-semibold text-xl md:text-3xl">
                                About Us
                            </p>
                            <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
                        </div>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit. Corrupti repellendus temporibus quam,
                            perspiciatis ullam adipisci, voluptatibus
                            necessitatibus neque similique tempora architecto,
                            fuga modi. Debitis corrupti, quaerat pariatur minus,
                            fugiat quibusdam nisi officiis id nihil nemo vel.
                            Libero vero, tenetur in dignissimos pariatur eos
                            sequi incidunt aliquam obcaecati nesciunt quam.
                            Inventore, dicta dolorum. Quam illum unde quidem
                            dignissimos perspiciatis! Ullam doloremque qui nulla
                            officiis nam. Commodi delectus quaerat nemo fugiat
                            cum odit perferendis voluptas porro pariatur ipsa,
                            error voluptate repellat vitae totam libero deleniti
                            similique nulla quas sed corporis laboriosam eum
                            temporibus earum perspiciatis! Facilis, cum libero
                            cupiditate quam odio maiores!
                        </p>
                    </div>
                </div>
            </section>
            <section className="container max-w-6xl mx-auto p-2 mt-12 mb-12 sm:mt-20 sm:mb-20 sm:p-4">
                <div className="text-center mb-8">
                    <p className="tracking-tighter font-semibold text-xl md:text-3xl">
                        How To Use
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Dolor commodi distinctio sit! Non, quia odio.
                    </p>
                </div>
                <div className="mb-10 max-w-5xl mx-auto">
                    {/* CONTENT 1 */}
                    <div className="sm:flex sm:items-center gap-4">
                        <div className="bg-gray-400 relative min-h-[500px] w-full rounded-3xl mb-3 sm:mb-0 sm:min-w-[390px]">
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-pimary-dpurple rounded-xl justify-center items-center hidden sm:flex">
                                <p className="font-semibold text-xl text-white">
                                    1
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="tracking-tighter font-semibold text-lg md:text-2xl">
                                Step 1:
                            </p>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Corrupti repellendus
                                temporibus quam, perspiciatis ullam adipisci,
                                voluptatibus necessitatibus neque similique
                                tempora architecto, fuga modi. Debitis corrupti,
                                quaerat pariatur minus, fugiat quibusdam nisi
                                officiis id nihil nemo vel. Libero vero, tenetur
                                in dignissimos pariatur eos sequi incidunt
                                aliquam obcaecati nesciunt quam. Inventore,
                                dicta dolorum. Quam illum unde quidem
                                dignissimos perspiciatis! Ullam doloremque qui
                                nulla officiis nam. Commodi delectus quaerat
                                nemo fugiat cum odit perferendis voluptas porro
                                pariatur ipsa, error voluptate repellat vitae
                                totam libero deleniti similique nulla quas sed
                                corporis laboriosam eum temporibus earum
                                perspiciatis! Facilis, cum libero cupiditate
                                quam odio maiores!
                            </p>
                        </div>
                    </div>
                    {/* CONTENT 2 */}
                    <div className="sm:flex sm:items-center gap-4 my-4">
                        <div className="bg-gray-400 relative min-h-[500px] w-full rounded-3xl block mb-3 sm:mb-0 sm:min-w-[390px] sm:hidden">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-pimary-dpurple rounded-xl justify-center items-center hidden sm:flex">
                                <p className="font-semibold text-xl text-white">
                                    2
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="tracking-tighter font-semibold text-lg md:text-2xl">
                                Step 2:
                            </p>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Corrupti repellendus
                                temporibus quam, perspiciatis ullam adipisci,
                                voluptatibus necessitatibus neque similique
                                tempora architecto, fuga modi. Debitis corrupti,
                                quaerat pariatur minus, fugiat quibusdam nisi
                                officiis id nihil nemo vel. Libero vero, tenetur
                                in dignissimos pariatur eos sequi incidunt
                                aliquam obcaecati nesciunt quam. Inventore,
                                dicta dolorum. Quam illum unde quidem
                                dignissimos perspiciatis! Ullam doloremque qui
                                nulla officiis nam. Commodi delectus quaerat
                                nemo fugiat cum odit perferendis voluptas porro
                                pariatur ipsa, error voluptate repellat vitae
                                totam libero deleniti similique nulla quas sed
                                corporis laboriosam eum temporibus earum
                                perspiciatis! Facilis, cum libero cupiditate
                                quam odio maiores!
                            </p>
                        </div>
                        <div className="bg-gray-400 relative min-h-[500px] w-full rounded-3xl hidden sm:min-w-[390px] sm:block">
                            <div className="absolute -top-4 -right-4 w-12 h-12 bg-pimary-dpurple rounded-xl justify-center items-center hidden sm:flex">
                                <p className="font-semibold text-xl text-white">
                                    2
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* CONTENT 3 */}
                    <div className="sm:flex sm:items-center gap-4">
                        <div className="bg-gray-400 relative min-h-[500px] w-full rounded-3xl mb-3 sm:mb-0 sm:min-w-[390px]">
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-pimary-dpurple rounded-xl justify-center items-center hidden sm:flex">
                                <p className="font-semibold text-xl text-white">
                                    3
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="tracking-tighter font-semibold text-lg md:text-2xl">
                                Step 3:
                            </p>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur
                                adipisicing elit. Corrupti repellendus
                                temporibus quam, perspiciatis ullam adipisci,
                                voluptatibus necessitatibus neque similique
                                tempora architecto, fuga modi. Debitis corrupti,
                                quaerat pariatur minus, fugiat quibusdam nisi
                                officiis id nihil nemo vel. Libero vero, tenetur
                                in dignissimos pariatur eos sequi incidunt
                                aliquam obcaecati nesciunt quam. Inventore,
                                dicta dolorum. Quam illum unde quidem
                                dignissimos perspiciatis! Ullam doloremque qui
                                nulla officiis nam. Commodi delectus quaerat
                                nemo fugiat cum odit perferendis voluptas porro
                                pariatur ipsa, error voluptate repellat vitae
                                totam libero deleniti similique nulla quas sed
                                corporis laboriosam eum temporibus earum
                                perspiciatis! Facilis, cum libero cupiditate
                                quam odio maiores!
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
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Dolor commodi distinctio sit! Non, quia odio.
                        </p>
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
                                    Click to open this one and close others
                                </div>
                                <div className="collapse-content !pb-1">
                                    <p>hello</p>
                                </div>
                                <div className="divider my-0" />
                            </div>
                            <div className="collapse collapse-arrow">
                                <label htmlFor="faq-2" className="hidden">
                                    FAQ 2
                                </label>
                                <input
                                    type="checkbox"
                                    name="faq-2"
                                    id="faq-2"
                                />
                                <div className="collapse-title font-semibold">
                                    Click to open this one and close others
                                </div>
                                <div className="collapse-content !pb-1">
                                    <p>hello</p>
                                </div>
                                <div className="divider my-0" />
                            </div>
                            <div className="collapse collapse-arrow">
                                <label htmlFor="faq-3" className="hidden">
                                    FAQ 3
                                </label>
                                <input
                                    type="checkbox"
                                    name="faq-3"
                                    id="faq-3"
                                />
                                <div className="collapse-title font-semibold">
                                    Click to open this one and close others
                                </div>
                                <div className="collapse-content !pb-1">
                                    <p>hello</p>
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
    );
}
