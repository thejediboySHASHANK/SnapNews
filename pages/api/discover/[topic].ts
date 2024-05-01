// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {topicPostsQuery} from "@/utils/utils/queries";
import {client} from "@/utils/utils/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // res.status(200).json({ name: 'Response Success' })
    if (req.method === 'GET') {
        const {topic} : any = req.query
        const videosQuery = topicPostsQuery(topic)

        const videos = await client.fetch(videosQuery)

        res.status(200).json(videos)
    }
}
