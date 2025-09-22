import { API_URL } from '../config';

export const getFilter = async (sectId: string) => {
  const response = await fetch(`${API_URL}/?comp=filter&sect_id=${sectId}`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch filter');
  }
  return response.json();
};
