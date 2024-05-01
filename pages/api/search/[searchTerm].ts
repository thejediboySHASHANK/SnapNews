// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {client} from "@/utils/utils/client";
import {searchPostsQuery} from "@/utils/utils/queries";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // res.status(200).json({ name: 'Response Success' })
    if (req.method === 'GET') {
        const {searchTerm} : any = req.query;
        const videosQuery = searchPostsQuery(searchTerm)

        const videos = await client.fetch(videosQuery)

        res.status(200).json(videos)
    }
}
