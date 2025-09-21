import { ProductType } from '@/entities/product';
import { TagDto } from '@/entities/tag';
import { Pagination } from '@/shared/types';

export interface CatalogSection {
  item_id: string;
  title: string;
  url: string;
}

export interface CatalogApiResponse {
  meta: {
    h1: string;
  };
  items: ProductType[];
  section: CatalogSection;
  sections: CatalogSection[];
  upper_tags: TagDto[];
  lower_tags: TagDto[];
  pagi: Pagination;
}
