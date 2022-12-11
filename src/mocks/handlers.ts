import {graphql} from 'msw';
export const handlers = [
  graphql.query('getUsers', (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {id: '1', name: 'Spike', teamName: 'Bebop'},
          {id: '2', name: 'Fei', teamName: 'Bebop'},
          {id: '3', name: 'Dacchi', teamName: 'Bebop'},
          {id: '4', name: 'Ed', teamName: 'Bebop'},
        ],
      })
    );
  }),
];
