/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {print} from 'graphql';
import useSWR, {SWRResponse} from 'swr';
import {GetUsersQuery, GetUsersDocument} from '@/graphql/dist/generated-client';
import {useFetch} from '@/hooks/useFetch';
import {Box, Divider, Typography} from '@mui/joy';
import Link from 'next/link';
import {Spacer} from '@chakra-ui/react';
import {FallbackError} from '@/components/fallback/FallbackError';
import {FallbackLoading} from '@/components/fallback/FallbackLoading';
import {FallbackDataEmpty} from '@/components/fallback/FallbackDataEmpty';

const parsedQuery = print(GetUsersDocument);

const UsersPage = () => {
  const {fetcher} = useFetch();
  const {data, error} = useSWR(
    {
      query: parsedQuery,
    },
    fetcher
  ) as SWRResponse<GetUsersQuery, Error | undefined | null>;

  const renderContent = (
    data: GetUsersQuery | undefined,
    error: Error | undefined | null
  ) => {
    if (error) {
      return <FallbackError />;
    }

    if (!data) {
      return <FallbackLoading />;
    }

    if (data.users.length === 0) {
      return <FallbackDataEmpty />;
    }

    return (
      <>
        {data.users.map((user, index) => {
          return (
            <Link key={index} href={`/users/${user.id}`} passHref>
              <Box className={`text-lg hover:underline hover:cursor-pointer`}>
                {`#${user.id}>>>`}
                <Box component={'span'}>{user.name}</Box>
              </Box>
            </Link>
          );
        })}
        <Box
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-end;
          `}
        >
          <Link href={'/'}>
            <a className="hover:underline">Back to home</a>
          </Link>
        </Box>
      </>
    );
  };

  return (
    <Box
      component={'section'}
      css={css`
        max-width: 20rem;
        width: 100%;
        margin: 0 auto;
      `}
    >
      <Typography component={'h2'} className={'!text-2xl'}>
        Users
      </Typography>
      <Spacer height={`0.5rem`} />
      <Divider />
      <Spacer height={`0.5rem`} />
      {renderContent(data, error)}
    </Box>
  );
};

export default UsersPage;
