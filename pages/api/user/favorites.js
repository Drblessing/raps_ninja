import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }
  // Get the home's onwer
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { favoriteHomes: true },
      });
      res.status(200).json(user);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['GET']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
