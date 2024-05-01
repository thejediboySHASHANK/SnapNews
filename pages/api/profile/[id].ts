// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery} from "@/utils/utils/queries";
import {client} from "@/utils/utils/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // res.status(200).json({ name: 'Response Success' })
    if (req.method === 'GET') {
        const {id } : any = req.query

        const query = singleUserQuery(id)
        const userVideosQuery = userCreatedPostsQuery(id)
        const userLikedVideosQuery = userLikedPostsQuery(id)

        const user = await client.fetch(query)
        const userVideos = await client.fetch(userVideosQuery)
        const userLikedVideos = await client.fetch(userLikedVideosQuery)

        res.status(200).json({
            user: user[0],
            userVideos,
            userLikedVideos
        })
    }
}
