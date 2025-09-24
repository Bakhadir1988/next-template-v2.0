import { cookies } from 'next/headers';

import { ProductType } from '@/entities/product';
import { CompareProvider } from '@/features/product/compare-provider';
import { getCompare } from '@/shared/api/compare-api';

import { ClientComparePage } from './client-compare-page';

export const ServerComparePage = async () => {
  const cookieStore = await cookies();
  const sid = cookieStore.get('session_id')?.value || '';

  let initialData: ProductType[] = [];

  if (sid) {
    try {
      const data = await getCompare(sid);
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
