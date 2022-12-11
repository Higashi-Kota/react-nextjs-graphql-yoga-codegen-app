import {graphql, MockedResponse} from 'msw';
import {
  GetUsersQuery,
  User,
  GetUserByIdQueryVariables,
  GetUserByIdQuery,
  AddUserMutationVariables,
  AddUserMutation,
  GetUserQueryVariables,
  GetUserQuery,
  TeamName,
  Team,
  GetUsersAndTeamsQuery,
} from '@/graphql/dist/generated-client';

import {default as chance} from 'chance';

const teams: Team[] = [
  {id: '1', name: TeamName.Red},
  {id: '2', name: TeamName.White},
  {id: '3', name: TeamName.Bebop},
];

const users: User[] = [
  {id: '1', name: 'Spike', teamName: TeamName.Bebop},
  {id: '2', name: 'Fei', teamName: TeamName.Bebop},
  {id: '3', name: 'Dacchi', teamName: TeamName.Bebop},
  {id: '4', name: 'Ed', teamName: TeamName.Bebop},
];

export const handlers = [
  graphql.query('getUsers', (req, res, ctx) => {
    // return res(ctx.status(500, 'Something went wrong...'));
    const response = res(
      ctx.data({
        users,
      })
    ) as MockedResponse<GetUsersQuery>;
    return response;
  }),
  graphql.query('getUsersAndTeams', (req, res, ctx) => {
    const response = res(
      ctx.data({
        users,
        teams,
      })
    ) as MockedResponse<GetUsersAndTeamsQuery>;
    return response;
  }),
  graphql.query('getUserById', (req, res, ctx) => {
    const {id} = req.variables as GetUserByIdQueryVariables;
    const response = res(
      ctx.data({
        userById: users.find((user) => {
          return user.id === id;
        }),
      })
    ) as MockedResponse<GetUserByIdQuery>;
    return response;
  }),
  graphql.query('getUser', (req, res, ctx) => {
    const {name} = req.variables as GetUserQueryVariables;
    const response = res(
      ctx.data({
        user: users.find((user) => {
          return user.name === name;
        }),
      })
    ) as MockedResponse<GetUserQuery>;
    return response;
  }),
  graphql.mutation('addUser', (req, res, ctx) => {
    const {name: newUserName} = req.variables as AddUserMutationVariables;
    if (!newUserName) {
      return res(
        ctx.data({
          addUser: {},
        })
      );
    }
    const alreadyExistsUser = users.find(({name}) => {
      return name === newUserName;
    });
    if (alreadyExistsUser) {
      return res(
        ctx.data({
          addUser: {},
        })
      );
    }
    const id = users.length + 1;
    const newUser: User = {
      id: String(id),
      name: newUserName,
      teamName: chance().integer({min: 0, max: 1})
        ? TeamName.White
        : TeamName.Red,
    };
    users.push(newUser);
    const response = res(
      ctx.data({
        addUser: {
          id: String(id),
        },
      })
    ) as MockedResponse<AddUserMutation>;
    return response;
  }),
];
