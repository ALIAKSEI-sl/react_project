import { useNavigate, useParams } from 'react-router-dom';

import { usePokemonQuery } from '../../store/pokemon.api';
import { DetailsItem, Loader } from '../index';
import styles from './Details.module.css';

export default function Details() {
  const defaultParams = { page: 1, limit: 20 };

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, status } = usePokemonQuery({
    ...defaultParams,
    searchTerm: id as string,
  });

  const closeDetails = () => {
    navigate('/');
  };

  if (data && !data?.pokemon.length) {
    navigate('/');
  }

  return (
    <div className={styles['container-details']}>
      <p className={styles['header-details']}>details</p>
      {status === 'pending' ? (
        <Loader />
      ) : (
        <>
          <button
            type="button"
            onClick={closeDetails}
            className={styles['details-close']}
          >
            X
          </button>
          {data && <DetailsItem item={data?.pokemon[0]} />}
        </>
      )}
    </div>
  );
}
