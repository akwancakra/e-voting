import CustomOverlay from "@/components/elements/CustomOverlay";
import { Campaign } from "@/types/campaign.type";
import { Candidate } from "@/types/candidate.types";
import { Notif } from "@/types/notif.types";
import { useEffect, useState } from "react";
import NotificationGroup from "../NotificationGroup";

interface ResultTabProps {
    campaignData: Campaign;
    isLoading: boolean;
    data: any;
}

const ResultTab: React.FC<ResultTabProps> = ({
    campaignData,
    isLoading,
    data,
}) => {
    const [sortedCandidates, setSortedCandidates] = useState<any>();
    const [sortedCandidateResult, setSortedCandidateResult] = useState<any>();

    const getSuffix = (position: number) => {
        let suffix: string;
        if (position === 1) {
            suffix = "st";
        } else if (position === 2) {
            suffix = "nd";
        } else if (position === 3) {
            suffix = "rd";
        } else {
            suffix = "th";
        }

        return suffix;
    };

    const getPositionStyle = (position: number) => {
        if (position === 1) {
            return "bg-yellow-300 text-yellow-700";
        } else if (position === 2) {
            return "bg-gray-300 text-gray-700";
        } else if (position === 3) {
            return "bg-amber-800 text-white";
        } else {
            return "bg-gray-50 text-gray-800";
        }
    };

    const getCandidatePosition = (position: number) => {
        let suffix: string;
        if (position === 1) {
            suffix = "st";
        } else if (position === 2) {
            suffix = "nd";
        } else if (position === 3) {
            suffix = "rd";
        } else {
            suffix = "th";
        }

        return `${position}${suffix}`;
    };

    // SORT CANDIDATES BASED ON VOTES
    useEffect(() => {
        if (campaignData && campaignData.result) {
            // SORT CANDIDATE BY NUMBER
            const srtCandidates = campaignData.candidates.sort(
                (a, b) => a.number - b.number
            );

            // Mengonversi objek result menjadi array
            const resultArray = Object.entries(campaignData.result).map(
                ([candidateId, data]) => ({
                    candidateId: parseInt(candidateId),
                    ...data,
                })
            );

            // Mengurutkan array berdasarkan totalVotes
            const sortedCandidatesRes = resultArray.sort(
                (a, b) => b.totalVotes - a.totalVotes
            );

            setSortedCandidates(srtCandidates);
            setSortedCandidateResult(sortedCandidatesRes);
        }
    }, [campaignData]);

    return (
        <>
            {isLoading && <CustomOverlay visible={true} />}

            <section className="container max-w-6xl mx-auto">
                <h1 className="tracking-tighter font-semibold text-lg md:text-2xl">
                    Campaign Result
                </h1>
                <div className="sm:grid sm:grid-cols-3 gap-2 items-start my-3">
                    {sortedCandidates?.length > 0 && sortedCandidates ? (
                        sortedCandidates.map(
                            (candidate: Candidate, index: number) => (
                                <div
                                    key={index}
                                    className="flex flex-col justify-between mb-5 sm:mb-0"
                                >
                                    <div>
                                        <div className="flex gap-2 items-center text-base sm:text-lg">
                                            {sortedCandidateResult?.length >
                                            0 ? (
                                                sortedCandidateResult.map(
                                                    (
                                                        result: any,
                                                        i: number
                                                    ) => {
                                                        if (
                                                            result.candidateId ===
                                                            candidate.id
                                                        ) {
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className={`flex justify-center items-center font-semibold rounded-md p-2 leading-none w-9 h-9 ${getPositionStyle(
                                                                        i + 1
                                                                    )}`}
                                                                >
                                                                    <p>
                                                                        {i + 1}
                                                                        <span className="text-xs font-light">
                                                                            {getSuffix(
                                                                                i +
                                                                                    1
                                                                            )}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    }
                                                )
                                            ) : (
                                                <div className="flex justify-center items-center font-semibold rounded-md p-2 leading-none w-9 h-9 bg-gray-300 text-gray-700">
                                                    <p>
                                                        #
                                                        <span className="text-xs font-light">
                                                            ##
                                                        </span>
                                                    </p>
                                                </div>
                                            )}
                                            Candidate {candidate.number}
                                        </div>
                                        <div className="mt-5">
                                            <div className="mb-2">
                                                <p className="text-xs -mb-1">
                                                    Chief
                                                </p>
                                                <p className="font-semibold text-base tracking-tighter md:text-lg">
                                                    {candidate.chief_name}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs -mb-1">
                                                    Vice
                                                </p>
                                                <p className="font-semibold text-base tracking-tighter md:text-lg">
                                                    {candidate.vice_name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        {/* GET TOTAL VOTES, AND POSITION */}
                                        {sortedCandidateResult.length > 0 &&
                                        sortedCandidateResult ? (
                                            sortedCandidateResult.map(
                                                (result: any, i: number) => {
                                                    const isCurrentCandidate =
                                                        result.candidateId ===
                                                        candidate.id;

                                                    if (isCurrentCandidate) {
                                                        return (
                                                            <div key={i}>
                                                                <div className="flex items-end">
                                                                    <p className="font-semibold tracking-tighter text-2xl sm:text-5xl">
                                                                        {
                                                                            result.totalVotes
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Voters
                                                                    </p>
                                                                </div>
                                                                <p className="text-gray-500 text-sm">
                                                                    {campaignData.result[
                                                                        result
                                                                            .candidateId
                                                                    ]?.percentage.toFixed(
                                                                        1
                                                                    ) || "0"}
                                                                    % •{" "}
                                                                    {getCandidatePosition(
                                                                        i + 1
                                                                    )}
                                                                </p>
                                                            </div>
                                                        );
                                                    }
                                                    return null;
                                                }
                                            )
                                        ) : (
                                            <div>
                                                <div className="flex items-end">
                                                    <p className="font-semibold tracking-tighter text-2xl sm:text-5xl">
                                                        0
                                                    </p>
                                                    <p>Voters</p>
                                                </div>
                                                <p className="text-gray-500 text-sm">
                                                    0% • #
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <div className="alert border border-warning gap-2 bg-yellow-100 text-yellow-800 py-3.5 my-3 rounded-lg col-span-3">
                            <span className="material-symbols-outlined">
                                info
                            </span>
                            <span>There&apos;s no candidate</span>
                        </div>
                    )}
                </div>
                <div className="divider my-5" />
                <div className="font-semibold tracking-tighter">
                    <p>Total Voters</p>
                    <p className="tracking-tighter text-2xl sm:text-5xl">
                        {campaignData?.totalVotes || "0"}
                    </p>
                </div>
                <div className="mt-5">
                    <p className="font-semibold tracking-tighter mb-2">
                        Election Logs
                    </p>
                    <div className="border border-gray-300 p-3 rounded-lg min-h-48">
                        {/* <div role="alert" class="alert rounded-lg my-3">
                          <span class="material-symbols-outlined">
                              info
                          </span>
                          <span>Belum ada data</span>
                      </div> */}
                        {campaignData?.notifsGroupedByDate ? (
                            Object.keys(campaignData.notifsGroupedByDate)
                                .length > 0 ? (
                                <NotificationGroup
                                    notifsGroupedByDate={
                                        campaignData.notifsGroupedByDate
                                    }
                                />
                            ) : (
                                <p>There&apos;s no data</p>
                            )
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResultTab;
