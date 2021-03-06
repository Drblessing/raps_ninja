import Layout from '@/components/Layout';
import ListingForm from '@/components/ListingForm';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context) {
  // Check if user is authenticated
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Create() {
  function addHome(data) {
    axios.post('/api/homes', data);
  }

  return (
    <Layout>
      <div className='max-w-screen-sm mx-auto'>
        <h1 className='text-xl font-medium text-gray-800'>
          Add your Favorite Raps
        </h1>
        <p className='text-gray-500'>
          Fill out the form below to add some new raps.
        </p>
        <div className='mt-8'>
          <ListingForm
            buttonText='Add Raps'
            redirectPath='/'
            onSubmit={addHome}
          />
        </div>
      </div>
    </Layout>
  );
}
