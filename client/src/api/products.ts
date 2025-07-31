import axios from 'axios';
import type { Product, Pagination, Category, ProductInput } from '../types/product';

const API_URL = 'https://lzmqrlddtkpzhnlgjlwq.supabase.co/functions/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

interface ProductListResponse {
  products: Product[];
  pagination: Pagination;
}

export const fetchProducts = async (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  is_active?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}): Promise<ProductListResponse> => {
  const { data } = await api.get<ProductListResponse>('/products-api', { params });
  return data;
};

export const fetchProductSuggestions = async (search: string): Promise<Product[]> => {
  const { data } = await api.get('/products-api', { params: { search, limit: 5 } });
  const typedData = data as ProductListResponse;
  return typedData.products;
};

export const fetchCategories = async (params: { include_count?: boolean } = {}) => {
  const response = await axios.get<Category[]>(`${API_URL}/categories-api`, {
    params: {
      include_count: params.include_count || false,
    },
  });
  return response.data;
};

export const createProduct = async (product: ProductInput) => {
  const response = await axios.post<Product>(`${API_URL}/products-api`, product);
  return response.data;
};

export const fetchProductById = async (id: string) => {
  const response = await axios.get<Product>(`${API_URL}/products-api/${id}`);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axios.delete(`${API_URL}/products-api/${id}`);
  return response.data;
};

export const updateProduct = async (id: string, product: ProductInput) => {
  const response = await axios.put<Product>(`${API_URL}/products-api/${id}`, product);
  return response.data;
};