// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
    createCampaign,
    deleteCampaign,
    editCampaign,
    finishCampaign,
} from "@/utils/db/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    status: boolean;
    message: string;
    data?: any;
};

/**
 * Handles various HTTP methods to create, edit, delete, or finish a campaign.
 *
 * @param {NextApiRequest} req - the incoming request object
 * @param {NextApiResponse<Data>} res - the response object
 * @return {Promise<void>} a Promise that resolves to void
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { method } = req.query;

    if (method === "create") {
        if (req.method === "POST") {
            await createCampaign(
                req.body,
                ({ status, message, data }: Data) => {
                    if (status) {
                        res.status(200).json({
                            status: true,
                            message: message,
                            data: data,
                        });
                    } else {
                        res.status(400).json({
                            status: false,
                            message: message,
                        });
                    }
                }
            );
        } else {
            res.status(405).json({
                status: false,
                message: "Method not allowed",
            });
        }
    } else if (method === "edit") {
        if (req.method === "POST") {
            await editCampaign({
                id: parseInt(req.body.id),
                campaignData: req.body.campaignData,
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
    } else if (method === "delete") {
        if (req.method === "DELETE") {
            await deleteCampaign({ id: parseInt(req.body.id) })
                .then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Campaign Successfully Deleted",
                    });
                })
                .catch((err) => {
                    res.status(400).json({ status: false, message: err });
                });
        } else {
            res.status(405).json({
                status: false,
                message: "Method not allowed",
            });
        }
    } else if (method === "finish") {
        if (req.method === "POST") {
            await finishCampaign({
                id: parseInt(req.body.id),
            })
                .then(() => {
                    res.status(200).json({
                        status: true,
                        message: "Campaign Successfully Finished",
                    });
                })
                .catch((err) => {
                    res.status(400).json({ status: false, message: err });
                });
        } else {
            res.status(405).json({
                status: false,
                message: "Method not allowed",
            });
        }
    } else {
        res.status(404).json({ status: false, message: "Invalid method" });
    }
}
