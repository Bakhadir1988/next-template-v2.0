import { FaqItem } from '@/entities/faq';
import { BreadcrumbItem } from '@/shared/types';

export type Chars = {
  alcohol: string | null;
  density: string | null;
  class: string | null;
  type: string | null;
  vendor: string | null;
};

export type SectionsObjects = {
  faq: Record<string, FaqItem>;
  related: Record<string, ProductType>;
};

export type ProductType = {
  item_id: string;
  title: string;
  price: string | null;
  manual_url: string;
  url: string;
  content: string | null;
  chars: Chars;
  sections_objects: SectionsObjects;
  __path: BreadcrumbItem[];
  type_id: string | null;
  short_title: string;
  modify_ts: string;
  create_ts: string;
  articul: string | null;
  in_stock: string;
  novelty: string;
  rating: string | null;
  discount: string | null;
  imgs: string[];
  enable: string | null;
};
