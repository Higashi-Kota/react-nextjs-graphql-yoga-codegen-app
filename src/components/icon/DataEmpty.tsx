/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

const DataEmpty = ({
  width = 100,
  height = 100,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      css={css`
        shape-rendering: geometricprecision;
      `}
      width={`${width}px`}
      height={`${height}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="4.317"
        y="21.53"
        width="5.408"
        height="26.544"
        css={css`
          stroke: #000000;
          stroke-width: 0px;
        `}
        transform="matrix(0.83924, -0.543761, 0.543761, 0.83924, 43.416454, 46.644073)"
      ></rect>
      <ellipse
        css={css`
          fill: transparent;
          stroke: #000000;
          stroke-width: 4px;
        `}
        cx="48.993"
        cy="43.732"
        rx="21.182"
        ry="20.908"
      ></ellipse>
      <rect
        x="4.194"
        y="22.865"
        width="5.253"
        height="28.193"
        css={css`
          stroke: #000000;
          paint-order: fill;
          stroke-opacity: 0;
          fill: #919191;
        `}
        transform="matrix(0.719831, -0.69415, 0.69415, 0.719831, 18.813559, 22.703215)"
      ></rect>
      <rect
        x="4.194"
        y="22.865"
        width="5.253"
        height="28.193"
        css={css`
          stroke: #000000;
          paint-order: stroke;
          stroke-opacity: 0;
          fill: #919191;
        `}
        transform="matrix(-0.719543, -0.694447, 0.694447, -0.719543, 28.205362, 75.815811)"
      ></rect>
    </svg>
  );
};

export default DataEmpty;
