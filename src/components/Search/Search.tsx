import { ChangeEvent, useState } from "react";

import { useAppDispatch } from "@/store/hooks";
import { searchActions } from "@/store/search.slice";

import styles from "./Search.module.css";

export default function Search() {
  const defaultPage = 1;

  const dispatch = useAppDispatch();
  const { setParams } = searchActions;

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    const action = setParams({ searchTerm, page: defaultPage });
    dispatch(action);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={styles.searchBlock}>
      <input
        className={styles.searchInput}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleSearchClick}
      >
        поиск
      </button>
    </div>
  );
}
