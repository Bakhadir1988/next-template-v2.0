import { CatalogApiResponse } from '@/entities/catalog/model/catalog.type';
import { ProductType } from '@/entities/product';
import { API_BASE_URL } from '@/shared/config/site.config';

export const getCatalogDataBySlug = async (
  slug: string,
): Promise<ProductType | CatalogApiResponse> => {
  const endpoint = slug;
  // Safely construct the URL to avoid double slashes
  const url = new URL(
    endpoint.startsWith('/') ? endpoint.substring(1) : endpoint,
    API_BASE_URL,
  );
  const response = await fetch(url);

  if (!response.ok) {
    // Бросаем стандартную ошибку со статусом в тексте
    throw new Error(`API Error: ${response.status}`);
  }

  console.log('slug', slug);
  console.log('endpoint', endpoint);

  return (await response.json()) as ProductType | CatalogApiResponse;
};

export const postCatalogData = async (formData: FormData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response;
};
