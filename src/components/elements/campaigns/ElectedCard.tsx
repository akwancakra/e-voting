import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ElectedCardProps {
    winnerCandidate: any;
    currentTab: string;
    setCurrentTab: Function;
}

const ElectedCard: React.FC<ElectedCardProps> = ({
    winnerCandidate,
    currentTab,
    setCurrentTab,
}) => {
    return (
        <div className="sm:flex gap-4">
            <div className="bg-gray-400 h-[500px] w-full rounded-3xl mb-4 border border-gray-300 overflow-hidden sm:mb-0 sm:min-w-64 md:min-w-[390px] md:max-w-[390px]">
                <Image
                    src={"/static/images/candidate.png"}
                    alt="Elected candidate"
                    className="w-full h-full object-cover"
                    width={390}
                    height={500}
                />
            </div>
            <div className="flex-grow">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div>
                        <div className="mb-2">
                            <p className="text-xs -mb-1">Chief</p>
                            <div className="flex items-center gap-1">
                                <p className="font-semibold tracking-tighter text-xl sm:text-2xl">
                                    {winnerCandidate.chief_name || "Chief"}
                                </p>
                                {winnerCandidate.chief_instagram && (
                                    <Link
                                        href={winnerCandidate.chief_instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            className="fill-black"
                                        >
                                            <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z" />
                                            <circle
                                                cx="11.994"
                                                cy="11.979"
                                                r="3.003"
                                            />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-xs -mb-1">Vice</p>
                            <div className="flex items-center gap-1">
                                <p className="font-semibold tracking-tighter text-xl sm:text-2xl">
                                    {winnerCandidate.vice_name || "Vice"}
                                </p>
                                {winnerCandidate.chief_instagram && (
                                    <Link
                                        href={winnerCandidate.vice_instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            className="fill-black"
                                        >
                                            <path d="M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z" />
                                            <circle
                                                cx="11.994"
                                                cy="11.979"
                                                r="3.003"
                                            />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end justify-center">
                        <p className="text-xs text-right">No</p>
                        <p className="font-semibold text-primary text-5xl">
                            {winnerCandidate.number || "#"}
                        </p>
                    </div>
                </div>
                {/* <div className="mb-2 sm:mb-3">
            <p className="text-sm sm:text-base">
                {winnerCandidate.description || ""}
            </p>
        </div> */}
                <div
                    role="tablist"
                    className="tabs tabs-bordered border-primary w-fit mb-2 sm:mb-3"
                >
                    <button
                        type="button"
                        role="tab"
                        onClick={() => setCurrentTab("VISI")}
                        className={`tab ${
                            currentTab === "VISI" &&
                            "tab-active font-semibold text-primary"
                        } sm:text-base`}
                    >
                        Visi
                    </button>
                    <button
                        type="button"
                        role="tab"
                        onClick={() => setCurrentTab("MISI")}
                        className={`tab ${
                            currentTab === "MISI" &&
                            "tab-active font-semibold text-primary"
                        } sm:text-base`}
                    >
                        Misi
                    </button>
                    <button
                        type="button"
                        role="tab"
                        onClick={() => setCurrentTab("PROGRAM")}
                        className={`tab ${
                            currentTab === "PROGRAM" &&
                            "tab-active font-semibold text-primary"
                        } sm:text-base`}
                    >
                        Total Voters
                    </button>
                </div>
                <div className="mb-2 sm:mb-3">
                    <p className="text-sm sm:text-base">
                        {currentTab === "VISI" && winnerCandidate.visi}
                        {currentTab === "MISI" && winnerCandidate.misi}
                        {currentTab === "PROGRAM" && winnerCandidate.program}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ElectedCard;
