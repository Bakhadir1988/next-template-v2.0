import { cookies } from 'next/headers';

import { ProductType } from '@/entities/product';
import { FavoritesProvider } from '@/features/product/favorites-provider';
import { getFavorites } from '@/shared/api/favorite-api';

import { ClientFavoritesPage } from './client-favorites-page';

export const ServerFavoritesPage = async () => {
  const cookieStore = await cookies();
  const sid = cookieStore.get('session_id')?.value || '';

  let initialData: ProductType[] = [];

  if (sid) {
    try {
      const data = await getFavorites(sid);
      if (data && typeof data !== 'string' && data.items) {
        initialData = data.items.map((item) => ({
          ...(item as ProductType),
          imgs: (item as ProductType).imgs || [],
        }));
      }
    } catch (error) {
      console.error('Ошибка загрузки избранного:', error);
    }
  }

  return (
    <FavoritesProvider initialData={initialData}>
      <ClientFavoritesPage />
    </FavoritesProvider>
  );
};
