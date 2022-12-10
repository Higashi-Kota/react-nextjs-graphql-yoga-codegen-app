/** @jsxImportSource @emotion/react */
import FocusedUser from '@/components/FocusedUser';
import {Divider} from '@chakra-ui/react';
import {css} from '@emotion/react';
import {Box, Typography} from '@mui/joy';
import Link from 'next/link';
import {useRouter} from 'next/router';

const UserPage = () => {
  const router = useRouter();
  const {userId} = router.query;
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
      <FocusedUser specifiedName="Alice" />
      <Divider />
      <FocusedUser specifiedName="Bob" />
      <Divider />
      <FocusedUser specifiedName="Carol" />
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
    </Box>
  );
};

export default UserPage;
