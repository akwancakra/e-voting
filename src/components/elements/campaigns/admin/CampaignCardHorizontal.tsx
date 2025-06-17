import { Campaign } from "@/types/campaign.type";
import { sum } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CampaignCardHorizontalProps {
    campaign: Campaign;
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

const CampaignCardHorizontal: React.FC<CampaignCardHorizontalProps> = ({
    campaign,
}) => {
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
        <div className="border border-gray-300 rounded-lg p-3 mb-3">
            <div className="flex gap-2">
                <div className="bg-gray-400 rounded-lg h-16 min-w-16 overflow-hidden">
                    <Image
                        src={"/static/images/elections-banner.png"}
                        className="object-cover w-20 h-20"
                        alt="Election banner"
                        width={200}
                        height={200}
                        draggable={false}
                    />
                </div>
                <div>
                    <p className="tracking-tighter font-semibold text-base md:text-lg">
                        {campaign.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {truncateDescription(campaign.description, 65)}
                    </p>
                </div>
            </div>
            <div className="divider my-1" />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <p className="tracking-tighter font-semibold text-sm md:text-base">
                        {timeLefts}
                    </p>
                    <div className="border border-gray-300 h-5" />
                    <div className="flex items-center font-semibold">
                        <p className="text-sm md:text-base">
                            {campaign.candidates?.length || 0} Candidates
                        </p>
                        <span className="material-symbols-outlined !text-lg sm:!text-xl">
                            account_box
                        </span>
                    </div>
                </div>
                <Link
                    href={`/admin/campaigns/${campaign?.id}`}
                    className="btn btn-primary text-white py-2 px-3 text-sm h-fit min-h-fit"
                >
                    Details
                </Link>
            </div>
        </div>
    );
};

export default CampaignCardHorizontal;
