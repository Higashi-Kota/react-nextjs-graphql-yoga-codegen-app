import {print} from 'graphql';
import useSWR, {SWRResponse} from 'swr';
import {GetUsersDocument, GetUsersQuery} from '@/graphql/dist/generated-client';
import {useFetch} from '@/hooks/useFetch';

const parsedQuery = print(GetUsersDocument);

const useUsers = () => {
  const {fetcher} = useFetch();
  const {data, error} = useSWR(
    {
      query: parsedQuery,
    },
    fetcher
  ) as SWRResponse<GetUsersQuery, Error | undefined | null>;

  return {
    data,
    error,
  };
};

export default useUsers;
