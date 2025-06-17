// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    status: boolean,
    statusCode: number,
    data: any,
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const data = req.query;

    res.status(200).json({ status: true, statusCode: 200, data });
}