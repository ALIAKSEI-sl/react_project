import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { searchActions } from "../../store/search.slice";
import styles from "./Pagination.module.css";

type PaginationProps = {
  count: number;
};

export default function Pagination(props: PaginationProps) {
  const { count } = props;

  const defaultPage = 1;
  const limits = ["10", "15", "20", "25", "30"];

  const dispatch = useAppDispatch();
  const { setParams } = searchActions;
  const { limit, page } = useAppSelector((state) => state.search);

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
  };

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={previousPage}
        className={styles["page-button"]}
        data-testid="previous"
      >
        &lt;
      </button>
      <p className={styles.page}>{page}</p>
      <select
        value={String(limit)}
        className={styles["select-page"]}
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
        className={styles["page-button"]}
        onClick={nextPage}
        data-testid="next"
      >
        &gt;
      </button>
    </div>
  );
}
