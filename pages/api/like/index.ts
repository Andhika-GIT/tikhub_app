// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    // using sanity client to patch or update post
    const data = like
      ? // if like value that coming from request client is true
        await client
          // insert like into likes array field in post document
          .patch(postId)
          .setIfMissing({ likes: [] })
          .insert('after', 'likes[-1]', [
            {
              _key: uuid(),
              _ref: userId,
            },
          ])
          .commit()
      : await client
          //   if the like value that coming from request client is false
          .patch(postId)
          //   remove the like from likes array in post document based on the user id
          .unset([`likes[_ref=="${userId}"]`])
          .commit();

    res.status(200).json(data);
  }
}
