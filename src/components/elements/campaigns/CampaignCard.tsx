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

  return { hours: formattedHours, minutes, seconds };
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
          {campaign.title}
        </h2>
        <p className="hidden text-sm text-gray-500 sm:block">
          {truncateDescription(campaign.description, 65)}
        </p>
        <div className="border w-full border-gray-300 my-2 block sm:hidden" />
        <div className="my-1 sm:my-3">
          <h2 className="tracking-tighter mb-2 sm:font-semibold text-sm sm:text-lg">
            Time Lefts
          </h2>
          <div className="grid grid-flow-col justify-center text-center auto-cols-max gap-2 sm:gap-5">
            <div className="flex flex-col p-2 bg-purple-100 rounded-xl text-neutral-content">
              <span className="countdown font-semibold text-lg sm:text-2xl md:text-3xl">
                {timeLefts.hours}
              </span>
              <p className="text-xs sm:text-base">hours</p>
            </div>
            <div className="flex flex-col p-2 bg-purple-100 rounded-xl text-neutral-content">
              <span className="countdown font-semibold text-lg sm:text-2xl md:text-3xl">
                <span
                  style={
                    {
                      "--value": timeLefts.minutes,
                    } as any
                  }
                />
              </span>
              <p className="text-xs sm:text-base">min</p>
            </div>
            <div className="flex flex-col p-2 bg-purple-100 rounded-xl text-neutral-content">
              <span className="countdown font-semibold text-lg sm:text-2xl md:text-3xl">
                <span
                  style={
                    {
                      "--value": timeLefts.seconds,
                    } as any
                  }
                />
              </span>
              <p className="text-xs sm:text-base">sec</p>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-2 sm:mt-0">
          <Link
            href={`/campaigns/${campaign.id}`}
            className="btn btn-primary w-full text-white py-2 px-3 h-fit min-h-fit text-xs sm:text-sm"
          >
            View Campaign
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
