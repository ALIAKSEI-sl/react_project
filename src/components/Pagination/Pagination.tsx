import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { searchParamsSelect } from '../../store';
import { searchActions } from '../../store/search.slice';
import styles from './Pagination.module.css';

type PaginationProps = {
  count: number;
};

export default function Pagination(props: PaginationProps) {
  const defaultPage = 1;
  const limits = ['10', '15', '20', '25', '30'];

  const { count } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setParams } = searchActions;
  const { page, limit } = useSelector(searchParamsSelect);

  const nextPage = () => {
    const maxPage = Math.ceil(count / limit);
    if (page < maxPage) {
      const action = setParams({ page: page + 1 });
      dispatch(action);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      const action = setParams({ page: page - 1 });
      dispatch(action);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    const action = setParams({ limit: Number(value), page: defaultPage });
    dispatch(action);
    navigate('/');
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={previousPage}
        className={styles['page-button']}
        data-testid="previous"
      >
        &lt;
      </button>
      <p className={styles.page}>{page}</p>
      <select
        value={String(limit)}
        className={styles['select-page']}
        onChange={handleSelectChange}
        onClick={(event) => event.stopPropagation()}
      >
        {limits.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      <button
        type="button"
        className={styles['page-button']}
        onClick={nextPage}
        data-testid="next"
      >
        &gt;
      </button>
    </div>
  );
}
