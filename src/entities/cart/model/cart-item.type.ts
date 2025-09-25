export interface CartItem {
  id: number;
  image: string;
  name: string;
  tags: string[];
  discount?: number;
  priceType: string;
  colors?: string[];
  selectedColor?: string;
  quantity: number;
  price: number;
  oldPrice?: number;
  savings?: number;
}
