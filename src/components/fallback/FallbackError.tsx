/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {Box, Typography} from '@mui/joy';

import Warning from '@/components/icon/Warning';

const FallbackError = ({
  status = 500,
  iconSize = 150,
  message = `Something went wrong...`,
}: {
  status?: number;
  iconSize?: number;
  message?: string;
}) => {
  return (
    <Box
      css={css`
        width: 100%;
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      `}
    >
      <Warning width={iconSize} height={iconSize} />
      <Typography
        component={'strong'}
        css={css`
          font-weight: 700;
          font-size: 1.25rem; /* 20px */
          line-height: 1.75rem; /* 28px */
          color: #6b7280; // https://tailwindcss.com/docs/customizing-colors
        `}
      >
        {status}
      </Typography>
      <Typography
        css={css`
          font-weight: 700;
          font-size: 1.125rem; /* 18px */
          line-height: 1.75rem; /* 28px */
          color: #6b7280; // https://tailwindcss.com/docs/customizing-colors
        `}
      >
        {message}
      </Typography>
    </Box>
  );
};

export {FallbackError};
