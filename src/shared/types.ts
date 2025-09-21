export type BreadcrumbItem = {
  item_id: string;
  url: string;
  title: string;
};

export type Pagination = {
  total_items: string;
  items_per_page: string;
  total_pages: number;
  current_page: string;
  from: number;
  to: number;
  window_size: number;
  window_first_page: number;
  window_last_page: number;
  onPageChange: (page: number) => void;
  pages: number[];
};
