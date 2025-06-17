import { AllowedEmail } from "./allowedEmail.types";
import { Candidate } from "./candidate.types";
import { Notif } from "./notif.types";
import { Rule } from "./rule.types";
import { UserVoteCampaign } from "./userVoteCampaign.types";

export type Campaign = {
    id: number;
    title: string;
    description: string;
    banner?: string;
    finished: boolean;
    expiredAt: string;
    createdAt: string;
    updatedAt?: string;
    winner_candidate?: number;
    totalVotes?: number;
    result: {
        [candidateId: string]: {
            totalVotes: number;
            percentage: number;
        };
    };
    notifsGroupedByDate?: {
        [date: string]: Notif[];
    };
    rules: Rule[];
    candidates: Candidate[];
    notifs: Notif[];
    userVoteCampaign: UserVoteCampaign[];
    allowedEmails: AllowedEmail[];
};
