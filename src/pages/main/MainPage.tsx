import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Search } from '../../components/index';
import ListResults from '../../components/ListResults/ListResults';
import { searchParamsSelect } from '../../store';
import { searchActions } from '../../store/search.slice';
import styles from './MainPage.module.css';

export default function MainPage() {
  const dispatch = useDispatch();
  const { setParams } = searchActions;

  const searchParams = useSelector(searchParamsSelect);
  const [queryParams, setQueryParams] = useSearchParams();

  useEffect(() => {
    if (queryParams.size) {
      const params = {
        page: Number(queryParams.get('page')),
        limit: Number(queryParams.get('limit')),
        searchTerm: queryParams.get('searchTerm') as string,
      };
      const action = setParams(params);
      dispatch(action);
    }
  }, []);

  useEffect(() => {
    const { page, limit, searchTerm } = searchParams;
    setQueryParams({ page: String(page), limit: String(limit), searchTerm });
  }, [searchParams]);

  return (
    <>
      <Search />
      <hr />
      <div className={styles.layout}>
        <ListResults />
        <Outlet />
      </div>
    </>
  );
}
