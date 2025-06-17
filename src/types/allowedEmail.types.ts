import { Campaign } from "./campaign.type";

export type AllowedEmail = {
    id: number;
    email: string;
    createdAt: string;
    updatedAt?: string;
    campaign: Campaign;
};
