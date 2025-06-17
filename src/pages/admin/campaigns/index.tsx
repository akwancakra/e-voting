import CampaignCard from "@/components/elements/campaigns/admin/CampaignCard";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminCampaignsPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalData, setTotalData] = useState<number>(0);
    const [skipCampaign, setSkipCampaign] = useState<number>(0);
    const [data, setData] = useState<any>([]);

    const router = useRouter();
    const currentKeyword = router.query.keyword || "";

    const generatePageButtons = () => {
        const buttons = [];
        const maxButtons = 4;
        const totalPages = Math.ceil(totalData / 6);

        for (let i = 0; i < totalPages; i++) {
            if (i < maxButtons || i === totalPages - 1) {
                // Tampilkan maksimal 4 tombol pertama, dan 1 tombol terakhir
                buttons.push(
                    <button
                        key={i}
                        className={`join-item font-normal btn py-2 px-3 text-sm h-fit min-h-fit ${
                            i === skipCampaign / 6 ? "btn-primary" : ""
                        }`}
                        onClick={() => handlePagination(i * 6)}
                    >
                        {i + 1}
                    </button>
                );
            } else if (buttons[buttons.length - 1]?.key !== "ellipsis") {
                // Tambahkan "..." jika belum ditambahkan
                buttons.push(
                    <span key="ellipsis" className="ellipsis">
                        ...
                    </span>
                );
            }
        }
        return buttons;
    };

    const handlePagination = (newSkip: number) => {
        setSkipCampaign(newSkip);
        formik.handleSubmit();
    };

    // FOR FORM SUBMIT SEARCH
    const formik = useFormik({
        initialValues: {
            keyword: currentKeyword,
        },
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const { data: campaignsData } = await axios.get(
                    `/api/campaigns?keyword=${values.keyword}&limit=6&skip=${skipCampaign}`
                );

                setData(campaignsData.campaigns.campaigns);
                setTotalData(campaignsData.campaigns.totalCampaigns);
                setIsLoading(false);

                // Update the URL with the new keyword
                router.push(
                    {
                        pathname: router.pathname,
                        query: values.keyword
                            ? { ...router.query, keyword: values.keyword }
                            : {},
                    },
                    undefined,
                    { shallow: true }
                );
            } catch (error: any) {
                console.log(error);
                toast.error(error?.response?.data?.message);
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
        // SUBMIT FORMIK TO GET FIRST DATA
        formik.submitForm();
    }, []);

    return (
        <>
            <section className="mx-auto max-w-6xl bg-pimary-dpurple rounded-xl p-4 min-h-28 mb-4">
                <p className="tracking-tighter font-semibold text-white text-lg">
                    Campaign Lists
                </p>
            </section>
            <section className="mx-auto max-w-6xl rounded-xl mb-4">
                <div className="flex gap-2 mb-4">
                    {/* SEARCH INPUT HERE */}
                    <form className="w-full" onSubmit={formik.handleSubmit}>
                        <div className="join w-full h-full">
                            <input
                                name="keyword"
                                className="input input-bordered input-primary w-full rounded-l-lg join-item p-3 text-sm h-fit min-h-fit"
                                placeholder="Search campaign by title, candidate..."
                                value={formik.values.keyword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                // onChange={(e) => handleInputChange(e)}
                                // value={keyword}
                            />
                            <button
                                type="submit"
                                className="btn join-item btn-secondary rounded-r-lg border-primary py-2 px-3 text-sm h-full min-h-fit hover:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            >
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                            </button>
                        </div>
                    </form>
                    <Link
                        href={"/admin/campaigns/a/add"}
                        className="btn btn-primary text-white p-3 text-sm h-fit min-h-fit"
                    >
                        Add Campaign
                    </Link>
                </div>

                {/* SHOW DATA HERE */}
                {isLoading ? (
                    <div className="alert border border-primary bg-purple-100 text-purple-800 py-3.5 my-3 w-full rounded-lg">
                        <span className="loading loading-spinner loading-sm"></span>
                        <p>Loading data...</p>
                    </div>
                ) : data?.length != 0 ? (
                    <>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                            {data?.map((campaign: any, index: number) => {
                                return (
                                    <CampaignCard
                                        key={index}
                                        campaign={campaign}
                                    />
                                );
                            })}
                        </div>
                        {/* Pagination buttons */}
                        {totalData > 6 && (
                            <div className="flex justify-end">
                                <div className="flex justify-end">
                                    <div className="join">
                                        <button
                                            className="join-item font-normal btn py-2 px-3 text-sm h-fit min-h-fit"
                                            onClick={() =>
                                                handlePagination(
                                                    skipCampaign - 6
                                                )
                                            }
                                            disabled={skipCampaign === 0}
                                        >
                                            « Prev
                                        </button>
                                        {generatePageButtons()}
                                        <button
                                            className="join-item font-normal btn py-2 px-3 text-sm h-fit min-h-fit"
                                            onClick={() =>
                                                handlePagination(
                                                    skipCampaign + 6
                                                )
                                            }
                                            disabled={
                                                skipCampaign + 6 >= totalData
                                            }
                                        >
                                            Next »
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
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

export default AdminCampaignsPage;
