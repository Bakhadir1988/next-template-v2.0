import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';

import { HomePage } from '@/widgets/home-page';

const getHomeData = async () => {
  const response = await fetch('https://litra-adm.workup.spb.ru/api/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['homePage'],
    queryFn: getHomeData,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
