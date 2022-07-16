// import test from '../lib/test';
// import { prisma } from '../db/prisma';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function getServerSideProps() {
  const homes = await prisma.home.findMany();

  const joke = await fetch('https://v2.jokeapi.dev/joke/any');
  const jokeJson = await joke.json();

  return {
    props: {
      homes: JSON.parse(JSON.stringify(homes)),
      joke: await jokeJson,
    },
  };
}

const Homes = ({ homes = [], joke = null }) => {
  console.log('why double?');
  return (
    <>
      <h1>Your listings</h1>
      <p>Manage your homes and update your listings</p>
      <div className='mt-8'>
        <h1>okay</h1>
        {homes.map((home) => {
          return <div key={home.id}>{home.title}</div>;
        })}
        <h1>{`${joke.setup} ${joke.delivery}`}</h1>
        <h1>{`${joke.joke}`}</h1>
      </div>
    </>
  );
};

export default Homes;
