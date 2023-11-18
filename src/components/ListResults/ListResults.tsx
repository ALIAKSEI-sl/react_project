import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { searchParamsSelect } from '../../store';
import { usePokemonQuery } from '../../store/pokemon.api';
import { ItemResults, Loader, Pagination } from '../index';
import styles from './ListResults.module.css';

export default function ListResults() {
  const navigate = useNavigate();

  const searchParams = useSelector(searchParamsSelect);
  const { data, status } = usePokemonQuery(searchParams);

  const handleItemClick = () => {
    navigate('/');
  };

  if (data && !data?.pokemon.length) {
    return <p>Ничего не найдено</p>;
  }

  return status === 'pending' ? (
    <Loader />
  ) : (
    <div
      className={styles['container-results']}
      onClick={handleItemClick}
      data-testid="results"
    >
      <Pagination count={data?.count ?? 0} />
      <ul className={styles['block-results']}>
        {data?.pokemon.map((item) => <ItemResults item={item} key={item.id} />)}
      </ul>
    </div>
  );
}
