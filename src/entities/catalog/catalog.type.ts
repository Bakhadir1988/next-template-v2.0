import { Product } from '@/entities/product';
import { Tag } from '@/entities/tag';

export interface CatalogSection {
  item_id: string;
  title: string;
  url: string;
}

export interface CatalogApiResponse {
  meta: {
    h1: string;
  };
  items: Product[];
  sections: CatalogSection[];
  upper_tags: Tag[];
  lower_tags: Tag[];
}
