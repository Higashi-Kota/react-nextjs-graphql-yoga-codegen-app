const useFetch = () => {
  const fetcher = async ({
    query,
    variables = {},
  }: {
    query: string;
    variables: any;
  }) => {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({query, variables}),
    });
    const {data} = await res.json();
    return data;
  };
  return {
    fetcher,
  };
};

export {useFetch};
