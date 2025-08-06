"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Breadcrumb, Button, Card, Form, Input, InputNumber, Select, Space, Spin, Switch, message, Row, Col } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductQuery, useCategoriesQuery, useUpdateProductMutation } from "../hooks/useProductQueries";
import type { ProductInput } from "../types/product";
import { productSchema, type ProductForm } from "../schemas/productSchema";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading: productLoading, error } = useProductQuery(id || "");
  const { data: categories, isLoading: categoriesLoading } = useCategoriesQuery({ include_count: false });
  const { mutate: updateProduct, isPending: isSubmitting } = useUpdateProductMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      sku: "",
      category_id: "",
      stock_quantity: 0,
      price: 0,
      original_price: undefined,
      is_active: true,
      image_url: "",
      images: [],
      weight: undefined,
      dimensions: { length: undefined, width: undefined, height: undefined },
      tags: [],
    },
  });

  // Populate form with product data
  useEffect(() => {
    if (product && !productLoading && !error) {
      reset({
        name: product.name,
        description: product.description || "",
        sku: product.sku || "",
        category_id: product.category_id || "",
        stock_quantity: product.stock_quantity,
        price: product.price,
        original_price: product.original_price,
        is_active: product.is_active ?? true,
        image_url: product.image_url || "",
        images: product.images || [],
        weight: product.weight,
        dimensions: product.dimensions || {
          length: undefined,
          width: undefined,
          height: undefined,
        },
        tags: product.tags || [],
      });
    }
  }, [product, productLoading, error, reset]);

  // Handle form submission
  const onSubmit = handleSubmit((data: ProductForm) => {
    const productInput: ProductInput = {
      name: data.name,
      description: data.description || undefined,
      sku: data.sku || undefined,
      category_id: data.category_id,
      stock_quantity: data.stock_quantity,
      price: data.price,
      original_price: data.original_price,
      is_active: data.is_active,
      image_url: data.image_url || undefined,
      images: data.images?.length ? data.images : undefined,
      weight: data.weight,
      dimensions: data.dimensions,
      tags: data.tags?.length ? data.tags : undefined,
    };

    updateProduct(
      { id: id!, product: productInput },
      {
        onSuccess: () => {
          message.success("Product updated successfully!");
          navigate("/products");
        },
        onError: (error: Error) => {
          message.error(error.message || "Failed to update product");
        },
      }
    );
  });

  if (productLoading) {
    return <div style={{ textAlign: "center", padding: "50px" }}><Spin size="large" /></div>;
  }

  if (error || !product) {
    message.error(error?.message || "Failed to load product information");
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Title level={4}>Product not found</Title>
        <Button type="primary">
          <Link to="/products">Back to product list</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb
        items={[
          { title: <Link to="/dashboard">Dashboard</Link> },
          { title: <Link to="/products">Products</Link> },
          { title: "Edit Product" },
        ]}
      />
      <Card title="Edit Product" className="dashboard-card">
        <Form layout="vertical" onFinish={onSubmit}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Product Name"
                required
                validateStatus={errors.name ? "error" : ""}
                help={errors.name?.message}
              >
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter product name" />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="SKU"
                validateStatus={errors.sku ? "error" : ""}
                help={errors.sku?.message}
              >
                <Controller
                  name="sku"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter SKU (optional)" />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Description"
            validateStatus={errors.description ? "error" : ""}
            help={errors.description?.message}
          >
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea {...field} placeholder="Enter product description (optional)" rows={4} />
              )}
            />
          </Form.Item>

          {/* Category and Status */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Category"
                required
                validateStatus={errors.category_id ? "error" : ""}
                help={errors.category_id?.message}
              >
                <Controller
                  name="category_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select category"
                      loading={categoriesLoading}
                      options={categories?.map((category) => ({
                        value: category.id,
                        label: category.name,
                      }))}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Status"
                valuePropName="checked"
                validateStatus={errors.is_active ? "error" : ""}
                help={errors.is_active?.message}
              >
                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      checked={field.value}
                      checkedChildren="Published"
                      unCheckedChildren="Draft"
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Pricing */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Price"
                required
                validateStatus={errors.price ? "error" : ""}
                help={errors.price?.message}
              >
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      placeholder="Enter price"
                      min={0}
                      step={0.01}
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Original Price"
                validateStatus={errors.original_price ? "error" : ""}
                help={errors.original_price?.message}
              >
                <Controller
                  name="original_price"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      placeholder="Enter original price (optional)"
                      min={0}
                      step={0.01}
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Inventory */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Stock Quantity"
                required
                validateStatus={errors.stock_quantity ? "error" : ""}
                help={errors.stock_quantity?.message}
              >
                <Controller
                  name="stock_quantity"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      placeholder="Enter stock quantity"
                      min={0}
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Weight (kg)"
                validateStatus={errors.weight ? "error" : ""}
                help={errors.weight?.message}
              >
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      placeholder="Enter weight (optional)"
                      min={0}
                      step={0.1}
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Dimensions */}
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item
                label="Length"
                validateStatus={errors.dimensions?.length ? "error" : ""}
                help={errors.dimensions?.length?.message}
              >
                <Controller
                  name="dimensions.length"
                  control={control}
                  render={({ field }) => (
                    <InputNumber {...field} placeholder="Length" min={0} style={{ width: "100%" }} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Width"
                validateStatus={errors.dimensions?.width ? "error" : ""}
                help={errors.dimensions?.width?.message}
              >
                <Controller
                  name="dimensions.width"
                  control={control}
                  render={({ field }) => (
                    <InputNumber {...field} placeholder="Width" min={0} style={{ width: "100%" }} />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="Height"
                validateStatus={errors.dimensions?.height ? "error" : ""}
                help={errors.dimensions?.height?.message}
              >
                <Controller
                  name="dimensions.height"
                  control={control}
                  render={({ field }) => (
                    <InputNumber {...field} placeholder="Height" min={0} style={{ width: "100%" }} />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Images */}
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Main Image URL"
                validateStatus={errors.image_url ? "error" : ""}
                help={errors.image_url?.message}
              >
                <Controller
                  name="image_url"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter main image URL (optional)" />
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Additional Image URLs"
                validateStatus={errors.images ? "error" : ""}
                help={errors.images?.message}
              >
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      mode="tags"
                      placeholder="Enter additional image URLs (optional)"
                      style={{ width: "100%" }}
                    />
                  )}
                />
              </Form.Item>
            </Col>
          </Row>

          {/* Tags */}
          <Form.Item
            label="Tags"
            validateStatus={errors.tags ? "error" : ""}
            help={errors.tags?.message}
          >
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  mode="tags"
                  placeholder="Enter tags (optional)"
                  style={{ width: "100%" }}
                />
              )}
            />
          </Form.Item>

          {/* Actions */}
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Update Product
              </Button>
              <Button>
                <Link to="/products">Cancel</Link>
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditProduct;