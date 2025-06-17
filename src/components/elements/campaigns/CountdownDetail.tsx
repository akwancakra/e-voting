import { Campaign } from "@/types/campaign.type";
import React, { useEffect, useState } from "react";

interface CountdownDetailProps {
    campaignData: Campaign;
}

const CountdownDetail: React.FC<CountdownDetailProps> = ({ campaignData }) => {
    const [timeLefts, setTimeLefts] = useState<any>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const calculateTimeLeft = (expiredAt: string) => {
        const now = new Date();
        const expirationDate = new Date(expiredAt);
        const timeLeft = expirationDate.getTime() - now.getTime();
        return Math.max(timeLeft, 0);
    };

    const formatTimeLeft = (timeLeft: number) => {
        const seconds = Math.floor((timeLeft / 1000) % 60);
        const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

        if (days > 99) {
            days = 99;
        }

        return { days, hours, minutes, seconds };
    };

    // FORMATTING TIME
    useEffect(() => {
        if (campaignData) {
            const initTimeLefts = calculateTimeLeft(campaignData.expiredAt);
            setTimeLefts(formatTimeLeft(initTimeLefts));

            const timer = setInterval(() => {
                setTimeLefts(
                    formatTimeLeft(calculateTimeLeft(campaignData.expiredAt))
                );
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [campaignData]);

    return (
        <div className="my-3">
            {campaignData?.finished ? (
                <p className="text-white font-monument text-center text-3xl md:text-5xl lg:text-7xl">
                    Election is completed
                </p>
            ) : (
                <>
                    <h2 className="text-white tracking-tighter font-semibold text-lg mb-2">
                        Time Lefts
                    </h2>
                    <div className="grid grid-flow-col justify-center gap-5 text-center auto-cols-max">
                        {timeLefts && timeLefts.days !== 0 && (
                            <div className="flex flex-col p-2 bg-purple-100 rounded-xl text-neutral-content">
                                <span className="countdown font-semibold text-4xl sm:text-6xl">
                                    <span
                                        style={{
                                            "--value": timeLefts.days,
                                        }}
                                    />
                                </span>
                                days
                            </div>
                        )}
                        <div className="flex flex-col p-2 bg-purple-100 rounded-xl text-neutral-content">
                            <span className="countdown font-semibold text-4xl sm:text-6xl">
                                <span
                                    style={{
                                        "--value": timeLefts.hours,
                                    }}
                                />
                            </span>
                            hours
                        </div>
                        <div className="flex flex-col p-2 bg-purple-100 rounded-xl text-neutral-content">
                            <span className="countdown font-semibold text-4xl sm:text-6xl">
                                <span
                                    style={{
                                        "--value": timeLefts.minutes,
                                    }}
                                />
                            </span>
                            min
                        </div>
                        <div className="flex flex-col p-2 bg-purple-100 rounded-xl text-neutral-content">
                            <span className="countdown font-semibold text-4xl sm:text-6xl">
                                <span
                                    style={{
                                        "--value": timeLefts.seconds,
                                    }}
                                />
                            </span>
                            sec
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CountdownDetail;
