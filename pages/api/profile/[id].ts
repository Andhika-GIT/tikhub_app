// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utils/client';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // get id from query
    const { id } = req.query;

    const query = singleUserQuery(id); // get user
    const userVideosQuery = userCreatedPostsQuery(id); // get videos that posted by user
    const userLikedVideosQuery = userLikedPostsQuery(id); // get all posts that liked by user

    const user = await client.fetch(query);
    const userVideos = await client.fetch(userVideosQuery);
    const userLikedVideos = await client.fetch(userLikedVideosQuery);

    res.status(200).json({
      user: user[0],
      userVideos,
      userLikedVideos,
    });
  }
}
