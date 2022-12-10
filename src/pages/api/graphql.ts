import {createYoga, createSchema} from 'graphql-yoga';
import {readFileSync} from 'fs';
import {join} from 'path';
import {Resolvers} from '@/graphql/dist/generated-server';

const path = join(process.cwd(), 'src', 'graphql', 'schema.graphql');
const typeDefs = readFileSync(path).toString('utf-8');

type Team = 'Red' | 'White';

const teams: {id: string; name: Team}[] = [
  {id: '1', name: 'Red'},
  {id: '2', name: 'White'},
];

type User = {id: string; name: string; teamName: Team};

const users: User[] = [
  {id: '1', name: 'Alice', teamName: 'Red'},
  {id: '2', name: 'Bob', teamName: 'Red'},
  {id: '3', name: 'Carol', teamName: 'White'},
];

const addUser = (newUserName: string): User | null => {
  if (!newUserName) return null;
  const user = users.find(({name}) => name === newUserName);
  if (user) return null;
  const id = users.length + 1;
  const newUser: User = {
    id: String(id),
    name: newUserName,
    teamName: 'White',
  };
  users.push(newUser);
  return newUser;
};

const resolvers: Resolvers = {
  Query: {
    users: () => users,
    teams: () => teams,
    user: (_, {name: specifiedName}) => {
      const user = users.find(({name}) => name === specifiedName);
      return user || null;
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
