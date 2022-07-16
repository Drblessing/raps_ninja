import { getSession } from 'next-auth/react';
import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';
import axios from 'axios';
export async function getServerSideProps(context) {
  prisma;
  const session = await getSession(context);

  const redirect = {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
  // Check if the user is authenticated
  if (!session) {
    return redirect;
  }
  let homes;
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { favoriteHomes: true },
    });
  } catch (e) {
    console.log(e);
  }
  homes = user?.favoriteHomes;
  if (homes) {
    return {
      props: { homes: JSON.parse(JSON.stringify(homes)) },
    };
  }

  return {
    props: {
      homes: {},
    },
  };
}

const Favorites = ({ homes = [] }) => {
  return (
    <Layout>
      <h1 className='text-xl font-medium text-gray-800'>Your listings</h1>
      <p className='text-gray-500'>Manage your favorites!</p>
      <div className='mt-8'>
        <Grid homes={homes} />
      </div>
    </Layout>
  );
};

export default Favorites;
