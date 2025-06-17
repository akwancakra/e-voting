import Image from "next/image";
import CandidateCard from "../../CandidateCard";
import { Campaign } from "@/types/campaign.type";
import { Candidate } from "@/types/candidate.types";
import { useRef, useState } from "react";
import { AllowedEmail } from "@/types/allowedEmail.types";
import RulesCard from "../../RulesCard";
import CountdownDetail from "../../CountdownDetail";
import { Rule } from "@/types/rule.types";
import CustomOverlay from "@/components/elements/CustomOverlay";
import { useRouter } from "next/router";

interface PreviewTabProps {
    campaignData: Campaign;
    isLoading: boolean;
    previewMode: boolean;
    data: any;
}

const PreviewTab: React.FC<PreviewTabProps> = ({
    campaignData,
    isLoading,
    previewMode,
    data,
}) => {
    const [candidateDetail, setCandidateDetail] = useState<Candidate>();
    const candidateModal = useRef<HTMLDialogElement>(null);

    const handlerCandidateModal = (candidateId: number) => {
        const candidate = campaignData?.candidates.find(
            (candidate: Candidate) => candidate.id === candidateId
        );
        setCandidateDetail(candidate);

        candidateModal.current?.showModal();
    };

    return (
        <>
            {isLoading && <CustomOverlay visible={true} />}

            {/* CAMPAIGN BANNER */}
            <section className="relative h-screen max-h-48 sm:max-h-[360px]">
                <div className="flex justify-center absolute inset-0 -z-10 rounded-t-2xl overflow-hidden">
                    <Image
                        src="/static/images/elections-banner.png"
                        alt="Campaign Banner"
                        className="h-full w-full max-w-[2000px] object-cover"
                        width={2000}
                        height={600}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent" />
                    <div className="absolute inset-0 flex items-start justify-start text-white p-4">
                        <h1 className="font-semibold text-lg tracking-tighter sm:text-2xl">
                            Campaign Details
                        </h1>
                    </div>
                </div>
            </section>

            {/* CAMPAIGN TITLE */}
            <section className="container max-w-6xl mx-auto p-2 mt-8 sm:mt-14 sm:p-4">
                <div className="text-center">
                    <h1 className="font-monument text-2xl">
                        {campaignData?.title || "Campaign Title"}
                    </h1>
                    {/* <h2>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Ipsam dolorem nam, quia earum inventore voluptas
                        eligendi.
                    </h2> */}
                </div>
            </section>

            {/* CAMPAIGN CANDIDATES */}
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
                <div className="mt-6 grid grid-cols-2 lg:flex justify-center gap-2">
                    {!campaignData || campaignData.candidates?.length === 0 ? (
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
                        campaignData.candidates.map((candidate, index) => (
                            <CandidateCard
                                key={index}
                                candidate={candidate}
                                handlerModal={handlerCandidateModal}
                                isLoading={isLoading}
                                sesData={data}
                            />
                        ))
                    )}
                </div>
            </section>

            {/* CAMPAIGN DESCRIPTION */}
            <section className="container max-w-6xl mx-auto mt-6 p-2 sm:p-4">
                <h1 className="tracking-tighter font-semibold text-lg md:text-2xl">
                    {campaignData?.title || "Campaign Title"}
                </h1>
                <p className="text-sm sm:text-base">
                    {campaignData?.description || "Campaign Description"}
                </p>
            </section>

            {/* CAMPAIGN TERMS & MAILS*/}
            <section className="container max-w-6xl mx-auto mt-6 p-2 sm:p-4">
                <h1 className="tracking-tighter font-semibold text-lg md:text-2xl">
                    Terms and Conditions
                </h1>
                <div className="flex items-center gap-2 mb-2">
                    {campaignData && campaignData.allowedEmails.length > 0 ? (
                        <div className="collapse">
                            <label
                                htmlFor="collapseMail"
                                className="hidden"
                            ></label>
                            <input
                                type="checkbox"
                                title="mail"
                                id="collapseMail"
                            />
                            <div className="collapse-title flex items-center gap-2 p-0">
                                <span className="flex justify-center items-center border border-gray-300 rounded-md p-2 h-fit w-fit">
                                    <span className="material-symbols-outlined">
                                        mail
                                    </span>
                                </span>

                                <p>
                                    Only &quot;
                                    {campaignData?.allowedEmails?.length <= 2
                                        ? campaignData?.allowedEmails
                                              ?.map(
                                                  (e: AllowedEmail) => e.email
                                              )
                                              .join(", ")
                                        : campaignData?.allowedEmails
                                              ?.slice(0, 2)
                                              .map((e: AllowedEmail) => e.email)
                                              .join(", ")}
                                    {campaignData?.allowedEmails?.length > 2 &&
                                        ` and ${
                                            campaignData?.allowedEmails
                                                ?.length - 2
                                        } more`}
                                    {/* {campaignData?.allowedEmails?.length >
                                        3 && (
                                        <span
                                            className="text-blue-500 cursor-pointer hover:underline"
                                            // onClick={showMoreEmails}
                                        >
                                            (Clik more)
                                        </span>
                                    )} */}
                                    &quot; emails are allowed to vote
                                </p>
                            </div>
                            <div className="collapse-content">
                                <p>Allowed Emails:</p>
                                <ul className="list-decimal ms-4">
                                    {campaignData?.allowedEmails?.map(
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
                </div>
                {campaignData &&
                    campaignData?.rules?.length > 0 &&
                    campaignData?.rules?.map((rule: Rule, index: number) => (
                        <RulesCard key={index} rule={rule} />
                    ))}
            </section>

            {/* CAMPAIGN COUNTDOWN */}
            <section className="flex justify-center items-center bg-pimary-dpurple h-screen max-h-[220px] sm:max-h-[280px] my-4 sm:my-8">
                {campaignData ? (
                    <CountdownDetail
                        key={campaignData?.id}
                        campaignData={campaignData}
                    />
                ) : (
                    <p className="font-monument text-white text-xl sm:text-4xl">
                        No Data Expire
                    </p>
                )}
            </section>

            {/* CAMPAIGN RESULT */}
            <section className="container max-w-6xl mx-auto mt-6 mb-8 p-2 sm:p-4">
                <h1 className="tracking-tighter font-semibold text-lg mb-4 md:text-2xl">
                    {campaignData?.finished ? "Final" : "Temporary"} Results
                </h1>
                <div className="grid gap-2 sm:grid-cols-3">
                    {campaignData?.candidates?.length === 0 ? (
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
                                    campaignData &&
                                    campaignData.candidates.length > 3
                                        ? 3
                                        : campaignData?.candidates?.length
                                }`}
                            >
                                {campaignData &&
                                    campaignData.candidates?.map(
                                        (
                                            candidate: Candidate,
                                            index: number
                                        ) => (
                                            <div key={index}>
                                                <p className="font-semibold text-center text-3xl sm:sm:text-4xl md:text-5xl">
                                                    {campaignData?.result?.[
                                                        candidate.id
                                                    ]?.percentage?.toFixed(1) ||
                                                        "0"}
                                                    %
                                                </p>
                                                <div className="flex justify-center gap-2">
                                                    <p className="text-sm">
                                                        {`Candidate ${
                                                            candidate.number
                                                        } • ${
                                                            campaignData
                                                                ?.result?.[
                                                                candidate.id
                                                            ]?.totalVotes || "0"
                                                        } Voters`}
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    )}
                            </div>
                            <div className="border border-gray-300 rounded-3xl flex justify-center items-center px-5 py-10 bg-purple-50">
                                <div className="flex justify-center items-end">
                                    <p className="font-semibold text-center text-3xl sm:sm:text-4xl md:text-5xl">
                                        {campaignData?.totalVotes}
                                    </p>
                                    <p className="text-sm">Voters</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* CANDIDATE MODALS */}
            <dialog
                ref={candidateModal}
                className="modal modal-bottom sm:modal-middle"
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
        </>
    );
};

export default PreviewTab;
