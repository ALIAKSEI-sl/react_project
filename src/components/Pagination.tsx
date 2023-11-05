import { ChangeEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type PaginationProps = {
  count: number;
};

export default function Pagination(props: PaginationProps) {
  const limits = ['10', '15', '20', '25', '30'];
  const defParams = { page: '1', limit: '20', details: 'false' };

  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());

  const { count } = props;

  useEffect(() => {
    if (!params.page || !params.limit) {
      setSearchParams({ ...params, ...defParams });
    }
  }, []);

  const nextPage = () => {
    const page = Number(params.page);
    const limit = Number(params.limit);
    const maxPage = Math.ceil(count / limit);

    if (page < maxPage) {
      const next = String(page + 1);
      setSearchParams({ ...params, page: next, details: defParams.details });
    }
  };

  const previousPage = () => {
    const page = Number(params.page);
    if (page > 1) {
      const prev = String(page - 1);
      setSearchParams({ ...params, page: prev, details: defParams.details });
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSearchParams({ ...params, limit: value, details: defParams.details });
  };

  return (
    <div className="pagination">
      <button type="button" onClick={previousPage} className="page-button">
        &lt;
      </button>
      <p className="page">{params.page}</p>
      <select
        value={params.limit}
        className="select-page"
        onChange={handleSelectChange}
      >
        {limits.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      <button type="button" className="page-button" onClick={nextPage}>
        &gt;
      </button>
    </div>
  );
}
