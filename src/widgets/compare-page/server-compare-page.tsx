import { cookies } from 'next/headers';

import { ProductType } from '@/entities/product';
import { CompareProvider } from '@/features/product/product-list-provider';
import { compareApi } from '@/shared/api/list-api';

import { ClientComparePage } from './client-compare-page';

export const ServerComparePage = async () => {
  const cookieStore = await cookies();
  const sid = cookieStore.get('session_id')?.value || '';

  let initialData: ProductType[] = [];

  if (sid) {
    try {
      const data = await compareApi.get(sid);
      if (data && typeof data !== 'string' && data.items) {
        initialData = data.items.map((item) => ({
          ...(item as ProductType),
          imgs: (item as ProductType).imgs || [],
        }));
      }
    } catch (error) {
      console.error('Ошибка загрузки сравнения:', error);
    }
  }

  return (
    <CompareProvider initialData={initialData}>
      <ClientComparePage />
    </CompareProvider>
  );
};
