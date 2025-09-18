import { BreadcrumbItem } from '@/shared/types';

export interface FaqItem {
  item_id: string;
  __path: BreadcrumbItem[];
  type_id: string | null;
  title: string;
  short_title: string;
  modify_ts: string;
  create_ts: string;
  answer: string;
  enable: string;
  url: string;
  manual_url: string;
}
