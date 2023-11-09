import { SetURLSearchParams, useSearchParams } from 'react-router-dom';

import { IParams } from '../models/params.interface';

export default function useQueryParams(): [IParams, SetURLSearchParams] {
  const [searchParams, setSearchParams] = useSearchParams();

  const params: IParams = Object.fromEntries(searchParams.entries());

  return [params, setSearchParams];
}
