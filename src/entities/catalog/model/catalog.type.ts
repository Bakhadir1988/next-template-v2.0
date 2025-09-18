import { Product } from '@/entities/product';
import { TagDto } from '@/entities/tag';

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
  upper_tags: TagDto[];
  lower_tags: TagDto[];
}
