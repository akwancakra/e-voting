// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getCampaignById, getCampaigns } from "@/utils/db/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    status: Boolean;
    statusCode: Number;
    campaigns: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let data;
    if (typeof req.query.id === "string" && !isNaN(parseInt(req.query.id))) {
        // GET CAMPAIGN DETAILS AND RESULT CAMPAIGN
        data = await getCampaignById({ id: parseInt(req.query.id) });
    } else if (
        req.query &&
        (req.query.keyword ||
            req.query.getAll ||
            req.query.active ||
            req.query.limit ||
            req.query.skip)
    ) {
        // GET LIST CAMPAIGNS AND WINNER CANDIDATE WITH KEYWORD FOR SEARCHING
        let limit: number | undefined,
            active: boolean | undefined,
            getAll: boolean | undefined,
            keyword: string | undefined,
            skip: number | undefined;
        const booleanAllowed: string[] = ["true", "false"];

        //TODO CHECK FOR KEYWORD
        if (req.query.keyword && typeof req.query.keyword === "string") {
            // CHECK IF KEYWORD IS VALID AS STRING
            keyword = req.query.keyword;
        }

        //TODO CHECK FOR LIMIT
        if (req.query.limit && typeof req.query.limit === "string") {
            // CHECK IF LIMIT IS VALID AS NUMBER
            const tempLimit = parseInt(req.query.limit);
            if (tempLimit && tempLimit > 0 && typeof tempLimit === "number") {
                limit = tempLimit;
            }
        }

        //TODO CHECK FOR ACTIVE OR IN ACTIVE CAMPAIGN
        if (
            req.query.active &&
            typeof req.query.active === "string" &&
            booleanAllowed.some((value) => value === req.query.active)
        ) {
            // CHECK IF ACTIVE IS VALID AS BOOLEAN
            const tempActive = JSON.parse(req.query.active);
            if (typeof tempActive === "boolean") {
                active = tempActive;
            }
        }

        //TODO CHECK FOR GETALL CAMPAIGN
        if (
            req.query.getAll &&
            typeof req.query.getAll === "string" &&
            booleanAllowed.some((value) => value === req.query.getAll)
        ) {
            // CHECK IF GETALL IS VALID AS BOOLEAN
            const tempGetAll = JSON.parse(req.query.getAll);
            if (typeof tempGetAll === "boolean") {
                getAll = tempGetAll;
            }
        }

        //TODO CHECK FOR SKIP CAMPAIGN
        if (req.query.skip && typeof req.query.skip === "string") {
            // CHECK IF skip IS VALID AS NUMBER
            const tempSkip = parseInt(req.query.skip);
            if (tempSkip && tempSkip > 0 && typeof tempSkip === "number") {
                skip = tempSkip;
            }
        }

        data = await getCampaigns({
            keyword,
            active,
            limit,
            getAll,
            skip,
        });
    } else {
        // GET LIST CAMPAIGNS AND WINNER CANDIDATE
        data = await getCampaigns({});
    }

    res.status(200).json({ status: true, statusCode: 200, campaigns: data });
}
