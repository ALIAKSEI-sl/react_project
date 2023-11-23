"use client";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { searchActions } from "../../store/search.slice";
import styles from "./Search.module.css";

export default function Search() {
  const defaultPage = 1;

  // const { id } = useParams();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setParams } = searchActions;

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    const action = setParams({ searchTerm, page: defaultPage });
    dispatch(action);
    // if (id) {
    //   navigate('/');
    // }
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
