import { ChangeEvent, useEffect, useState } from 'react';

import useQueryParams from '../hooks/useQueryParams';

export default function Search() {
  const defaultParam = { page: '1' };
  const [searchTerm, setSearchTerm] = useState('');
  const [params, setSearchParams] = useQueryParams();

  useEffect(() => {
    if (params.search) {
      setSearchTerm(params.search);
    }
    setSearchParams({ page: '1' });
  }, []);

  const handleSearchClick = () => {
    setSearchParams({
      ...params,
      ...defaultParam,
      search: searchTerm,
    });
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="searchBlock">
      <input
        className="searchInput"
        value={searchTerm}
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
