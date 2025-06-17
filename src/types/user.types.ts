import { UserVoteCampaign } from "./userVoteCampaign.types";

export type User = {
    id: number;
    email: string;
    name: string;
    password?: string;
    role: string;
    photo?: string;
    createdAt: string;
    updatedAt?: string;
    userVoteCampaign: UserVoteCampaign[];
};
