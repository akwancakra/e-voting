import { fetcher } from "@/utils/db/fetcher";
import useSWR from "swr";
import CampaignCard from "@/components/elements/campaigns/CampaignCard";

const CampaignPage = () => {
    const { data, isLoading: loadingData } = useSWR("/api/campaigns", fetcher);

    return (
        <>
            {/* HERO BANNER */}
            <section className="flex justify-center items-center bg-pimary-dpurple h-screen max-h-[220px] sm:max-h-[320px]">
                <p className="text-white font-monument text-center text-3xl md:text-5xl lg:text-7xl">
                    Your Vote, Your Power
                </p>
            </section>

            {/* CAMPAIGNS LIST */}
            <section className="container max-w-6xl mx-auto p-4">
                <h1 className="tracking-tighter font-semibold text-lg md:text-2xl">
                    Active Campaign
                </h1>
                <p className="text-sm text-gray-500 sm:text-base">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Amet, omnis laborum aliquid atque illum quis nobis quam
                    expedita? Nam, praesentium. Accusantium vitae labore qui
                    quos.
                </p>

                {loadingData ? (
                    <div className="alert border border-primary bg-purple-100 text-purple-800 py-3.5 my-3 w-full rounded-lg">
                        <span className="loading loading-spinner loading-sm"></span>
                        <p>Loading data...</p>
                    </div>
                ) : data?.campaigns?.campaigns ? (
                    <div className="mt-6 grid grid-cols-2 justify-center gap-2 mb-3 md:grid-cols-3">
                        {data.campaigns.campaigns.map(
                            (campaign: any, index: number) => {
                                return (
                                    <CampaignCard
                                        key={index}
                                        campaign={campaign}
                                    />
                                );
                            }
                        )}
                    </div>
                ) : (
                    <div className="alert border border-warning bg-yellow-100 text-yellow-800 py-3.5 my-3 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="stroke-current shrink-0 h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>There&apos;s no campaign</span>
                    </div>
                )}
            </section>
        </>
    );
};

export default CampaignPage;
