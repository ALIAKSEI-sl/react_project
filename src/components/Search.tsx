import { ChangeEvent, useEffect, useState } from 'react';

type SearchProps = {
  searchByTerm: (searchTerm: string) => void;
};

export default function Search(props: SearchProps) {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('pokemon-searchTerm') ?? ''
  );

  const { searchByTerm } = props;

  useEffect(() => {
    searchByTerm(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchClick = () => {
    searchByTerm(searchTerm);
    localStorage.setItem('pokemon-searchTerm', searchTerm);
  };

  return (
    <div className="searchBlock">
      <input
        className="searchInput"
        value={searchTerm}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(event.target.value)
        }
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
