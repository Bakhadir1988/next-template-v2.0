import { API_BASE_URL } from '@/shared/config/site.config';

export const getFilter = async (sectId: string) => {
  const response = await fetch(
    `${API_BASE_URL}?comp=filter&sect_id=${sectId}`,
    {
      method: 'POST',
    },
  );
  if (!response.ok) {
    throw new Error('Failed to fetch filter');
  }
  return response.json();
};

export const postFilterData = async (formData: FormData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response;
};
