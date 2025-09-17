export interface CatalogItem {
  item_id: string;
  title: string;
  price: string | null;
  manual_url: string;
  content?: string;
}

export interface CatalogApiResponse {
  meta: {
    h1: string;
  };
  items: CatalogItem[];
  sections: any[]; // and so on for other fields if needed
}
