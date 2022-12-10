import {memo} from 'react';
import {print} from 'graphql';
import useSWR, {SWRResponse} from 'swr';
import {GetUserDocument, GetUserQuery} from '@/graphql/dist/generated-client';

import {useFetch} from '@/hooks/useFetch';

const parsedQuery = print(GetUserDocument);

const FocusedUser = ({specifiedName}: {specifiedName: string}) => {
  const {fetcher} = useFetch();

  const {data, error} = useSWR(
    {
      query: parsedQuery,
      variables: {name: specifiedName},
    },
    fetcher
  ) as SWRResponse<GetUserQuery, Error | undefined | null>;

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;

  const {user} = data;

  if (!user) {
    return <div>user not found.</div>;
  }

  const {id, name, teamName} = user;

  return (
    <div>
      <span>id: {id}</span>
      <br />
      <span>name: {name}</span>
      <br />
      <span>team {teamName}</span>
    </div>
  );
};

export default memo(FocusedUser);
