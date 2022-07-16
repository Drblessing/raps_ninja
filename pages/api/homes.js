import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }
  // POST requests only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `HTTP method ${req.method} is not allowed` });
    return;
  }

  // Create new home
  try {
    const { image, title, description, price, guests, beds, baths } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    const home = await prisma.home.create({
      data: {
        image,
        title,
        description,
        price,
        guests,
        beds,
        baths,
        ownerId: user.id,
      },
    });
    res.status(200).json(home);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
}