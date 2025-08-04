"use client";

import { Table, Button, Tag, Avatar, Dropdown, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { EyeOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { useDeleteProductMutation } from '../../hooks/useProductQueries';
import type { Category, Product } from '../../types/product';

interface ProductTableProps {
  products?: Product[];
  loading: boolean;
  pagination?: false | {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    pageSizeOptions?: string[];
    onChange: (page: number, pageSize: number) => void;
  };
  selectedRowKeys: React.Key[];
  onRowSelectionChange: (keys: React.Key[]) => void;
}

const ProductTable = ({ products, loading, pagination, selectedRowKeys, onRowSelectionChange }: ProductTableProps) => {
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProductMutation();

  const handleDelete = (id: string) => {
    deleteProduct(id, {
      onSuccess: () => {
        message.success("Xóa sản phẩm thành công!");
      },
      onError: (error: Error) => {
        message.error(error.message || "Không thể xóa sản phẩm");
      },
    });
  };

  const columns: ColumnsType<Product> = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      render: (text: string, record: Product) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.image_url} size={40} className="bg-gray-100" style={{ backgroundColor: '#f5f5f5' }}>
            {!record.image_url && text.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">{record.tags?.length || 0} Variants</div>
          </div>
        </div>
      ),
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 120,
      render: (sku: string) => <span className="text-blue-600 font-medium">{sku || 'N/A'}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'categories',
      key: 'category',
      width: 150,
      render: (categories: Category) => categories?.name || 'N/A',
    },
    {
      title: 'Stock',
      dataIndex: 'stock_quantity',
      key: 'stock',
      width: 100,
      sorter: (a, b) => a.stock_quantity - b.stock_quantity,
      render: (stock: number) => <span className={stock === 0 ? 'text-red-500' : 'text-gray-900'}>{stock}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      sorter: (a, b) => a.price - b.price,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'status',
      width: 130,
      filters: [
        { text: 'Published', value: true },
        { text: 'Draft', value: false },
      ],
      onFilter: (value, record) => record.is_active === value,
      render: (is_active: boolean) => {
        const status = is_active ? 'Published' : 'Draft';
        const color = is_active ? 'green' : 'default';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Added',
      dataIndex: 'created_at',
      key: 'added',
      width: 130,
      sorter: (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => {
        const actionMenuItems = [
          {
            key: 'view',
            label: <Link to={`/products/view/${record.id}`}>View</Link>,
            icon: <EyeOutlined />,
          },
          {
            key: 'edit',
            label: <Link to={`/products/edit/${record.id}`}>Edit</Link>,
            icon: <EditOutlined />,
          },
          {
            key: 'delete',
            label: (
              <Popconfirm
                title="Delete Product"
                description="Are you sure you want to delete this product?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
                disabled={isDeleting}
              >
                Delete
              </Popconfirm>
            ),
            icon: <DeleteOutlined />,
            danger: true,
          },
        ];
        return (
          <Dropdown menu={{ items: actionMenuItems }} placement="bottomRight">
            <Button icon={<MoreOutlined />} size="small" />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      {selectedRowKeys.length > 0 && (
        <div className="mb-4">
          <Button
            danger
            icon={<DeleteOutlined />}
            disabled={isDeleting}
          >
            Delete Selected
          </Button>
        </div>
      )}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={pagination}
        rowSelection={{
          selectedRowKeys,
          onChange: onRowSelectionChange,
          onSelectAll: (selected) => {
            if (selected) {
              onRowSelectionChange(products?.map((item) => item.id) || []);
            } else {
              onRowSelectionChange([]);
            }
          },
        }}
        size="middle"
        className="product-table"
      />
    </div>
  );
};

export default ProductTable;