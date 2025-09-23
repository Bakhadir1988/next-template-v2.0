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
import { getFavorites, getSessionId } from '@/shared/api/favorite-api';

interface FavoritesContextType {
  products: ProductType[];
  isLoading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  products: [],
  isLoading: true,
});

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({
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
    queryKey: ['favorites', sid],
    queryFn: async () => {
      if (!sid) return [];
      const favs = await getFavorites(sid);
      if (favs && typeof favs !== 'string' && favs.items) {
        return favs.items.map((item) => ({
          ...(item as ProductType),
          imgs: (item as ProductType).imgs || [],
        }));
      }
      return [];
    },
    enabled: isInitialized && !!sid,
    initialData: initialData,
    staleTime: 1000 * 60 * 5, // 5 минут
    gcTime: 1000 * 60 * 10, // 10 минут
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // Показываем загрузку только если компонент инициализирован и данных нет
  const shouldShowLoading =
    (isLoading && !initialData) || (isLoading && products.length === 0);

  return (
    <FavoritesContext.Provider
      value={{ products, isLoading: shouldShowLoading }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
