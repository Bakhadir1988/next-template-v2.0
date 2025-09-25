'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ProductType } from '@/entities/product';
import { getSessionId } from '@/shared/api/session-api';

interface UseProductListMutationProps {
  product: ProductType;
  queryKey: string;
  addFn: (item: { item_id: string }) => Promise<unknown>;
  removeFn: (item: { item_id: string }) => Promise<unknown>;
}

export const useProductListMutation = ({
  product,
  queryKey,
  addFn,
  removeFn,
}: UseProductListMutationProps) => {
  const queryClient = useQueryClient();
  const [sid, setSid] = useState('');

  useEffect(() => {
    const sessionId = getSessionId();
    setSid(sessionId);
  }, []);

  const listData = queryClient.getQueryData<ProductType[]>([queryKey, sid]);

  const isInList = useMemo(() => {
    if (!listData || !sid) {
      return false;
    }
    return listData.some((item) => item.item_id === product.item_id);
  }, [listData, product.item_id, sid]);

  const addMutation = useMutation({
    mutationFn: () => addFn({ item_id: product.item_id }),
    onMutate: async () => {
      if (!sid) return { previousData: null };

      await queryClient.cancelQueries({ queryKey: [queryKey, sid] });
      const previousData = queryClient.getQueryData<ProductType[]>([
        queryKey,
        sid,
      ]);

      queryClient.setQueryData<ProductType[]>([queryKey, sid], (old = []) => {
        if (old.some((item) => item.item_id === product.item_id)) return old;
        return [...old, product];
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData && sid) {
        queryClient.setQueryData([queryKey, sid], context.previousData);
      }
      console.error(`Ошибка добавления в ${queryKey}:`, err);
    },
    onSettled: () => {
      if (sid) {
        queryClient.invalidateQueries({ queryKey: [queryKey, sid] });
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: () => removeFn({ item_id: product.item_id }),
    onMutate: async () => {
      if (!sid) return { previousData: null };

      await queryClient.cancelQueries({ queryKey: [queryKey, sid] });
      const previousData = queryClient.getQueryData<ProductType[]>([
        queryKey,
        sid,
      ]);

      queryClient.setQueryData<ProductType[]>([queryKey, sid], (old = []) => {
        return old.filter((item) => item.item_id !== product.item_id);
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData && sid) {
        queryClient.setQueryData([queryKey, sid], context.previousData);
      }
      console.error(`Ошибка удаления из ${queryKey}:`, err);
    },
    onSettled: () => {
      if (sid) {
        queryClient.invalidateQueries({ queryKey: [queryKey, sid] });
      }
    },
  });

  const toggle = useCallback(() => {
    if (!sid) return;

    if (isInList) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  }, [isInList, addMutation, removeMutation, sid]);

  return {
    isInList,
    toggle,
    isLoading: addMutation.isPending || removeMutation.isPending,
    error: addMutation.error || removeMutation.error,
  };
};
