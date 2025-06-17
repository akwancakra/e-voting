// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    author: string;
    instagram: string;
    information: any;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const information = {
        Campaign: {
            "[GET] All Campaigns": "/api/campaigns",
            "[GET] All Campaigns By Keyword": "/api/campaigns?keyword=keyword",
            "[GET] Campaign By Id": "/api/campaigns?id=1",
            Admin: {
                "[POST] Create Campaign": "/api/campaigns/admin/create",
                "[POST] Edit Campaign": "/api/campaigns/admin/edit",
                "[POST] Finish Campaign": "/api/campaigns/admin/finish",
                "[DELETE] Delete Campaign": "/api/campaigns/admin/delete",
            },
        },
        Notif: {
            "[GET] All Notifs": "/api/notifs",
            "[GET] All Notifs By Campaign Id": "/api/notifs?id=1",
        },
    };

    res.status(200).json({
        author: "Akwan Cakra Tajimalela",
        instagram: "https://www.instagram.com/akwancakra",
        information,
    });
}
