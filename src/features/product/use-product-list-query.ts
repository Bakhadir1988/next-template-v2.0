'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product';
import { getSessionId } from '@/shared/api/session-api';

interface ApiResponse {
  items?: ProductType[];
}

type FetchFn = (sid: string) => Promise<ApiResponse | string | null>;

export const useProductListQuery = (
  queryKey: string,
  fetchFn: FetchFn,
  initialData?: ProductType[],
) => {
  const [sid, setSid] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const sessionId = getSessionId();
    setSid(sessionId);
    setIsInitialized(true);
  }, []);

  const { data: products = [], isLoading } = useQuery({
    queryKey: [queryKey, sid],
    queryFn: async () => {
      if (!sid) return [];
      const result = await fetchFn(sid);
      if (result && typeof result !== 'string' && result.items) {
        return result.items.map((item) => ({
          ...(item as ProductType),
          imgs: (item as ProductType).imgs || [],
        }));
      }
      return [];
    },
    enabled: isInitialized && !!sid,
    initialData: initialData,
  });

  const shouldShowLoading =
    (isLoading && !initialData) || (isLoading && products.length === 0);

  return { products, isLoading: shouldShowLoading };
};
