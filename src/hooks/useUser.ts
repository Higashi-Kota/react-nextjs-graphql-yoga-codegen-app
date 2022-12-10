import {print} from 'graphql';
import useSWR, {SWRResponse} from 'swr';
import {
  GetUserByIdQuery,
  GetUserByIdDocument,
} from '@/graphql/dist/generated-client';
import {useFetch} from '@/hooks/useFetch';

const parsedQuery = print(GetUserByIdDocument);

const useUser = ({userId}: {userId: string}) => {
  const {fetcher} = useFetch();
  const {data, error} = useSWR(
    {
      query: parsedQuery,
      variables: {id: userId},
    },
    fetcher
  ) as SWRResponse<GetUserByIdQuery, Error | undefined | null>;

  return {
    data,
    error,
  };
};

export default useUser;
