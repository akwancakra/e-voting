import { Campaign } from "./campaign.type";
import { UserVoteCampaign } from "./userVoteCampaign.types";

export type Candidate = {
    id: number;
    number: number;
    chief_name: string;
    chief_instagram: string;
    vice_name: string;
    vice_instagram: string;
    description: string;
    visi: string;
    misi: string;
    program: string;
    banner?: string;
    createdAt: string;
    updatedAt?: string;
    campaign: Campaign;
    userVoteCampaign: UserVoteCampaign[];
};
