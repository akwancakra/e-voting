// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllNotifs, getAllNotifsByCampaign } from "@/utils/db/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    status: boolean;
    statusCode: number;
    notifs: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let data;
    if (typeof req.query.id === "string" && !isNaN(parseInt(req.query.id))) {
        // GET LIST NOTIFS BY CAMPAIGN ID
        data = await getAllNotifsByCampaign({
            campaignId: parseInt(req.query.id),
        });
    } else {
        let limit = 5,
            groupedByDate = false;
        const booleanAllowed: string[] = ["true", "false"];

        if (
            typeof req.query.limit === "string" &&
            !isNaN(parseInt(req.query.limit))
        ) {
            limit = parseInt(req.query.limit);
        }

        if (
            req.query.grouped &&
            typeof req.query.grouped === "string" &&
            booleanAllowed.some((value) => value === req.query.grouped)
        ) {
            // CHECK IF ACTIVE IS VALID AS BOOLEAN
            const tempActive = JSON.parse(req.query.grouped);
            if (typeof tempActive === "boolean") {
                groupedByDate = tempActive;
            }
        }

        // GET LIST NOTIFS
        data = await getAllNotifs({ limit, groupedByDate });
    }

    res.status(200).json({ status: true, statusCode: 200, notifs: data });
}
