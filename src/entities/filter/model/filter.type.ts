export type FilterType = 'BOOLEAN' | 'PRICE' | 'ENUM' | 'FLOAT' | 'INTEGER';

export interface FilterValue {
  total_count: string;
  enabled: null | string;
  current_count: string;
  label?: string;
}

export interface PriceFilter {
  min: string;
  max: string;
  lt: null | string;
  gt: null | string;
  actual_min: string;
  actual_max: string;
}

export interface EnumFilter {
  [key: string]: FilterValue;
}

export interface FilterProp {
  prop_id: string;
  title: string;
  type: FilterType;
  tpl_key: string;
  unit: string;
  filter_enabled: string;
  valuefield: string;
  variants: null | string[];
  filter: PriceFilter | EnumFilter | FilterValue[];
  show?: boolean;
  value?: null | string;
}

export interface FilterGroup {
  group_id: string;
  tpl_key: string;
  variant: string | number;
  props: Record<string, FilterProp> | [];
}

export interface FilterCatalog {
  type_id: string;
  type_name: string;
  groups: {
    [key: string]: FilterGroup;
  };
}

export interface FilterResponse {
  props: FilterCatalog[];
}
