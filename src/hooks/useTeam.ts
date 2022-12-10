import {gql} from 'graphql-request';
import useSWR, {SWRResponse} from 'swr';
import {useFetch} from '@/hooks/useFetch';
import {print} from 'graphql';
import {
  GetUsersAndTeamsDocument,
  GetUsersAndTeamsQuery,
} from '@/graphql/dist/generated-client';

const parsedQuery = print(GetUsersAndTeamsDocument);

const rawQuery = gql`
  query getUsersAndTeams {
    users {
      id
      name
      teamName
    }
    teams {
      id
      name
    }
  }
`;

const useTeam = () => {
  const {fetcher} = useFetch();
  const {data, error, mutate} = useSWR(
    {
      query: rawQuery,
    },
    fetcher
  ) as SWRResponse<GetUsersAndTeamsQuery, Error | undefined | null>;

  return {
    data,
    error,
    mutate,
  };
};

export default useTeam;
