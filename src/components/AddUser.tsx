import {useFetch} from '@/hooks/useFetch';
import {print} from 'graphql';
import {useState} from 'react';
import useSWR, {SWRResponse} from 'swr';
import {
  AddUserDocument,
  AddUserMutation,
  AddUserMutationVariables,
} from '@/graphql/dist/generated-client';
import {useForm} from 'react-hook-form';
import {Box, Button, TextField, Typography} from '@mui/joy';
import {Spacer} from '@chakra-ui/react';
import useTeam from '@/hooks/useTeam';

const parsedQuery = print(AddUserDocument);

const AddUser = () => {
  const {fetcher} = useFetch();
  const {mutate} = useTeam();

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = (data: any) => {
    setVariables(data);
  };

  const [variables, setVariables] = useState<AddUserMutationVariables>({
    name: '',
  });

  // https://swr.vercel.app/ja/docs/conditional-fetching
  const {data, error} = useSWR(
    variables.name
      ? {
          query: parsedQuery,
          variables,
        }
      : null,
    fetcher,
    {
      onSuccess(data, key, config) {
        console.log(`onSuccess`, data);
        reset();
        mutate();
      },
      onError(err, key, config) {
        console.log(`onError`, err);
      },
    }
  ) as SWRResponse<AddUserMutation, Error | undefined | null>;

  return (
    <Box>
      <Typography component={'h2'} className={'!text-2xl'}>
        Add User
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('name', {required: true})} />
        <Spacer height={`0.5rem`} />
        <Button variant="solid" type="submit">
          Add
        </Button>
        <Spacer height={`0.5rem`} />
      </form>
    </Box>
  );
};

export default AddUser;
