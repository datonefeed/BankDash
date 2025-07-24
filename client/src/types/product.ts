export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  category_id?: string;
  image_url?: string;
  images?: string[];
  stock_quantity: number;
  is_active?: boolean;
  sku?: string;
  weight?: number;
  dimensions?: Record<string, string | number>;
  tags?: string[];
  created_at: string;
  updated_at: string;
  categories?: Category;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ProductListResponse {
  products: Product[];
  pagination: Pagination;
}

export interface ProductInput {
  name: string;
  description?: string;
  price: number;
  original_price?: number;
  category_id?: string;
  image_url?: string;
  images?: string[];
  stock_quantity: number;
  is_active?: boolean;
  sku?: string;
  weight?: number;
  dimensions?: Record<string, string | number>;
  tags?: string[];
}