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
import {Button, TextField} from '@mui/joy';
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
    console.log(data);
    setVariables(data);
  };

  const [variables, setVariables] = useState<AddUserMutationVariables>({
    name: '',
  });

  const {data, error} = useSWR(
    {
      query: parsedQuery,
      variables,
    },
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

  // console.log(errors);

  if (error) return <p>Error</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl">Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register('name', {required: true})} />
        <Spacer height={`0.5rem`} />
        <Button variant="solid" type="submit">
          Add
        </Button>
        <Spacer height={`0.5rem`} />
      </form>
    </div>
  );
};

export default AddUser;
