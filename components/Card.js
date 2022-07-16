import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { HeartIcon } from '@heroicons/react/solid';

const Card = ({
  id = '',
  image = "Had a phone in jail, that's a cell phone.",
  title = 'Lil Wayne',
  guests = 0,
  beds = 0,
  baths = 0,
  price = 0,
  favorite = false,
  description = '',
  onClickFavorite = () => null,
}) => (
  <a className='block w-full'>
    <div className='relative'>
      <div className='bg-gray-200 rounded-lg shadow overflow-hidden aspect-w-16 aspect-h-2'>
        <h1 className='text-xl font-medium text-gray-800'>{description}</h1>
      </div>
      {/* <button
          type='button'
          onClick={(e) => {
            e.preventDefault();
            if (typeof onClickFavorite === 'function') {
              onClickFavorite(id, favorite);
            }
          }}
          className='absolute top-2 right-2'
        >
          <HeartIcon
            className={`w-7 h-7 drop-shadow-lg transition ${
              favorite ? 'text-red-500' : 'text-white'
            }`}
          />
        </button> */}
    </div>
    <div className='mt-2 w-full text-gray-500 leading-tight'>{title ?? ''}</div>
  </a>
);

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  guests: PropTypes.number,
  beds: PropTypes.number,
  baths: PropTypes.number,
  price: PropTypes.number,
  favorite: PropTypes.bool,
  onClickFavorite: PropTypes.func,
};

export default Card;
