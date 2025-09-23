'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product';
import {
  addToFavorites,
  removeFromFavorites,
  getSessionId,
} from '@/shared/api/favorite-api';

interface UseAddToFavoritesProps {
  product: ProductType;
}

export const useAddToFavorites = ({ product }: UseAddToFavoritesProps) => {
  const queryClient = useQueryClient();
  const [sid, setSid] = useState('');

  useEffect(() => {
    const sessionId = getSessionId();
    setSid(sessionId);
  }, []);

  // Получаем текущий список избранного из кэша с правильным ключом
  const favoritesData = queryClient.getQueryData<ProductType[]>([
    'favorites',
    sid,
  ]);

  // Проверяем, находится ли товар в избранном
  const isFavorite = useMemo(() => {
    if (!favoritesData || !sid) {
      return false;
    }
    return favoritesData.some((item) => item.item_id === product.item_id);
  }, [favoritesData, product.item_id, sid]);

  // Мутация для добавления в избранное
  const addMutation = useMutation({
    mutationFn: () => addToFavorites({ item_id: product.item_id }),
    onMutate: async () => {
      if (!sid) {
        return { previousFavorites: null };
      }

      // Отменяем исходящие запросы
      await queryClient.cancelQueries({ queryKey: ['favorites', sid] });

      // Сохраняем предыдущие данные
      const previousFavorites = queryClient.getQueryData<ProductType[]>([
        'favorites',
        sid,
      ]);

      // Оптимистично обновляем кэш
      queryClient.setQueryData<ProductType[]>(
        ['favorites', sid],
        (old = []) => {
          if (old.some((item) => item.item_id === product.item_id)) return old;
          return [...old, product];
        },
      );

      return { previousFavorites };
    },
    onError: (err, variables, context) => {
      // Откатываем изменения при ошибке
      if (context?.previousFavorites && sid) {
        queryClient.setQueryData(['favorites', sid], context.previousFavorites);
      }
      console.error('Ошибка добавления в избранное:', err);
    },
    onSettled: () => {
      // Обновляем данные в любом случае
      if (sid) {
        queryClient.invalidateQueries({ queryKey: ['favorites', sid] });
      }
    },
  });

  // Мутация для удаления из избранного
  const removeMutation = useMutation({
    mutationFn: () => removeFromFavorites({ item_id: product.item_id }),
    onMutate: async () => {
      if (!sid) {
        return { previousFavorites: null };
      }

      // Отменяем исходящие запросы
      await queryClient.cancelQueries({ queryKey: ['favorites', sid] });

      // Сохраняем предыдущие данные
      const previousFavorites = queryClient.getQueryData<ProductType[]>([
        'favorites',
        sid,
      ]);

      // Оптимистично обновляем кэш
      queryClient.setQueryData<ProductType[]>(
        ['favorites', sid],
        (old = []) => {
          return old.filter((item) => item.item_id !== product.item_id);
        },
      );

      return { previousFavorites };
    },
    onError: (err, variables, context) => {
      // Откатываем изменения при ошибке
      if (context?.previousFavorites && sid) {
        queryClient.setQueryData(['favorites', sid], context.previousFavorites);
      }
      console.error('Ошибка удаления из избранного:', err);
    },
    onSettled: () => {
      // Обновляем данные в любом случае
      if (sid) {
        queryClient.invalidateQueries({ queryKey: ['favorites', sid] });
      }
    },
  });

  // Функция переключения состояния избранного
  const toggleFavorite = useCallback(() => {
    if (!sid) {
      return;
    }

    if (isFavorite) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  }, [isFavorite, addMutation, removeMutation, sid]);

  return {
    isFavorite,
    toggleFavorite,
    isLoading: addMutation.isPending || removeMutation.isPending,
    error: addMutation.error || removeMutation.error,
  };
};
