// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { voteByIdCampaign } from "@/utils/db/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    status: boolean;
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method === "POST") {
        const { candidateId, userId, campaignId, email, photo } = req.body;
        await voteByIdCampaign({
            campaignId,
            userId,
            candidateId,
            email,
            photo,
            callback: ({ status, message }: Data) => {
                if (status) {
                    res.status(200).json({
                        status: true,
                        message: message,
                    });
                } else {
                    res.status(400).json({
                        status: false,
                        message: message,
                    });
                }
            },
        });
    } else {
        res.status(405).json({
            status: false,
            message: "Method not allowed",
        });
    }
}
