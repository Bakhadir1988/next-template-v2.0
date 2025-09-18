import { CatalogApiResponse } from '@/entities/catalog/model/catalog.type';
import { Product } from '@/entities/product';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://litra-adm.workup.spb.ru/';

export const getCatalogData = async (): Promise<CatalogApiResponse> => {
  const endpoint = 'catalog/';
  // Убрана опция { cache: 'no-store' }
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    // Бросаем стандартную ошибку со статусом в тексте
    throw new Error(`API Error: ${response.status}`);
  }

  return (await response.json()) as CatalogApiResponse;
};

export const getCatalogDataBySlug = async (
  slug: string,
): Promise<Product | CatalogApiResponse> => {
  const endpoint = `catalog/${slug}/`;
  // Убрана опция { cache: 'no-store' }
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    // Бросаем стандартную ошибку со статусом в тексте
    throw new Error(`API Error: ${response.status}`);
  }

  return (await response.json()) as Product | CatalogApiResponse;
};
