export type TProduct = {
  id: string | number;
  imageUrl: string;
  title: string;
  price: number;
  characteristics: { name: string; value: string }[];
  rating: number;
  article: string;
};
