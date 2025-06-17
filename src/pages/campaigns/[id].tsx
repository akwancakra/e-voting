import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
// LOCAL
import CustomOverlay from "@/components/elements/CustomOverlay";
import ElectedCard from "@/components/elements/campaigns/ElectedCard";
import RulesCard from "@/components/elements/campaigns/RulesCard";
import CandidateCard from "@/components/elements/campaigns/CandidateCard";
import CountdownDetail from "@/components/elements/campaigns/CountdownDetail";
import { Candidate } from "@/types/candidate.types";
import { Campaign } from "@/types/campaign.type";
import { AllowedEmail } from "@/types/allowedEmail.types";

const CampaignDetail = () => {
    const [isVoting, setIsVoting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEligible, setIsEligible] = useState<boolean>(true);
    const [data, setData] = useState<Campaign>();
    const [isVoted, setIsVoted] = useState<boolean>(false);
    const [candidateDetail, setCandidateDetail] = useState<any>({});
    const [winnerCandidate, setWinnerCandidate] = useState<any>({});
    const [currentTab, setCurrentTab] = useState<string>("VISI");

    const myModal = useRef<HTMLDialogElement>(null);
    const voteModal = useRef<HTMLDialogElement>(null);

    const { data: sesData }: any = useSession();
    const { query, push } = useRouter();

    /**
     * Handles modal for a specific candidate.
     *
     * @param {number} candidateId - the ID of the candidate
     * @return {void}
     */
    const handlerModal = (candidateId: number) => {
        const candidate =
            data &&
            data.candidates.find(
                (candidate: any) => candidate.id === candidateId
            );
        setCandidateDetail(candidate);

        myModal.current?.showModal();
    };

    /**
     * Handles the modal vote for a specific candidate.
     *
     * @param {number} candidateId - The ID of the candidate
     * @return {void}
     */
    const handlerModalVote = (candidateId: number) => {
        const candidate =
            data &&
            data.candidates.find(
                (candidate: any) => candidate.id === candidateId
            );
        setCandidateDetail(candidate);

        voteModal.current?.showModal();
    };

    /**
     * Async function to handle voting for a campaign.
     *
     * @param {Object} param0 - Object containing campaignId, userId, candidateId, and email
     * @return {void}
     */
    const handlerVote = async ({
        campaignId = 0,
        userId = 0,
        candidateId = 0,
        email = "",
        photo = "",
    }: {
        campaignId: number;
        userId: number;
        candidateId: number;
        email: string;
        photo: string;
    }) => {
        setIsVoting(true);
        if (campaignId && userId && candidateId && email) {
            try {
                await axios
                    .post("/api/campaigns/vote", {
                        campaignId,
                        userId,
                        candidateId,
                        email,
                        photo,
                    })
                    .then((res) => {
                        toast.success(res.data.message);
                        setIsLoading(true);
                        fetchData();
                    });
                setIsVoting(false);
                setIsVoted(true);
            } catch (error: any) {
                setIsVoting(false);
                toast.error(error?.response?.data?.message);
            }
        } else {
            setIsVoting(false);
            toast.error("Something went wrong, try again");
        }
    };

    /**
     * Checks if the user has voted in the campaign and updates the state accordingly.
     */
    const checkIsVoted = () => {
        if (sesData?.user && data?.userVoteCampaign) {
            const isVoted = data.userVoteCampaign.some(
                (vote: any) => vote.userId == sesData?.user?.id
            );
            setIsVoted(isVoted);
        }
    };

    /**
     * Asynchronously fetches data and handles the response and error scenarios.
     */
    const fetchData = async () => {
        const qId =
            typeof query.id === "string" ? parseInt(query.id) : undefined;

        if (!qId || typeof qId !== "number") {
            push("/campaigns");
        }

        await axios
            .get(`/api/campaigns?id=${query.id}`)
            .then((res) => {
                setData(res.data.campaigns);
                if (res.data.campaigns?.title) {
                    if (res.data.campaigns?.finished) {
                        const winner = res.data.campaigns?.candidates?.find(
                            (candidate: Candidate) =>
                                candidate.number ==
                                res.data.campaigns?.winner_candidate
                        );
                        setWinnerCandidate(winner);
                    }

                    if (res.data.campaigns?.allowedEmails?.length != 0) {
                        const domain = sesData?.user?.email.split("@")[1];
                        const eligbible =
                            res.data.campaigns?.allowedEmails?.some(
                                (e: any) => e.email == domain
                            );
                        setIsEligible(eligbible);
                    }
                }
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message);
                setIsLoading(false);
                push("/campaigns");
            });
    };

    // FORMATTING TIME
    useEffect(() => {
        if (data) {
            checkIsVoted();
        }
    }, [data]);

    useEffect(() => {
        if (query.id) {
            setIsLoading(true);
            fetchData();
        }
    }, [query.id]);

    return (
        <div>
            {(isLoading || isVoting) && (
                <CustomOverlay visible={isLoading || isVoting} />
            )}

            <section className="relative h-screen max-h-56 md:max-h-80 sm:max-h-[430px]">
                <div className="flex justify-center absolute inset-0 -z-10">
                    <Image
                        src={"/static/images/elections-banner.png"}
                        alt="Campaign banner"
                        className="h-full w-full max-w-[2000px] object-cover"
                        width={2000}
                        height={600}
                    />
                </div>
            </section>

            <section className="container max-w-6xl mx-auto p-2 mt-8 sm:mt-14 sm:p-4">
                <div className="text-center">
                    <h1 className="font-monument text-2xl">
                        {data?.title || "Campaign Title"}
                    </h1>
                </div>
            </section>

            {data?.finished && (
                <section className="container max-w-6xl mx-auto mt-6 p-2 sm:p-4">
                    <h1 className="tracking-tighter font-semibold text-lg mb-2 sm:mb-3 md:text-2xl">
                        Elected candidate
                    </h1>
                    <ElectedCard
                        currentTab={currentTab}
                        setCurrentTab={setCurrentTab}
                        winnerCandidate={winnerCandidate}
                    />
                </section>
            )}

            <section className="container max-w-6xl mx-auto mt-6 p-2 sm:p-4">
                <h1 className="tracking-tighter font-semibold text-lg md:text-2xl">
                    Candidates
                </h1>
                <p className="text-sm sm:text-base">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Amet, omnis laborum aliquid atque illum quis nobis quam
                    expedita? Nam, praesentium. Accusantium vitae labore qui
                    quos.
                </p>
                {/* CANDIDATES */}
                <div className="mt-6 sm:flex justify-center gap-2">
                    {!data || data.candidates.length === 0 ? (
                        <div className="alert border border-info bg-blue-100 text-blue-800 py-3.5 my-3 rounded-lg">
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
                            <span>There&apos;s no candidate yet</span>
                        </div>
                    ) : (
                        data.candidates?.map(
                            (candidate: any, index: number) => {
                                return (
                                    <CandidateCard
                                        key={index}
                                        candidate={candidate}
                                        isLoading={isLoading}
                                        isEligible={isEligible}
                                        isVoted={isVoted}
                                        sesData={sesData}
                                        handlerModal={handlerModal}
                                        handlerModalVote={handlerModalVote}
                                        isFinished={data?.finished}
                                        userVoteCampaign={data.userVoteCampaign}
                                    />
                                );
                            }
                        )
                    )}
                </div>
            </section>

            <section className="container max-w-6xl mx-auto mt-6 p-2 sm:p-4">
                <h1 className="tracking-tighter font-semibold text-lg md:text-2xl">
                    Descriptions
                </h1>
                <p className="text-sm sm:text-base">
                    {data?.description || "Description campaign"}
                </p>
            </section>

            <section className="container max-w-6xl mx-auto mt-6 p-2 sm:p-4">
                <h1
                    className="tracking-tighter font-semibold text-lg md:text-2xl"
                    id="terms-and-conditions"
                >
                    Terms and Conditions
                </h1>
                {data && data.allowedEmails.length > 0 ? (
                    <div className="collapse">
                        <label
                            htmlFor="collapseMail"
                            className="hidden"
                        ></label>
                        <input type="checkbox" title="mail" id="collapseMail" />
                        <div className="collapse-title flex items-center gap-2 p-0">
                            <span className="flex justify-center items-center border border-gray-300 rounded-md p-2 h-fit w-fit">
                                <span className="material-symbols-outlined">
                                    mail
                                </span>
                            </span>

                            <p>
                                Only &quot;
                                {data.allowedEmails?.length <= 2
                                    ? data.allowedEmails
                                          ?.map((e: AllowedEmail) => e.email)
                                          .join(", ")
                                    : data.allowedEmails
                                          ?.slice(0, 2)
                                          .map((e: AllowedEmail) => e.email)
                                          .join(", ")}
                                {data.allowedEmails?.length > 2 &&
                                    ` and ${
                                        data.allowedEmails?.length - 2
                                    } more`}
                                &quot; emails are allowed to vote
                            </p>
                        </div>
                        <div className="collapse-content">
                            <p>Allowed Emails:</p>
                            <ul className="list-decimal ms-4">
                                {data.allowedEmails?.map(
                                    (e: AllowedEmail, index: number) => (
                                        <li key={index}>{e.email}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mt-2">
                        <span className="flex justify-center items-center border border-gray-300 rounded-md p-2 h-fit w-fit">
                            <span className="material-symbols-outlined">
                                mail
                            </span>
                        </span>
                        <p>No restrictions on email to vote</p>
                    </div>
                )}
                {data &&
                    data.rules?.length > 0 &&
                    data?.rules?.map((rule: any, index: number) => (
                        <RulesCard key={index} rule={rule} />
                    ))}
            </section>

            {/* CAMPAIGN COUNTDOWN */}
            <section className="flex justify-center items-center bg-pimary-dpurple h-screen max-h-[220px] sm:max-h-[280px] my-4 sm:my-8">
                {data ? (
                    <CountdownDetail key={data?.id} campaignData={data} />
                ) : (
                    <p className="font-monument text-white text-xl sm:text-4xl">
                        No Data Expire
                    </p>
                )}
            </section>

            <section className="container max-w-6xl mx-auto mt-6 mb-8 p-2 sm:p-4">
                <h1 className="tracking-tighter font-semibold text-lg mb-4 md:text-2xl">
                    {data && data.finished ? "Final" : "Temporary"} Results
                </h1>
                <div className="grid gap-2 sm:grid-cols-3">
                    {data && data.candidates?.length === 0 ? (
                        <>
                            <div className="flex items-center justify-center border border-gray-300 rounded-3xl px-5 py-5 sm:py-10 sm:col-span-2">
                                <span>There&apos;s no candidate yet</span>
                            </div>
                            <div className="border border-gray-300 rounded-3xl flex justify-center items-center px-5 py-10 bg-purple-50">
                                <div className="flex justify-center items-end">
                                    <span>There&apos;s no candidate yet</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className={`grid grid-cols-1 gap-6 justify-between border border-gray-300 rounded-3xl px-5 py-5 sm:py-10 sm:col-span-2 sm:grid-cols-${
                                    data && data.candidates?.length > 3
                                        ? 3
                                        : data && data.candidates?.length
                                }`}
                            >
                                {data &&
                                    data?.candidates?.map((candidate: any) => (
                                        <div key={candidate.id}>
                                            <p className="font-semibold text-center text-3xl sm:sm:text-4xl md:text-5xl">
                                                {(data &&
                                                    data.result?.[
                                                        candidate.id
                                                    ]?.percentage?.toFixed(
                                                        1
                                                    )) ||
                                                    "0"}
                                                %
                                            </p>
                                            <div className="flex justify-center gap-2">
                                                <p className="text-sm">
                                                    {`Candidate ${
                                                        candidate.number
                                                    } • ${
                                                        (data &&
                                                            data.result?.[
                                                                candidate.id
                                                            ]?.totalVotes) ||
                                                        "0"
                                                    } Voters`}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                            <div className="border border-gray-300 rounded-3xl flex justify-center items-center px-5 py-10 bg-purple-50">
                                <div className="flex justify-center items-end">
                                    <p className="font-semibold text-center text-3xl sm:sm:text-4xl md:text-5xl">
                                        {data && data.totalVotes}
                                    </p>
                                    <p className="text-sm">Voters</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* VOTE MODALS */}
            <dialog
                id="voteModal"
                className="modal modal-bottom sm:modal-middle"
                ref={voteModal}
            >
                <div className="modal-box rounded-lg p-4">
                    <h3 className="font-semibold tracking-tighter text-lg sm:text-xl">
                        Vote this candidate?
                    </h3>
                    <p className="text-sm text-gray-500">
                        You&apos;re about to vote for{" "}
                        {candidateDetail?.chief_name} and{" "}
                        {candidateDetail?.vice_name}
                    </p>
                    <div className="divider my-1" />
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="mb-2">
                                <p className="text-sm text-gray-500">Chief</p>
                                <h4 className="font-semibold tracking-tighter text-base sm:text-lg">
                                    {candidateDetail?.chief_name}
                                </h4>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">Vice</p>
                                <h4 className="font-semibold tracking-tighter text-base sm:text-lg">
                                    {candidateDetail?.vice_name}
                                </h4>
                            </div>
                        </div>

                        <div className="flex items-end">
                            <p className="text-right text-sm text-gray-500">
                                No
                            </p>
                            <p className="font-semibold text-primary text-5xl">
                                {candidateDetail?.number}
                            </p>
                        </div>
                    </div>
                    <div className="modal-action mt-3 gap-2">
                        <form
                            method="dialog"
                            className="w-full flex justify-end gap-2"
                        >
                            {/* if there is a button in form, it will close the modal */}
                            <button
                                className="btn py-2 px-3 text-sm h-fit min-h-fit w-1/2 sm:w-fit"
                                disabled={isVoting}
                            >
                                Cancel
                            </button>
                            <button
                                disabled={isVoting}
                                type="button"
                                onClick={() =>
                                    handlerVote({
                                        campaignId: data?.id ?? 0,
                                        userId: sesData?.user?.id,
                                        candidateId: candidateDetail?.id,
                                        email: sesData?.user?.email,
                                        photo: sesData?.user?.photo ?? "",
                                    })
                                }
                                className={`btn ${
                                    isVoted
                                        ? "btn-disabled cursor-not-allowed"
                                        : "btn-primary"
                                } py-2 px-5 text-sm h-fit min-h-fit w-1/2 sm:w-fit`}
                            >
                                {isVoting ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : isVoted ? (
                                    "Already Voted"
                                ) : (
                                    "Vote"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* CANDIDATE MODALS */}
            <dialog
                id="candidateModal"
                className="modal modal-bottom sm:modal-middle"
                ref={myModal}
            >
                <div className="modal-box rounded-lg p-6">
                    <h3 className="font-semibold tracking-tighter text-lg sm:text-xl">
                        Candidate {candidateDetail?.number}
                    </h3>
                    <div className="divider my-1" />
                    <h4 className="font-semibold tracking-tighter text-base sm:text-lg">
                        Visi
                    </h4>
                    <div className="border border-gray-300 p-2 rounded-lg mb-2">
                        <p className="text-gray-500 text-sm">
                            {candidateDetail?.visi}
                        </p>
                        <ol className="text-gray-500 text-sm list-decimal ms-4">
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing.
                            </li>
                            <li>Lorem ipsum dolor sit amet consectetur.</li>
                        </ol>
                        <p className="text-gray-500 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Perferendis debitis ipsum veritatis architecto
                            vero provident?
                        </p>
                    </div>
                    <h4 className="font-semibold tracking-tighter text-base sm:text-lg">
                        Misi
                    </h4>
                    <div className="border border-gray-300 p-2 rounded-lg mb-2">
                        <p className="text-gray-500 text-sm">
                            {candidateDetail?.misi}
                        </p>
                        <ol className="text-gray-500 text-sm list-decimal ms-4">
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing.
                            </li>
                            <li>Lorem ipsum dolor sit amet consectetur.</li>
                        </ol>
                        <p className="text-gray-500 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Perferendis debitis ipsum veritatis architecto
                            vero provident?
                        </p>
                    </div>
                    <h4 className="font-semibold tracking-tighter text-base sm:text-lg">
                        Program Kerja
                    </h4>
                    <div className="border border-gray-300 p-2 rounded-lg">
                        <p className="text-gray-500 text-sm">
                            {candidateDetail?.program}
                        </p>
                        <ol className="text-gray-500 text-sm list-decimal ms-4">
                            <li>Lorem ipsum dolor sit amet.</li>
                            <li>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing.
                            </li>
                            <li>Lorem ipsum dolor sit amet consectetur.</li>
                        </ol>
                        <p className="text-gray-500 text-sm">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Perferendis debitis ipsum veritatis architecto
                            vero provident?
                        </p>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn py-2 px-3 text-sm h-fit min-h-fit">
                                Tutup
                            </button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default CampaignDetail;
