// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {allPostsQuery} from "@/utils/utils/queries";
import {client} from "@/utils/utils/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // res.status(200).json({ name: 'Response Success' })
    if (req.method === 'GET') {
        const query = allPostsQuery()

        const data = await client.fetch(query);
        res.status(200).json(data)
    } else if (req.method === 'POST') {
        const document = req.body;
        client.create(document)
            .then(() => res.status(201).json('Video Created'))
    }
}
