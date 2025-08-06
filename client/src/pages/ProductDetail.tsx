"use client";

import { useParams, Link } from "react-router-dom";
import { useProductQuery } from "../hooks/useProductQueries";
import { Breadcrumb, Card, Descriptions, Image, Spin, Button, Typography, Tag, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { format } from "date-fns";

const { Title } = Typography;

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProductQuery(id || "");

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !product) {
    message.error(error?.message || "Unable to load product information");
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
    <div style={{ padding: "24px" }}>
      <Breadcrumb
        items={[
          { title: <Link to="/dashboard">Dashboard</Link> },
          { title: <Link to="/products">Products</Link> },
          { title: product.name },
        ]}
      />
      <Card
        title={<Title level={4}>{product.name}</Title>}
        style={{ marginTop: 16 }}
        extra={
          <Button type="primary">
            <Link to="/products">
              <ArrowLeftOutlined /> Back
            </Link>
          </Button>
        }
      >
        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID">{product.id}</Descriptions.Item>
          <Descriptions.Item label="Product Name">{product.name}</Descriptions.Item>
          <Descriptions.Item label="Description">{product.description || "None"}</Descriptions.Item>
          <Descriptions.Item label="SKU">{product.sku || "None"}</Descriptions.Item>
          <Descriptions.Item label="Category">{product.categories?.name || product.category_id || "None"}</Descriptions.Item>
          <Descriptions.Item label="Stock Quantity">{product.stock_quantity}</Descriptions.Item>
          <Descriptions.Item label="Price">{product.price.toFixed(2)} USD</Descriptions.Item>
          <Descriptions.Item label="Original Price">{product.original_price?.toFixed(2) || "None"} USD</Descriptions.Item>
          <Descriptions.Item label="Status">
            {product.is_active ? <Tag color="green">Published</Tag> : <Tag color="red">Draft</Tag>}
          </Descriptions.Item>
          <Descriptions.Item label="Main Image">
            {product.image_url ? (
              <Image src={product.image_url} width={100} alt={product.name} />
            ) : (
              "None"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Additional Images">
            {product.images?.length ? (
              <Image.PreviewGroup>
                {product.images.map((url, index) => (
                  <Image key={index} src={url} width={100} alt={`Additional Image ${index + 1}`} style={{ marginRight: 8 }} />
                ))}
              </Image.PreviewGroup>
            ) : (
              "None"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Weight">{product.weight ? `${product.weight} kg` : "None"}</Descriptions.Item>
          <Descriptions.Item label="Dimensions">
            {product.dimensions
              ? `Length: ${product.dimensions.length || 0} cm, Width: ${product.dimensions.width || 0} cm, Height: ${product.dimensions.height || 0} cm`
              : "None"}
          </Descriptions.Item>
          <Descriptions.Item label="Tags">
            {product.tags?.length ? product.tags.map((tag) => <Tag key={tag}>{tag}</Tag>) : "None"}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">{format(new Date(product.created_at), "dd/MM/yyyy HH:mm")}</Descriptions.Item>
          <Descriptions.Item label="Updated At">{format(new Date(product.updated_at), "dd/MM/yyyy HH:mm")}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ProductDetail;