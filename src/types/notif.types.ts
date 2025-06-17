import { Campaign } from "./campaign.type";

export type Notif = {
    id: number;
    icon: string;
    title: string;
    photo?: string;
    createdAt: string;
    updatedAt?: string;
    campaign: Campaign;
};
