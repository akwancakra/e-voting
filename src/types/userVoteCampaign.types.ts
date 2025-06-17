import { Campaign } from "./campaign.type";
import { Candidate } from "./candidate.types";
import { User } from "./user.types";

export type UserVoteCampaign = {
    id: number;
    createdAt: string;
    updatedAt?: string;
    campaign: Campaign;
    campaignId: number;
    candidate: Candidate;
    candidateId: number;
    user: User;
    userId: number;
};
