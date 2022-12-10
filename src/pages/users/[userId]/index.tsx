/** @jsxImportSource @emotion/react */
import FocusedUser from '@/components/FocusedUser';
import useUser from '@/hooks/useUser';
import {Divider} from '@chakra-ui/react';
import {css} from '@emotion/react';
import {Box, Typography} from '@mui/joy';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {FallbackError} from '@/components/fallback/FallbackError';
import {FallbackLoading} from '@/components/fallback/FallbackLoading';
import {GetUserByIdQuery} from '@/graphql/dist/generated-client';

const UserPage = () => {
  const router = useRouter();
  const {userId} = router.query;

  const {data, error} = useUser({userId: userId as string});

  const renderContent = (
    data: GetUserByIdQuery | undefined,
    error: Error | undefined | null
  ) => {
    if (error) {
      return <FallbackError />;
    }

    if (!data) {
      return <FallbackLoading />;
    }

    const {userById} = data;

    if (!userById) {
      return <FallbackLoading />;
    }

    return (
      <>
        <FocusedUser specifiedName={userById.name} />
        <Divider />
        <Box
          css={css`
            display: flex;
            align-items: center;
            justify-content: flex-end;
          `}
        >
          <Link href={'/users'}>
            <a className="hover:underline">Back to users</a>
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
        Focused User
      </Typography>
      {renderContent(data, error)}
    </Box>
  );
};

export default UserPage;
