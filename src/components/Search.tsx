import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { IParams } from '../models/params.interface';

export default function Search() {
  const defaultParam = { page: '1', details: 'false' };
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const params: IParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    setSearchParams({
      ...params,
      details: defaultParam.details,
    });
    if (params.search) {
      setSearchTerm(params.search);
    }
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
