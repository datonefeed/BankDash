"use client";

import { Form, AutoComplete, Input, Select, Button, Space, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined, PlusOutlined, ExportOutlined, ClearOutlined } from '@ant-design/icons';
import type { JSX } from 'react';
import { useCategoriesQuery } from '../../hooks/useProductQueries';
import type { Category } from '../../types/product';

interface ProductFiltersProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  suggestions?: { value: string; label: JSX.Element }[];
  onFilterChange: (filters: { search?: string; category?: string; is_active?: boolean }) => void;
  initialFilters: { search?: string; category?: string; is_active?: boolean };
}

const ProductFilters = ({ searchTerm, onSearch, suggestions, onFilterChange, initialFilters }: ProductFiltersProps) => {
  const [form] = Form.useForm();
  const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery({ include_count: false });

  const handleReset = () => {
    form.resetFields();
    onSearch('');
    onFilterChange({});
  };

  const handleFinish = (values: { search?: string; category?: string; is_active?: boolean }) => {
    onSearch(values.search || '');
    onFilterChange({
      search: values.search?.trim(),
      category: values.category,
      is_active: values.is_active,
    });
  };

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { title: <Link to="/dashboard">Dashboard</Link> },
          { title: 'Products' },
        ]}
      />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Product</h1>
        <Space>
          <Button icon={<ExportOutlined />}>Export</Button>
          <Link to="/products/new">
            <Button type="primary" icon={<PlusOutlined />}>
              Add Product
            </Button>
          </Link>
        </Space>
      </div>
      <Form
        form={form}
        layout="inline"
        initialValues={initialFilters}
        onFinish={handleFinish}
        style={{ marginBottom: 16 }}
      >
        <Form.Item name="search">
          <AutoComplete
            options={suggestions}
            value={searchTerm}
            onChange={onSearch}
            onSelect={onSearch}
            style={{ width: 200 }}
            allowClear
          >
            <Input placeholder="Search product..." prefix={<SearchOutlined className="text-gray-400" />} />
          </AutoComplete>
        </Form.Item>
        <Form.Item name="category">
          <Select
            placeholder="Select category"
            allowClear
            loading={categoriesLoading}
            style={{ width: 200 }}
          >
            {categories?.map((category: Category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="is_active">
          <Select
            placeholder="select status"
            allowClear
            style={{ width: 150 }}
          >
            <Select.Option value={true}>Published</Select.Option>
            <Select.Option value={false}>Draft</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
              Filter
            </Button>
            <Button icon={<ClearOutlined />} onClick={handleReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProductFilters;