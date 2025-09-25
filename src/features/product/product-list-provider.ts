'use client';

import { compareApi, favoritesApi } from '@/shared/api/list-api';

import { createProductListProvider } from './create-product-list-provider';

export const { Provider: CompareProvider, useList: useCompare } =
  createProductListProvider('compare', compareApi.get);

export const { Provider: FavoritesProvider, useList: useFavorites } =
  createProductListProvider('favorites', favoritesApi.get);
