import { Campaign } from "./campaign.type";

export type Rule = {
    id: number;
    icon: string;
    description: string;
    createdAt: string;
    updatedAt?: string;
    campaign: Campaign;
};
