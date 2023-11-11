import { ChangeEvent, useContext, useEffect } from 'react';

import { SearchTermContext } from '../contexts/contexts';
import useQueryParams from '../hooks/useQueryParams';

export default function Search() {
  const defaultParam = { page: '1', details: 'false' };
  const context = useContext(SearchTermContext);

  const [params, setSearchParams] = useQueryParams();

  useEffect(() => {
    if (params.search) {
      context.setSearchTerm(params.search);
    }
  }, []);

  const handleSearchClick = () => {
    setSearchParams({
      ...params,
      ...defaultParam,
      search: context.searchTerm,
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    context?.setSearchTerm(event.target.value);
  };

  return (
    <div className="searchBlock">
      <input
        className="searchInput"
        value={context.searchTerm}
        onChange={handleSearchChange}
      />
      <button
        type="button"
        className="searchButton"
        onClick={handleSearchClick}
      >
        поиск
      </button>
    </div>
  );
}
