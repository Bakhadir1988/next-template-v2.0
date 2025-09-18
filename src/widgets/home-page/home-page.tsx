'use client';

import { useQuery } from '@tanstack/react-query';

const getHomeData = async () => {
  const response = await fetch('https://litra-adm.workup.spb.ru/api/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const HomePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['homePage'],
    queryFn: getHomeData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
