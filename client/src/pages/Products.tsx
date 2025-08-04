"use client";

import type React from "react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { Card, Pagination, message } from "antd";
import { useProductStore } from "../stores/productStore";
import { useProductListQuery, useProductSuggestionsQuery } from "../hooks/useProductQueries";
import type { Product } from "../types/product";
import { debounce } from "lodash";
import Fuse from "fuse.js";
import ProductTable from "../components/product/ProductTable";
import ProductFilters from "../components/product/ProductFilters";
import { useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const { filters, setFilters } = useProductStore();
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const { data: productData, isLoading, error } = useProductListQuery(filters);
  const { data: suggestions } = useProductSuggestionsQuery(searchTerm);
  const navigate = useNavigate();

  // Đồng bộ filters với URL khi filters thay đổi
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.page !== 1) params.set('page', filters.page.toString());
    if (filters.limit !== 5) params.set('limit', filters.limit.toString());
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.is_active !== undefined) params.set('is_active', filters.is_active.toString());
    if (filters.sort_by && filters.sort_by !== 'created_at') params.set('sort_by', filters.sort_by);
    if (filters.sort_order && filters.sort_order !== 'desc') params.set('sort_order', filters.sort_order);

    const queryString = params.toString();
    navigate(queryString ? `/products?${queryString}` : '/products');
  }, [filters, navigate]);

  // Tìm kiếm gần đúng với Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(productData?.products || [], {
      keys: ["name", "description"],
      threshold: 0.4,
    });
  }, [productData?.products]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setFilters({ search: value, page: 1 });
      }, 500),
    [setFilters],
  );

  const handleSearch = useCallback(
    (value: string) => {
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleFilterChange = useCallback(
    (newFilters: { search?: string; category?: string; is_active?: boolean }) => {
      setFilters({
        page: 1,
        search: newFilters.search,
        category: newFilters.category,
        is_active: newFilters.is_active,
      });
    },
    [setFilters],
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  if (error) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : undefined;
    message.error(errorMessage || "Không thể tải danh sách sản phẩm");
  }

  const suggestionOptions = suggestions?.map((product: Product) => ({
    value: product.name,
    label: (
      <div key={product.id} className="flex items-center space-x-3">
        {product.image_url && <img src={product.image_url} alt={product.name} style={{ width: 30 }} />}
        <span>{product.name}</span>
      </div>
    ),
  }));

  const displayProducts = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : productData?.products;

  return (
    <div className="space-y-6">
      <ProductFilters
        searchTerm={searchTerm}
        onSearch={handleSearch}
        suggestions={suggestionOptions}
        onFilterChange={handleFilterChange}
        initialFilters={{
          search: filters.search,
          category: filters.category,
          is_active: filters.is_active,
        }}
      />
      <Card className="dashboard-card">
        <ProductTable
          products={displayProducts}
          loading={isLoading}
          pagination={false}
          selectedRowKeys={selectedRowKeys}
          onRowSelectionChange={setSelectedRowKeys}
        />
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Showing {(filters.page * filters.limit) - filters.limit + 1}-
            {Math.min(filters.page * filters.limit, productData?.pagination.total || 0)} from{" "}
            {productData?.pagination.total || 0}
          </div>
          <Pagination
            current={filters.page}
            total={productData?.pagination.total || 0}
            pageSize={filters.limit}
            showSizeChanger
            pageSizeOptions={['5', '10', '20', '50']}
            showQuickJumper={false}
            size="small"
            onChange={(page, pageSize) => setFilters({ page, limit: pageSize })}
          />
        </div>
      </Card>
    </div>
  );
};

export default Products;