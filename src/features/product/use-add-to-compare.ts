'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product';
import {
  addToCompare,
  removeFromCompare,
  getSessionId,
} from '@/shared/api/compare-api';

interface UseAddToCompareProps {
  product: ProductType;
}

export const useAddToCompare = ({ product }: UseAddToCompareProps) => {
  const queryClient = useQueryClient();
  const [sid, setSid] = useState('');

  useEffect(() => {
    const sessionId = getSessionId();
    setSid(sessionId);
  }, []);

  // Получаем текущий список избранного из кэша с правильным ключом
  const compareData = queryClient.getQueryData<ProductType[]>(['compare', sid]);

  // Проверяем, находится ли товар в избранном
  const isCompare = useMemo(() => {
    if (!compareData || !sid) {
      return false;
    }
    return compareData.some((item) => item.item_id === product.item_id);
  }, [compareData, product.item_id, sid]);

  // Мутация для добавления в избранное
  const addMutation = useMutation({
    mutationFn: () => addToCompare({ item_id: product.item_id }),
    onMutate: async () => {
      if (!sid) {
        return { previousCompare: null };
      }

      // Отменяем исходящие запросы
      await queryClient.cancelQueries({ queryKey: ['compare', sid] });

      // Сохраняем предыдущие данные
      const previousCompare = queryClient.getQueryData<ProductType[]>([
        'compare',
        sid,
      ]);

      // Оптимистично обновляем кэш
      queryClient.setQueryData<ProductType[]>(['compare', sid], (old = []) => {
        if (old.some((item) => item.item_id === product.item_id)) return old;
        return [...old, product];
      });

      return { previousCompare };
    },
    onError: (err, variables, context) => {
      // Откатываем изменения при ошибке
      if (context?.previousCompare && sid) {
        queryClient.setQueryData(['compare', sid], context.previousCompare);
      }
      console.error('Ошибка добавления в избранное:', err);
    },
    onSettled: () => {
      // Обновляем данные в любом случае
      if (sid) {
        queryClient.invalidateQueries({ queryKey: ['compare', sid] });
      }
    },
  });

  // Мутация для удаления из избранного
  const removeMutation = useMutation({
    mutationFn: () => removeFromCompare({ item_id: product.item_id }),
    onMutate: async () => {
      if (!sid) {
        return { previousCompare: null };
      }

      // Отменяем исходящие запросы
      await queryClient.cancelQueries({ queryKey: ['compare', sid] });

      // Сохраняем предыдущие данные
      const previousCompare = queryClient.getQueryData<ProductType[]>([
        'compare',
        sid,
      ]);

      // Оптимистично обновляем кэш
      queryClient.setQueryData<ProductType[]>(['compare', sid], (old = []) => {
        return old.filter((item) => item.item_id !== product.item_id);
      });

      return { previousCompare };
    },
    onError: (err, variables, context) => {
      // Откатываем изменения при ошибке
      if (context?.previousCompare && sid) {
        queryClient.setQueryData(['compare', sid], context.previousCompare);
      }
      console.error('Ошибка удаления из сравнения:', err);
    },
    onSettled: () => {
      // Обновляем данные в любом случае
      if (sid) {
        queryClient.invalidateQueries({ queryKey: ['compare', sid] });
      }
    },
  });

  // Функция переключения состояния избранного
  const toggleCompare = useCallback(() => {
    if (!sid) {
      return;
    }

    if (isCompare) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  }, [isCompare, addMutation, removeMutation, sid]);

  return {
    isCompare,
    toggleCompare,
    isLoading: addMutation.isPending || removeMutation.isPending,
    error: addMutation.error || removeMutation.error,
  };
};
