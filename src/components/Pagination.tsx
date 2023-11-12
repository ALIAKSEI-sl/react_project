import { ChangeEvent, useContext } from 'react';

import { PokemonContext } from '../contexts/contexts';
import useQueryParams from '../hooks/useQueryParams';

export default function Pagination() {
  const limits = ['10', '15', '20', '25', '30'];
  const defParams = { page: '1', details: 'false' };
  const context = useContext(PokemonContext);

  const [params, setSearchParams] = useQueryParams();

  const nextPage = () => {
    const page = Number(params.page);
    const limit = Number(params.limit);
    const maxPage = Math.ceil(context.countPokemon / limit);

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
    setSearchParams({
      ...params,
      limit: value,
      page: defParams.page,
      details: defParams.details,
    });
  };

  return (
    <div className="pagination">
      <button
        type="button"
        onClick={previousPage}
        className="page-button"
        data-testid="previous"
      >
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
      <button
        type="button"
        className="page-button"
        onClick={nextPage}
        data-testid="next"
      >
        &gt;
      </button>
    </div>
  );
}
