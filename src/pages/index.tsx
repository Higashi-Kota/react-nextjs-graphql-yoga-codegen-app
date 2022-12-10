/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import Link from 'next/link';
import {NextPage} from 'next';
import {Box} from '@mui/joy';

const HomePage: NextPage = () => {
  return (
    <Box
      component={'section'}
      css={css`
        max-width: 20rem;
        width: 100%;
        margin: 0 auto;
      `}
    >
      <Box>
        <Link href={'/users'}>
          <a className="hover:underline">Go to users</a>
        </Link>
      </Box>
      <Box>
        <Link href={'/teams'}>
          <a className="hover:underline">Go to teams</a>
        </Link>
      </Box>
    </Box>
  );
};
export default HomePage;
