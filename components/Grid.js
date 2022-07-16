import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import Card from '@/components/Card';
import { ExclamationIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';

const Grid = ({ homes = [] }) => {
  const [favorites, setFavorites] = useState([]);
  const { data: session } = useSession();
  
  const isEmpty = homes.length === 0;

  useEffect(() => {
    (async () => {
      if (session?.user) {
        try {
          const resp = await axios.get(`/api/user/favorites`);
          setFavorites(resp?.data?.favoriteHomes.map((home) => home.id));
        } catch (e) {
          console.log(e);
        }
      }
    })();
  }, [session?.user]);

  const toggleFavorite = async (id, favorite) => {
    // Delete home from favorites
    if (favorites.includes(id)) {
      try {
        await axios.delete(`/api/homes/${id}/favorite`);
        setFavorites(favorites.filter((fav) => fav !== id));
      } catch (e) {
        console.log(e);
      }
    }
    // Add home to favorites
    else {
      try {
        await axios.put(`/api/homes/${id}/favorite`);
        setFavorites([...favorites, id]);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return isEmpty ? (
    <p className='text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1'>
      <ExclamationIcon className='shrink-0 w-5 h-5 mt-px' />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) : (
    <div className='grid gap-6'>
      {homes.map((home) => (
        <Card
          key={home.id}
          {...home}
          onClickFavorite={toggleFavorite}
          favorite={favorites.includes(home.id)}
        />
      ))}
    </div>
  );
};

Grid.propTypes = {
  homes: PropTypes.array,
};

export default Grid;
