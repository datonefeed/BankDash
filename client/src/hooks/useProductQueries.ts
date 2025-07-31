import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, fetchProductSuggestions, createProduct, fetchProductById, deleteProduct, updateProduct } from '../api/products';
import type { ProductListResponse, Category, Product, ProductInput } from '../types/product';

export const useProductListQuery = (params: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  is_active?: boolean;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}) => {
  return useQuery<ProductListResponse>({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCategoriesQuery = (params: { include_count?: boolean } = {}) => {
  return useQuery<Category[]>({
    queryKey: ['categories', params],
    queryFn: () => fetchCategories(params),
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductSuggestionsQuery = (search: string) => {
  return useQuery<Product[]>({
    queryKey: ['productSuggestions', search],
    queryFn: () => fetchProductSuggestions(search),
    enabled: !!search,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useProductQuery = (id: string) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: ProductInput }) => updateProduct(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });
};