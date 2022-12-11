import {createYoga, createSchema} from 'graphql-yoga';
import {readFileSync} from 'fs';
import {join} from 'path';
import {Resolvers, TeamName} from '@/graphql/dist/generated-server';
import {default as chance} from 'chance';

const path = join(process.cwd(), 'src', 'graphql', 'schema.graphql');
const typeDefs = readFileSync(path).toString('utf-8');

const teams: {id: string; name: TeamName}[] = [
  {id: '1', name: TeamName.Red},
  {id: '2', name: TeamName.White},
  {id: '3', name: TeamName.Bebop},
];

type User = {id: string; name: string; teamName: TeamName};

const users: User[] = [
  {id: '1', name: 'Spike', teamName: TeamName.Bebop},
  {id: '2', name: 'Fei', teamName: TeamName.Bebop},
  {id: '3', name: 'Dacchi', teamName: TeamName.Bebop},
  {id: '4', name: 'Ed', teamName: TeamName.Bebop},
];

const addUser = (newUserName: string): User | null => {
  if (!newUserName) return null;
  const user = users.find(({name}) => name === newUserName);
  if (user) return null;
  const id = users.length + 1;
  const newUser: User = {
    id: String(id),
    name: newUserName,
    teamName: chance().integer({min: 0, max: 1})
      ? TeamName.White
      : TeamName.Red,
  };
  users.push(newUser);
  return newUser;
};

const resolvers: Resolvers = {
  Query: {
    users: () => users,
    teams: () => teams,
    user: (_, {name}: Partial<User>) => {
      const matchedUser = users.find((user) => {
        return user.name === name;
      });
      return matchedUser || null;
    },
    userById: (_, {id}: {id: string}) => {
      const matchedUser = users.find((user) => {
        return user.id === id;
      });
      return matchedUser || null;
    },
  },
  Mutation: {
    addUser: (_, {name}) => addUser(name),
  },
};
const schema = createSchema({
  typeDefs,
  resolvers,
});
export default createYoga({
  schema,
  // Needed to be defined explicitly because our endpoint lives at a different path other than `/graphql`
  graphqlEndpoint: '/api/graphql',
});
