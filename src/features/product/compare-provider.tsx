'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import { useQuery } from '@tanstack/react-query';

import { ProductType } from '@/entities/product';
import { getCompare, getSessionId } from '@/shared/api/compare-api';

interface CompareContextType {
  products: ProductType[];
  isLoading: boolean;
}

const CompareContext = createContext<CompareContextType>({
  products: [],
  isLoading: true,
});

export const useCompare = () => {
  return useContext(CompareContext);
};

export const CompareProvider = ({
  children,
  initialData,
}: {
  children: ReactNode;
  initialData?: ProductType[];
}) => {
  const [sid, setSid] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const sessionId = getSessionId();
    setSid(sessionId);
    setIsInitialized(true);
  }, []);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['compare', sid],
    queryFn: async () => {
      if (!sid) return [];
      const comps = await getCompare(sid);
      if (comps && typeof comps !== 'string' && comps.items) {
        return comps.items.map((item) => ({
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

  return (
    <CompareContext.Provider value={{ products, isLoading: shouldShowLoading }}>
      {children}
    </CompareContext.Provider>
  );
};
