import Layout from '@/components/Layout';
import Grid from '@/components/Grid';
import { prisma } from '@/lib/prisma';
import superjson from 'superjson';

// import homes from 'data.json';
export async function getServerSideProps() {
  const homes = await prisma.home.findMany();
  return {
    props: {
      homes_string: superjson.stringify(homes),
    },
  };
}

export default function Home({ homes_string = [] }) {
  const homes = superjson.parse(homes_string);

  return (
    <Layout>
      <h1 className='text-xl font-medium text-gray-800'>
        Favorite rap lines from the community
      </h1>
      <p className='text-gray-500'>Explore some modern poetry and wordplay</p>
      <div className='mt-8'>
        <Grid homes={homes} />
      </div>
    </Layout>
  );
}
