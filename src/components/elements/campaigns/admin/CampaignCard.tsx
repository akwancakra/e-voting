import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CampaignCardProps {
    campaign: any;
}

const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + "...";
    }
    return description;
};

const calculateTimeLeft = (expiredAt: string) => {
    const now = new Date();
    const expirationDate = new Date(expiredAt);
    const timeLeft = expirationDate.getTime() - now.getTime();
    return Math.max(timeLeft, 0);
};

const formatTimeLeft = (timeLeft: number) => {
    const seconds = Math.floor((timeLeft / 1000) % 60);
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));

    // Menambahkan nol di depan jika nilai kurang dari 10
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds} Lefts`;
};

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
    const [timeLefts, setTimeLefts] = useState(
        formatTimeLeft(calculateTimeLeft(campaign.expiredAt))
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLefts(formatTimeLeft(calculateTimeLeft(campaign.expiredAt)));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="card bg-base-100 border border-gray-300 mb-3 sm:mb-0 md:max-w-96">
            <figure>
                <Image
                    src={"/static/images/elections-banner.png"}
                    alt="Campaign banner"
                    className="object-cover w-full max-h-64 md:h-64"
                    width={1200}
                    height={600}
                />
            </figure>
            <div className="card-body gap-0 p-2 sm:p-4">
                <h2 className="card-title tracking-tighter text-base sm:text-xl">
                    {campaign?.title}
                </h2>
                <p className="hidden text-sm text-gray-500 sm:block">
                    {truncateDescription(campaign?.description, 65)}
                </p>
                <div className="border w-full border-gray-300 my-2 block sm:hidden" />
                <div className="my-1 sm:my-3">
                    <h2 className="tracking-tighter text-xs text-gray-500 sm:text-sm">
                        Time Lefts
                    </h2>
                    <h3 className="sm:font-semibold text-base sm:text-lg">
                        {timeLefts}
                    </h3>
                </div>
                <div className="card-actions flex-nowrap">
                    <Link
                        href={`/admin/campaigns/${campaign?.id}`}
                        className="btn btn-primary mt-4 p-3 min-h-[2.5rem] h-10 flex-grow"
                    >
                        Details
                    </Link>
                    {/* <div className="dropdown dropdown-bottom dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost bg-white border border-gray-300 mt-4 p-3 min-h-[2.5rem] h-10 w-fit"
                        >
                            <span className="material-symbols-outlined !text-lg !leading-none">
                                more_vert
                            </span>
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 rounded-lg shadow bg-base-100 w-52 my-2"
                        >
                            <li>
                                <a>
                                    <span className="material-symbols-outlined !text-lg">
                                        border_color{" "}
                                    </span>
                                    Edit Campaign
                                </a>
                            </li>
                            <li>
                                <a className="bg-red-50 text-red-500 hover:bg-red-100">
                                    <span className="material-symbols-outlined !text-lg">
                                        delete{" "}
                                    </span>
                                    Delete Campaign
                                </a>
                            </li>
                        </ul>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default CampaignCard;
