import { getSession } from 'next-auth/react';
import { prisma } from '@/lib/prisma';

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  // Retrieve home ID from request
  const { id } = req.query;

  // Add home to favorite
  if (req.method === 'PUT') {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { favoriteHomes: true },
      });
      console.log(user.favoriteHomes);
      const favorite = await prisma.user.update({
        where: { id: user.id },
        data: {
          favoriteHomes: {
            set: [
              ...user.favoriteHomes.map((home) => {
                return { id: home.id };
              }),
              { id },
            ],
          },
        },
      });
      res.status(200).json(favorite);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // Remove home from favorite
  else if (req.method === 'DELETE') {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { favoriteHomes: true },
      });
      // remove home from favorite
      // console.log(user);

      user.favoriteHomes = user.favoriteHomes
        .filter((home) => home.id !== id)
        .map((home) => {
          return { id: home.id };
        });
      const favorite = await prisma.user.update({
        where: { id: user.id },
        data: {
          favoriteHomes: { set: user.favoriteHomes },
        },
      });
      res.status(200).json(favorite);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
