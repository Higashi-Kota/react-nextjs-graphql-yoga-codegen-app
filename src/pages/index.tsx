import {print} from 'graphql';
import {gql} from 'graphql-request';
import useSWR, {SWRResponse} from 'swr';
import {
  GetUsersQuery,
  GetUsersDocument,
  GetUsersAndTeamsDocument,
  GetUsersAndTeamsQuery,
} from '@/graphql/dist/generated-client';
import {useFetch} from '@/hooks/useFetch';
import {Divider, Spacer} from '@chakra-ui/react';
import FocusedUser from '@/components/FocusedUser';
import AddUser from '@/components/AddUser';

const rawQuery = gql`
  {
    users {
      name
    }
  }
`;

const parsedQuery = print(GetUsersAndTeamsDocument);

export default function Index() {
  const {fetcher} = useFetch();
  // const {data: dataUsers, error: errorUsers} = useSWR(
  //   parsedQuery,
  //   fetcher
  // ) as SWRResponse<GetUsersQuery, Error | undefined | null>;

  // if (errorUsers) return <div>Failed to load</div>;
  // if (!dataUsers) return <div>Loading...</div>;

  const {
    data: dataUsersAndTeams,
    error: errorUsersAndTeams,
    mutate: mutateUsersAndTeams,
  } = useSWR(
    {
      query: parsedQuery,
      variables: {},
    },
    fetcher
  ) as SWRResponse<GetUsersAndTeamsQuery, Error | undefined | null>;

  if (errorUsersAndTeams) return <div>Failed to load</div>;
  if (!dataUsersAndTeams) return <div>Loading...</div>;

  const {users, teams} = dataUsersAndTeams;

  // console.log(users, teams);

  return (
    <div>
      {users.map((user, index) => (
        <div key={index} className={`text-2xl`}>
          {`#${user.id}>>>`}
          <span>{user.name}</span>
        </div>
      ))}
      <Spacer height={`1rem`} />
      <Divider />
      <Spacer height={`1rem`} />
      <FocusedUser specifiedName="Alice" />
      <Divider />
      <FocusedUser specifiedName="Bob" />
      <Divider />
      <FocusedUser specifiedName="Carol" />
      <AddUser mutateUsersAndTeams={mutateUsersAndTeams} />
    </div>
  );
}
