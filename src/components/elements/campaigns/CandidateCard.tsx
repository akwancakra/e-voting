import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CandidateCardProps {
    candidate: any;
    userVoteCampaign?: any;
    sesData: any;
    isVoted?: boolean;
    isEligible?: boolean;
    isLoading: boolean;
    isFinished?: boolean;
    handlerModalVote?: Function;
    handlerModal: (id: number) => void;
}

const CandidateCard: React.FC<CandidateCardProps> = ({
    candidate,
    userVoteCampaign = [],
    sesData,
    isVoted = false,
    isEligible = false,
    isLoading,
    isFinished = false,
    handlerModalVote = () => {},
    handlerModal,
}) => {
    return (
        <div className="card bg-base-100 border border-gray-300 mb-4 sm:mb-0 sm:min-w-72 md:max-w-96 md:min-w-80">
            <figure>
                <Image
                    src={"/static/images/candidate.png"}
                    alt={`candidate ${candidate?.number}`}
                    className="min-h-72 max-h-fit object-cover w-full"
                    width={300}
                    height={300}
                />
            </figure>
            <div className="card-body gap-0 p-2 sm:p-4">
                <div className="my-3">
                    <div className="flex items-center gap-2 mb-2">
                        <h2 className="tracking-tighter font-semibold text-lg">
                            Candidate {candidate?.number || "#"}
                        </h2>
                        {userVoteCampaign?.find(
                            (vote: any) =>
                                vote.candidateId == candidate?.id &&
                                vote.userId == sesData?.user?.id
                        ) && <div className="badge badge-primary">Voted</div>}
                    </div>
                    <div className="border border-gray-300 rounded-lg p-2 flex justify-between items-center">
                        <div>
                            <div className="mb-2">
                                <p className="text-xs -mb-1">Chief</p>
                                <p className="font-semibold text-lg tracking-tighter">
                                    {candidate?.chief_name}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs -mb-1">Vice</p>
                                <p className="font-semibold text-lg tracking-tighter">
                                    {candidate?.vice_name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-end justify-center">
                            <p className="text-xs">No</p>
                            <p className="font-semibold text-primary text-5xl">
                                {candidate?.number}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={`grid ${
                        sesData?.user?.role !== "ADMIN" && !isFinished
                            ? "grid-cols-2"
                            : "grid-cols-1"
                    } gap-2`}
                >
                    <button
                        type="button"
                        onClick={() => handlerModal(candidate?.id)}
                        className="btn btn-outline btn-primary w-full text-white py-2 px-3 text-sm h-fit min-h-fit"
                    >
                        More info
                    </button>
                    {!isEligible && sesData?.user?.role === "VOTER" ? (
                        <Link
                            href={"#terms-and-conditions"}
                            className="btn btn-error w-full text-white py-2 px-3 text-sm h-fit min-h-fit"
                        >
                            Not Eligible
                        </Link>
                    ) : (
                        sesData?.user?.role !== "ADMIN" &&
                        !isFinished && (
                            <button
                                type="button"
                                onClick={() => {
                                    if (
                                        sesData?.user?.role === "VOTER" &&
                                        !isVoted
                                    ) {
                                        handlerModalVote(
                                            candidate?.candidate_temp_index
                                                ? candidate?.candidate_temp_index
                                                : candidate?.id
                                        );
                                    } else if (!sesData) {
                                        signIn();
                                    }
                                }}
                                disabled={isLoading || isVoted}
                                className={`btn ${
                                    isVoted
                                        ? "btn-disabled cursor-not-allowed"
                                        : "btn-primary"
                                } w-full text-white py-2 px-3 text-sm h-fit min-h-fit`}
                            >
                                {isVoted ? "Already Voted" : "Vote"}
                            </button>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default CandidateCard;
