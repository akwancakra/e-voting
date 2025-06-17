import { Notif } from "@/types/notif.types";
import React from "react";

interface NotificationGroup {
    // date: string;
    notifs: Notif[]; // Sesuaikan dengan tipe data notifikasi
}

interface NotificationGroupProps {
    notifsGroupedByDate: Record<string, any[]>; // Sesuaikan dengan tipe data notifsGroupedByDate
}

const NotificationGroup: React.FC<NotificationGroupProps> = ({
    notifsGroupedByDate,
}) => {
    const formatDate = (inputDate: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return new Date(inputDate).toLocaleDateString("eng-US", options);
    };

    const formatTimeAgo = (createdAt: string) => {
        const currentDate = new Date().getTime();
        const dateCreated = new Date(createdAt).getTime();

        const timeDifference = currentDate - dateCreated;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} ${days === 1 ? "day" : "days"} ago`;
        } else if (hours > 0) {
            return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
        } else if (minutes > 0) {
            return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
        } else {
            return `${seconds} ${seconds === 1 ? "second" : "seconds"} ago`;
        }
    };

    return (
        <div>
            {Object.entries(notifsGroupedByDate).map(([date, notifs]) => (
                <div key={date}>
                    <p className="tracking-tighter font-semibold text-gray-600 mb-2">
                        {formatDate(date)}
                    </p>
                    {notifs.map((notif: Notif, index: number) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 mb-2"
                        >
                            <span className="flex justify-center items-center rounded-full bg-purple-400 p-3 text-white h-fit w-fit">
                                <span className="material-symbols-outlined">
                                    account_circle
                                </span>
                            </span>
                            <div>
                                <p className="text-gray-500 text-sm">
                                    {notif.title}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {formatTimeAgo(notif.createdAt)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default NotificationGroup;
