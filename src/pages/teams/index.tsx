/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {GetUsersAndTeamsQuery, Team} from '@/graphql/dist/generated-client';

import {tidy, count} from '@tidyjs/tidy';
import {Box, Typography} from '@mui/joy';
import {Divider, Spacer} from '@chakra-ui/react';
import {FallbackError} from '@/components/fallback/FallbackError';
import {FallbackLoading} from '@/components/fallback/FallbackLoading';
import {FallbackDataEmpty} from '@/components/fallback/FallbackDataEmpty';
import Link from 'next/link';
import AddUser from '@/components/AddUser';
import useTeam from '@/hooks/useTeam';

const TeamsPage = () => {
  const {data, error} = useTeam();

  const renderContent = (
    data: GetUsersAndTeamsQuery | undefined,
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

    if (data.teams.length === 0) {
      return <FallbackDataEmpty />;
    }
    const {users, teams} = data;

    const groupedByTeam = tidy(users, count('teamName'));

    const renderMemberCount = (team: Team) => {
      return (
        <Box component={'span'}>
          {`${
            groupedByTeam.find((item) => {
              return item.teamName === team.name;
            })?.n
          } members`}
        </Box>
      );
    };

    return (
      <>
        {teams.map((team, index) => (
          <Box key={index} className={`text-2xl`}>
            {`#${team.id}>>>`}
            <Box component={'span'}>{`${team.name}>>>`}</Box>
            {renderMemberCount(team)}
          </Box>
        ))}
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
        Teams
      </Typography>
      <Spacer height={`0.5rem`} />
      <Divider />
      <Spacer height={`0.5rem`} />
      {renderContent(data, error)}
      <Spacer height={`0.5rem`} />
      <Divider />
      <AddUser />
    </Box>
  );
};

export default TeamsPage;
