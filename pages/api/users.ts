// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {allUsersQuery} from "@/utils/utils/queries";
import {client} from "@/utils/utils/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // res.status(200).json({ name: 'Response Success' })
    if (req.method === 'GET') {
        const data = await client.fetch(allUsersQuery())

        if (data) {
            res.status(200).json(data)
        } else {
            res.json([])
        }

    }
}
